// Place a call and wait for its result.
//
//   AMI_USERNAME=admin AMI_SECRET=... npx tsx examples/originate.ts PJSIP/101

import { AmiActionError, AmiClient } from 'amilink';

const channel = process.argv[2] ?? 'PJSIP/101';

// This connection only sends actions, so it asks for no events.
const ami = new AmiClient({
  host: process.env.AMI_HOST ?? '127.0.0.1',
  username: process.env.AMI_USERNAME ?? 'admin',
  secret: process.env.AMI_SECRET ?? '',
  events: false,
  reconnect: false,
});

await ami.connect();

try {
  // An async Originate answers twice: "queued" at once, and OriginateResponse
  // when the call is answered or fails. Wait for the second.
  const { complete } = await ami.list(
    {
      Action: 'Originate',
      Channel: channel,
      Application: 'Playback',
      Data: 'hello-world',
      CallerID: '"amilink" <100>',
      Timeout: 30_000,
      Async: 'true',
      Variable: { ORIGIN: 'example' },
    },
    { completeEvent: 'OriginateResponse', timeoutMs: 40_000 },
  );
  console.log(`${channel}: ${complete?.get('Response')} (reason ${complete?.get('Reason')})`);
} catch (error) {
  if (error instanceof AmiActionError) console.error('Asterisk refused:', error.response.get('Message'));
  else throw error;
} finally {
  await ami.close();
}

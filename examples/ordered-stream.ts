// Handle events with slow work, one at a time and in order.
//
// A plain handler that awaits returns at its first `await`, so two events can
// be in progress together and finish in the wrong order. The stream waits for
// each step before giving the next event.
//
//   AMI_USERNAME=admin AMI_SECRET=... npx tsx examples/ordered-stream.ts

import { AmiClient, AmiOverflowError } from 'amilink';

const ami = new AmiClient({
  host: process.env.AMI_HOST ?? '127.0.0.1',
  username: process.env.AMI_USERNAME ?? 'admin',
  secret: process.env.AMI_SECRET ?? '',
});
ami.on('error', (error) => console.error('error:', error.message));

async function save(record: Record<string, string | undefined>): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 50)); // a database write, say
  console.log('saved', record);
}

await ami.connect();

try {
  for await (const event of ami.events('Hangup', { maxQueue: 5000 })) {
    await save({ channel: event.fields.Channel, cause: event.fields.Cause, text: event.fields['Cause-txt'] });
  }
} catch (error) {
  // More than 5000 events were waiting: the consumer cannot keep up.
  if (error instanceof AmiOverflowError) console.error(error.message);
  else throw error;
}

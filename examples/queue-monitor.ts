// Show who is in each queue, then follow pauses and calls as they happen.
//
//   AMI_USERNAME=admin AMI_SECRET=... npx tsx examples/queue-monitor.ts

import { AmiClient } from 'amilink';

const ami = new AmiClient({
  host: process.env.AMI_HOST ?? '127.0.0.1',
  username: process.env.AMI_USERNAME ?? 'admin',
  secret: process.env.AMI_SECRET ?? '',
  events: ['agent'],
});

ami.on('error', (error) => console.error('error:', error.message));
ami.on('disconnect', () => console.log('link lost, reconnecting'));

// Runs on the first login and again after every reconnect, so the picture is
// rebuilt from Asterisk and never carried over from before the gap.
ami.on('ready', async () => {
  const { events } = await ami.list({ Action: 'QueueStatus' });
  for (const event of events) {
    if (event.is('QueueMember')) {
      const state = event.fields.Paused === '1' ? `paused (${event.fields.PausedReason || 'no reason'})` : 'available';
      console.log(`${event.fields.Queue}: ${event.fields.Name} is ${state}`);
    }
  }
});

ami.onEvent('QueueMemberPause', (event) => {
  const { Queue, MemberName, Paused, PausedReason } = event.fields;
  console.log(`${Queue}: ${MemberName} ${Paused === '1' ? `paused (${PausedReason || 'no reason'})` : 'available'}`);
});

ami.onEvent('AgentConnect', (event) => {
  console.log(`${event.fields.Queue}: ${event.fields.MemberName} answered after ${event.fields.HoldTime} s`);
});

ami.onEvent('QueueCallerAbandon', (event) => {
  console.log(`${event.fields.Queue}: caller ${event.fields.CallerIDNum} gave up after ${event.fields.HoldTime} s`);
});

await ami.connect();

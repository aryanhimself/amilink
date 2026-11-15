// Lab helper for scripts/live-conformance.mjs: a client in a process of its own
// whose first UserEvent handler call blocks the event loop for BLOCK_MS.
// Prints "ready" once logged in, then one line of JSON when the burst is over.
import { AmiClient } from '../dist/index.js';

const client = new AmiClient({
  host: process.env.AMI_HOST,
  port: Number(process.env.AMI_PORT),
  username: process.env.AMI_USERNAME,
  secret: process.env.AMI_SECRET,
  // No filter: like a real listener it takes every event, so the backlog while
  // it is blocked is as large as a real one's would be.
  reconnect: false,
});
client.on('error', () => {});
let disconnected = false;
client.on('disconnect', () => { disconnected = true; });
await client.connect(10_000);
let count = 0;
let blocked = false;
let idle;
const finish = async () => {
  const report = { count, disconnected: disconnected || !client.connected };
  await client.close().catch(() => {});
  process.stdout.write(`${JSON.stringify(report)}\n`);
  process.exit(0);
};
client.onEvent('UserEvent', (event) => {
  if (event.get('UserEvent') !== 'AmilinkBurst') return;
  if (!blocked) {
    blocked = true;
    const until = Date.now() + Number(process.env.BLOCK_MS ?? 2000);
    while (Date.now() < until) { /* hold the event loop, as a slow handler would */ }
  }
  count += 1;
  clearTimeout(idle);
  if (event.get('N') === '4999') void finish();
  else idle = setTimeout(finish, 3000);
});
client.on('close', () => { disconnected = true; clearTimeout(idle); idle = setTimeout(finish, 500); });
setTimeout(finish, 90_000);
process.stdout.write('ready\n');

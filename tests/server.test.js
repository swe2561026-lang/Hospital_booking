const test = require('node:test');
const assert = require('node:assert');
const server = require('../src/server');

test('GET /api/health 200 буцаана', async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}/api/health`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: 'ok' });
  await new Promise((resolve) => server.close(resolve));
});

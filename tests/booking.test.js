const test = require('node:test');
const assert = require('node:assert');
const { createAppointment, cancelAppointment, isSlotTaken } = require('../src/booking');

test('цаг амжилттай захиалагдана', () => {
  const a = createAppointment([], { patientId: 1, scheduleId: 10, reason: 'Үзлэг' });
  assert.strictEqual(a.status, 'confirmed');
  assert.strictEqual(a.scheduleId, 10);
});

test('давхардсан захиалга татгалзагдана', () => {
  const existing = [{ id: 1, patientId: 1, scheduleId: 10, status: 'confirmed' }];
  assert.throws(() => createAppointment(existing, { patientId: 2, scheduleId: 10 }), /already booked/);
});

test('цуцлагдсан цагийг дахин захиалж болно', () => {
  const existing = [{ id: 1, patientId: 1, scheduleId: 10, status: 'cancelled' }];
  assert.strictEqual(isSlotTaken(existing, 10), false);
});

test('захиалга цуцлагдана', () => {
  const existing = [{ id: 1, patientId: 1, scheduleId: 10, status: 'confirmed' }];
  assert.strictEqual(cancelAppointment(existing, 1).status, 'cancelled');
});

test('шаардлагатай талбар дутвал алдаа гарна', () => {
  assert.throws(() => createAppointment([], { patientId: 1 }), /required/);
});

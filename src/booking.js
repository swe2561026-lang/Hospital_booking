// Цаг захиалгын үндсэн логик (2.0 Цаг захиалах процесс)

function isSlotTaken(appointments, scheduleId) {
  return appointments.some(
    (a) => a.scheduleId === scheduleId && a.status !== 'cancelled'
  );
}

function createAppointment(appointments, { patientId, scheduleId, reason }) {
  if (!patientId || !scheduleId) {
    throw new Error('patientId and scheduleId are required');
  }
  if (isSlotTaken(appointments, scheduleId)) {
    throw new Error('Slot already booked');
  }
  return {
    id: appointments.length + 1,
    patientId,
    scheduleId,
    reason: reason || '',
    status: 'confirmed',
  };
}

function cancelAppointment(appointments, id) {
  const found = appointments.find((a) => a.id === id);
  if (!found) {
    throw new Error('Appointment not found');
  }
  return { ...found, status: 'cancelled' };
}

module.exports = { isSlotTaken, createAppointment, cancelAppointment };

export function getAppointmentsForDay(state, day) {
  const result = [];
  const filteredAppointments = state.days.filter(d => d.name === day)

  if (filteredAppointments.length === 0){
    return [];
  }
  
  for (const appointment of filteredAppointments[0].appointments) {
    result.push(state.appointments[appointment]);
  }

  return result;
}
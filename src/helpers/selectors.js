export function getAppointmentsForDay(state, day) {
  const result = [];
  const filteredDays = state.days.filter(d => d.name === day);

  if (filteredDays.length === 0){
    return [];
  }
  
  for (const appointment of filteredDays[0].appointments) {
    result.push(state.appointments[appointment]);
  }

  return result;
}

export function getInterview(state, interview) {
 
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
};

export function getInterviewersForDay(state, day) {
  const result = [];

  const filteredDays = state.days.filter(d => d.name === day);
  if (!filteredDays[0]){
    return [];
  }

  for (const appointment of filteredDays[0].interviewers) {
    result.push(state.interviewers[appointment]);
  }
  return result;

};
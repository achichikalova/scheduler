import axios from "axios";
import { useEffect, useState } from "react";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Set day
  const setDay = day => setState(prev => ({ ...prev, day }));

  // Take data from the server to set up the initial state
  useEffect(() => {
    Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  // Add new interview in the appointments state and make the PUT request from server
  const bookInterview = (id, interview) => {
   
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`, { interview }).then(() => {
        axios.get(`/api/days`).then(res => {
          setState({
            ...state,
            appointments,
            days: res.data
          });
          resolve();
        });
      }).catch((err) => {
        console.error(err);
        reject();
      })
    });
  };

  //Deleting appointment from the appointments state and make DELETE request
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`).then(() => {
        axios.get(`/api/days`).then(res => {
          setState({
            ...state,
            appointments,
            days: res.data
          });
          resolve();
        });
      }).catch((err) => {
        console.error(err);
        reject();
      })
    });
  };
  
  
  return { state, setDay, bookInterview, cancelInterview };
  
}
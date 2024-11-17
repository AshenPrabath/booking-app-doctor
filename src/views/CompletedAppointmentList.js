// /views/AppointmentList.js
import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CompletedAppointmentList = () => {
  const appointments = useStoreState((state) => state.appointments);
  const fetchAppointments = useStoreActions((actions) => actions.fetchAppointments);
  const userId = localStorage.getItem('user_id');
  // console.log(userId);
  const navigate = useNavigate();
  useEffect(() => {
    
    if (userId) {
      fetchAppointments(userId);
    }
  }, [userId, fetchAppointments]);
  const handleCreateAppointment = () => {
    navigate('/create-appointment');
  };
  const completedAppointments = appointments.filter(appointment => appointment.status === 'completed');

  return (
    
    <Grid container spacing={3}>
    {/* Fixed "Create Appointment" button */}
  
      {completedAppointments.map((appointment) => (
        <Grid item xs={12} sm={6} md={4} key={appointment._id}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Pet: {appointment.pet.name} ({appointment.pet.type})
              </Typography>
              <Typography color="textSecondary">
                Owner: {appointment.user.name}
              </Typography>
              <Typography color="textSecondary">
                Doctor: {appointment.doctor.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {new Date(appointment.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Time: {appointment.timeSlot}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {appointment.status}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const styles = {
  createButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '15px 20px',
    fontSize: '18px',
    backgroundColor: '#3f51b5',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    zIndex: 1000,
  },
};


export default CompletedAppointmentList;

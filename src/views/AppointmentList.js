import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importing axios

const AppointmentList = () => {
  const appointments = useStoreState((state) => state.appointments);
  const fetchAppointments = useStoreActions((actions) => actions.fetchAppointments);
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchAppointments(userId);
    }
  }, [userId, fetchAppointments]);

  const handleCreateAppointment = () => {
    navigate('/create-appointment');
  };
  const getAuthToken = () => {
    return localStorage.getItem('token');  
  };
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === 'pending'
  );

  const handleUpdateStatus = async (appointmentId, status) => {

    try {
      const token = getAuthToken();
      const response = await axios.patch(
        'http://localhost:5001/api/appointments/update-status',
        {
          appointmentId,
          status,
        },{
          headers: {
            'Content-Type': 'application/json',  // Ensure correct content type
            'Authorization': 'Bearer ' + token,  // Add the Authorization header with Bearer token
          },
        }
      );

      if (response.status === 200) {
        // Refresh the appointments after status update
        fetchAppointments(userId);
        alert(`Appointment marked as ${status}`);
      } else {
        alert('Failed to update appointment status');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Error updating appointment status');
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Fixed "Create Appointment" button */}

      {pendingAppointments.map((appointment) => (
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

              {/* Accept/Decline buttons */}
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateStatus(appointment._id, 'confirmed')}
                  style={styles.actionButton}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleUpdateStatus(appointment._id, 'cancelled')}
                  style={styles.actionButton}
                >
                  Decline
                </Button>
              </div>
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
  actionButton: {
    margin: '5px',
  },
};

export default AppointmentList;

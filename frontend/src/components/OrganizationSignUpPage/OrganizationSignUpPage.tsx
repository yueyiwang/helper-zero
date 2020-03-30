// @ts-nocheck
import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import BasicInfoForm from './Steps/BasicInfoForm';
import DonationRequestForm from './Steps/DonationRequestForm';
import DonationMethodForm from './Steps/DonationMethodForm';
import ConfirmationPage from './Steps/ConfirmationPage';

const OrganizationSignUpPage = ({authToken}) => {
  const [formData, setFormData] = React.useState({});
  const [progress, setProgress] = React.useState(2);

  const handleNext = (data) => {
    setFormData({...formData, ...data});
    // url = models.CharField(max_length=120)
    // address = models.CharField(max_length=120)
    // description = models.CharField(max_length=120)
    // phone = models.CharField(max_length=120)
    // org_type = models.CharField(max_length=120)
    // email = models.EmailField()
    // is_dropoff = models.BooleanField()
    // is_pickup = models.BooleanField()
    // is_mail = models.BooleanField()
    // instructions = models.TextField(blank=True)
    // zipcode = models.CharField(blank=True, null=True, max_length=120)
    // lat = models.CharField(blank=True, null=True, max_length=120)
    // lon = models.CharField(blank=True, null=True, max_length=120)
    // auth_user_id=models.CharField(max_length=120)
    // pickup_times = models.TextField(blank=True, null=True)
    // dropoff_times = models.TextField(blank=True, null=True)
  
    if (progress === 2) {
      console.log("test")
      fetch('https://localhost:8000/api/organizations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'no-cors',
        },
        body: JSON.stringify({
          url: "",
          address: formData.addresss,
          description: "",
          phone: formData.phone,
          org_type: formData.organizationType,
          email: formData.email,
          is_dropoff: false,
          is_pickup: false,
          is_mail: false,
          instructions: "",
          zipcode: "",
          lat: "",
          lon: "",
          auth_user_id: "test",
          pickup_times: "",
          dropoff_times: "",
       })
      })
        .then(response => response.json())
        .then(data => console.log(data));
    }
    setProgress(progress+1);
  }

  const handleBack = () => {
    setProgress(progress-1);
  }

  return (
    <>
      {/* TODO: add Header component */}
      <Container maxWidth="lg">
        <Box m={6}>
          <Typography variant="h1">
            Create Profile
          </Typography>
          {/* TODO Progress Bar */}

          {progress === 0 && (
            <BasicInfoForm onNext={handleNext} onBack={handleBack}/>
          )}
          {progress === 1 && (
            <DonationRequestForm onNext={handleNext} onBack={handleBack}/>
          )}
          {progress === 2 && (
            <DonationMethodForm onNext={handleNext} onBack={handleBack}/>
          )}
          {progress === 3 && (
            <ConfirmationPage />
          )}
        </Box>
      </Container>
    </>
  );
}

export default OrganizationSignUpPage;

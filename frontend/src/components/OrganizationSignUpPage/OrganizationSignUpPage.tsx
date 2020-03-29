import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import BasicInfoForm from './Steps/BasicInfoForm';
import DonationRequestForm from './Steps/DonationRequestForm';
import DeliveryMethodForm from './Steps/DeliveryMethodForm';
import ConfirmationPage from './Steps/ConfirmationPage';

const OrganizationSignUpPage = () => {
  const [formData, setFormData] = React.useState({});
  const [progress, setProgress] = React.useState(0);

  const handleNext = (data) => {
    setFormData({...formData, ...data});
    setProgress(progress+1);

    if (progress === 3) {
      // Make a request to backend using form data
    }
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
            <DeliveryMethodForm onNext={handleNext} onBack={handleBack}/>
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
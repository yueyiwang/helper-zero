// @ts-nocheck
import React, {useState, useEffect} from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from "axios";

import BasicInfoForm from './Steps/BasicInfoForm';
import DonationRequestForm from './Steps/DonationRequestForm';
import DonationMethodForm from './Steps/DonationMethodForm';
import ConfirmationPage from './Steps/ConfirmationPage';

import { DELIVERY_TYPE_DROP_OFF, DELIVERY_TYPE_PICK_UP, DELIVERY_TYPE_MAIL } from "../../constants";

const OrganizationSignUpPage = ({authToken}) => {
  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress === 3) {
      axios.post('/api/organizations/', {
        name: formData.organizationName,
        url: null, //not supported 
        address: formData.address,
        description: null, //not supported 
        phone: formData.phone,
        org_type: formData.organizationType,
        email: formData.email,
        is_pickup: formData.methods.indexOf(DELIVERY_TYPE_PICK_UP) > 1,
        is_dropoff: formData.methods.indexOf(DELIVERY_TYPE_DROP_OFF)  > 1,
        is_mail: formData.methods.indexOf(DELIVERY_TYPE_MAIL)  > 1,
        pickup_instructions: formData[DELIVERY_TYPE_PICK_UP].instruction,
        dropoff_instructions: formData[DELIVERY_TYPE_DROP_OFF].instruction,
        mail_instructions: formData[DELIVERY_TYPE_MAIL].instruction,
        zipcode: "94114", //TODO: need address -> geocode
        lat: "1.3",
        lon: "2.0",
        pickup_times: JSON.stringify(formData[DELIVERY_TYPE_MAIL].times),
        dropoff_times: JSON.stringify(formData[DELIVERY_TYPE_DROP_OFF].times),
        auth_token: authToken,
      });
    }
  }, [progress]);
  
  const handleNext = async (data) => {
    setFormData({...formData, ...data});
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

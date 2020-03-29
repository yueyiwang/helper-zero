import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PeopleOutlined from '@material-ui/icons/PeopleOutlined';
import DriveEtaOutlined from '@material-ui/icons/DriveEtaOutlined';
import TextField from '@material-ui/core/TextField';

import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';

export default function OrganizationFormForm() {
  const [formData, setFormData] = React.useState({
    organizationName: '',
    organizationType: '',
    streetAdderss: '',
    city: '',
    name: '',
    phone: '',

  });
  const [progress, setProgress] = React.useState(1);

  return (
    <>
      {/* TODO: add Header component */}
      <Container maxWidth="lg">
        <Box m={6}>
          <Typography variant="h1">
            Create Profile
          </Typography>
          {/* TODO Progress Bar */}
        </Box>

        {progress === 0 && (
          <Step1 />
        )}
        {progress === 1 && (
          <Step2 />
        )}
        {progress === 2 && (
          <Step3 />
        )}
        {progress === 3 && (
          <Step4 />
        )}
        <Box m={6}>
          <Button size="large" variant="outlined" color="primary" onClick={()=> setProgress(progress+1)}>
            Next
          </Button>
          
          <Button size="large" variant="outlined" color="primary" disabled={progress==0} onClick={()=> setProgress(progress-1)}>
            Back
          </Button>
        </Box>
      </Container>
    </>
  );
}

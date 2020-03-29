import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Divider, Button, FormControl, Input, FormHelperText } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PeopleOutlined from '@material-ui/icons/PeopleOutlined';
import DriveEtaOutlined from '@material-ui/icons/DriveEtaOutlined';
import TextField from '@material-ui/core/TextField';
import GoogleLogin from 'react-google-login';


const styles: { [key: string]: React.CSSProperties } = {
  icon: {
    verticalAlign: "bottom",
  },
  buttonBox: {
    justifyContent: "space-between",
  },
  button: {
    padding: "10px",
    width: "200px",
    marginRight: "50px",
  }
};

export default function ReceiverSignUpPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const onLoginSuccess = (response) => {
    setIsLoggedIn(true);
    console.log(isLoggedIn);
  }

  const onLoginFailure = (response) => {
    return;
  }

  return (
    <>
      {/* TODO: add Header component */}
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs lg={7}>
            <Box m={6}>
              <Box pb={5}>
                <Typography color="textPrimary" variant="h1">
                  How does this work?
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                  If you are a hospital or a homeless shelter, help your community help you by crowd sourcing resources like medical supplies, food, and donations.
                </Typography>
              </Box>
              <Box pb={5}>
                <Typography color="textPrimary" variant="h2">
                  <PeopleOutlined fontSize="large" style={styles.icon}/>
                  {' '}
                  Create a request profile  
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                  Create a profile requesting an amount of supplies from your community. We’ll first verify your organization, then publish your requests live. 
                </Typography>
              </Box>
              <Box pb={8}>
                <Typography color="textPrimary" variant="h2">
                  <DriveEtaOutlined fontSize="large" style={styles.icon}/>
                  {' '}
                  Receive drop-offs or pick-up donations
                </Typography>
                <Typography color="textSecondary" variant="body1" style={styles.subTitle}>
                  You can then either choose whether you would like to pick-up donations near you or receive scheduled drop-offs.
                </Typography>
              </Box>
              <Box style={styles.buttonBox}>
                <GoogleLogin 
                  clientId="650902157032-v1gqmd903sedgmdrpd0goa1343b049ug.apps.googleusercontent.com"
                  onSuccess={onLoginSuccess}
                  onFailure={onLoginFailure}
                  cookiePolicy={'single_host_origin'}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PeopleOutlined from '@material-ui/icons/PeopleOutlined';
import DriveEtaOutlined from '@material-ui/icons/DriveEtaOutlined';
import GoogleLogin from 'react-google-login';
import axios from "axios";
import { Redirect } from "react-router-dom";

import { OrganizationType } from '../../types/OrganizationType';



const styles: { [key: string]: React.CSSProperties } = {
  icon: {
    verticalAlign: "bottom",
  },
  buttonBox: {
    width: "50%",
    display: "block",
  },
  button: {
    marginBottom: "20px",
  }
};

export default function ReceiverSignUpPage() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [organization, setOrganization] = useState<OrganizationType>();
  const [navigateToCreation, setNavigateToCreation] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<String>('');

  const onLoginSuccess = (response) => {
    const auth_token = response.uc.id_token;
    axios.get(`/api/login?auth_token=${auth_token}`).then(res => {
      if (res.status !== 200) {
        // Prompt user to create an account if their account does not exist.
        setNavigateToCreation(true);
      }
      const retrievedOrg: OrganizationType = {
        id: res.data.id,
        name: res.data.name,
        url: res.data.url,
        address: res.data.address,
        description: res.data.description,
        phone: res.data.phone,
        org_type: res.data.org_type,
        email: res.data.email,
        is_dropoff_only: res.data.is_dropoff_only,
        instructions: res.data.instructions,
        auth_user_id: res.data.auth_user_id,
        donation_requests: res.data.donation_requests,
        donations: res.data.donations,
      }
      setOrganization(retrievedOrg);
      setLoggedIn(true);
    })
  }

  const onLoginFailure = (response) => {
    // TODO: navigate to error page
    return;
  }

  const onCreateAccountSuccess = (response) => {
    const authToken = response.uc.id_token;
    setAuthToken(authToken);
    setNavigateToCreation(true);
  }

  const onCreateAccountFailure = (response) => {
    // TODO: navigate to error page
    setNavigateToCreation(true);
  }

  if (loggedIn) {
    console.log(organization);
    return <Redirect to={{
      pathname: "/organization/profile",
      state: { organization: organization },
     }} />
  } else if (navigateToCreation) {
    // TODO: navigate to creation flow, pass auth token
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
                <Box style={styles.button}>
                <GoogleLogin 
                  clientId="650902157032-v1gqmd903sedgmdrpd0goa1343b049ug.apps.googleusercontent.com"
                  onSuccess={onCreateAccountSuccess}
                  onFailure={onCreateAccountFailure}
                  cookiePolicy={'single_host_origin'}
                  buttonText="Create account with Google"
                  style={styles.button}
                  theme="dark"
                  responseType="code"
                />
                </Box>
                <GoogleLogin 
                  clientId="650902157032-v1gqmd903sedgmdrpd0goa1343b049ug.apps.googleusercontent.com"
                  onSuccess={onLoginSuccess}
                  onFailure={onLoginFailure}
                  cookiePolicy={'single_host_origin'}
                  buttonText="Sign in with Google"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
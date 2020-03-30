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
import { DonationType } from '../../types/DonationType';
import { DonationRequestType } from '../../types/DonationRequestType';
import Header from "../Header";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex"
  },
  contentContainer: {
    marginTop: "128px",
    width: "100%"
  },
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

const convertDonations = (donations): DonationType[] => {
  const ret: DonationType[] = [];
  donations.forEach((d) => {
    const donation: DonationType = {
      org_id: d.org,
      name: d.name,
      phone: d.phone,
      email: d.email,
      status: d.status,
      item: d.item,
      amount: d.amount,
      created_at: d.created_at,
      city: d.city,
      pickup_address: d.pickup_address,
      delivery_type: d.delivery_type,
      pickup_or_dropoff_times: d.pickup_or_dropoff_times
    }
    ret.push(donation);
  })
  return ret;
}

const convertDonationRequests = (donationRequests): DonationRequestType[] => {
  const ret: DonationRequestType[] = [];
  donationRequests.forEach((dr) => {
    const donationRequest: DonationRequestType = {
      org_id: dr.org,
      item_type: dr.item_type,
      item: dr.item,
      amount_requested: dr.amount_requested,
      amount_received: dr.amount_received,
    }
    ret.push(donationRequest)
  })
  return ret;
}

export default function OrganizationSignUpPage() {
  const [navigateToProfile, setNavigateToProfile] = useState<boolean>(false);
  const [navigateToCreation, setNavigateToCreation] = useState<boolean>(false);
  const [organization, setOrganization] = useState<OrganizationType>();
  const [authToken, setAuthToken] = useState<String>('');
  const [error, setError] = useState<boolean>(false);

  const onSuccess = (response) => {
    const authToken = response.uc.id_token;
    setAuthToken(authToken);
    axios.get(`/api/login/?auth_token=${authToken}`).then(res => {
      console.log(res);
      if (res.status !== 200) {
        setError(true);
      } else if (res.data.id === undefined) {
        setNavigateToCreation(true);
      } else {
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
            donation_requests: convertDonationRequests(res.data.donation_requests),
            donations: convertDonations(res.data.donations),
        }
        setOrganization(retrievedOrg);
        setNavigateToProfile(true);
      }
    })
  }

  const onFailure = (response) => {
    setError(true);
  }

  if (navigateToProfile) {
    return <Redirect to={{
      pathname: "/organization/profile",
      state: { organization: organization },
     }} />
  } else if (navigateToCreation) {
    // TODO: navigate to creation flow, pass auth token
    return null;
  }
  return (
    <>
      <div style={styles.container}>
        <Header isWhiteBackground />
        <div style={styles.contentContainer}>
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs lg={7}>
                <Box m={6}>
                  <Box pb={5}>
                    <Typography color="primary" variant="h1">
                      How does this work?
                    </Typography>
                    <Typography color="primary" variant="subtitle1">
                      If you are a hospital or a homeless shelter, help your community help you by crowd sourcing resources like medical supplies, food, and donations.
                    </Typography>
                  </Box>
                  <Box pb={5}>
                    <Typography color="primary" variant="h2">
                      <PeopleOutlined fontSize="large" style={styles.icon}/>
                      {' '}
                      Create a request profile  
                    </Typography>
                    <Typography color="primary" variant="subtitle1">
                      Create a profile requesting an amount of supplies from your community. We’ll first verify your organization, then publish your requests live. 
                    </Typography>
                  </Box>
                  <Box pb={8}>
                    <Typography color="primary" variant="h2">
                      <DriveEtaOutlined fontSize="large" style={styles.icon}/>
                      {' '}
                      Receive drop-offs or pick-up donations
                    </Typography>
                    <Typography color="primary" variant="body1" style={styles.subTitle}>
                      You can then either choose whether you would like to pick-up donations near you or receive scheduled drop-offs.
                    </Typography>
                  </Box>
                  <Box style={styles.buttonBox}>
                    {error && (
                      <Typography color="error">An error has occurred. Please try again.</Typography>
                    )}
                    <Box style={styles.button}>
                      <GoogleLogin 
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        buttonText="Create account with Google"
                        theme="dark"
                      />
                    </Box>
                    <GoogleLogin 
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy={'single_host_origin'}
                      buttonText="Sign in with Google"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
}
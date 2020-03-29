import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import { Typography, Box } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import { OrganizationType, DonationRequestType } from '../../types/OrganizationType';
import { render } from "@testing-library/react";

const styles = {
  container: {
    display: "flex",
    padding: "100px",
  }
}

const organization: OrganizationType = {
  name: "vicky",
  id: 1,
  phone: "1234567890",
  email: "fake@email.com",
  isDropoffOnly: false,
  instructions: "random instructions",
  accessToken: "12345",
  orgType: "myself",
};

const donationRequests: Array<DonationRequestType> = [
  {
    id: 1,
    orgId: 2,
    itemType: "toilet",
    amountRequested: 213,
    amountReceived: 123,
  },
];

type Props  = {
  organization: OrganizationType;
  donationRequests: Array<DonationRequestType>;
}

const OrganizationProfilePage: React.FC = () => {
  const 

  return (
      <Container maxWidth="lg" style={styles.container}>
      <Box>
        <Typography variant="h2">{organization.name}</Typography>
        <Box>
          <Typography color="textPrimary" variant="h3">{donationRequests</Typography>
        </Box>
      </Box>
    </Container>
  );
}

);

export default OrganizationProfilePage


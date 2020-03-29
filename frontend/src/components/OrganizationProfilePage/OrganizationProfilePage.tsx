import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import { Typography, Box } from "@material-ui/core";

import { OrganizationType } from '../../types/OrganizationType';

const styles = {
  container: {
    display: "flex",
    padding: "100px",
  }
}

type Props = {
  location: {
    state: {
      organization: OrganizationType;
    };
  };
}

const OrganizationProfilePage: React.FC<Props> = (props: Props) => {
  return (
      <Container maxWidth="lg" style={styles.container}>
      <Box>
        <Typography variant="h2">{props.location.state.organization.name}</Typography>
        <Box>
          <Typography color="textPrimary" variant="h3">10</Typography>
        </Box>
      </Box>
    </Container>
  );
}


export default OrganizationProfilePage


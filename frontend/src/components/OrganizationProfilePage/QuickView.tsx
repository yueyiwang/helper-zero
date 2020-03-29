import React from "react";
import { Typography, Box } from "@material-ui/core";

import Donation from './Donation';
import { OrganizationType } from '../../types/OrganizationType';

const styles = {
  donations: {
    display: "inline-block",
  },
  donationsText: {
    width: "20%",
    paddingLeft: "20px",
  },
  donationsBox: {
    marginRight: "20px",
    marginTop: "20px",
  },
  allDonationsBox: {
    marginTop: "70px",
  },
}


type Props = {
  organization?: OrganizationType;
}

const QuickView: React.FC<Props> = (props: Props) => {
  return(
    <>
    <Box>
      {/* todo: set props for donation amounts */}
      <Box style={{...styles.donations, ...styles.donationsBox}}>
        <Typography style={styles.donations} variant="h1" color="primary">10</Typography>
        <Typography style={{...styles.donations, ...styles.donationsText}} color="primary">Scheduled Donations</Typography>
      </Box>
      <Box style={{...styles.donations, ...styles.donationsBox}}>
        <Typography style={styles.donations} variant="h1" color="primary">14</Typography>
        <Typography style={{...styles.donations, ...styles.donationsText}}>Confirmed Donations</Typography>
      </Box>
    </Box>
    <Box style={styles.allDonationsBox}>
      <Typography variant="h2">All Donations</Typography>
      {/* Todo: map over all props */}
      <Donation
      />
    </Box>
  </>
  )
}

export default QuickView;

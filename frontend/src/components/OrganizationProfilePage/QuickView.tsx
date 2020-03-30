import React from "react";
import { Typography, Box } from "@material-ui/core";

import DonationRequest from './DonationRequest';
import { DonationRequestType } from "../../types/DonationRequestType";
import { DonationType } from "../../types/DonationType";

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
  donations: DonationType[];
  donationRequests: DonationRequestType[];
}

const QuickView: React.FC<Props> = (props: Props) => {
  const calcDonationsValue = (status: string) => {
    const donations = props.donations.filter((donation) => {
      return donation.status == status;
    });
    return donations.length;
  }
  return(
    <>
    <Box>
      <Box style={{...styles.donations, ...styles.donationsBox}}>
        <Typography style={styles.donations} variant="h1" color="primary">{calcDonationsValue("incomplete")}</Typography>
        <Typography style={{...styles.donations, ...styles.donationsText}} color="primary">Scheduled Donations</Typography>
      </Box>
      <Box style={{...styles.donations, ...styles.donationsBox}}>
        <Typography style={styles.donations} variant="h1" color="primary">{calcDonationsValue("complete")}</Typography>
        <Typography style={{...styles.donations, ...styles.donationsText}}>Confirmed Donations</Typography>
      </Box>
    </Box>
    <Box style={styles.allDonationsBox}>
      <Typography variant="h2">All Donations</Typography>
      {props.donationRequests.map((donationRequest) => <DonationRequest donationRequest={donationRequest}/>)}
    </Box>
  </>
  )
}

export default QuickView;

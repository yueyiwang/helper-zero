import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import { Typography, Box } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { OrganizationType } from '../../types/OrganizationType';

const styles = {
  requestBox: {
    marginTop: "20px",
    width: "500px",
  },
}

const EditTextField = withStyles({
  root: {
    '& .MuiInputBase-root': {
      color: "black",
      height: "100%",
      alignItems: "stretch",
    },
    '.MuiOutlinedInput-inputMultiline': {
      height: "100%",
    },
  },
})(TextField);

type Props = {
  organization: OrganizationType;
}

const OrganizationSettings: React.FC<Props> = (props: Props) => {
  const instructions: string = 
    `Pickup Instructions: ${props.organization.pickup_instructions}\n
    Dropoff Instructions: ${props.organization.dropoff_instructions}\n
    Mail Instructions: ${props.organization.mail_instructions}`
  
  const [editingRequest, setEditingRequest] = useState<boolean>(false);
  const [donationRequest, setDonationRequest] = useState<string>(instructions);
  
  const handleChange = (event) => {
    setDonationRequest(event.target.value);
  };
  
  return (
    <Container>
      <Box style={styles.requestBox}>
        <Typography variant="h2" style={{"display": "inline-block"}}>Your Request</Typography>
        <IconButton
          style={{"display": "inline-block", "marginTop": "-10px"}}
          onClick={() => setEditingRequest(true)}
        >
          <EditIcon />
        </IconButton>
        {editingRequest ? 
          <EditTextField
            multiline
            rows="10"
            style={{"width": "100%", "height": "300px"}}
            variant="outlined"
            color="primary"
            onChange={handleChange}
            defaultValue={donationRequest}
          >
          </EditTextField>
        : 
          <Typography>
            {donationRequest}
          </Typography>
        }
        {editingRequest && (
          <Button
            variant="outlined"
            style={{"float": "right", "marginTop": "20px"}}
            color="primary"
            onClick={() => setEditingRequest(false)}
          >
            Save
          </Button>
        )}
      </Box>
    </Container>
  )
}

export default OrganizationSettings;
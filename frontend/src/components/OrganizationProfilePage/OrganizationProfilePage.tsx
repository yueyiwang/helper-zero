import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import { Typography, Box } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { OrganizationType } from '../../types/OrganizationType';

const styles = {
  container: {
    display: "flex",
    padding: "100px",
  },
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
  progressBox: {
    marginTop: "50px",
    width: "750px",
  },
  requestBox: {
    marginTop: "100px",
    width: "500px",
  }
}

const BorderLinearProgress = withStyles({
  root: {
    height: 20,
    backgroundColor: "lightblue",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "green",
  },
})(LinearProgress);

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
  location: {
    state: {
      organization: OrganizationType;
    };
  };
}

const OrganizationProfilePage: React.FC<Props> = (props: Props) => {
  const [editingRequest, setEditingRequest] = useState<boolean>(false);
  const [donationRequest, setDonationRequest] = useState<string>(props.location.state.organization.instructions);

  const progressBar = (currValue: number, expectedValue: number) => {
    const normalise = value => value * 100 / expectedValue;
    return (
      <BorderLinearProgress
          variant="determinate"
          value={normalise(currValue)}
        />
    )
  }

  const handleChange = (event) => {
    setDonationRequest(event.target.value);
  };

  return (
    <Container maxWidth="lg" style={styles.container}>
      <Box>
        {/* todo: set props for organization */}
        <Typography variant="h1" color="primary">Organization</Typography>
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
        {/* Todo: map over all props */}
        <Box style={styles.progressBox}>
          <Box style={{"paddingBottom": "30px"}}>
            <Typography style={{"float": "left"}}>Masks</Typography>
            <Typography style={{"float": "right"}}>10/200</Typography>
          </Box>
          {progressBar(10, 200)}
        </Box>
        <Box style={styles.progressBox}>
          <Box style={{"paddingBottom": "30px"}}>
            <Typography style={{"float": "left"}}>Masks</Typography>
            <Typography style={{"float": "right"}}>10/200</Typography>
          </Box>
          {progressBar(10, 200)}
        </Box>
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
              // todo: set default value to 
              defaultValue={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec fermentum tellus. Nulla vel tellus arcu. Nullam vehicula elit non dui egestas convallis. Morbi ut ante ac turpis faucibus hendrerit sollicitudin ac sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam vehicula accumsan sem eu tincidunt. Nulla facilisi. Morbi pulvinar vestibulum massa, non mattis nunc. \
                Quisque condimentum, lacus eu facilisis tempus, lacus elit euismod justo, eu molestie odio purus ut erat. Maecenas auctor orci scelerisque, vehicula velit sed, consequat lacus. Cras imperdiet justo porttitor lectus tincidunt gravida. Vestibulum ac justo dignissim, posuere sapien eget, rhoncus tellus. Ut a lectus ac nulla consectetur ullamcorper sed consequat leo. Nulla facilisi. In elementum magna nec vehicula iaculis. Integer ultricies justo quis lorem euismod condimentum."}
            >
            </EditTextField>
          : 
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec fermentum tellus. Nulla vel tellus arcu. Nullam vehicula elit non dui egestas convallis. Morbi ut ante ac turpis faucibus hendrerit sollicitudin ac sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam vehicula accumsan sem eu tincidunt. Nulla facilisi. Morbi pulvinar vestibulum massa, non mattis nunc.
              Quisque condimentum, lacus eu facilisis tempus, lacus elit euismod justo, eu molestie odio purus ut erat. Maecenas auctor orci scelerisque, vehicula velit sed, consequat lacus. Cras imperdiet justo porttitor lectus tincidunt gravida. Vestibulum ac justo dignissim, posuere sapien eget, rhoncus tellus. Ut a lectus ac nulla consectetur ullamcorper sed consequat leo. Nulla facilisi. In elementum magna nec vehicula iaculis. Integer ultricies justo quis lorem euismod condimentum.
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
      </Box>
    </Container>
  );
}


export default OrganizationProfilePage


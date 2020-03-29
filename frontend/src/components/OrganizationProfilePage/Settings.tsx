import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import { Typography, Box } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

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

}

const OrganizationSettings: React.FC<Props> = (props: Props) => {
  const [editingRequest, setEditingRequest] = useState<boolean>(false);
  // todo: replace with prop
  const [donationRequest, setDonationRequest] = useState<string>("");
  
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
    </Container>
  )
}

export default OrganizationSettings;
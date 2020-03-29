import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button, FormControlLabel, Checkbox, FormGroup } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PeopleOutlined from '@material-ui/icons/PeopleOutlined';
import DriveEtaOutlined from '@material-ui/icons/DriveEtaOutlined';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Popover from '@material-ui/core/Popover';

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    marginRight: 10,
    marginBottom: 10,
  },
  textarea: {
    border: "1px solid #718AA8",
    boxSizing: "border-box",
    borderRadius: 6,
  },
  boxShadow: {
    
  }
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Step2() {
  const [pickup, setPickup] = React.useState(false);
  const [delivery, setDelivery] = React.useState(false);
  const [mail, setMail] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box m={6}>
        <Typography variant="h2">
          Perferred Delivery Method
        </Typography>
        <Typography variant="body1">
          How would you like to receive your donations?
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={pickup} onChange={() => setPickup(!pickup)} name="pickup" />}
            label="Pick-up at donator’s location"
          />
          <FormControlLabel
            control={<Checkbox checked={delivery} onChange={() => setDelivery(!delivery)} name="delivery" />}
            label="Receive drop-offs at designated location"
          />
          <FormControlLabel
            control={<Checkbox checked={mail} onChange={() => setMail(!mail)} name="mail" />}
            label="Receive mailed deliveries"
          />
        </FormGroup>
      </Box>
      <Box m={6}>
        <Typography variant="h2">
          Delivery Details
        </Typography>
        <Box mt={3}>
          <Typography variant="h3">
            Drop-off Instructions
          </Typography>
          <Typography variant="body1">
            Tell your donators how you would like them to drop off their donations. 
          </Typography>
          <Box pt={2}>
            <textarea rows={5} cols={100} style={styles.textarea} onChange={(e)=>console.log(e)}/>
          </Box>
        </Box>
        <Box mt={4}>
          <Typography variant="body1">
            Create a drop-off windows for when you want donators to drop-off donations. 
          </Typography>
          <Box pt={3}>
            <Typography variant="h4">
              Select Available Days
            </Typography>
            <Box pt={2}>
              {days.map(day => (
                <>
                  <Button variant="outlined" onClick={handleClick} style={styles.button}>
                    {day}
                  </Button>
                  <Popover
                    id={day}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Box p={2}>
                      <Typography variant="body1">
                        Add Times
                      </Typography>
                      <Box pt={2}>
                        <textarea rows={5} cols={30} style={styles.textarea} onChange={(e)=>console.log(e)}/>
                      </Box>
                      <Box style={{textAlign: 'right'}}>
                        <Button onChange={(e)=>console.log(e)}>
                          Save
                        </Button>
                      </Box>
                    </Box>
                  </Popover>
                </>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PeopleOutlined from '@material-ui/icons/PeopleOutlined';
import DriveEtaOutlined from '@material-ui/icons/DriveEtaOutlined';
import TextField from '@material-ui/core/TextField';

export default function Step1() {
  return (
    <Grid container>
      <Grid item xs lg={5}>
        <Box m={6}>
          <Typography variant="h2">
            Organization
          </Typography>
          <TextField
            id="organization_name"
            helperText="Organization Name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="organization_type"
            helperText="Organization Type"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="street_address"
            helperText="Street Address"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="city"
            helperText="City"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box m={6}>
          <Typography variant="h2">
            Contact Information
          </Typography>
          <Typography variant="body1">
            Let us know how to send you instructions on how to drop off your donations. 
          </Typography>
          <TextField
            id="name"
            helperText="First and Last Name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="phone"
            helperText="Phone number"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

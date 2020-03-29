import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {
  Divider,
  Button,
  FormControl,
  Input,
  FormHelperText
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PeopleOutlined from "@material-ui/icons/PeopleOutlined";
import DriveEtaOutlined from "@material-ui/icons/DriveEtaOutlined";
import TextField from "@material-ui/core/TextField";
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
    verticalAlign: "bottom"
  }
};

export default function ReceiverSignUpPage() {
  return (
    <>
      {/* TODO: add Header component */}
      <div style={styles.container}>
        <Header isWhiteBackground />
        <div style={styles.contentContainer}>
          <Container maxWidth="lg">
            <Grid container spacing={6}>
              <Grid item xs>
                <Box m={6}>
                  <Box pb={5}>
                    <Typography color="primary" variant="h1">
                      How does this work?
                    </Typography>
                    <Typography color="primary" variant="subtitle1">
                      If you are a hospital or a homeless shelter, help your
                      community help you by crowd sourcing resources like
                      medical supplies, food, and donations.
                    </Typography>
                  </Box>
                  <Box pb={5}>
                    <Typography color="primary" variant="h2">
                      <PeopleOutlined fontSize="large" style={styles.icon} />{" "}
                      Create a request profile
                    </Typography>
                    <Typography color="primary" variant="subtitle1">
                      Create a profile requesting an amount of supplies from
                      your community. We’ll first verify your organization, then
                      publish your requests live.
                    </Typography>
                  </Box>
                  <Box pb={8}>
                    <Typography color="primary" variant="h2">
                      <DriveEtaOutlined fontSize="large" style={styles.icon} />{" "}
                      Receive drop-offs or pick-up donations
                    </Typography>
                    <Typography
                      color="primary"
                      variant="body1"
                      style={styles.subTitle}
                    >
                      You can then either choose whether you would like to
                      pick-up donations near you or receive scheduled drop-offs.
                    </Typography>
                  </Box>
                  <Button size="large" variant="outlined" color="secondary">
                    Create Profile
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box m={6}>
                  <Paper variant="outlined">
                    <Box p={3}>
                      <Typography color="primary" variant="h2">
                        Returning User
                      </Typography>
                      <TextField
                        id="username"
                        helperText="Username"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        color="primary"
                      />
                      <TextField
                        id="password"
                        helperText="Password"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <Box pt={2} style={{ textAlign: "right" }}>
                        <Button
                          size="large"
                          variant="outlined"
                          color="secondary"
                        >
                          Login
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
}

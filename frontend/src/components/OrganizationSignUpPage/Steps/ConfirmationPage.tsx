import React, {useState} from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PeopleOutlined from '@material-ui/icons/PeopleOutlined';
import DriveEtaOutlined from '@material-ui/icons/DriveEtaOutlined';
import TextField from '@material-ui/core/TextField';
import Header from '../../Header';
import { OrganizationType } from "../../../types/OrganizationType";
import { Redirect } from "react-router-dom";

const styles: { [key: string]: React.CSSProperties } = {
  headerTitle: {
    
  },
};


const ConfirmationPage = (props) => {

  const [redirect, setRedirect] = useState<boolean>(false);
  if (redirect) {
    return (
      <Redirect 
      to={{
        pathname: "/organization/profile",
        state: { organization: props.location.state.organization }
      }}
    />
    )
  }
  
  return (
    <>
    <Header isWhiteBackground={true}/>
    <Grid container style={{"padding": "150px"}}>
      <Grid item xs lg={5}>
          <Typography variant="h2">
            Thank you for your request, {props.location.state.organization.name}.
            Go to your 
            <Button style={{"marginTop": "12px", "paddingLeft": "0", "paddingRight": "0"}}onClick={() => setRedirect(true)}><Typography variant="h2" color="secondary">profile</Typography></Button>.
          </Typography>
          {/* TODO */}
          <Typography variant="body1">
            We are working quickly to review your request and will make your profile live. In the meanwhile, please confirm your contact by verifying your account by through the activation email we sent you (?).
          </Typography>
      </Grid>
    </Grid>
    </>
  );
}

export default ConfirmationPage;

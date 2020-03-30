// @ts-nocheck
import React, {useState, useEffect} from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from "axios";
import { Redirect } from "react-router-dom";


import BasicInfoForm from './Steps/BasicInfoForm';
import DonationRequestForm from './Steps/DonationRequestForm';
import DonationMethodForm from './Steps/DonationMethodForm';
import ConfirmationPage from './Steps/ConfirmationPage';
import Header from '../Header';
import { convertDataToOrg } from '../../utils';

import { DELIVERY_TYPE_DROP_OFF, DELIVERY_TYPE_PICK_UP, DELIVERY_TYPE_MAIL } from "../../constants";

type Props = {
  location: {
    state: {
      authToken: string;
    };
  };
};

const OrganizationSignUpPage: React.FC<Props> = (props: Props) => {
  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(0);
  const [organization, setOrganization] = useState<OrganizationType>();

  useEffect(() => {
    if (progress === 3) {
      axios.post('/api/organizations/', organization).then((resp) => {
        if (resp.status != 200) {
          console.log(resp);
        }
        console.log(resp);
        const orgData = resp.data;
        const organization = convertDataToOrg(orgData);
        setOrganization(organization);
        formData.donationSelected.forEach(donationType => {
          const dontations = formData[donationType];
          Object.entries(dontations).forEach(([itemName, itemCount]) => {
            const donationRequest = {
              org: 1, //TODO change org to real value
              item: itemName,
              item_type: donationType,
              amount_requested: Number(itemCount),
              amount_received: 0,
            };
            axios.post('/api/donation_requests/', donationRequest)
              .then((resp) => {
                if (resp.status != 200) {
                  console.log(resp);
                }
                setOrganization(convertDataToOrg(resp.data));
              })
          });
        })
      });
    }
  }, [progress]);
  
  const handleNext = async (data) => {
    setFormData({...formData, ...data});
    setProgress(progress+1);
  }

  const handleBack = () => {
    setProgress(progress-1);
  }

  if (organization != undefined) {
    return (
    <Redirect 
      to={{
        pathname: "/organization/confirmation",
        state: { organization: organization, authToken: props.location.state.authToken }
      }}
      />
    )
  }

  return (
    <>
      <Header isWhiteBackground={true} />
      <Container maxWidth="lg" style={{"padding": "100px"}}>
        <Box m={6}>
          <Typography variant="h1">
            Create Profile
          </Typography>
          {/* TODO Progress Bar */}

          {progress === 0 && (
            <BasicInfoForm onNext={handleNext} onBack={handleBack}/>
          )}
          {progress === 1 && (
            <DonationRequestForm onNext={handleNext} onBack={handleBack}/>
          )}
          {progress === 2 && (
            <DonationMethodForm onNext={handleNext} onBack={handleBack}/>
          )}
        </Box>
      </Container>
    </>
  );
}

export default OrganizationSignUpPage;

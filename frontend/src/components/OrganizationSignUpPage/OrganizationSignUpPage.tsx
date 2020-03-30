// @ts-nocheck
import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { Redirect } from "react-router-dom";

import BasicInfoForm from "./Steps/BasicInfoForm";
import DonationRequestForm from "./Steps/DonationRequestForm";
import DonationMethodForm from "./Steps/DonationMethodForm";
import ConfirmationPage from "./Steps/ConfirmationPage";
import Header from "../Header";
import { convertDataToOrg } from "../../utils";

import { OrganizationType } from "../../types/OrganizationType";
import {
  DELIVERY_TYPE_DROP_OFF,
  DELIVERY_TYPE_PICK_UP,
  DELIVERY_TYPE_MAIL
} from "../../constants";

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

  const handleNext = async data => {
    if (progress === 2) {
      const finalFormData = {
        ...formData,
        ...data
      };
      const organization: OrganizationType = {
        name: finalFormData.organizationName,
        url: null, //not supported
        address: finalFormData.address,
        description: null, //not supported
        phone: finalFormData.phone,
        org_type: finalFormData.organizationType,
        email: finalFormData.email,
        is_pickup: finalFormData.methods.includes(DELIVERY_TYPE_PICK_UP) > 0,
        is_dropoff: finalFormData.methods.includes(DELIVERY_TYPE_DROP_OFF) > 0,
        is_mail: finalFormData.methods.includes(DELIVERY_TYPE_MAIL) > 0,
        pickup_instructions: finalFormData[DELIVERY_TYPE_PICK_UP].instruction,
        dropoff_instructions: finalFormData[DELIVERY_TYPE_DROP_OFF].instruction,
        mail_instructions: finalFormData[DELIVERY_TYPE_MAIL].instruction,
        zipcode: finalFormData.zipcode,
        city: finalFormData.city,
        lat: "1.3", //TODO: need address -> lat
        lon: "2.0", //TODO: need address -> lon
        pickup_times: JSON.stringify(
          finalFormData[DELIVERY_TYPE_PICK_UP].times
        ),
        dropoff_times: JSON.stringify(
          finalFormData[DELIVERY_TYPE_DROP_OFF].times
        ),
        auth_token: props.location.state.authToken
      };
      axios.post("/api/organizations/", organization).then(resp => {
        if (resp.status != 200) {
          console.log(resp);
        }

        const orgData = resp.data;
        const organization = convertDataToOrg(orgData);

        let donationRequests = [];
        // dontaion request items
        formData.donationSelected.forEach(donationType => {
          const dontations = formData[donationType];
          Object.entries(dontations).forEach(([itemName, itemCount]) => {
            const donationRequest = {
              org: organization.id,
              item: itemName,
              item_type: donationType,
              amount_requested: Number(itemCount),
              amount_received: 0
            };
            axios
              .post("/api/donation_requests/", donationRequest)
              .then(resp => {
                if (resp.status != 200) {
                  console.log(resp);
                }
                donationRequests.push(donationRequest);
              });
          });
        });
        setOrganization({
          ...organization,
          donation_requests: donationRequests
        });
      });
    } else {
      setFormData({ ...formData, ...data });
      setProgress(progress + 1);
    }
  };

  const handleBack = () => {
    setProgress(progress - 1);
  };

  if (organization != undefined) {
    return (
      <Redirect
        to={{
          pathname: "/organization/confirmation",
          state: {
            organization: organization,
            authToken: props.location.state.authToken
          }
        }}
      />
    );
  }

  return (
    <>
      <Header isWhiteBackground={true} />
      <Container maxWidth="lg" style={{ padding: "100px" }}>
        <Box m={6}>
          <Typography variant="h1">Create Profile</Typography>
          {/* TODO Progress Bar */}

          {progress === 0 && (
            <BasicInfoForm onNext={handleNext} onBack={handleBack} />
          )}
          {progress === 1 && (
            <DonationRequestForm onNext={handleNext} onBack={handleBack} />
          )}
          {progress === 2 && (
            <DonationMethodForm onNext={handleNext} onBack={handleBack} />
          )}
        </Box>
      </Container>
    </>
  );
};

export default OrganizationSignUpPage;

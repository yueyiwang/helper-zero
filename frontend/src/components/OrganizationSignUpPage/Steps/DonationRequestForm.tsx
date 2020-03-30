import React from "react";
import Typography from "@material-ui/core/Typography";
import { Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Form } from "react-final-form";
import { TextField, Checkboxes, CheckboxData } from "mui-rff";

import SelectorWithPopover from "./SelecterWithPopover";

const MEDICALSUPPLIES = "medical_supplies";
const TOILETRIES = "toiletries";
const FOOD = "food";

const DONATION_INFOS = {
  [MEDICALSUPPLIES]: {
    label: "Medical Supplies",
    donations: [
      {
        dontationType: "Protective Gear",
        donationItems: ["Masks", "Gloves", "Goggles", "Face Shields"]
      }
    ]
  },
  [TOILETRIES]: {
    label: "Toiletries",
    donations: [
      {
        dontationType: "Toiletries",
        donationItems: ["Toilet Paper", "Paper Towels"]
      }
    ]
  },
  [FOOD]: {
    label: "Food",
    donations: [
      {
        dontationType: "Dry Food",
        donationItems: ["Ramen", "Canned Goods"]
      }
    ]
  }
};

const checkboxForm: CheckboxData[] = [
  { label: "Medical Supplies", value: MEDICALSUPPLIES },
  { label: "Toiletries", value: TOILETRIES },
  { label: "Food", value: FOOD }
];

const DonationRequestForm = ({ onNext, onBack }) => {
  return (
    <Form
      onSubmit={onNext}
      initialValues={{
        donationSelected: [],
        [MEDICALSUPPLIES]: {},
        [TOILETRIES]: {},
        [FOOD]: {}
      }}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Typography variant="h2">Community Request</Typography>
          <Typography variant="body1">
            What kind of donations would you like to request from the community?
          </Typography>
          <Checkboxes
            name="donationSelected"
            required={true}
            data={checkboxForm}
          />
          {values.donationSelected.length > 0 && (
            <>
              {values.donationSelected.map(donationSelect => (
                <Box mt={3}>
                  <Typography variant="h3">
                    {DONATION_INFOS[donationSelect]["label"]}
                  </Typography>
                  <Box pt={1}>
                    {/* 
                      // @ts-ignore */}
                    {DONATION_INFOS[donationSelect]["donations"].map(
                      donation => (
                        <>
                          <Typography variant="h4">
                            {donation.dontationType}
                          </Typography>
                          {/* Selector Group */}
                          <Box pt={1}>
                            <Grid
                              container
                              direction="row"
                              justify="flex-start"
                              alignItems="flex-start"
                              spacing={1}
                            >
                              {donation.donationItems.map(donationItem => (
                                <Grid item>
                                  <SelectorWithPopover
                                    key={`${donationSelect}-${donationItem}`}
                                    text={donationItem}
                                    extraInfo={
                                      values[donationSelect][donationItem]
                                        ? values[donationSelect][donationItem]
                                        : ""
                                    }
                                    popoverTitle={donationItem}
                                    popOverContentComponent={
                                      <TextField
                                        name={`${donationSelect}.${donationItem}`}
                                        helperText={"Request Count"}
                                        fullWidth
                                        margin="normal"
                                      />
                                    }
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        </>
                      )
                    )}
                  </Box>
                </Box>
              ))}
            </>
          )}
          <Box mt={6}>
            <Button
              type="submit"
              size="large"
              variant="outlined"
              color="secondary"
            >
              Next
            </Button>
            {/* TODO: support back button */}
            {/* <Button size="large" variant="outlined" color="primary" onClick={onBack}>
              Back
            </Button> */}
          </Box>
        </form>
      )}
    />
  );
};

export default DonationRequestForm;

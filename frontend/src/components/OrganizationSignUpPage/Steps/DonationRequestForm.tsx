import React from "react";
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Form } from 'react-final-form';
import {
  TextField,
  Checkboxes,
  CheckboxData
} from 'mui-rff';

import SelectorWithPopover from './SelecterWithPopover';

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
};

const MEDICALSUPPLIES = 'medical_supplies';
const TOILETRIES = 'toiletries';
const FOOD = 'food';

const DONATION_INFOS = {
  [MEDICALSUPPLIES]: {
    label: 'Medical Supplies',
    requests: [{
      label: 'Protective Gear',
      requestTypes: ['n95 Respirators', 'Gloves', 'Goggles', 'Face Shields'],
    }]
  },
  [TOILETRIES]: {
    label: 'Toiletries',
    requests: [{
      label: 'Toiletries',
      requestTypes: ['Toilet Paper'],
    }]
  },
  [FOOD]: {
    label: 'Food',
    requests: [{
      label: 'Dry Food',
      requestTypes: ['Ramen'],
    }]
  },
};

const checkboxForm: CheckboxData[] = [
  {label: "Medical Supplies", value: MEDICALSUPPLIES},
  {label: "Toiletries", value: TOILETRIES},
  {label: "Food", value: FOOD},
];

const DonationRequestForm = ({onNext, onBack}) => {
  return (
    <Form
      onSubmit={onNext}
      initialValues={{
        donationTypes: [],
        [MEDICALSUPPLIES]: {},
        [TOILETRIES]: {},
        [FOOD]: {},
      }}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Typography variant="h2">
            Community Request
          </Typography>
          <Typography variant="body1">
            What kind of donations would you like to request from the community?
          </Typography>
          <Checkboxes
            name="donationTypes"
            required={true}
            data={checkboxForm}
          />
          {values.donationTypes.length > 0 && (
            <>
              {values.donationTypes.map(donationType => (
                <Box mt={3}>
                  <Typography variant="h3">
                    {DONATION_INFOS[donationType]['label']}
                  </Typography>
                  <Box pt={1}>
                    {/* 
                      // @ts-ignore */}
                    {DONATION_INFOS[donationType]['requests'].map(request=> (
                      <>
                        <Typography variant="h4">
                          {request.label}
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
                            {request.requestTypes.map(requestType => (
                              <Grid item>
                                <SelectorWithPopover 
                                  key={`${donationType}-${requestType}`}
                                  text={requestType}
                                  extraInfo={values[donationType][requestType] ? values[donationType][requestType] : ''}
                                  popoverTitle={requestType}
                                  popOverContentComponent={
                                    <TextField
                                      name={`${donationType}.${requestType}`}
                                      helperText={'Request Details'}
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
                    ))}
                  </Box>
                </Box>
              ))}
            </>
          )}
          <Box mt={6}>
            <Button type="submit" size="large" variant="outlined" color="primary">
              Next
            </Button>
            {' '}
            <Button size="large" variant="outlined" color="primary" onClick={onBack}>
              Back
            </Button>
          </Box>
        </form>
      )}
    />
  )
};

export default DonationRequestForm;
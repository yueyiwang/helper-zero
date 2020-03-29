import React from "react";
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Form } from 'react-final-form';
import {
  Checkboxes,
  CheckboxData
} from 'mui-rff';

import DeliveryInstruction from './DeliveryInstruction';
import { DELIVERY_TYPE_DROP_OFF, DELIVERY_TYPE_PICK_UP, DELIVERY_TYPE_MAIL } from "../../../constants";

const checkboxForm: CheckboxData[] = [
  {label: "Pick-up at donator’s location", value: DELIVERY_TYPE_PICK_UP},
  {label: "Receive drop-offs at designated location", value: DELIVERY_TYPE_DROP_OFF},
  {label: "Receive mailed deliveries", value: DELIVERY_TYPE_MAIL}
];

const DeliveryMethodForm = ({onNext, onBack}) => {
  return (
    <Form
      onSubmit={onNext}
      initialValues={{
        methods: [],
        [DELIVERY_TYPE_PICK_UP]: {},
        [DELIVERY_TYPE_DROP_OFF]: {},
        [DELIVERY_TYPE_MAIL]: {},
      }}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Typography variant="h2">
            Perferred Delivery Method
          </Typography>
          <Typography variant="body1">
            How would you like to receive your donations?
          </Typography>
          <Checkboxes
            name="methods"
            required={true}
            data={checkboxForm}
          />
          {values.methods.length > 0 && (
            <>
              <Box mt={6}>
                <Typography variant="h2">
                  Delivery Details
                </Typography>
              </Box>
              {/* 
                // @ts-ignore */}
              {values.methods.includes(PICKUP) &&(
                <Box mt={6}>
                  <DeliveryInstruction 
                    title={"Pick-Up Instructions"}
                    subtitle={"Leave your donators any instructions for how you will be picking up the donations."}
                    type={PICKUP}
                    values={values}
                  />
                </Box>
              )}
              {/* 
                // @ts-ignore */}
              {values.methods.includes(DELIVERY) &&(
                <Box mt={6}>
                  <DeliveryInstruction 
                    title={"Drop-off Instructions"}
                    subtitle={"Tell your donators how you would like them to drop off their donations."}
                    type={PICKUP}
                    values={values}
                  />
                </Box>
              )}
              {/* 
                // @ts-ignore */}
              {values.methods.includes(MAIL) &&(
                <Box mt={6}>
                  <DeliveryInstruction 
                    title={"Mailing Instructions"}
                    subtitle={"Leave your donators the specific address of the mail room you would like the donations to be sent to."}
                    type={MAIL}
                    values={values}
                  />
                </Box>
              )}
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

export default DeliveryMethodForm;
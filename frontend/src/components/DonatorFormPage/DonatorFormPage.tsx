import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Button, CircularProgress, MenuItem } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import {
  TextField,
  Checkboxes,
  CheckboxData,
  RadioData,
  Radios
} from "mui-rff";
import { OrganizationType } from "../../types/OrganizationType";
import ORGANIZATION_MOCKS from "../../mocks/organizations.json";
import Header from "../Header";
import SelectorWithPopover from "../OrganizationSignUpPage/Steps/SelecterWithPopover";
import { DonationType } from "../../types/DonationType";
import {
  DELIVERY_TYPE_DROP_OFF,
  DELIVERY_TYPE_PICK_UP,
  DONATION_STATUS_TYPE_INCOMPLETE
} from "../../constants";
import axios, { AxiosResponse } from "axios";

const DEBUG = false;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    width: "100%"
  },
  contentContainer: {
    padding: "96px",
    marginTop: "128px"
  },
  subSection: {
    marginBottom: "48px"
  },
  body1Text: {
    marginBottom: "12px"
  },
  h2Texts: {
    margin: "6px 0px"
  },
  h4Texts: {
    margin: "6px 0px"
  },
  subsubSection: {
    marginBottom: "24px"
  }
};

export default function DonatorFormPage() {
  let { orgId } = useParams();
  const [organization, setOrganization] = useState<OrganizationType>();
  const history = useHistory();

  useEffect(() => {
    if (orgId) {
      if (DEBUG) {
        setOrganization(ORGANIZATION_MOCKS[orgId] as any);
      } else {
        axios
          .get(`/api/organizations/${orgId}/`)
          .then(res => {
            setOrganization(res.data);
          })
          .catch(e => console.log(e));
      }
    }
  }, []);

  if (!organization) {
    return <CircularProgress />;
  }

  // returns array of donation request data, each element is a new dontation request data
  function formatAndGetDonationRequestData(values) {
    const donations_data: DonationType[] = [];
    const {
      name,
      phone,
      email,
      pickup_address,
      city,
      // TODO: BUG: somehow this gets saved as "true" instead of the actual value when there's only one choice
      pickup_or_dropoff_times,
      delivery_type
    } = values;

    Object.keys(values.items).forEach(item => {
      const data: DonationType = {
        org: Number(orgId),
        name,
        phone,
        email,
        pickup_address,
        city,
        status: DONATION_STATUS_TYPE_INCOMPLETE,
        item,
        delivery_type,
        amount: values.items[item].amount,
        pickup_or_dropoff_times: pickup_or_dropoff_times.join(",")
      };
      donations_data.push(data);
    });
    return donations_data;
  }

  // Need to send out a separate request for every item that the user selected
  function handleSubmit(values) {
    const donations_data = formatAndGetDonationRequestData(values);
    const promises: Promise<AxiosResponse<any>>[] = [];

    if (!DEBUG) {
      donations_data.forEach(donation_data => {
        promises.push(axios.post(`/api/donations/`, donation_data));
      });

      axios
        .all(promises)
        .then(resp => history.push("/donator/confirmation"))
        .catch(e => console.log(e));
    }
  }

  function categorizeItems(organization) {
    return organization.donation_requests.reduce((agg, donation_request) => {
      if (!agg[donation_request.item_type]) {
        agg[donation_request.item_type] = [];
      }
      agg[donation_request.item_type].push(donation_request.item);
      return agg;
    }, {});
  }

  function getTimesArrayFromString(timesStr) {
    return timesStr ? timesStr.slice(1, -1).replace(/['"]+/g, '').replace(":", " ").split(",") : undefined;
  }

  const categorizedItems = categorizeItems(organization);

  // get formatted RadioData selections for all of the orgs delivery methods
  function getDeliveryMethodsRadioData() {
    if (!organization) {
      return [];
    }

    const radioButtonData: RadioData[] = [];
    if (organization.is_dropoff) {
      radioButtonData.push({
        label: `${organization.name} comes pick up`,
        value: DELIVERY_TYPE_DROP_OFF
      });
    }
    if (organization.is_pickup) {
      radioButtonData.push({
        label: `Drop off donations at ${organization.name}`,
        value: DELIVERY_TYPE_PICK_UP
      });
    }
    return radioButtonData;
  }

  // depending on if the user has chosen pickup/dropoff for its delivery type, this fetch the orgs provided time slots and formats them as checkboxdata
  function getPickupOrDropoffCheckboxData(deliveryType) {
    if (!organization) {
      return [];
    }
    if (deliveryType === DELIVERY_TYPE_DROP_OFF) {
      const dropoffTimes = getTimesArrayFromString(organization.dropoff_times);
      return dropoffTimes.reduce(
        (agg, dropoffTime) => {
          agg.push({
            label: dropoffTime,
            value: dropoffTime
          });
          return agg;
        },
        [] as CheckboxData[]
      );
    } else if (deliveryType === DELIVERY_TYPE_PICK_UP) {
      const pickupTimes = getTimesArrayFromString(organization.pickup_times);
      return pickupTimes.reduce(
        (agg, pickupTime) => {
          agg.push({
            label: pickupTime,
            value: pickupTime
          });
          return agg;
        },
        [] as CheckboxData[]
      );
    }

    return [];
  }

  const REQUIRED_FIELDS: string[] = [
    "pickup_or_dropoff_times",
    "name",
    "phone",
    "email",
    "delivery_type"
  ];
  // fields required if the user has chosen pickup delivery type
  const PICKUP_REQUIRED_FIELDS: string[] = ["pickup_address", "city"];

  function validate(values) {
    const errors = {};
    REQUIRED_FIELDS.forEach(field => {
      if (!values[field]) {
        errors[field] = "Required";
      }
    });

    if (values["delivery_type"] === DELIVERY_TYPE_PICK_UP) {
      PICKUP_REQUIRED_FIELDS.forEach(field => {
        if (!values[field]) {
          errors[field] = "Required";
        }
      });
    }

    return errors;
  }

  return (
    <div style={styles.container}>
      <Header isWhiteBackground />
      <div style={styles.contentContainer}>
        <Typography variant="h1">{`Let ${organization.name} know what you'll be donating`}</Typography>

        <Form
          onSubmit={values => handleSubmit(values)}
          initialValues={{
            delivery_type: ""
          }}
          validate={validate}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <div>
                <div style={styles.subSection}>
                  <Typography variant="h2" style={styles.h2Texts}>
                    What would you like to donate?
                  </Typography>
                  <Typography variant="body1" style={styles.body1Text}>
                    Unopened packages only
                  </Typography>
                  {Object.keys(categorizedItems).map(item_type => (
                    <>
                      <Typography variant="h4" style={styles.h4Texts}>
                        {item_type}
                      </Typography>
                      {categorizedItems[item_type].map(item => (
                        <SelectorWithPopover
                          text={item}
                          extraInfo={
                            values["items"] && values["items"][item]
                              ? values["items"][item]["amount"]
                              : ""
                          }
                          popoverTitle="How many?"
                          popOverContentComponent={
                            <Field
                              name={`items.${item}.amount`}
                              render={({ input }) => (
                                <textarea
                                  rows={5}
                                  cols={30}
                                  style={styles.textarea}
                                  onChange={v => input.onChange(v)}
                                />
                              )}
                            />
                          }
                        />
                      ))}
                    </>
                  ))}
                </div>

                <div style={styles.subSection}>
                  <Typography variant="h2" style={styles.h2Texts}>
                    How would you like to donate?
                  </Typography>
                  <Radios
                    name="delivery_type"
                    required={true}
                    data={getDeliveryMethodsRadioData()}
                  />
                </div>
                {values.delivery_type !== "" && (
                  <div style={styles.subSection}>
                    <Typography variant="h2" style={styles.h2Texts}>
                      {`Schedule your donation ${values[
                        "delivery_type"
                      ].replace("_", " ")}`}
                    </Typography>
                    <Typography variant="h4" style={styles.h4Texts}>
                      Select Available Times
                    </Typography>
                    <Checkboxes
                      // label="Check which times are best"
                      name="pickup_or_dropoff_times"
                      required={true}
                      data={getPickupOrDropoffCheckboxData(
                        values.delivery_type
                      )}
                    />
                    {values.delivery_type == DELIVERY_TYPE_PICK_UP && (
                      <>
                        <Typography variant="h4" style={styles.h4Texts}>
                          Pick-Up Address
                        </Typography>

                        <TextField
                          name="pickup_address"
                          helperText="Street Address"
                          fullWidth
                          margin="normal"
                          required={true}
                        />
                        <TextField
                          name="city"
                          helperText="City"
                          fullWidth
                          margin="normal"
                          required={true}
                        />
                      </>
                    )}
                  </div>
                )}
                <div style={styles.subSection}>
                  <Typography variant="h2" style={styles.h2Texts}>
                    Contact Information
                  </Typography>
                  <Typography variant="body1" style={styles.body1Text}>
                    Let us know how to send you instructions on how to drop off
                    your donations.
                  </Typography>
                  <TextField
                    name="name"
                    helperText="Name (first and last name)"
                    fullWidth
                    margin="normal"
                    required={true}
                  />
                  <TextField
                    name="email"
                    helperText="Email"
                    fullWidth
                    margin="normal"
                    required={true}
                  />
                  <TextField
                    name="phone"
                    helperText="Phone number"
                    fullWidth
                    margin="normal"
                    required={true}
                  />
                </div>
              </div>
              <Button
                type="submit"
                size="large"
                variant="text"
                color="secondary"
              >
                Back
              </Button>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="secondary"
              >
                Schedule Donation
              </Button>
            </form>
          )}
        />
      </div>
    </div>
  );
}

import React from "react";
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Field } from 'react-final-form';

import SelectorWithPopover from './SelecterWithPopover';
import { DELIVERY_TYPE_MAIL } from "../../../constants";

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

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DonationInstruction = ({title, subtitle, type, values}) => {
  return (
    <>
      <Box mt={3}>
        <Typography variant="h3">
          {title}
        </Typography>
        <Typography variant="body1">
          {subtitle}
        </Typography>
        <Box pt={2}>
          <Field
            name={`${type}.instruction`}
            render={({ input }) => (
              <textarea rows={5} cols={100} style={styles.textarea} onChange={v => input.onChange(v)}/>
            )}
          />
        </Box>
      </Box>
      {type !== DELIVERY_TYPE_MAIL && (
        <Box mt={4}>
          <Typography variant="body1">
            Create a windows for when you want donators to donations. 
          </Typography>
          <Box pt={3}>
            <Typography variant="h4">
              Select Available Days
            </Typography>
            <Box pt={2}>
              {/* Selector Group */}
              <Grid 
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
              >
                {DAYS.map(day => (
                  <Grid item>
                    <SelectorWithPopover 
                      key={`${type}-${day}`}
                      text={day}
                      extraInfo={values[type][day] ? values[type][day] : ''}
                      popoverTitle="Add Times"
                      popOverContentComponent={
                        <Field
                          name={`${type}.times.${day}`}
                          render={({ input }) => (
                            <textarea rows={5} cols={30} style={styles.textarea} onChange={v => input.onChange(v)}/>
                          )}
                        />
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
};

export default DonationInstruction;
import React from "react";
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';

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

const SelectorWithPopover = ({text, extraInfo, popoverTitle, popOverContentComponent}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'open' : undefined;

  return (
    <>
      <Button variant="outlined" onClick={handleClick} style={styles.button}>
        <Grid container direction="column">
          <Grid>
            {text}
          </Grid>
          <Grid>
            <Typography variant="body1">
              {extraInfo}
            </Typography>
          </Grid>
        </Grid>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
      >
        <Box p={2}>
          <Typography variant="body1">
            {popoverTitle}
          </Typography>
          <Box pt={2}>
            {popOverContentComponent}
          </Box>
        </Box>
      </Popover>
    </>
  )
}

export default SelectorWithPopover;
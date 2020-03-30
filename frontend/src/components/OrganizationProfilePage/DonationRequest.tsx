import React, {useState} from "react";

import { Typography, Box } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { DonationRequestType } from "../../types/DonationRequestType";

const styles = {
  progressBox: {
    marginTop: "50px",
    width: "750px",
  },
  breakdownBox: {
    marginTop: "10px",
  }
}

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: "$labelcolor"
        }
      }
    }
  }
})


type Props = {
  donationRequest: DonationRequestType;
}

const BorderLinearProgress = withStyles({
  root: {
    height: 20,
    backgroundColor: "lightblue",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "green",
  },
})(LinearProgress);

const DonationRequest:React.FC<Props> = (props: Props) => {
  const [viewBreakdown, setViewBreakdown] = useState<boolean>(false);

  const progressBar = (currValue: number, expectedValue: number) => {
    const normalise = value => value * 100 / expectedValue;
    return (
      <BorderLinearProgress
          variant="determinate"
          value={normalise(currValue)}
        />
    )
  }

  return (
    <Box style={styles.progressBox}>
      <Box style={{"paddingBottom": "10px"}}>
        <Typography style={{"display": "inline-block"}} variant="h3" color="primary">Masks</Typography>
        <Typography
          style={{"paddingLeft": "20px", "display": "inline-block"}}
        >
          <Typography 
            color="textPrimary"
            style={{"display": "inline-block", "marginRight": "5px"}} variant="h3"
          >
            10
          </Typography>
          / 200 Received
        </Typography>
      </Box>
      {progressBar(10, 200)}
      <Box style={styles.breakdownBox}>
        <MuiThemeProvider theme={theme}>
          <IconButton
            style={{"padding": "0", "display": "inline-block"}}
            onClick={() => setViewBreakdown(!viewBreakdown)}
          >
            {viewBreakdown ? 
              <KeyboardArrowDownIcon fontSize="large" />
            :
              <KeyboardArrowRightIcon
                fontSize="large"
              />
            }
          </IconButton>
          </MuiThemeProvider>
        <Typography
          style={{"display":"inline-block"}}
          variant="subtitle2"
        >
          View Breakdown
        </Typography>
        {viewBreakdown && (
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Donator</TableCell>
                  <TableCell align="right">Number Items</TableCell>
                  <TableCell align="right">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {/* TODO: replace with props */}
                    Alice
                  </TableCell>
                  <TableCell align="right">100</TableCell>
                  <TableCell align="right">Saturday 2pm</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Bob
                  </TableCell>
                  <TableCell align="right">50</TableCell>
                  <TableCell align="right">Friday 1pm</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  )
}

export default DonationRequest;
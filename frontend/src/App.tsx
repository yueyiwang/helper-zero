import React from "react";
import { Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import HomePage from "./components/HomePage/HomePage";
import OrganizationsPage from "./components/OrganizationsPage";
import OrganizationSignUpPage from "./components/OrganizationSignUpPage/OrganizationSignUpPage";
import OrganizationProfilePage from "./components/OrganizationProfilePage/OrganizationProfilePage";

// Material UI Overrides
const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans",
    button: {
      textTransform: "none"
    }
  },
  // button has to be primary or secondary
  palette: {
    primary: {
      main: "#384555" // dark blue
    },
    secondary: {
      main: "#F56767" //orange
    },
    text: {
      primary: "#405CC0", // bright blue
      secondary: "#EFF6FF" // whiteIsh
    }
  },
  overrides: {
    MuiButton: {
      outlinedSizeLarge: {
        height: "56px",
        padding: "0px 40px",
        borderWidth: "2px"
      }
    },
    MuiTypography: {
      h1: {
        fontFamily: "Gangster Grotesk",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "60px",
        lineHeight: "72px",
        letterSpacing: "0.02em",
        marginBottom: "24px",
        color: "#EFF6FF"
      },
      h2: {
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "26px",
        lineHeight: "35px",
        letterSpacing: "0.02em",
        color: "#384555",
        marginBottom: "18px"
      },
      h3: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "20px",
        lineHeight: "27px",
        letterSpacing: " 0.02em",
        marginBottom: "10px",
        color: "#EFF6FF"
      },
      h4: {
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: " 0.02em",
        color: "#384555"
      },
      body1: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "28px",
        letterSpacing: " 0.02em",
        color: "#384555"
      }
    }
  }
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route path="/organizations" component={OrganizationsPage} />
        <Route path="/organization/signup" component={OrganizationSignUpPage} />
        <Route path="/organization/profile" component={OrganizationProfilePage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </MuiThemeProvider>
  );
}

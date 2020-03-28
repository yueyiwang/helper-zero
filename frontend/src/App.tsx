import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import OrganizationsPage from "./components/OrganizationsPage";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

// Material UI Overrides
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F56767"
    },
    secondary: {
      main: "#F56767"
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
        fontFamily: "Gangster Grotesk",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "30px",
        lineHeight: "36px",
        letterSpacing: "0.02em",
        color: "#384555",
        marginBottom: "24px"
      },
      h3: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "24px",
        lineHeight: "36px",
        letterSpacing: " 0.02em",
        marginBottom: "24px",
        color: "#EFF6FF"
      }
    }
  }
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route path="/organizations" component={OrganizationsPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </MuiThemeProvider>
  );
}

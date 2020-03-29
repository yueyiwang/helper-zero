import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@material-ui/core";
import Header from "../Header";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "750px",
    width: "100%",
    backgroundColor: "#212633",
    color: "white"
  },
  header: {
    display: "flex",
    padding: "48px",
    height: "64px",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px"
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 60px",
    justifyContent: "center",
    flexGrow: 1
  },
  title: {
    fontFamily: "Gangster Grotesk",
    fontSize: "60px",
    fontWeight: "bold",
    marginBottom: "24px"
  },
  subTitle: {
    fontSize: "24px",
    marginBottom: "24px"
  }
};

export default function Marquee() {
  let history = useHistory();

  return (
    <div style={styles.container}>
      <div style={styles.contentContainer}>
        <Typography variant="h1">Spread help.</Typography>
        <Typography variant="h3" style={{ marginBottom: "24px" }}>
          Donate resources to our city's shelters and hospitals.
        </Typography>
        <span>
          <Button size="large" variant="outlined" color="secondary">
            Donate
          </Button>
        </span>
      </div>
    </div>
  );
}

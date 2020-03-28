import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

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
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.logo}>
          <AddIcon />
          <b>Helper Zero</b>
        </span>
        <Button size="large" variant="text" color="primary">
          Request Aid
        </Button>
      </div>
      <div style={styles.contentContainer}>
        <span style={styles.title}>Spread help.</span>
        <span style={styles.subTitle}>
          Donate resources to our city's shelters and hospitals.
        </span>
        <span>
          <Button size="large" variant="outlined" color="primary">
            Donate
          </Button>
        </span>
      </div>
    </div>
  );
}

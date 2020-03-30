import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PeopleOutlined from "@material-ui/icons/PeopleOutlined";
import DriveEtaOutlined from "@material-ui/icons/DriveEtaOutlined";
import TextField from "@material-ui/core/TextField";
import Header from "../Header";
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    width: "100%"
  },
  contentContainer: {
    padding: "96px",
    marginTop: "128px"
  }
};

export default function DonatorConfirmationPage() {
  return (
    <div style={styles.container}>
      <Header isWhiteBackground />
      <div style={styles.contentContainer}>
        <Typography variant="h2">
          Thank you for your donating! You will receive a confirmation email
          shortly.
        </Typography>
        {/* TODO */}
      </div>
    </div>
  );
}

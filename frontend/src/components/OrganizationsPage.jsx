import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import axios from "axios";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};
export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState([]);

  function fetchOrganizations() {
    axios.get("/api/organizations").then(res => {
      setOrganizations(res.data);
    });
  }

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div style={styles.container}>
      {organizations.map(organization => (
        <Grid item key={organization.id}>
          <div>{organization.name}</div>
        </Grid>
      ))}
    </div>
  );
}

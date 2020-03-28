import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { OrganizationType } from "../types/OrganizationType";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);

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

import React, { useState, useEffect } from "react";
import Map from "./Results/Map";
import Marquee from "./Marquee";
import ResultsContainer from "./Results/ResultsContainer";
import ORGANIZATION_MOCKS from "../../mocks/organizations.json";
import { MarkerType } from "../../types/MarkerType";
import Header from "../Header";
import axios from "axios";
import { OrganizationType } from "../../types/OrganizationType";

const DEBUG = false;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  resultsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    minHeight: "1024px"
  },
  columnContainer: {
    flexGrow: 1,
    flexBasis: 1
  }
};

export default function HomePage() {
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);

  function getMarkers(): MarkerType[] {
    // TODO: replace this with organization response
    if (DEBUG) {
      return ORGANIZATION_MOCKS.reduce(
        (agg, org) => {
          agg.push({
            // key: org.name,
            latitude: Number(org.lat),
            longitude: Number(org.lon)
          });
          return agg;
        },
        [] as MarkerType[]
      );
    }

    return organizations.reduce(
      (agg, org) => {
        agg.push({
          // key: org.name,
          latitude: Number(org.lat),
          longitude: Number(org.lon)
        });
        return agg;
      },
      [] as MarkerType[]
    );
  }

  function handleFilterChange(filters) {
    const { zipcode } = filters;
    if (!DEBUG) {
      if (zipcode) {
        axios.get("/api/search/", { params: { zipcode } }).then(resp => {
          console.log(resp);
          setOrganizations(resp.data);
        });
      } else {
        // if no zipcode just fetch all
        axios.get("/api/search/").then(resp => {
          console.log(resp);
          setOrganizations(resp.data);
        });
      }
    }
    // TODO: fetch request with new filters
  }

  useEffect(() => {
    if (DEBUG) {
      setOrganizations(ORGANIZATION_MOCKS as OrganizationType[]);
    } else {
      axios.get("/api/search/").then(resp => {
        setOrganizations(resp.data);
      });
    }
  }, []);

  return (
    <div style={styles.container}>
      <Header />
      <Marquee />
      <div style={styles.resultsContainer}>
        <div style={{ ...styles.columnContainer, ...styles.organizationList }}>
          <ResultsContainer
            organizations={organizations}
            onFilterChange={filters => handleFilterChange(filters)}
          />
        </div>
        <div style={styles.columnContainer}>
          <Map
            latitude={37.7577}
            longitude={-122.4376}
            markers={getMarkers()}
          />
        </div>
      </div>
    </div>
  );
}

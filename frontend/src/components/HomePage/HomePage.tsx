import React from "react";
import Map from "./Results/Map";
import Marquee from "./Marquee";
import ResultsContainer from "./Results/ResultsContainer";
import ORGANIZATION_MOCKS from "../../mocks/organizations.json";
import { MarkerType } from "../../types/MarkerType";
import Header from "../Header";

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

function getMarkers(): MarkerType[] {
  // TODO: replace this with organization response
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

function onFilterChange() {
  // TODO: Refetch with new filters
}

export default function HomePage() {
  return (
    <div style={styles.container}>
      <Header />
      <Marquee />
      <div style={styles.resultsContainer}>
        <div style={{ ...styles.columnContainer, ...styles.organizationList }}>
          <ResultsContainer organizations={ORGANIZATION_MOCKS} />
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

import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import OrganizationsPage from "./components/OrganizationsPage";

export default function App() {
  return (
    <Switch>
      <Route path="/organizations" component={OrganizationsPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  );
}

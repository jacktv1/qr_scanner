import React, { Component } from "react";

import AppNavigator from "./src/navigations/AppNavigator";
import { store, persistor } from "@redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
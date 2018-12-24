import React, { Component } from "react";
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import Scanner from "../screens/Scanner";
import Result from "../screens/Setting";
import History from "../screens/History";
import Main from "../screens/Main";
import Tab from "../components/Tab";

const AppNavigator = createMaterialTopTabNavigator(
  {
    Scanner: {
      screen: Scanner
    },
    History: {
      screen: History
    },
  },
  {
    initialRouteName: "Scanner",
    tabBarComponent: props => {
      return <Tab navigation={props.navigation} />;
    }
  }
);

export default createAppContainer(AppNavigator);

import React, { Component } from "react";
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import Scanner from "../screens/Scanner";
import Histories from "../screens/History";
import Tab from "../components/Tab";

const AppNavigator = createMaterialTopTabNavigator(
  {
    Scanner: {
      screen: Scanner
    },
    History: {
      screen: Histories
    },
  },
  {
    initialRouteName: "History",
    tabBarComponent: props => {
      return <Tab navigation={props.navigation} />;
    }
  }
);

export default createAppContainer(AppNavigator);

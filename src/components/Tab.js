import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "./Icon";

export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.activeColor = "#48dce7";
    this.inActiveColor = "#AAA";
  }

  changeTab(index) {
    switch (index) {
      case 0:
        this.props.navigation.navigate("Scanner");
        break;
      case 1:
        this.props.navigation.navigate("History");
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.column} onPress={() => this.changeTab(0)}>
          <Icon
            name="scan1"
            type="AntDesign"
            size={24}
            color={
              this.props.navigation.state.index == 0
                ? this.activeColor
                : this.inActiveColor
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.column} onPress={() => this.changeTab(1)}>
          <Icon
            name="schedule"
            type="MaterialIcons"
            size={24}
            color={
              this.props.navigation.state.index == 1
                ? this.activeColor
                : this.inActiveColor
            }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#000000",
    maxHeight: 56
  },
  column: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
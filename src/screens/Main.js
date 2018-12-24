import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { setCompany } from "@redux/actions";

class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.column}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                this.props.onSetCompany("Viettel");
                this.props.navigation.navigate("Scanner");
              }}
            >
              <Image
                source={require("../assets/images/logo-viettel.jpg")}
                style={styles.logo}
              />
              <Text>Viettel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <View style={styles.card}>
              <Image
                source={require("../assets/images/mobifone.jpg")}
                style={styles.logo}
              />
              <Text>Mobifone</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.card}>
              <Image
                source={require("../assets/images/vinaphone.jpg")}
                style={styles.logo}
              />
              <Text>Vinaphone</Text>
            </View>
          </View>
          <View style={styles.column}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                this.props.onSetCompany("Vietnamobile");
                this.props.navigation.navigate("Scanner");
              }}
            >
              <Image
                source={require("../assets/images/vietnamobile.jpg")}
                style={styles.logo}
              />
              <Text>Vietnamobile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#DFE4EE",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 150,
    paddingRight: 4,
    paddingLeft: 4
  },
  column: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 4,
    paddingLeft: 4
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 150,
    borderRadius: 8
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  }
});

const mapStateToProps = state => ({
  company: state.scanner.company
});

const mapDispatchToProps = dispatch => {
  return {
    onSetCompany: company => dispatch(setCompany(company))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

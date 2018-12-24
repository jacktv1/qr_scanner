import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Slider } from "react-native";
import Icon from "./Icon";

export default class ScannerToolbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.toolBox}>
        <View style={styles.overlay} />
        <View style={styles.overlayBody}>
          <View style={styles.overlayLeft} />
          <View style={styles.scanner}>
            <View style={styles.rowHorizol}>
              <View style={styles.leftHor} />
              <View style={styles.rightHor} />
            </View>
            <View style={styles.rowVertical}>
              <View style={styles.rowCenter}>
                <View style={styles.centerLeft} />
                <View style={styles.centerRight} />
              </View>
              <View style={styles.rowBody}>
                <View style={styles.bodyLeft} />
                <View style={styles.bodyRight} />
              </View>
              <View style={styles.rowCenter}>
                <View style={styles.centerLeft} />
                <View style={styles.centerRight} />
              </View>
            </View>
            <View style={styles.rowHorizol}>
              <View style={styles.leftHor} />
              <View style={styles.rightHor} />
            </View>
          </View>
          <View style={styles.overlayRight} />
        </View>
        <View style={styles.overlay} />
        <View style={styles.zoomRow}>
          <TouchableOpacity
            style={styles.flexCenter}
            onPress={() => this.props.decreaseZoom()}
          >
            <Icon name="minus" type="Feather" color="#fff" size={24} />
          </TouchableOpacity>

          <View style={{ flex: 1, maxWidth: 200 }}>
            <Slider
              value={this.props.zomeValue}
              minimumValue={0}
              maximumTrackTintColor="#fff"
              maximumValue={1}
              step={0.1}
              onValueChange={value => this.props.changeZoom(value)}
            />
          </View>
          <TouchableOpacity
            style={styles.flexCenter}
            onPress={() => this.props.increaseZoom()}
          >
            <Icon name="plus" type="Feather" color="#fff" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => this.props.switchFlash()}
          >
            <Icon
              name={this.props.flashIcon}
              type="MaterialCommunityIcons"
              color="#fff"
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => this.props.switchCameraType()}
          >
            <Icon name="refresh-ccw" type="Feather" color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#212121",
    maxWidth: 60,
    maxHeight: 60,
    margin: 20,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 50
  },
  toolBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  overlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  overlayBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
    maxHeight: 300,
    padding: 0
  },
  overlayLeft: {
    flex: 1,
    minHeight: 300,
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  overlayRight: {
    flex: 1,
    minHeight: 300,
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  scanner: {
    flex: 1,
    flexDirection: "column",
    minHeight: 300,
    maxWidth: 300,
    minWidth: 300
  },
  rowHorizol: {
    flex: 1,
    backgroundColor: "#444",
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 2
  },
  leftHor: {
    flex: 1,
    maxWidth: 20,
    backgroundColor: "#48dce7"
  },
  rightHor: {
    flex: 1,
    maxWidth: 20,
    backgroundColor: "#48dce7"
  },
  rowVertical: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  rowCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 18
  },
  centerLeft: {
    flex: 1,
    backgroundColor: "#48dce7",
    maxWidth: 2
  },
  centerRight: {
    flex: 1,
    backgroundColor: "#48dce7",
    maxWidth: 2
  },
  rowBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyLeft: {
    flex: 1,
    backgroundColor: "#444",
    maxWidth: 2
  },
  bodyRight: {
    flex: 1,
    backgroundColor: "#444",
    maxWidth: 2
  },
  zoomRow: {
    flex: 1,
    maxHeight: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  flexCenter: {
    flex: 1,
    maxWidth: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    maxHeight: 100
  }
});

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Linking,
  Share,
  Clipboard,
  ToastAndroid,
  PermissionsAndroid
} from "react-native";

import Icon from "./Icon";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";
import { AdMobBanner } from "react-native-admob";
export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grantedCall: false
    };
  }

  async requestCallPhonePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: "Scanner App CALL PHONE Permission",
          message: "Scanner App needs access to your CALL "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          grantedCall: true
        });
      } else {
        this.setState({
          grantedCall: false
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  browseWebsite(link) {
    Linking.openURL(link);
  }

  copyResult(result) {
    Clipboard.setString(result);
    ToastAndroid.showWithGravity(
      "Copied result to clipboard",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  shareContent(resultContent) {
    Share.share({
      message: resultContent.toString()
    });
  }

  async makeCall(phoneNumber) {
    await this.requestCallPhonePermission();
    if (this.state.grantedCall)
      RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
  }

  searchText(resultContent) {
    Linking.openURL(`https://www.google.com/search?q=${resultContent}`);
  }

  renderActionButton(resultType, resultContent) {
    switch (resultType) {
      case "Website":
        return (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.active]}
              onPress={() => {
                this.browseWebsite(resultContent);
              }}
            >
              <Text style={[styles.buttonText, styles.textActive]}>
                Browse Website
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                this.copyResult(resultContent);
              }}
            >
              <Text style={styles.buttonText}>Copy link</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => this.shareContent(resultContent)}
            >
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
        );
      case "Numeric":
        return (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.active]}
              onPress={() => {
                this.makeCall(resultContent);
              }}
            >
              <Text style={[styles.buttonText, styles.textActive]}>
                Make Call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                this.copyResult(resultContent);
              }}
            >
              <Text style={styles.buttonText}>Copy link</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => this.shareContent(resultContent)}
            >
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
        );
      case "Text":
        return (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.active]}
              onPress={() => {
                this.searchText(resultContent);
              }}
            >
              <Text style={[styles.buttonText, styles.textActive]}>
                Search on web
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                this.copyResult(resultContent);
              }}
            >
              <Text style={styles.buttonText}>Copy link</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => this.shareContent(resultContent)}
            >
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return;
    }
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => this.props.closeModal()}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.props.closeModal()}
            />
             <AdMobBanner
                adSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111"
                testDevices={[]}
                style={{}}
              />
            <View style={styles.header}>
              <Icon
                name="link-variant"
                type="MaterialCommunityIcons"
                size={24}
                color="#fff"
              />
              <Text style={styles.resultType}>{this.props.resultType}</Text>
            </View>
            <View style={styles.content}>
              <Icon
                name="link-variant"
                type="MaterialCommunityIcons"
                size={24}
                color="#fff"
              />
              <Text style={styles.resultContent}>
                {this.props.resultContent}
              </Text>
              {this.renderActionButton(
                this.props.resultType,
                this.props.resultContent
              )}
            </View>
          </View>
        </Modal>
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
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976d2",
    maxHeight: 50,
    paddingLeft: 20
  },
  resultType: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 10
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    maxHeight: 400,
    paddingLeft: 20,
    paddingRight: 20
  },
  resultContent: {
    color: "#444",
    fontSize: 20,
    marginBottom: 50
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#444",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 20,
    borderRadius: 4
  },
  active: {
    flex: 1,
    backgroundColor: "#1976d2",
    borderWidth: 0
  },
  buttonText: {
    flex: 1,
    color: "#666",
    fontSize: 16,
    textAlign: "center"
  },
  textActive: {
    color: "#fff"
  }
});

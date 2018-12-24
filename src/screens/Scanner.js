import React, { Component } from "react";
import { View, StyleSheet, Vibration } from "react-native";
import { connect } from "react-redux";
import { RNCamera } from "react-native-camera";
import Sound from "react-native-sound";
import { scanned, scanning } from "@redux/actions";
import ScannerToolbox from "../components/ScannerToolbox";
import Result from "../components/Result";
import moment from "moment";

class Scanner extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      flash: false,
      cameraType: RNCamera.Constants.Type.back,
      isCameraReady: false,
      flashIcon: "flashlight-off",
      zomeValue: 0,
      modalVisible: false,
      resultContent: "",
      resultType: ""
    };
    this.scanned = false;
    this.isScannerScreen = true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scanned || nextProps.scanned === false) {
      // this.scanned = nextProps.scanned;
    }
  }

  componentDidMount() {
    this.beepSound = new Sound(require("@assets/sounds/beep.mp3"), error => {
      if (error) {
        return;
      }
    });

    this._navListener = this.props.navigation.addListener("didFocus", () => {
      console.log("scanner didFocus");
      this.scanned = false;
      this.isScannerScreen = true;
    });

    this._navListener2 = this.props.navigation.addListener("didBlur", () => {
      console.log("scanner didBlur");
      this.scanned = true;
      this.isScannerScreen = false;
      
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  handleBackPress() {
    if (this.state.modalVisible === true) {
      this.setState({
        modalVisible: false
      });
    }
  }

  // event when detect qrcode or barcode
  handleQRCodeDetect(result) {
    console.log('this.scanned', this.scanned);
    if (result.barcodes && this.scanned === false && this.isScannerScreen === true) {
      result.barcodes.map(code => {
        var resultType = "Text";
        if (this.isURL(code.data)) {
          resultType = "Website";
        } else if (this.isNumeric(code.data)) {
          resultType = "Numeric";
        }
        this.setState({
          resultType,
          resultContent: code.data
        });
        this.showModal();
        this.scanned = true;
        this.props.onScanned(resultType, code.data, moment());
        this.beepSound.play(success => {
          if (!success) {
            this.beepSound.reset();
          }
        });
      });
    }
  }

  // check if string is url
  isURL(str) {
    var pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (!pattern.test(str)) {
      return false;
    } else {
      return true;
    }
  }

  // check if string is numeric
  isNumeric(str) {
    var pattern = /^\d+$/;
    if (!pattern.test(str)) {
      return false;
    } else {
      return true;
    }
  }

  // Change camera type front or back
  switchCameraType() {
    if (this.state.cameraType == RNCamera.Constants.Type.back) {
      this.setState({
        cameraType: RNCamera.Constants.Type.front
      });
    } else {
      this.setState({
        cameraType: RNCamera.Constants.Type.back
      });
    }
  }

  // Turn on or off flash of camera
  switchFlash() {
    if (this.state.flash === true) {
      this.setState({
        flash: false,
        flashIcon: "flashlight-off"
      });
    } else {
      this.setState({
        flash: true,
        flashIcon: "flashlight"
      });
    }
  }

  // Go to history screen
  viewHistory() {
    this.props.navigation.navigate("History");
  }

  handleCameraReady() {
    this.setState({
      isCameraReady: true
    });
  }

  increaseZoom() {
    this.setState({
      zomeValue: this.state.zomeValue + 0.1
    });
  }

  decreaseZoom() {
    this.setState({
      zomeValue: this.state.zomeValue - 0.1
    });
  }

  changeZoom(value) {
    this.setState({
      zomeValue: value
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false
    });
    this.scanned = false;
  }

  showModal() {
    this.setState({
      modalVisible: true
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={this.state.cameraType}
            zoom={this.state.zomeValue}
            flashMode={
              this.state.flash === true
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
            }
            permissionDialogTitle={"Permission to use camera"}
            permissionDialogMessage={
              "We need your permission to use your camera phone"
            }
            onGoogleVisionBarcodesDetected={code => {
              this.handleQRCodeDetect(code);
            }}
            onCameraReady={() => this.handleCameraReady}
          >
            <ScannerToolbox
              zomeValue={this.state.zomeValue}
              flashIcon={this.state.flashIcon}
              switchFlash={this.switchFlash.bind(this)}
              switchCameraType={this.switchCameraType.bind(this)}
              increaseZoom={this.increaseZoom.bind(this)}
              decreaseZoom={this.decreaseZoom.bind(this)}
              changeZoom={this.changeZoom.bind(this)}
            />
          </RNCamera>
        </View>
        <Result
          visible={this.state.modalVisible}
          resultType={this.state.resultType}
          resultContent={this.state.resultContent}
          closeModal={this.closeModal.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  content: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#212121",
    borderTopWidth: 1,
    borderTopColor: "#242424"
  },
  preview: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
});

const mapStateToProps = state => ({
  scanned: state.scanner.scanned
});

const mapDispatchToProps = dispatch => {
  return {
    onScanned: (resultType, resultContent, scannedDate) =>
      dispatch(scanned(resultType, resultContent, scannedDate)),
    onScanning: (status) => dispatch(scanning(status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanner);

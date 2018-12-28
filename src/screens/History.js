import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { scanning } from "@redux/actions";
import Icon from "../components/Icon";
import Result from "../components/Result";
import moment from "moment";
import { AdMobBanner } from "react-native-admob";

class Histories extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      history: [],
      modalVisible: false,
      resultType: "",
      resultContent: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.history) {
      this.setState({
        history: nextProps.history
      });
    }
  }

  // close modal
  closeModal() {
    this.setState({
      modalVisible: false
    });
  }

  // show modal result
  showResult(resultType, resultContent) {
    this.setState({
      modalVisible: true,
      resultType,
      resultContent
    });
  }

  // render section group by date scanned
  renderGroup(group) {
    let section = [];
    section.push(
      <View style={styles.groupDateRow} key={group.item[0]}>
        <Icon name="date-range" type="MaterialIcons" size={16} color="#fff" />
        <Text style={styles.groupDate}>{group.item[0]}</Text>
      </View>
    );
    group.item[1].map((item, index) => {
      section.push(this.renderRow(item, index));
    });
    return section;
  }

  // Render row item in group  date
  renderRow(item, index) {
    let leftIcon = {
      name: "link-variant",
      type: "MaterialCommunityIcons",
      backgroundColor: "#1565c0"
    };
    switch (item.resultType) {
      case "Text":
        leftIcon = {
          name: "filetext1",
          type: "AntDesign",
          backgroundColor: "#ff9100"
        };
        break;
      case "Numeric":
        leftIcon = {
          name: "numeric",
          type: "MaterialCommunityIcons",
          backgroundColor: "#388e3c"
        };
        break;
      default:
        break;
    }
    return (
      <TouchableOpacity
        style={styles.historyRow}
        onPress={() => this.showResult(item.resultType, item.resultContent)}
        key={"key-" + index + "-" + item.scannedDate}
      >
        <View style={styles.left}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: leftIcon.backgroundColor }
            ]}
          >
            <Icon
              name={leftIcon.name}
              type={leftIcon.type}
              size={20}
              color="#fff"
            />
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.itemType}>{item.resultType}</Text>
          <Text style={styles.itemContent} numberOfLines={1}>{item.resultContent}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.itemDate}>
            {moment(item.scannedDate).format("HH:mm:ss")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  // Group by array by date scanned
  groupByDate(xs) {
    return xs.reduce(function(groups, item) {
      const val = moment(item.scannedDate).format("YYYY-MM-DD");
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }

  render() {
    let groupHistory = Object.entries(this.groupByDate(this.props.history));
    return (
      <View style={styles.container}>
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          testDevices={[]}
          style={{}}
        />
        <View style={styles.content}>
          <FlatList
            data={groupHistory.length > 0 ? groupHistory : []}
            extraData={this.props}
            keyExtractor={(item, index) => `row-${index}`}
            renderItem={item => this.renderGroup(item)}
            style={{ flex: 1 }}
          />
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
    flexDirection: "column",
    backgroundColor: "#212121",
    paddingLeft: 8,
    paddingRight: 8,
    borderTopWidth: 1,
    borderTopColor: "#242424"
  },
  historyRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 70,
    paddingTop: 8,
    paddingBottom: 8
  },
  left: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 60,
    minHeight: 56,
    marginRight: 10
  },
  body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#777"
  },
  right: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    maxWidth: 80,
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#777",
    paddingBottom: 4
  },
  itemDate: {
    fontSize: 14,
    color: "#676767"
  },
  itemType: {
    fontSize: 16,
    color: "#fff"
  },
  itemContent: {
    fontSize: 13,
    color: "#bdbdbd"
  },
  iconBox: {
    backgroundColor: "#1565c0",
    padding: 10,
    borderRadius: 8
  },
  groupDateRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  groupDate: {
    color: "#48dce7",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 8
  },
  bgOrange: {
    backgroundColor: "#ff9100"
  },
  bgGreen: {
    backgroundColor: "#388e3c"
  }
});

const mapStateToProps = state => ({
  history: state.scanner.history,
  scanner: state.scanner
});

const mapDispatchToProps = dispatch => {
  return {
    onScanning: status => dispatch(scanning(status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Histories);

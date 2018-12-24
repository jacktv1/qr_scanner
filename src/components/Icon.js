import React, { Component } from 'react';
import {
  View
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class Icon extends Component {
  constructor(props) {
    super(props);
  }

  renderIcon(type, name, color, size, style) {
    if (!type) type = 'AntDesign';
    switch (type) {
      case 'AntDesign':
        return (
          <AntDesign 
            name={name} 
            color={color} 
            size={size} 
            style={style}/>
        );
      case 'Entypo':
        return (
          <Entypo 
            name={name} 
            color={color} 
            size={size} 
            style={style}/>
        );
      case 'Feather':
        return (
          <Feather 
            name={name} 
            color={color} 
            size={size} 
            style={style}/>
        );
      case 'FontAwesome':
        return (
          <FontAwesome 
            name={name} 
            color={color} 
            size={size} 
            style={style}/>
        );
      case 'FontAwesome5':
        return (
          <FontAwesome5 
            name={name} 
            color={color} 
            size={size} 
            style={style}/>
         );
      case 'Foundation':
        return (
          <Foundation 
            name={name} 
            color={color} 
            size={size} 
            style={style}/>
        );
      case 'Ionicons':
        return (
          <Ionicons 
            name={name} 
            color={color} 
            size={size} 
            style={style}/>
        );
      case 'MaterialCommunityIcons':
        return (
          <MaterialCommunityIcons 
            name={name} 
            color={color} 
            size={size} 
            style={style}/>
        );
      case 'MaterialIcons':
        return (
          <MaterialIcons 
            name={name} 
            color={color} 
            size={size} 
            style={style}/>
        );
      case 'Octicons':
        return (
          <Octicons 
            name={name} 
            color={color} 
            size={size} 
            style={style}/>
        );
      case 'EvilIcons':
        return (
          <EvilIcons 
            name={name} 
            color={color} 
            size={size} 
            style={style}/>
        );
      default:
        return <View />;
        break;
    }
  }

  render() {
    return (
      this.renderIcon(this.props.type, this.props.name, this.props.color, this.props.size, this.props.style)
    );
  }
}
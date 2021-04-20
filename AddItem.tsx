import React, { FunctionComponent, useEffect, useState, useRef, Component, useCallback, createRef, useContext } from 'react';
import { Animated, StyleSheet, PixelRatio, Text, View, Image, PanResponder, Dimensions, TouchableOpacity, LayoutChangeEvent, TextInput, DatePickerIOSBase } from 'react-native';
import { ContextReplacementPlugin } from 'webpack';
import Constants from 'expo-constants';
import ToDo from './TodoList';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import 'react-native-gesture-handler';
import { Button, Input } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pet from './Pet';
import PropTypes from 'prop-types';
// import {useItems} from './ItemsState';


// unable to navigate back to home screen with list content so page not used

export interface IToDo {
  name: string;
  due: string;
  points: string;
  completed: boolean;
 }

export default function AddItem({route, navigation }) {
  type Props = {};

  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [pts, setPts] = useState<string>("");
  const [list, setList] = useItems();



  function listItem() {
    if (name.trim() && pts.trim() && date.trim()) {
      // setList([...list, { name: name, due: date, points: pts, completed: false }]);
      setList([...list, {name, date, pts}]);
    }
    setName("");
    setDate("");
    setPts("");
  };

  return (
    <View style={styles.page}>
        
      {/* section */}
      <View style={styles.header}>
        {/* hamburger menu */}
        {/* <Image></Image> */}
        <Text style={styles.pet_name}>Reggie</Text>
      </View>

      {/* section */}
      <Pet/>

      {/* section */}
      <View style={styles.list}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Add a Task</Text>
          </View>
          <View style={styles.add}>
            <Input
              label="Item Name"
              placeholder="Item Name"
              inputContainerStyle={{width: '80%'}}
              value={name}
              onChangeText={e => {setName(e)}}
              />
            <Input
              label="Due Date"
              placeholder="Month/Day/Year"
              inputContainerStyle={{width: '80%'}}
              value={date}
              onChangeText={e => {setDate(e)}}
              />
            <Input
              label="Points"
              placeholder="1-10"
              inputContainerStyle={{width: '80%'}}
              value={pts}
              onChangeText={e => {setPts(e)}}
              />

            {/* <Button title="Add Task" onPress= /> */}
            <Button title="Add Task" onPress={() => {
              listItem();
              navigation.navigate('Home', list);
            }}/>
          </View>
        </View>
      </View>
    </View>
  );
}

AddItem.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      alignItems: 'center',
      color: "#000000",
      height: '100%'
    },
    header: {
      flex: 1,
      backgroundColor: '#add8e6',
      width: '100%',
      maxHeight: '12%',
      textAlign: 'center',
      justifyContent: 'center'
    },
    pet_name: {
      color: '#000000',
      fontSize: 30,
      fontWeight: '300',
      textAlign: 'center',
      marginTop: 'auto',
      paddingBottom: 10
    },
    list: {
      flex: 1,
      backgroundColor: '#CBC3E3',
      width: '100%',
      maxHeight: '100%',
      textAlign: 'center',
    },
    container: {
      flex: 1,
      padding: 8,
      alignItems: "center"
    },
    add: {
      flexDirection: 'column',
      padding: 8,
      alignItems: "flex-start",
    },

    title: {
      color: '#000000',
      fontSize: 30,
      fontWeight: '300',
      textAlign: 'center',
      paddingBottom: 10
    },
    inputWrapper: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20
    },
    inputBox: {
      width: 200,
      borderColor: "purple",
      borderRadius: 8,
      borderWidth: 2,
      paddingLeft: 8
    },

    listItem: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginBottom: 10
    },

    task: {
      width: 200
    },
    error: {
      color: "red"
    }
  });
import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { Animated, StyleSheet, PixelRatio, Text, View, Image, TextInput } from 'react-native';
import { ContextReplacementPlugin } from 'webpack';
import Constants from 'expo-constants';
import 'react-native-gesture-handler';
import { Button, Input } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IToDo } from './AddItem';


 export default function ToDo() {
  type Props = {};

  const [itemName, setItemName] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [points, setPoints] = useState<string>("");
  const [toDoList, setToDos] = useState<IToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);

  const handleSubmit = (): void => {
    if (itemName.trim() && points.trim() && dueDate.trim())
      setToDos([...toDoList, { name: itemName, due: dueDate, points: points, completed: false }]);
    else showError(true);
    setItemName("");
    setDueDate("");
    setPoints("");
  };

  const removeItem = (index: number): void => {
     const newToDoList = [...toDoList];
     newToDoList.splice(index, 1);
     setToDos(newToDoList);
  };
  
  const toggleComplete = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList[index].completed = !newToDoList[index].completed;
    setToDos(newToDoList);
  };
  
  return (
     <View style={styles.container}>
       <View style={{flex: 1}}>
       <Text style={styles.title}>ToDo Tasks</Text>
       {toDoList.length === 0 && <Text>No ToDo task available</Text>}
         {toDoList.map((toDo: IToDo, index: number) => (
         <View style={styles.listItem} key={`${index}_${toDo.name}`}>
           <Text
             style={[
               styles.task,
               { textDecorationLine: toDo.completed ? "line-through" : "none" }
             ]}
           >
             {toDo.name}{"\n"}
             Due: {toDo.due}
             
           </Text>
           <Text>{toDo.points} pts</Text>
           <Button
             title={toDo.completed ? "To Do" : "Done"}
             onPress={() => toggleComplete(index)}
           />
           <Button
             title="X"
             onPress={() => {
               removeItem(index);
             }}
           />
         </View>
       ))}
       </View>
       <View style={styles.container2}>
          <View>
            <Text style={styles.title}>Add a Task</Text>
          </View>
          <View style={styles.add}>
            <Input
              label="Item Name"
              placeholder="Item Name"
              inputContainerStyle={{width: '80%'}}
              value={itemName}
              onChangeText={e => {setItemName(e)}}
              />
            <Input
              label="Due Date"
              placeholder="Month/Day/Year"
              inputContainerStyle={{width: '80%'}}
              value={dueDate}
              onChangeText={e => {setDueDate(e)}}
              />
            <Input
              label="Points"
              placeholder="1-10"
              inputContainerStyle={{width: '80%'}}
              value={points}
              onChangeText={e => {setPoints(e)}}
              />

            {/* <Button title="Add Task" onPress= /> */}
            <Button title="Add Task" onPress={ handleSubmit }/>
          </View>
        </View>

       </View>
       )
}

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 8,
     alignItems: "center"
   },
   container2: {
    flex: 3,
    padding: 8,
    alignItems: "center"
  },
   inputWrapper: {
     width: "100%",
     flexDirection: "row",
     justifyContent: "center",
     marginBottom: 20
   },
   inputBox: {
     width: 200,
    //  borderColor: "purple",
     borderRadius: 8,
     borderWidth: 2,
     paddingLeft: 8
   },
   title: {
     color: '#000000',
     fontSize: 30,
     fontWeight: '300',
     textAlign: 'center',
     paddingBottom: 10
   },
   subtitle: {
     fontSize: 20,
     marginBottom: 20,
     textAlign: "center",
   },
   listItem: {
     flexDirection: "row",
     justifyContent: "center",
     alignItems: "center",
     width: "100%",
     marginBottom: 10
   },
    addButton: {
     width: 80,
     height: 80,
     borderRadius: 100,
    //  backgroundColor: 'orange',
     justifyContent: 'center',
     alignItems: 'center',
   },
   add: {
    flexDirection: 'column',
    padding: 8,
    alignItems: "flex-start",
  },
   task: {
     width: 180
   },
   error: {
     color: "red"
   }
 });
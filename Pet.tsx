import React, { FunctionComponent, useEffect, useState, useRef, Component, useCallback } from 'react';
import { Animated, StyleSheet, PixelRatio, Text, View, Image, PanResponder, Dimensions, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { ContextReplacementPlugin } from 'webpack';
import Constants from 'expo-constants';
import ToDo from './TodoList';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function Pet() {

    const [progress, setProgress] = useState(0);
    const [fish_points, setFishPoints] = useState(0);
    const [milk_points, setMilkPoints] = useState(0);
    const [cat_emotion, setCatEmotion] = useState('happy')

  function calculateCatEmotion() {

  }
  function catEmotion() {
    if (cat_emotion == 'happy') {
      return (
      <Image style={{flex: 1, resizeMode: 'contain', width: '100%'}} source={require('./assets/images/taskimal_happy.png')}/>
      )
    }
    else if (cat_emotion == 'fish') {
      return (
        <Video style={{flex: 1, resizeMode: 'contain', width: '100%'}} source={require('./assets/images/fish_feed.mp4') }/>
        )
    }

  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  
  useInterval(() => {
    if(progress < 100) {
      setProgress(progress + 5);
    }
  }, 1000);

  let animation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false
    }).start();
  },[progress])

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })

  return (
    <View style={styles.pet}> 

      {/* character */}
      <View style={{flex: 1}}>
        <View style={styles.cat}>
          {catEmotion()}

        </View>
      </View>

      {/* character info */}
      <View style={styles.pet_info}>

        {/* food */}
        <View style={styles.treats}>
          {/* fish */}
          <View style={styles.fish}>
            <TouchableOpacity style={{flex: 1}} activeOpacity = { .8  }>
            {/* onPress={fishAnimation} */}
            <Image 
              style={styles.fish_img}
              source={require('./assets/images/fish.png')}
            />
            </TouchableOpacity>
            {/* { renderDraggable() } */}
            {/* <Fish/> */}

            <Text>{`${fish_points}`}</Text>
          </View>

          {/* milk */}
          <View style={styles.milk}>
            <Image 
            style={styles.milk_img}
            source={require('./assets/images/milk.png')}
          />
          <Text>{`${milk_points}`}</Text>
          </View>
        </View>

        {/* progress */}
        <View style={styles.progress}>
          <Text>
            Health
          </Text>
          <View style={styles.progress_bar}>
            <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: "#8BED4F", width }}/>
          </View>
          <Text>{`${progress}%`}</Text>
        </View>
        
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    page: {
      flex: 1,
      // backgroundColor: '#f9f9f9',
      alignItems: 'center',
      color: "#000000",
      height: '100%'
    },
    header: {
      flex: 1,
      // backgroundColor: '#add8e6',
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
    pet: {
      flexDirection: 'row',
      flex: 1,
      // backgroundColor: '#ffcccb',
      width: '100%',
      maxHeight: '20%',
      textAlign: 'center',
      padding: '2% 5%'
    },
    cat: {
      flex: 1,
      height: '100%',
      width: '100%',
      resizeMode: 'contain'
    }, 
    pet_info: {
      flexDirection: 'column',
      flex: 1,
      height: '100%',
      width: '100%',
      resizeMode: 'contain'
    },
    treats: {
      flex: 1,
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
      // backgroundColor: '#00ff00',
    }, 
    progress: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: '#ff0000',
      padding: 5
    },
    fish: {
      flex: 1,
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
      flexDirection: 'column',
      alignItems: 'center'
    }, 
    fish_img: {
      flex: 1,
      height: 100,
      width: 100,
      resizeMode: 'contain'
    }, 
    fish_drag_container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: 'red',
      // position: 'absolute'
      },
    milk: {
      flex: 1,
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
      flexDirection: 'column',
      alignItems: 'center'
    }, 
    milk_img: {
      flex: 1,
      height: '100%',
      width: '100%',
      resizeMode: 'contain'
    }, 
    health: {
      flex: 1,
      height: '100%',
      width: '100%',
    }, 
    progress_bar: {
      flexDirection: 'row',
      height: 20,
      width: '100%',
      backgroundColor: 'white',
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 5
      
    }, 
    list: {
      flex: 1,
      // backgroundColor: '#CBC3E3',
      width: '100%',
      maxHeight: '100%',
      textAlign: 'center',
    },
    addButton: {
      width: 80,
      height: 80,
      borderRadius: 100,
      // backgroundColor: 'orange',
      justifyContent: 'center',
      alignItems: 'center',
    }
    
  });
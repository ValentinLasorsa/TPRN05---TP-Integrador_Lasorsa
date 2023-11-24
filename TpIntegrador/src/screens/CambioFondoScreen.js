
import { View, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import DataService from '../Services/DataService';
import { Camera, CameraType } from 'expo-camera';
import BotonReusable from '../components/botonReusable';

let dataService = new DataService()

const CambioFondoScreen = () => {

  const [bgImage, setBgImage] = useState(null);
  const [startCamera, setStartCamera] = useState(false)

  const pickImage = async () => {
    
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const profile = await dataService.getData();
      profile.BackgroundURI=(JSON.stringify(result.assets[0].uri));
      setBgImage(profile.BackgroundURI);
      await dataService.saveData(profile)
    }
  };

  const StartCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      // start the camera
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  const TakePicture = async () => {
    if (!camera) return;

    const photo = await camera.takePictureAsync();
    const profile = await dataService.getData();

    profile.BackgroundURI = photo.uri;
    setBgImage(profile.BackgroundURI);

    await dataService.saveData(profile)
    setStartCamera(false)
  }

  const loadBackground = async () => {
    const profile = await dataService.getData();
    if(profile !== null)
    {
    //const profile = await dataService.getData();
    setBgImage(profile.BackgroundURI);
    }else{
      setBgImage(null)
    }
}

  useEffect(() => {
    loadBackground();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <ImageBackground source={bgImage ? {uri: bgImage } : null} style={styles.image}>
        <BotonReusable event={pickImage} text='Pick image from galery' style={styles.button} />
        {startCamera ? (
          <Camera
            style={{ flex: 1, width: "100%" }}
            ref={(r) => {
              camera = r
            }}
          >
            <View
              style={styles.cameraContainer}
            >
              <View
                style={{
                  alignSelf: 'center',
                  flex: 1,
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
                  onPress={TakePicture}
                  style={{
                    width: 80,
                    height: 80,
                    bottom: 135,
                    borderRadius: 60,
                    backgroundColor: '#fff'
                  }}
                />
              </View>
            </View>
          </Camera>
        ) : (
          <>
            <BotonReusable event={StartCamera} text='Take photo' style={styles.button} />
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  button: {
    marginTop: 20,
    width: 280,
    height: 65,
    backgroundColor: 'black',
    borderRadius: 10
  },
  image: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  }
});

export default CambioFondoScreen;
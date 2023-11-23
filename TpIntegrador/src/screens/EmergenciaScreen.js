import {Text, SafeAreaView, StyleSheet, Linking, Alert, Platform, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Accelerometer} from 'expo-sensors';
import { Vibration } from 'react-native';
import DataService from '../Services/DataService';
import ModalMessage from '../Components/ModalMessage'
import MessageConstants from '../Constants/MessageConstants'

let dataService = new DataService();

const EmergencyScreen = () =>{

const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
});
const [subscription, setSubscription] = useState(null);
const [visibleModal, setVisibleModal] = useState(false);
const [success, setSuccess] = useState(false);
const [mensajeModal, setMensajeModal] = useState('');
const [bgImage, setBgImage] = useState(null);

const _slow = () => Accelerometer.setUpdateInterval(1000);

const callNumber = (phone) => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
    }
    else {
        phoneNumber = `tel:${phone}`;
    }
    Linking.openURL(phoneNumber)
};

const _subscribe = () => {
    let auxiliarX;
    setSubscription(Accelerometer.addListener(async (accelerometerData) => {
        auxiliarX = x;
        if (accelerometerData.x < auxiliarX) {
        if ((auxiliarX - accelerometerData.x) > 0.5) {
            const profile = await dataService.getData();
            let PhoneNumber = profile.PhoneNumber;
            if (PhoneNumber) {
              callNumber(PhoneNumber)
            } else {
              setMensajeModal(MessageConstants.MSG_UNDEFINED_PHONE);
              setVisibleModal(true)
            }
            Vibration.vibrate();
        }
        } else {
        if ((accelerometerData.x - auxiliarX) > 0.5) {
            if ((auxiliarX - accelerometerData.x) > 0.5) {
              const profile = await dataService.getData();
              let PhoneNumber = profile.PhoneNumber;
              if (PhoneNumber) {
                callNumber(PhoneNumber)
              } else {
                setMensajeModal(MessageConstants.MSG_UNDEFINED_PHONE);
                setModalVisible(true)
              }
            Vibration.vibrate();
          }
        }
      }
      setData(accelerometerData);
    }));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const loadBackground = async () => {
    const profile = await dataService.getData();
    if(profile.BackgroundURI !== null)
    {
    //const profile = await dataService.getData();
    setBgImage(profile.BackgroundURI);
    }
  }

  useEffect(() => {
    loadBackground();
    _subscribe();
    _slow();
    return () => _unsubscribe();    
  }, []);


  return (
    <SafeAreaView style={[styles.container]}>
      <ImageBackground source={bgImage ? {uri: bgImage } : null} style={styles.image}>
        <Text style={{backgroundColor:'white', fontSize: 20, width: '80%', textAlign:'center'}}>Agita el celular para llamar a tu contacto de emergencia</Text>
        <ModalMessage msg={mensajeModal} modalVisible={visibleModal} setVisibleModal={setVisibleModal} success={success}/>
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
    backgroundColor: '#fff',
    textAlign:'center'
  },
  image: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmergencyCall;
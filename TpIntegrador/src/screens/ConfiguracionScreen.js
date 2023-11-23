

import {Text, StyleSheet, SafeAreaView, TextInput, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react';
import MessageConstants from '../Constants/MessageConstants'
import ReusableButton from '../Components/ReusableButton';
import DataService from '../Services/DataService';
import ModalMessage from '../Components/ModalMessage';

const Configuration = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [videoUrl, setUrlVideo] = useState('');
    const [musicUrl, setUrlMusic] = useState('');
    const [visibleModal, setVisibleModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [bgImage, setBgImage] = useState(null);

    const dataService = new DataService();

    
    /**
     * @swfshsfxhsf
     */
    const loadData = async () =>{   
      try {
        const profile = await dataService.getData();   

        setPhoneNumber(profile.PhoneNumber);
        setUrlMusic(profile.MusicUrl);
        setUrlVideo(profile.VideoUrl);
        setBgImage(profile.BackgroundURI);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}
    
    useEffect(() => {
      //await dataService.getData();
      loadData();
    }, []);

    const handleSave = async () => {

      const profile = await dataService.getData();
      profile.PhoneNumber = phoneNumber;
      profile.VideoUrl = videoUrl;
      profile.MusicUrl = musicUrl;
      await dataService.saveData(profile)
        if (phoneNumber && videoUrl && musicUrl) {
            if (await dataService.saveData(profile) == true) 
            {
                
                setModalMessage(MessageConstants.MSG_SAVED_DATA);
                setSuccess(true)
            } else {
                setModalMessage(MessageConstants.MSG_SAVED_FAILED);
                setSuccess(false)
            }
        } else {
            setModalMessage(MessageConstants.MSG_INCOMPLETE_FIELDS);
            setSuccess(false)
        }
        setVisibleModal(true)
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
        //await dataService.getData();
        loadBackground();
      }, []);


    return(
        <SafeAreaView style={[styles.container]}>
            <ImageBackground source={bgImage ? {uri: bgImage } : null} style={styles.image}>
                <Text style={[styles.textLabel]}>Telefono</Text>
                <TextInput
                editable
                style={styles.input}
                value={phoneNumber}
                placeholder="Enter emergency phone number"
                keyboardType="numeric"
                onChangeText={input => setPhoneNumber(input)}
                />
                <Text style={[styles.textLabel]}>Video URL</Text>
                <TextInput
                editable
                style={styles.input}
                value={videoUrl}
                placeholder="Enter a video URL"
                onChangeText={input => setUrlVideo(input)}
                />
                <Text style={[styles.textLabel]}>Music URL</Text>
                <TextInput
                editable
                style={styles.input}
                value={musicUrl}
                placeholder="Enter a music URL"
                onChangeText={input => setUrlMusic(input)}
                />
                <ReusableButton event={handleSave} style={styles.button}  text='enter data'/>
            </ImageBackground>
            <ModalMessage msg={modalMessage} modalVisible={visibleModal} setVisibleModal={setVisibleModal} success={success} />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: '#fff'
    },
    button: {
      marginTop: 20,
      width: 300,
      height: 60,
      backgroundColor: 'black',
      borderRadius: 10
    },
    input: {
      height: 40,
      width: '90%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white'
    },
    textLabel: {
      alignSelf: 'flex-start',
      marginLeft: '5%',
      backgroundColor:'white',
      marginTop: 5,
      fontWeight: 'bold'
    },
    image: {
      width: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default Configuration;
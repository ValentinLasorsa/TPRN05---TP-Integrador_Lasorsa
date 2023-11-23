import { Text, StyleSheet, SafeAreaView, ImageBackground} from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { Video, ResizeMode, Audio } from 'expo-av';
import DataService from '../Services/DataService';
import ReusableButton from '../Components/ReusableButton';


const MultimediaScreen = () => {
    const video = React.useRef(null);
    const [status, setStatus] = useState({});
    const [image, setBgImage] = useState(null);
    const [videoUrl, setVideo] = useState(undefined);
    const [musicUrl, setMusic] = useState(undefined);
    const [sound, setSound] = useState();
    const [isSoundReproducing, setIsSoundReproducing] = useState(false);

    let dataService = new DataService();
  
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
  
    let loadMultimedia = async () => {
      if (await dataService.getData()) {
        let profile = await dataService.getData();
        if (profile.VideoUrl && profile.MusicUrl) {
          let video = profile.VideoUrl;
          setVideo(video)
          let music = profile.MusicUrl;
          setMusic(music);
        }else{
            setVideo(null);
            setMusic(null);
        }
      }
    }
  
    let reproduceSound = async () => {
        try {
          if (isSoundReproducing && sound) {
            setIsSoundReproducing(false);
            console.log('Unloading Sound');
            await sound.pauseAsync();
            await sound.unloadAsync();
            setSound(null); // Clear the sound object from state
          } else {
            setIsSoundReproducing(true);
            console.log('Loading Sound');
            if (musicUrl) {
              const { sound: audioSound } = await Audio.Sound.createAsync(
                { uri: musicUrl },
                { volume: 0.8 }
              );
              setSound(audioSound); // Set the loaded sound in the state
              await audioSound.playAsync();
            } else {
              console.log('No music URL provided.');
            }
          }
        } catch (error) {
          console.error('Error occurred while handling sound:', error);
          // Add specific error handling or log messages as needed
          //console.error('Music URL:', musicUrl);
        }
      };
  
    let playSound = async () => {
      setIsSoundReproducing(true)
      console.log('Playing Sound');
      await sound.playAsync();
    }
  
    useEffect(() => {
      if (sound) {
        playSound();
      }
    }, [sound]);
  
    useEffect(() => {
      loadBackground();
      loadMultimedia();
    }, []);
  
    return (
      <SafeAreaView style={[styles.container]}>
        <ImageBackground source={{ uri: image }} style={styles.image}>
          <Text style={{ backgroundColor: 'white', fontSize: 20, width: '80%', textAlign: 'center' }}>MultimediaScreen</Text>
          {videoUrl ? (
            <>
              <Video
                style={styles.video}
                ref={video}
                source={{
                  uri: videoUrl,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />
              <ReusableButton event={() => status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()} text={status.isPlaying ? 'Pause video' : 'Play video'} style={styles.button1} />
              
            </>
          ) : (
            <>
              <Text style={{ backgroundColor: 'white', fontSize: 15, width: '80%', textAlign: 'center' }}>No hay archivos disponibles el valor de VideoUrl={videoUrl}</Text>
            </>
          )}
          {musicUrl ? (
            <>
              <ReusableButton event={reproduceSound} text={isSoundReproducing ? 'Pause audio' : 'Play audio'} style={styles.button2} />
            </>
          ) : (
            <>
              <Text style={{ backgroundColor: 'white', fontSize: 15, width: '80%', textAlign: 'center' }}>No hay archivos disponibles</Text>
            </>
          )}
        </ImageBackground>
      </SafeAreaView>
    )
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
button1: {
    marginTop: 20,
    width: 300,
    height: 60,
    backgroundColor: 'green',
    borderRadius: 10
},
button2: {
    marginTop: 20,
    width: 300,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 10
},
image: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
video: {
    width: '80%',
    height: 200
}
});

export default MultimediaScreen;
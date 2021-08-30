import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image} from "react-native";
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';


import { 
  useFonts,
  AtomicAge_400Regular 
  
} from '@expo-google-fonts/atomic-age'
import { 
  Audiowide_400Regular 
} from '@expo-google-fonts/audiowide'

const image = { uri: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" };

const imageTwo = 'https://reactnative.dev/img/tiny_logo.png';

export default function Songlyrics({route, navigation }) {
    
   // const [sound, setSound] = useState(null);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
    const [lyrics, setLyrics] = useState('Lyrics');
    const { artist, songName,  duration, album, albumImage, artistImage, mp3File } = route.params;

    const [Loaded, SetLoaded] = React.useState(false);
    const [Loading, SetLoading] = React.useState(false);
    const sound = React.useRef(new Audio.Sound());



    const url = `https://se-lyrics.herokuapp.com/lyrics?artist="${artist}"&song="${songName}"`;

    const LoadAudio = async () => {
        console.log("loading audio");
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            playThroughEarpieceAndroid: false
        });

        SetLoaded(false);
         SetLoading(true);
        const checkLoading = await sound.current.getStatusAsync();
        if (checkLoading.isLoaded === false) {
          try {
            const result = await sound.current.loadAsync({uri: mp3File});
            if (result.isLoaded === false) {
              SetLoading(false);
              console.log('Error in Loading Audio');
            } else {
              SetLoading(false);
              SetLoaded(true);
            }
          } catch (error) {
            console.log(error);
            SetLoading(false);
          }
        } else {
          SetLoading(false);
        }
      };

      const Unload = async () => {
        await sound.current.unloadAsync();
      };

      React.useEffect(() => {
        LoadAudio();
    
        return () => Unload();
      }, []);     

    const playSample = async () => {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            playThroughEarpieceAndroid: false
        });
        console.log(mp3File);
        console.log("Loading song");
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync({uri: mp3File});
        soundObject.playAsync();
        


    };

    const PlayAudio = async () => {
        try {
          const result = await sound.current.getStatusAsync();
          if (result.isLoaded) {
            if (result.isPlaying === false) {
              sound.current.playAsync();
            }
            if(result.isPlaying === true) {
              sound.current.pauseAsync();
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      const PauseAudio = async () => {
        try {
          const result = await sound.current.getStatusAsync();
          if (result.isLoaded) {
            if (result.isPlaying === true) {
              sound.current.pauseAsync();
            }
          }
        } catch (error) {
          console.log(error);
        }
      };

    const grabLyrics = async () => {
        console.log("grabbing lyrics from " + url);
        axios.get(`https://se-lyrics.herokuapp.com/lyrics` ,{
      params: {
        artist: artist,
        song: songName
      }
    }).then(response => {
      setLyrics(response.data);
      //setLoading(false);
    })
    
        
    }

    useEffect(() => {
        console.log("use effect hook claled");
        grabLyrics();
        //grab song
    //    grabSong();

    navigation.setOptions({
        
        title: `${songName}`,
    });

    }, []);


    function formatTime(time) {
        //time in seconds
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        if(seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
      
    }

      let [fontsLoaded] = useFonts({
        AtomicAge_400Regular,
        Audiowide_400Regular
    
      });

      if (!fontsLoaded) {
        return <AppLoading />;
      }

    return (
       
        <View style={styles.container}>
        <ImageBackground source={{
            uri: artistImage ? artistImage : imageTwo
        }} resizeMode="cover" style={styles.backgroundImg}>
            <View style={styles.header}>
                <Text style={styles.Artist}>{artist ? artist : "artist"}</Text>
                <Text style={styles.Song}>{songName ? songName : "songName"}</Text>
            </View> 
        </ImageBackground>
        <View style={styles.containerTwo}>
            <View style={styles.albumAndInfo}>
            <TouchableOpacity
                onPress={() => {
                    console.log('pressed play');
                   // playSample();
                    PlayAudio();
                }}
                >
                        <Image
                    style={styles.albumImage}
                    source={{
                    uri: albumImage ? albumImage : imageTwo,
                    }}
                
                    />
                    <AntDesign name="caretright" size={100} color="rgba(110, 0, 0, 0.8)" style={styles.playButton} />

            
            
            </TouchableOpacity>
            
            <View style={styles.info}>
                <Text style={styles.album}>Album</Text>
                <Text style={styles.customFont2}>{album ? album : "album"}</Text>
                <Text style={styles.duration}>Duration</Text>
                <Text style={styles.customFont2}>{duration ? formatTime(duration) : "duration"}</Text>
           
            </View>

        
             
        </View>
        

                <ScrollView style={styles.scrollView}>
                    <Text style={styles.lyricsText}>
                        {lyrics ? lyrics : "lyrics"}
                    </Text>
                </ScrollView> 
        </View>
      

        </View>
    )
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
     // backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: "column",
      
    },
    containerTwo: {
      flex: 2.5,
     backgroundColor: 'black',
     // alignItems: 'center',
      //justifyContent: 'center',
      width: '100%',
      flexDirection: "column",
      height: "100%",
      
    },
    backgroundImg: {
      flex: 1,
      width: '100%',
      height: "100%",
      //backgroundSize: 'cover',
    },
    albumAndInfo: {
        marginTop: 20,
        marginLeft: 10,
        backgroundColor: 'black',
         //alignItems: 'center',
         //justifyContent: 'center',
         //width: '100%',
         flexDirection: "row",


    },
    lyrics: {
     // flex: 1,
     color: 'white',
     // backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
     // height: '100%',


    },
    header: {
      flex: 1,
     //marginTop: 50,
     //marginBottom: 40,
      justifyContent: 'center',
    },
    customFont: {
      fontFamily: 'Audiowide_400Regular',
      fontSize: 40,
      color: 'white',
    },
    customFont2: {
      fontFamily: 'Audiowide_400Regular',
      color: 'white',
    },
    Artist: {
        fontFamily: 'Audiowide_400Regular',
        fontSize: 20,
        color: 'white',
        marginLeft: '8%',
    },
    Song: {
        fontFamily: 'Audiowide_400Regular',
        fontSize: 30,
        color: 'white',
        marginLeft: '10%',
        textTransform: 'uppercase',
    },
    button: {
      fontFamily: 'Audiowide_400Regular',
      height: 40,
      margin: 12,
      borderWidth: 2,
      padding: 10,
      borderRadius: 5,
      borderColor: 'white',
    },
    albumImage: {
        width: 150,
        height: 150,
        borderRadius:100,
    },
    info: {
        marginLeft: 25,
        marginTop: 20,
    },
    duration: {
        fontFamily: 'Audiowide_400Regular',
        color: 'grey',
        marginTop: 30,
        fontSize: 12,
    },
    album: {
        fontFamily: 'Audiowide_400Regular',
        fontSize: 12,
        color: 'grey',
    },
    scrollView: {
       // backgroundColor: 'pink',
        marginHorizontal: 20,
        marginTop: -50,
        //height: 0,
      },
      lyricsText: {

       // fontFamily: 'Audiowide_400Regular',
        fontSize: 20,
        color: 'grey',
        lineHeight: 40,
      },
      albumImageOverlay: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        
    },
    playButton: {
        position: 'relative',
       top: -120,
       left: 20,

        zIndex: 1,
       
       // marginTop: -50,
        //marginLeft: -50,
        //width: 100,
        //height: 100,
        //borderRadius: 100,
       // backgroundColor: 'rgba(52, 52, 52, 0.8)',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
  
  });
  





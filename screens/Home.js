import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { ImageBackground, SafeAreaView, 
    StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from "react-native";
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import Suggestions from '../components/Suggestions';

import { 
  useFonts,
  AtomicAge_400Regular 
  
} from '@expo-google-fonts/atomic-age'
import { 
  Audiowide_400Regular 
} from '@expo-google-fonts/audiowide'

const image = { uri: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" };

//const { artist, songName, lyrics, duration, album } = route.params;

export default function Home({ navigation }) {
    const [artist, setArtist] = useState('');
    const [songName, setSongName] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [duration, setDuration] = useState('');
    const [album, setAlbum] = useState('');
    const [artistImage, setArtistImage] = useState('');
    const [albumImage, setAlbumImage] = useState('');
    const [error, setError] = useState('');


    const [artistToSearch, setArtistToSearch] = useState('');
    const [songToSearch, setSongToSearch] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState('');
    const DETAILS = 'Details';

    const searchUrl = 'https://api.deezer.com/search?q=';



      useEffect(() => {
          navigation.setOptions({
        headerShown: false,
        headerTransparent: true,
      });
      }, [])

    

  const onPress = async () => {

    await grabDetails();

    /*
    navigation.push(DETAILS ,{
        artist: 'Travis Scott',
        songName: 'Goosebumps',
        lyrics: 'Lyrics',
        duration: '4:00',
        album: 'Beibs in the Trap',
        albumImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        artistImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    });

    */
  }
   
  const grabDetails = async () => {

    if(!artistToSearch && !songToSearch){
        console.log('No artist to search');
        return;
    }
    console.log(artistToSearch);
    console.log(songToSearch);
    
    console.log('Grabbing details');
    const urlParams = `artist:"${artistToSearch}" track:"${songToSearch}"`;
    const urlSettings = '&limit=20';

    var URL = searchUrl + urlParams + urlSettings;
    console.log(URL);
    await fetch(URL)
    .then(response => response.json())
    .then(data => {
        //console.log(data.data);
        setSearchSuggestions(data.data);
    })
    .catch(error =>{
        console.log(error);
    })


  }


  let [fontsLoaded] = useFonts({
    AtomicAge_400Regular,
    Audiowide_400Regular

  });
  

  if (!fontsLoaded) {
    return <AppLoading />;
  }

    return (
      <ImageBackground source={image} resizeMode="stretch" style={styles.backgroundImg}>
        <View style={styles.header}>
          <Text style={styles.customFont}>Lyricx Searchx</Text>
        </View>
        
        <View style={styles.inputContainer}>

            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                <Text style={styles.customFont2}>Search</Text>
            </TouchableOpacity>     

           
        </View>
        <View style={styles.suggestionsContainer}>  

        <Suggestions
          style={styles.Suggestions}
          results={searchSuggestions}
          navigation={navigation}
          />
         
        </View>

      <TextInput
            style={styles.input}
            placeholder="Artist Name"
            placeholderTextColor="white"
            onChangeText={text => setArtistToSearch(text)}

          />
            <TextInput
            style={styles.input}
            placeholder="Song Name"
            placeholderTextColor="white"
            onChangeText={text => setSongToSearch(text)}

          />


      <StatusBar style="auto" />

    
      </ImageBackground>

      

    )
}






const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    suggestionsContainer: {
      //  height: 400,
      flex: 3,
      alignItems: 'center',
      width: "100%",
    },

    Suggestions: {
        flex: 1,
        alignItems: 'center',
        color: 'white',

    },
    backgroundImg: {
      //flex: 1,
      width: '100%',
      height: '100%',
      //backgroundSize: 'cover',
    },
    fumiInputInside: {
    //  width: '100%',
    },
    columnView: {
    //  flex: 1,
     // flexDirection: 'column',
    },
    lyricsView: {
     // flex: 1,
      backgroundColor: '#fff',
    },
    inputContainer: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
      height: '100%',
      marginBottom: '10%',
      
      
  
    },
    header: {
      flex: 1,
     //marginTop: 50,
     //marginBottom: 40,
      alignItems: 'center',
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
    input: {
      fontFamily: 'Audiowide_400Regular',
      height: 40,
      margin: 12,
      borderWidth: 2,
      padding: 10,
      borderRadius: 5,
      borderColor: 'white',
      color: 'white',
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
  
  });
  
import React from 'react';

import {
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  View
} from 'react-native';




const Suggestions = ({results, navigation  }) => {
    
 

    return (
    <FlatList
        onScrollBeginDrag={Keyboard.dismiss}
        data={results}
        styles={styles.flatListStyle}
        renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionItem}
                onPress={() => {
                    console.log('pressed');
                    navigation.navigate('Details',
                     {
                         artist: item.artist.name,
                         songName: item.title,
                         duration: item.duration,
                         album: item.album.title,
                         albumImage: item.album.cover_medium,
                         artistImage: item.artist.picture_medium,
                         mp3File: item.preview

                         //    const { artist, songName,  duration, album, albumImage, artistImage } = route.params;   
                        })}}
            >
                <Image
                    source={{ uri: item.album.cover_medium }}
                    style={{ width: 150, height: 100 }}
                />
                <View numberOfLines={1} style={styles.detailsContainer}>
                    <Text numberOfLines={1} style={styles.songTitle}>{item.title_short}</Text>
                    <Text numberOfLines={1} style={styles.artistDetails}>{item.artist.name}</Text>            
                    <Text numberOfLines={1} style={styles.artistDetails}>{item.album.title}</Text>           
                </View>

            </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        />
    )
                };

export default Suggestions;


//  Styles
const styles = StyleSheet.create({
    flatListStyle: {
        flex: 1,
        backgroundColor: '#fff',
        height: 55
    },
    suggestionItem: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      elevation: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 18,
      paddingRight: 12,
      marginLeft: 14,
      marginRight: 14,
      marginTop: 0,
      marginBottom: 10,
      color: 'white',
      borderRadius: 10,
    },
    image: {
      width: 66,
      height: 66,
      borderRadius: 66 / 2,
      alignSelf: 'center',
      borderColor: 'white',
      borderWidth: 2,
      marginRight: 17,
      flex: 0
    },
    detailsContainer: {
      width: 145,
      marginLeft: 20
    },
    songTitle: {
      color: 'white',
      paddingBottom: 3,
      marginBottom: 3,
      fontSize: 16,
    },
    artistDetails: {
      color: 'white',
      paddingBottom: 2,
    }

  });
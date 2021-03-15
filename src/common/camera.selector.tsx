import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ImagePickerResponse, launchCamera } from 'react-native-image-picker/src';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CameraSelector(props : { picturesList: string[], onChange: (pictures : string[]) => void } ) {

    const [pictures, setPictures] = useState(props.picturesList);

    const startCamera = () => {
        launchCamera( { mediaType: 'photo', quality: 0.5, saveToPhotos: true } , (response: ImagePickerResponse) => {
            takenImage(response);
        });
    }

    const takenImage = (response: ImagePickerResponse) => {
        if (!!response.didCancel && response.didCancel) {
            console.log('la prise d\'image a été annulé');
        } else if (!!response.errorCode) {
            // TODO treat error messages
        } else {
            if(!!response.uri) {
                setPictures([...pictures, response.uri]);
            }
        }
    }

    const removeImageAtIndex = (index: number) => {
        var copy = Array.from(pictures);
        copy.splice(index, 1);
        setPictures( copy );
    }

    useEffect(() => {
        props.onChange( pictures );
    }, [ pictures ]);

    return (
        <View>
            <Button title="Ajouter une photo" onPress={ startCamera } />
            
                <ScrollView contentContainerStyle = { styles.horizontalScroll } directionalLockEnabled = { true } horizontal = { true } >
                    
                    {
                        props.picturesList.length === 0 &&
                        <View style = {styles.imageContainer}>
                            <TouchableOpacity style = { styles.removeButton } onPress = { startCamera }>
                                <Icon name = "camera" size= {40} color = 'black' />
                            </TouchableOpacity>
                        </View>
                    }
                    
                    {
                        pictures.map((uri: string, index: number) =>
                            <View style = {styles.imageContainer}>
                                <ImageBackground resizeMode= 'cover' style = { styles.imageStyle } key = { index } source={ { uri: uri } } >
                                    <TouchableOpacity style = { styles.removeButton } onPress = { () => removeImageAtIndex(index) }>
                                        <Icon name = "trash" size= {40} color = 'grey' />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        )
                    }
                </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: 100,
        height:  100,
        borderRadius: 10,
        backgroundColor: 'grey',
        margin: 5,
        borderWidth: 1
    }, 
    imageStyle: {
        resizeMode: "cover",
        overflow: 'hidden',
        borderRadius: 10
    },
    horizontalScroll : {
        paddingVertical: 10,
    },
    removeButton : {
        width : '100%',
        height : '100%',
        justifyContent: "center",
        alignItems: 'center'
    }
})
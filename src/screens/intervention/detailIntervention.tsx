import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    SafeAreaView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { InterventionState } from '../../model/intervention.model';
import { updateIntervention } from '../../stores/intervention.store';
import { RootState } from '../../stores/stores';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CameraSelector from '../../common/camera.selector';

export default function DetailIntervention( {route} : {route: any} ) {

    const allInterventionStatus: InterventionState[]  = ["Réussi" , "Echoué" , "Incomplet"];
    const { interventionId } = route.params;

    let concernedIntervention = useSelector( (state: RootState) => state.intervention).find((intervention) => intervention.recordNumber === interventionId);
    
    const [intervention, setIntervention] = useState(concernedIntervention);

    const dispatch = useDispatch();

    const [modifyInterventionState, setModifyInterventionState] = useState(false);
    const [modifyInterventionComment, setModifyInterventionComment] = useState(false);

    useEffect(() => {
        dispatch( updateIntervention(intervention!) );
    }, [ intervention ]);

    if (!!intervention) {
        return(
            <SafeAreaView style = { styles.container }>
            <KeyboardAvoidingView
                behavior={ Platform.OS === "ios" ? "position" : "height" }
                style = { styles.container }>

                <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                    <ScrollView  style = { styles.inner } >

                        <View style = { styles.section }>
                            <Text style = { styles.title }> Detail de la mission </Text>
                            <Text>Numéro d'intervention : { intervention.recordNumber }</Text>
                            <Text>La date d'intervention : { intervention.date }</Text>
                            <Text>L'intervention est de type : { intervention.type }</Text>
                            <Text>L'intervention est à : { intervention.locality }</Text>
                        </View>
        
                        <View style = { styles.section }>
                            <SectionHeader title = "Etat de la mission" iconName = "edit" onPress = {() => setModifyInterventionState(!modifyInterventionState)} />

                            <Text>{ !!intervention.state ? intervention.state : 'Etat non renseigné'}</Text>

                            {
                                modifyInterventionState && 
                                <>
                                    <Text style = { styles.title } >Choisissez la finalité: </Text>
                                    <Picker
                                        selectedValue={ intervention?.state || null}
                                        onValueChange={(itemValue: InterventionState, _itemIndex: number) => {
                                            setIntervention( {... intervention, state : itemValue } );
                                        } 
                                    }
                                    >
                                        {
                                            allInterventionStatus.map((v, itemIndex) => {
                                                return <Picker.Item label = { v } value = { v } key = { itemIndex } />
                                            })
                                        }
                                    </Picker>
                                </>
                            }


                        </View>

                        <View style = { styles.section }>
                            <SectionHeader title = "Justificatif de l'intervention" iconName = "edit" />
                            {
                                (!!!intervention.supportingDocuments || intervention.supportingDocuments.length === 0) &&
                                <Text>Aucun justificatif fourni pour cette intervention</Text>
                            }
                            <CameraSelector picturesList = { intervention.supportingDocuments } onChange = { (newPictureList : string[] ) => setIntervention({ ...intervention, supportingDocuments: newPictureList }) } />
                        </View>

                        <View style = { styles.section }>
                            <SectionHeader title = "Commentaire supplémentaire" iconName = "edit" onPress = {() => setModifyInterventionComment(true)}/>
                            <Text>{ !!intervention.comment ? intervention.comment : 'Aucun commentaire'}</Text>

                            {
                                modifyInterventionComment && 
                                <>
                                    <Text style = { styles.title }> Entrez le commentaire : </Text>
                                    <TextInput
                                        textContentType = "none"
                                        placeholder = "Le commentaire sur l'intervention"
                                        multiline = { true }
                                        placeholderTextColor = "grey"
                                        style = { styles.commentInput }
                                        value = { intervention.comment || ''}
                                        onChangeText = { (value) => setIntervention({ ...intervention, comment: value }) }
                                        />
                                </>
                            }
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    return (
        <>
            <Text>Chargement ... </Text>
        </>
    )



}

const SectionHeader = ( props : {title: string, iconName: string, onPress?: () => void } ) => {
    return (
        <View style = { styles.row }>
        <Text style = { styles.title } >{ props.title }</Text>
            <TouchableOpacity onPress = { props.onPress }>
                <Icon name = { props.iconName } size={ 30 } color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner : {
        marginBottom: 20,
    },
    title : {
        fontWeight: 'bold',
        marginVertical: 5,
        fontSize: 16
    },
    section: {
        backgroundColor: '#d3d3d3',
        padding: 10,
        margin : 5,
    },
    row : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    commentInput : {
        backgroundColor: 'white',
        borderRadius: 8,
        height: 100,
        padding: 10
    } 
});
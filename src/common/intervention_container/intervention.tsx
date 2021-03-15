import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { InterventionModel } from '../../model/intervention.model';

interface InterventionProps {
    intervention: InterventionModel,
    navigation: any,
}

export default function Intervention(props: InterventionProps) {

    const toInterventionDetail = () => {
        props.navigation.push('DetailIntervention', {interventionId: props.intervention.number});
    }

    return (
        <TouchableOpacity style={styles.interventionContainer} onPress = {toInterventionDetail}>
            <Text>Date d'interventions: {props.intervention.date}</Text>
            <Text>Type: {props.intervention.type}</Text>
            <Text>Lieu: {props.intervention.locality}</Text>
            <Text>Numéro: {props.intervention.number}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    interventionContainer : {
        display: 'flex',
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 5,
        padding: 10,
        backgroundColor: 'grey',
        borderRadius: 8,
    }
});
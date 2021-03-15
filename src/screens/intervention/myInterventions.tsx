import React, { useEffect, useState } from 'react';

import { FlatList,
    SafeAreaView,
    StyleSheet } from "react-native";
import Intervention from "../../common/intervention_container/intervention";
import { InterventionModel } from "../../model/intervention.model";

import { useSelector } from 'react-redux';
import { RootState } from '../../stores/stores';
import SQLite, { ResultSet, SQLError, Transaction } from 'react-native-sqlite-storage';
import InterventionRepository from '../../repository/intervention.repository';


export default function MyInterventions(props: any) {

    const [interventions, setInterventions] = useState<InterventionModel[]>([]);

    const allInterventions = useSelector(
        (State: RootState) => State.intervention
    )
    
    let interventionRepo = new InterventionRepository();

    useEffect( () => {
        console.log('check all interventions')

        interventionRepo.addIntervention({ number: "3", date: "12/12/2020", locality: "montpellier", type: 'PM'});

        interventionRepo.getAllInterventions();
        
    }, [])

    const renderItem = ({item} : {item : InterventionModel}) => (
        <Intervention intervention = {item} {...props} />
    );

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                    data = { interventions }
                    renderItem = { renderItem }
                    keyExtractor = {(item: InterventionModel)  => item.number} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        marginBottom: 20,
    }
});
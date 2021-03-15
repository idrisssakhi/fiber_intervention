import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    SafeAreaView,
    ScrollView
} from 'react-native';
import DailyPdfGenerator from '../../common/pdf_generator/daily.pdf.generator';
import MyInterventions from '../intervention/myInterventions';
import CreateIntervention from '../intervention_creation/create_intervention';

const Drawer = createDrawerNavigator();

interface HomeProps {
    name?: string,
    navigation: any,
}

export default function HomeNavigator() {
    return(
        <Drawer.Navigator initialRouteName= "Home"
            drawerContentOptions={{
            activeTintColor: 'blue',
            itemStyle: { marginVertical: 5 },
            }}>
            <Drawer.Screen
            name="Home"
            options ={ { drawerLabel: 'Page d\'accueil', headerShown: true, headerTitle: 'Page d\'accueil', headerTitleAlign: 'center' } }
            component = { Home } />
            <Drawer.Screen
            name="InterventionCreation"
            options = { { drawerLabel: 'Création d\'intervention', headerShown: true, headerTitle: 'Création d\'intervention', headerTitleAlign: 'center' } }
            component= { CreateIntervention } />
            <Drawer.Screen
            name="MyInterventions"
            options = { { drawerLabel: 'Mes interventions', headerShown: true, headerTitle: 'Mes interventions', headerTitleAlign: 'center' } }
            component = { MyInterventions } />
            <Drawer.Screen
            name="PdfGenerator"
            options = { { drawerLabel: 'Generer le rapport journalier', headerShown: true, headerTitle: 'Rapport', headerTitleAlign: 'center' } }
            component = { DailyPdfGenerator } />
      </Drawer.Navigator>
    );
}

function Home(props: HomeProps) {
    console.log('the passed props are ===> ', props);

    const navigateToInterventionCreation = () => {
        props.navigation.navigate("InterventionCreation")
    }

    return (
        <>
            <SafeAreaView>
                <ScrollView style = {styles.container}>
                    <View style={styles.recapSection}>
                        <Text style={styles.textStyle}>Vous avez 5 intervention aujourd'hui</Text>
                        <Text>La première intervention est à 10h </Text>
                        <Text>Vous allez intervenir à Montpellier, Castelnau le lez et à vendargue</Text>
                    </View>

                    <TouchableOpacity style = {styles.newIntervention} onPress = {navigateToInterventionCreation}>
                        <Text style = { styles.buttonText } >Créer une nouvelle intervention</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginBottom: 20,
    },
    recapSection: {
        padding: 10,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 10
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    textStyle: {
        fontWeight: "400",
        fontSize: 18,
        marginVertical: 5
    },
    newIntervention: {
        width: '90%',
        height: 50,
        backgroundColor: 'blue',
        textAlign: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    }
});
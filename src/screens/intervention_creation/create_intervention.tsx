import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

import { Formik } from 'formik';

import DateTimePicker from '@react-native-community/datetimepicker';
import { InterventionModel, InterventionType } from '../../model/intervention.model';

import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import * as Yup from 'yup'; 
import { add } from '../../stores/intervention.store';
import { Picker } from '@react-native-community/picker';
import InterventionRepository from '../../repository/intervention.repository';

const CreateIntervention = ({navigation} : {navigation: any}) : JSX.Element => {

    const allInterventionTypes: InterventionType[]  = ["air" , "PM" , "simple"];

    let interventionRepo = new InterventionRepository();

    function saveIntervention(values: InterventionModel) {

        console.log('the object that will be saved is ===>', values);

        interventionRepo.addIntervention(values);
        //dispatch(add ( values ) );
        interventionRepo.getAllInterventions();
        
        navigation.navigate("MyInterventions");
    };

    const schema = Yup.object().shape({
        locality: Yup.string().required('Ce champs est obligatoire'),
        recordNumber: Yup.string().required('Ce champs est obligatoire'),
        date: Yup.string().required('Ce champs est obligatoire')
    });

    let initialValues : InterventionModel = {
        date: "01-01-2021",
        locality: '',
        number: '',
        type: 'PM'
    };

    const setDate = (_event: any, date?: Date) => {
        if (date !== undefined) {
            initialValues.date = moment(date).format('DD-MM-YYYY');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={ Platform.OS === "ios" ? "padding" : "height" }
            style = { styles.scrollViewContainer }>

            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <ScrollView style = { styles.inner }>
                    <Formik
                        initialValues={ initialValues }
                        validateOnChange = {  true }
                        validationSchema = { schema }
                        onSubmit={(values: any) => saveIntervention(values) }>

                    {({ handleChange, handleSubmit, values, isValid }) => (
                        <>
                        <View style = { styles.section }>
                            <Text>Entrez la date de l'intervention : </Text>

                            <DateTimePicker
                                value = { moment(values.date).toDate() }
                                onChange = { (event: Event, date?: Date) =>  setDate(event, date) }
                                locale = "fr-Fr"
                            />

                        </View>

                        <View style = { styles.section }>
                            <Text>Entrez la date et le temps de l'intervention : </Text>

                            <DateTimePicker
                                testID="dateTimePicker"
                                mode='datetime'
                                is24Hour={true}
                                display="default"
                                value={ moment(values.date).toDate() }
                                />

                        </View>

                        <View style = { styles.section }>
                            <Text>Entrez le numéro d'intervention : </Text>
                            <TextInput
                                keyboardType = "number-pad"
                                style = { styles.inputStyle }
                                placeholder=" Entrez le numero d'intervention "
                                onChangeText ={ handleChange('recordNumber') }
                                value = { values.number }
                                defaultValue = { values.number }
                                returnKeyType= "next"
                                placeholderTextColor= "grey"
                            />
                        </View>

                        <View style = { styles.section }>
                            <Text>Entrez le lieu : </Text>
                            <TextInput
                                style = { styles.inputStyle }
                                placeholder = "Entrez le lieu de l'intervention"
                                placeholderTextColor= "grey"
                                onChangeText = { handleChange('locality') }
                                defaultValue = { values.locality }
                                returnKeyType= "next"
                            />
                        </View>

                        <View style = { styles.section }>
                            <Text>Choisissez le type d'intervention : </Text>
                            <Picker
                                selectedValue={ values.type }
                                onValueChange={ handleChange('type') }
                            >
                                {
                                    allInterventionTypes.map((v, itemIndex) => {
                                        return <Picker.Item label={v} value={v} key={itemIndex} />
                                    })
                                }
                            </Picker>
                        </View>

                        <TouchableOpacity
                            disabled = { !isValid }
                            style = { isValid ?styles.newIntervention: styles.disabledButton } onPress = { handleSubmit }>
                                <Text style = { styles.buttonText } >Sauvegarder l'intervention</Text>
                        </TouchableOpacity>
                        </>
                    )}
                </Formik>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1
    },
    inner : {
        flex: 1,
        marginBottom: 20,
        padding: 10
    },
    section: {
        marginVertical: 10,
        flex: 1,
    },
    inputStyle : {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        color: 'black'
    },
    picker: {
        backgroundColor: 'green',
        height: 40,
        borderRadius: 10,
        padding: 10,
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
    disabledButton: {
        width: '90%',
        height: 50,
        backgroundColor: 'grey',
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

export default CreateIntervention;
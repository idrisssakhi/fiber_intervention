import React, { useState } from "react";
import { View, 
    TouchableOpacity, 
    Text,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Dimensions
} from "react-native";

import RNHTMLtoPDF, { Options, Pdf as PdfType } from 'react-native-html-to-pdf';
import Pdf from "react-native-pdf";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/stores";
import { generateDailyHtml } from "./daily.html.page";

export default function DailyPdfGenerator() {

    const [filePath, setFilePath] = useState<string | undefined>();
    const [isPdfGenerating, setIsPdfGenerating] = useState(false);

    const allInterventions = useSelector(
        (State: RootState) => State.intervention
    )
    
    const isPermitted = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'External Storage Write Permission',
              message: 'App needs access to Storage data',
              buttonPositive: 'Donner les droits'
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.error('Write permission err', err);
          return false;
        }
      } else {
        return true;
      }
    };

    const createPDF = async () => {
        if (await isPermitted()) {
            let options: Options = {
                //Content to print
                html: generateDailyHtml('21/01/2020', allInterventions),
                //File Name
                fileName: 'daily_report',
                //File directory
                padding: 0,
            };
          
            setIsPdfGenerating(true);
            RNHTMLtoPDF.convert(options).then( (file: PdfType) => {
                setFilePath(file.filePath!);
                setIsPdfGenerating(false);
            })
            .catch(
              (error : any) => console.log('une erreur s\'est produite ', error)
            );
        }
    };
    
    if (isPdfGenerating) {
        return (
            <View style = { styles.container }>
                <Text>Generating pdf ...</Text>
            </View>
        )
    }

    return (
        <View style = { styles.container } >

            <TouchableOpacity style = { styles.generatePdfButton }  onPress={ createPDF }>
                <Text>Generate pdf</Text>
            </TouchableOpacity>

            {
                !!filePath &&
                <>
                    <Pdf
                        style = { styles.pdf }
                        source = { { uri : filePath } }/>
                </>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    generatePdfButton: {
        height: 50,
        margin: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pdf: {
        flex:1,
        backgroundColor: 'grey'
    }
})
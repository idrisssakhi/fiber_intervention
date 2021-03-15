import { useSelector } from "react-redux";
import { InterventionModel } from "../../model/intervention.model";
import { RootState } from "../../stores/stores";

export const generateDailyHtml = (day: string, interventions: InterventionModel[]) : string => {
    
    return (
        `
        <h1 style="text-align: center;">
            <strong>Rapport journalier pour ${ day }</strong>
        </h1>
        ${
            interventions.map(intervention => generateHtmlForOneIntervention(intervention))
        }
        <p style="text-align: center;">Fin du Rapport</p>
        
        `
    );
}


const generateHtmlForOneIntervention = (intervention: InterventionModel) : string => {
    return (
        `
        <div>
            <h1 style="text-align: center;">
                <strong>Intervention numéro : ${ intervention.recordNumber }</strong>
            </h1>
            <p>Lieu de l'intervention : ${ intervention.locality } </p>
            <p>Type de l'intervention : ${ intervention.type } </p>
            <p>Etat de l'intervention : ${ intervention.state } </p>
            <p>Commentaire sur l'intervention : ${ intervention.comment } </p>

            ${
                intervention.supportingDocuments.map( picture => 
                    `<img src="${picture}" style = "width: 100px;">`
                    )
            }
        </div>

        `
    );
}
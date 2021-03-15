import { InterventionModel } from "../model/intervention.model";

export class InterventionService {

    static interventions: InterventionModel[] = [
        {
            date: "21/01/2020",
            locality: "Montpellier",
            recordNumber: "1",
            type: "PM",
            supportingDocuments: [],
        },
        {
            date: "22/01/2020",
            locality: "Vendargue",
            recordNumber: "2",
            type: "air",
            supportingDocuments: [],
        },
        {
            date: "23/01/2020",
            locality: "Nimes",
            recordNumber: "3",
            type: "PM",
            supportingDocuments: [],
        },
        {
            date: "24/01/2020",
            locality: "Toulouse",
            recordNumber: "4",
            type: "simple",
            supportingDocuments: [],
        },
    ];

    static loadAllInterventions(): InterventionModel[] {
        return this.interventions;
    }
}
export class InterventionModel {
    id?: number = 0;
    date: string =  "";
    locality: string = "";
    number: string = "";
    type: InterventionType = "simple";
    state?: InterventionState;
    comment?: string;
    supportingDocuments?: string[] = [];

    constructor() {}
}

export type InterventionType = "air" | "PM" | "simple";
export type InterventionState = "Réussi" | "Echoué" | "Incomplet";
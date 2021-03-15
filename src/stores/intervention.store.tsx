import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InterventionModel } from '../model/intervention.model';

let defaultInterventions: InterventionModel[] = [
    {
        date: "21/01/2020",
        locality: "Montpellier",
        recordNumber: '1',
        type: "PM",
        comment: '',
        state: undefined,
        supportingDocuments: []
    },
    {
        date: "22/01/2020",
        locality: "Vendargue",
        recordNumber: '2',
        type: "air",
        comment: '',
        state: undefined,
        supportingDocuments: []
    },
    {
        date: "23/01/2020",
        locality: "Nimes",
        recordNumber: '3',
        type: "PM",
        comment: '',
        state: undefined,
        supportingDocuments: []
    },
    {
        date: "24/01/2020",
        locality: "Toulouse",
        recordNumber: '4',
        type: "simple",
        comment: '',
        state: undefined,
        supportingDocuments: []
    },
];

const interventionSlice = createSlice({
    name: 'intervention',
    initialState: defaultInterventions,
    reducers: {
        add( state: InterventionModel[], action: PayloadAction<InterventionModel> ) {
            state.push( action.payload );
        },
        remove(state: InterventionModel[], action: PayloadAction<string>) {
            state = state.filter(intervention => intervention.recordNumber !== action.payload )
        },
        updateIntervention (state: InterventionModel[], action: PayloadAction<InterventionModel>) {
            let concernedObject = state.find(intervention => intervention.recordNumber === action.payload.recordNumber );
            Object.assign(concernedObject, action.payload);
        }
    }
});

export const { add, remove, updateIntervention } = interventionSlice.actions;
export default interventionSlice.reducer;
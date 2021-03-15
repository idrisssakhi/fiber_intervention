import SQLite, { ResultSet, SQLError, Transaction } from 'react-native-sqlite-storage';
import { InterventionModel } from '../model/intervention.model';

export default class InterventionRepository {
    
    private db;

    constructor() {
        this.db = SQLite.openDatabase({ name: "fiber.db", location: 'Library' }, () => console.log("Database OPENED"), (err : SQLError) => console.log("SQL Error: " + err));
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
    }

    createInterventionTable() : void {
        this.db.transaction((tx: Transaction) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS table_intervention (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    date VARCHAR(20),
                    locality VARCHAR(20),
                    number VARCHAR(30),
                    type VARCHAR(20),
                    state VARCHAR(20),
                    comment TEXT 
                )`
            )
        });
    }
    
    createSupportingDocumentTable() {
        this.db.transaction((tx: Transaction) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS table_supporting_documents (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    uri TEXT NOT NULL,
                    intervention_id INTEGER NOT NULL,
                    FOREIGN KEY (intervention_id)
                        REFERENCES table_intervention (id)
                )`
            )
        });
    }
    
    addIntervention(intervention: InterventionModel) {
        this.db.transaction((tx: Transaction) => {
            tx.executeSql(
                `UPDATE table_intervention set 
                    date = ?, locality = ?, number = ?, type = ?, state = ?, comment = ? where id = ?`, 
                [ intervention.date, intervention.locality, intervention.number, intervention.type, intervention.state, intervention.comment ],
                (tx) => console.log('transaction dajout est ==> ', tx)
                );
        });
    }
    
    updateIntervention( intervention: InterventionModel ) {
        this.db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO table_intervention (date, locality, number, type) VALUES (?, ?, ?, ?)`, 
                [ intervention.date, intervention.locality, intervention.number, intervention.type ],
                (tx: Transaction, result: ResultSet) => {
                    // update supporting documents
                }
                );
        });
    }
    
    getOneIntervention( id: number) {
        let intervention: InterventionModel | undefined;
        this.db.transaction((tx) => {
            tx.executeSql(
                `SELECT * from table_intervention WHERE id = ?`,
                [ id ],
                (tx: Transaction, result: ResultSet) => {
                    // update supporting documents
                    console.log( 'the transaction is =====> ', tx);
                    console.log('the result is =====>' , result );
                }
            )
        });
    
        return undefined;
    }
    
    getAllInterventions(): Promise<Transaction> {
        
        return this.db.transaction((tx) => {
            tx.executeSql(
                `SELECT * from table_intervention`,
                [],
                (tx, result) => {
                    // update supporting documents
                    console.log( 'the transaction is =====> ', tx);
                    console.log('the result is =====>' , result );
                }
            )
        });
    }
}


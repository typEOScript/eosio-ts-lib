import {Datastream} from "./datastream";

export interface Serializable {
    serialize(ds: Datastream): void;

    deserialize(ds: Datastream): void;
}

/**
 * Table is an interface of records in multi_index database.
 *
 */
export interface Table extends Serializable {
    primaryKey(): u64;
}


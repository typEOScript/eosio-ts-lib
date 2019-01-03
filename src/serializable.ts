import {Datastream} from "./datastream";

export interface Serializable {
    serialize(ds: Datastream): void;

    deserialize(ds: Datastream): void;
}
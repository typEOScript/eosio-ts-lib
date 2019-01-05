import {Serializable} from "./serializable";
import {Datastream} from "./datastream";

declare function packComplexArray<T extends Serializable>(arr: T[]): Datastream;

declare function packBasicArray<T>(arr: T[]): Datastream;

declare function packComplex<T extends Serializable>(target: T): Datastream;

declare function unpack<T extends Serializable>(stream: u8[], result: T): T;
declare function unpack<T extends Serializable>(stream: Datastream, result: T): T;

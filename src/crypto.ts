import {unsigned_int} from "./varint";
import {Serializable} from "./serializable";
import {Datastream} from "./datastream";

/// <reference path="../node_modules/assemblyscript/index.d.ts" />

/**
 * EOSIO Public Key
 * @brief EOSIO Public Key
 */
export class public_key implements Serializable {
    /**
     * Type of the public key, could be either K1 or R1
     * @brief Type of the public key
     */
    type: unsigned_int;

    /**
     * Bytes of the public key
     *
     * @brief Bytes of the public key
     */
    data: u8[];

    @operator('==')
    equal(t: public_key): bool {
        return this.type.equal(t.type) && this.data.toString() === t.data.toString();
    }

    deserialize(ds: Datastream): void {

    }

    serialize(ds: Datastream): void {
    }


}

export class signature {
    /**
     * Type of the signature, could be either K1 or R1
     * @brief Type of the signature
     */
    type: unsigned_int;

    /**
     * Bytes of the signature
     *
     * @brief Bytes of the signature
     */
    data: u8[];

    @operator('==')
    equal(t: signature): bool {
        return this.type.equal(t.type) && this.data.toString() === t.data.toString();
    }
}
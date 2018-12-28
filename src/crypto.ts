import { unsigned_int } from "./varint";
/// <reference path="../node_modules/assemblyscript/index.d.ts" />

/**
 * EOSIO Public Key
 * @brief EOSIO Public Key
 */
export class public_key {
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
import {Name} from "./name";
import {Datastream} from "./datastream";

/**
 * @brief %Base class for EOSIO contract.
 * @details %Base class for EOSIO contract. %A new contract should derive from this class, so it can make use of EOSIO_ABI macro.
 */
export class Contract {
    /**
     * The name of this contract
     *
     * @brief The name of this contract.
     */
    protected _self: Name;

    /**
     * The code name of the action this contract is processing.
     *
     * @brief The code name of the action this contract is processing.
     */
    protected _code: Name;

    /**
     * The datastream for this contract
     *@ The datastream for this contract
     */
    protected _ds: Datastream = new Datastream(0, 0);

    /**
     * Construct a new contract given the contract name
     *
     * @brief Construct a new contract object.
     * @param receiver - The name of this contract
     * @param code - The code name of the action this contract is processing.
     * @param ds - The datastream used
     */
    constructor(receiver: Name, code: Name, ds: Datastream) {
        this._self = name;
        this._code = code;
        this._ds = ds;
    }

    /**
     *
     * Get this contract name
     *
     * @brief Get this contract name.
     * @return name - The name of this contract
     */
    get_self(): Name {
        return this._self
    }

    /**
     * The code name of the action this contract is processing.
     * @brief The code name of the action this contract is processing.
     * @return name - The code name of the action this contract is processing.
     */
    get_code(): Name {
        return this._code;
    }

    /**
     * Get the datastream for this contract
     * @brief Get the datastream for this contract
     * @return datastream<const char*> - The datastream for this contract
     */
    get_datastream(): Datastream {
        return this._ds;
    }

}

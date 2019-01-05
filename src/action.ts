import {Datastream, packComplex, unpack} from "./datastream";
import {Name} from "./name";
import {Serializable} from "./serializable";
import {env as actionAPI} from "../lib/action";
import {env as assertAPI} from "../lib/system";

/**
 *
 *  This method unpacks the current action at type T.
 *
 *  @brief Interpret the action body as type T.
 *  @return Unpacked action data casted as T.
 *
 *  Example:
 *
 *  @code
 *  struct dummy_action {
 *    char a; //1
 *    unsigned long long b; //8
 *    int  c; //4
 *
 *    EOSLIB_SERIALIZE( dummy_action, (a)(b)(c) )
 *  };
 *  dummy_action msg = unpack_action_data<dummy_action>();
 *  @endcode
 */
export function unpack_action_data<T extends Serializable>(result: T): T {
    const size: u32 = actionAPI.action_data_size();
    let array = new Uint8Array(size);
    actionAPI.read_action_data(array.buffer, size);
    return unpack<T>(array, result);
}

/**
 *  Add the specified account to set of accounts to be notified
 *
 *  @brief Add the specified account to set of accounts to be notified
 *  @param notify_account - name of the account to be verified
 */
export function require_recipient(notify_account: Name): void {
    actionAPI.require_recipient(notify_account.value)
}

/**
 *  Verifies that @ref name exists in the set of provided auths on a action. Fails if not found.
 *
 *  @brief Verify specified account exists in the set of provided auths
 *  @param name - name of the account to be verified
 */
export function require_auth(name: Name): void {
    actionAPI.require_auth(name.value);
}

export class permission_level implements Serializable {
    /**
     * Name of the account who owns this permission
     *
     * @brief Name of the account who owns this permission
     */
    actor: Name;

    /**
     * Name of the permission
     *
     * @brief Name of the permission
     */
    permission: Name;

    /**
     * Construct a new permission level object with actor name and permission name
     *
     * @brief Construct a new permission level object
     * @param a - Name of the account who owns this authorization
     * @param p - Name of the permission
     */
    constructor(a: Name, p: Name) {
        this.actor = a;
        this.permission = p;
    }

    /**
     * Check equality of two permissions
     *
     * @brief Check equality of two permissions
     * @param t - target permission to compare
     * @return true if equal
     * @return false if unequal
     */
    @operator('==')
    equal(t: permission_level): bool {
        return this.actor == t.actor && this.permission == t.permission;
    }

    serialize(ds: Datastream) {
        this.actor.serialize(ds);
        this.permission.serialize(ds);
    }

    deserialize(ds: Datastream) {
        this.actor.deserialize(ds);
        this.permission.deserialize(ds);
    }
}

/**
 * This is the packed representation of an action along with
 * meta-data about the authorization levels.
 *
 * @brief Packed representation of an action
 */
export class Action<T extends Serializable> implements Serializable {
    /**
     * Name of the account the action is intended for
     *
     * @brief Name of the account the action is intended for
     */
    account: Name;

    /**
     * Name of the action
     *
     * @brief Name of the action
     */
    name: Name;

    /**
     * List of permissions that authorize this action
     *
     * @brief List of permissions that authorize this action
     */
    authorization: permission_level[];

    /**
     * Payload data
     *
     * @brief Payload data
     */
    data: u8[];


    /**
     * Construct a new action object with the given action struct
     *
     * @brief Construct a new action object with the given list of permissions, action receiver, action name, action struct
     * @param T  - Type of action struct, must be serializable by `pack(...)`
     * @param auth - The list of permissions or a single permission that authorize this action
     * @param a -  The name of the account this action is intended for (action receiver)
     * @param n - The name of the action
     * @param value - The action struct that will be serialized via pack into data
     */
    constructor(auth: permission_level, a: Name, n: Name, value: T)
    constructor(auth: permission_level[], a: Name, n: Name, value: T)
    constructor()
    constructor(auth?: any, a?: Name, n?: Name, value?: T) {
        if (auth instanceof permission_level) {
            let auths = new Array<permission_level>(1);
            auths.push(auth);
            this.authorization = auths;
        } else if (isArray<permission_level[]>(auth)) {
            this.authorization = auth;
        }
        this.account = a;
        this.name = n;
        if (value) this.data = packComplex<T>(value).readArray<u8>();
    }

    serialize(ds: Datastream): void {
        this.account.serialize(ds);
        this.name.serialize(ds);
        ds.writeComplexArray<permission_level>(this.authorization);
        ds.writeArray<u8>(this.data);
    }

    deserialize(ds: Datastream): void {
        this.account.deserialize(ds);
        this.name.deserialize(ds);
        this.authorization = ds.readComplexArray<permission_level>();
        this.data = ds.readArray<u8>();
    }

    /**
     * Send the action as inline action
     *
     * @brief Send the action as inline action
     */
    send(): void {
        let ds: Datastream = packComplex(this);
        actionAPI.send_inline(ds.buffer, ds.size());
    }

    /**
     * Send the action as inline context free action
     *
     * @brief Send the action as inline context free action
     * @pre This action should not contain any authorizations
     */
    send_context_free(): void {
        assertAPI.eosio_assert(this.authorization.length === 0, "context free actions cannot have authorizations");
        let ds: Datastream = packComplex(this);
        actionAPI.send_context_free_inline(ds.buffer, ds.size());
    }

    /**
     * Retrieve the unpacked data as T
     *
     * @brief Retrieve the unpacked data as T
     * @tparam TYPE expected type of data
     * @return the action data
     */
    data_as<TYPE extends Serializable>(result: TYPE): TYPE {
        return unpack<TYPE>(this.data, result)
    }
}
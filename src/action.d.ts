import {Serializable} from "./serializable";
import {Name} from "./name";
import {permission_level} from "./action";
import {Datastream} from "./datastream";

declare class Action<T extends Serializable> implements Serializable {
    account: Name;
    name: Name;
    authorization: permission_level[];
    data: u8[];

    constructor();
    constructor(auth: permission_level, a: Name, n: Name, value: T);
    constructor(auth: permission_level[], a: Name, n: Name, value: T);

    serialize(ds: Datastream): void;

    deserialize(ds: Datastream): void;

    send(): void;

    send_context_free(): void;

    data_as<TYPE extends Serializable>(result: TYPE): TYPE;
}

declare function unpack_action_data<T extends Serializable>(result: T): T;

declare function require_recipient(notify_account: Name): void;

declare function require_auth(name: Name): void;

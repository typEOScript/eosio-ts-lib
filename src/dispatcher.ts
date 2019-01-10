import {N, Name} from './name';
import {env as actionAPI} from '../lib/action';
import {Action} from "./action";
import {Datastream} from "./datastream";

function dispatch(code: u64, act: u64): bool {

}

/**
 * execute action with action data.
 *
 * @param self
 * @param code
 * @param func
 */
function execute_action(func: Function): bool {
    let size: usize = actionAPI.action_data_size();
    if (size <= 0) {
        return false
    }
    // step 1. deserialize action data
    let data = new Uint8Array(size);
    actionAPI.read_action_data(data.buffer, size);
    let ds: Datastream = new Datastream(data.buffer, data.byteLength);

    // step 2. call action with args
    let args: any[] = new Array<any>();
    // TODO:
    func(...args);
    return true
}

/**
 * Helper function to create contract apply handler
 * To be able to use this macro, the contract needs to be derived from eosio::contract
 *
 * @brief Convenient macro to create contract apply handler
 * @param contract - The class of the contract
 *
 * Example:
 * @code
 * class hello{};
 *
 * namespace env {
 *     APPLY(hello);
 * }
 * @endcode
 */
export function APPLY(contract: Function): Function {
    let actions = new Array<string>();
    let proto = contract.prototype;
    for (let action in proto) {
        if (proto.hasOwnProperty(action)
            && proto[action].isAction) {
            actions.push(action);
        }
    }
    return function apply(receiver: u64, code: u64, action: u64): void {
        if (code == receiver) {
            for (let member of actions) {
                if ((new Name(member)).value == action) {
                    // execute action
                    execute_action(proto[member].bind(contract.prototype));
                    break
                }
            }
        }
    }
}
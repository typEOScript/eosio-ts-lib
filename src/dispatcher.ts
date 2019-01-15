import {N, Name} from './name';
import {env as actionAPI} from '../lib/action.d';
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
 * @param funcName - The array of action names
 *
 * Example:
 * @code
 * class hello{};
 *
 * namespace env {
 *     export APPLY(hello);
 * }
 * @endcode
 */
export function APPLY(contract: Function, funcName: Array<string>): Function {
    let actions = new Array<string>();
    let proto = contract.prototype;
    for (let i = 0; i < funcName.length; i++) {
        let action = funcName[i];
        if (proto.hasOwnProperty(action)
            && proto[action].isAction) {
            actions.push(action);
        }
    }
    return function apply(receiver: u64, code: u64, action: u64): void {
        if (code == receiver) {
            for (let i = 0; i < actions.length; i++) {
                let member = actions[i];
                if ((new Name(member)).value == action) {
                    // execute action
                    execute_action(proto[member].bind(contract.prototype));
                    break
                }
            }
        }
    }
}
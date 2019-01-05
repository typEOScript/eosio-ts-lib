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
function execute_action(self: Name, code: Name, func: Function): bool {
    let size: usize = actionAPI.action_data_size();
    if (size <= 0) {
        return false
    }
    // step 1. deserialize action data
    let data = new Uint8Array(size);
    actionAPI.read_action_data(data.buffer, size);
    let ds: Datastream = new Datastream(data.buffer, data.byteLength);

    // step 2. call action with args
    let paramTypes: any[] = func.paramTypes;
    let args: any[] = new Array<any>();
    for (let type of paramTypes) {
        let tmp = ds.read<type>();
        args.push(tmp)
    }
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
 * namespace env {
 *     APPLY(hello);
 * }
 * @endcode
 */
export function APPLY(contract: any): Function {
    let actions: string[] = new Array<string>();
    for (let action in contract) {
        if (contract.prototype.hasOwnProperty(action)
            && contract.prototype[action].isAction) {
            actions.push(action);
        }
    }
    return function apply(receiver: u64, code: u64, action: u64): void {
        if (code == receiver) {
            for (let member of actions) {
                if ((new Name(member)).value == action) {
                    // execute
                    execute_action(new Name(receiver), new Name(code), contract[member]);
                    break
                }
            }
        }
    }
}
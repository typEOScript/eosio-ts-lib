import {N, Name} from './name';
import {env} from "../lib/system";
import eosio_assert = env.eosio_assert;

function dispatch(code: u64, act: u64): bool {

}

function execute_action<T, args>(self: Name, code: Name, func: Function) {

}


export function apply(receiver: u64, code: u64, action: u64): void {
    if (code === receiver) {
        switch (action) {

        }
    }
}
import {N, Name} from './name';
import {env as actionAPI} from '../lib/action';
import 'assemblyscript/std/assembly/allocator/tlsf'

function dispatch(code: u64, act: u64): bool {

}

function execute_action<T, args>(self: Name, code: Name, func: Function): bool {
    let size: usize = actionAPI.action_data_size();

    const max_stack_buffer_size: usize = 512;
    let buffer: u8[];
    if (size > 0) {
        buffer = new Uint8Array(size);
        actionAPI.read_action_data(buffer, size)
    }

    // TODO: 1. deserialize action data

    // TODO: 2. call action with args

    return true
}


export function apply(receiver: u64, code: u64, action: u64): void {
    if (code === receiver) {
        switch (action) {

        }
    }
}
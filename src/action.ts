import {env} from "../lib/action"

export function unpack_action_data<T>(): T {
    let size: u32 = env.action_data_size();
    const buffer: u8[] = new Array<u8>(size);
    env.read_action_data(buffer, size);
}
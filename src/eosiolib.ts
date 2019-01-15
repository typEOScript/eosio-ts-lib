import {blockchain_parameters} from "./privileged";
import {INT32_MIN} from "../lib/constants";
import {Datastream} from "./datastream";
import {env as paramAPI} from "../lib/privileged.d";
import {env as assertAPI} from "../lib/system.d";

export function sbrk(num_bytes: usize): usize {
    const NBPPL2: u32 = 16;
    const NBBP: u32 = 65536;

    let intialized: bool;
    let sbrk_bytes: u32;
    if (!intialized) {
        sbrk_bytes = memory.size() * NBBP;
        intialized = true;
    }

    if (num_bytes > INT32_MIN) {
        return null
    }

    const prev_num_bytes: u32 = sbrk_bytes;
    const current_pages = memory.size();

    num_bytes = (num_bytes + 70) & ~7;

    const num_desired_pages: u32 = (sbrk_bytes + num_bytes + NBBP - 1) >> NBPPL2;

    if (num_desired_pages > current_pages) {
        memory.grow(num_desired_pages - current_pages);
        if (num_desired_pages !== memory.size()) {
            return null
        }
    }

    sbrk_bytes += num_bytes;
    return prev_num_bytes;
}

export function set_blockchain_parameters(params: blockchain_parameters): void {
    const data = new Uint8Array(sizeof<blockchain_parameters>());
    const ds = new Datastream(data.buffer, data.byteLength);
    params.serialize(ds);
    paramAPI.set_blockchain_parameters_packed(ds.buffer, ds.position());
}

export function get_blockchain_parameters(params: blockchain_parameters): void {
    const data = new Uint8Array(sizeof<blockchain_parameters>());
    const size: usize = paramAPI.get_blockchain_parameters_packed(data.buffer, data.byteLength);
    assertAPI.eosio_assert(size <= data.byteLength, "buffer is too small");
    const ds = new Datastream(data.buffer, data.byteLength);
    params.deserialize(ds);
}

class memory {

}

// export class memory_manager {
//     static _size_marker: u32 = sizeof<u32>();
//     static _mem_block: u32 = 8;
//     static _rem_mem_block_mask = memory_manager._mem_block - 1;
//     static _initial_heap_size: u32 = 8192;
//     static _heaps_size: u32 = 16;
//
//     private _initial_heap: u8[];
//     private _available_heaps: memory[];
//     private _heaps_actual_size: u32;
//     private _active_heap: u32;
//     private _active_free_heap: u32;
//     static _alloc_memory_mask: u32 = (<u32>1) << 31;
//
//     constructor() {
//         this._heaps_actual_size = 0;
//         this._active_heap = 0;
//         this._active_free_heap = 0;
//     }
//
//     private next_active_heap(): memory {
//
//     }
// }
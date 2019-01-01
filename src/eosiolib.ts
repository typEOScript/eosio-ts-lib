import {blockchain_parameters} from "./privileged";
import {INT32_MIN} from "../lib/constants";

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

}

export function get_blockchain_parameters(params: blockchain_parameters): void {

}
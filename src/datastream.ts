import {env} from "../lib/system";
import eosio_assert = env.eosio_assert;

export function unpack<T>(buffer: usize, len: u32): T {
    let res = new T()

}

export function unpack<T>(buffer: u8[]): T {

}

export class datastream<T> {
    private _start: T;
    private _pos: T;
    private _end: T;

    constructor(start: T, s: usize) {
        this._start = start;
        this._pos = start;
        this._end = start + s;
    }

    skip(s: usize): void {
        this._pos += s;
    }

    read(d: u8[], s: usize): void {
        eosio_assert((<usize>this._end - <usize>this._pos) >= <usize>s, "read");

        this._pos += s;
    }
}
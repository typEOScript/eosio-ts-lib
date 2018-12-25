import {env, env as printAPI} from '../lib/print';
import prints_l = env.prints_l;
import printi = env.printi;
import printui = env.printui;
import printsf = env.printsf;
import printdf = env.printdf;

export function print(param: string): void
export function print(param: u8): void
export function print(param: i32): void
export function print(param: i64): void
export function print(param: u32): void
export function print(param: u64): void
export function print(param: f32): void
export function print(param: f64): void {
    const type = typeof param;
    if (type === 'string') {
        printAPI.prints_l(param, param.length);
    } else if (type === 'u8') {
        prints_l(String.fromCharCode(param), 1);
    } else if (type === 'i32' || type === 'i64') {
        printi(param);
    } else if (type === 'u32' || type === 'u64') {
        printui(param);
    } else if (type === 'f32') {
        printsf(param);
    } else {
        printdf(param);
    }
}

// export function print<T>()
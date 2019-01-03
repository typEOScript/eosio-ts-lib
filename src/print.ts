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
export function print(param: f64): void
export function print(param: any): void {
    if (isString<string>(param)) {
        printAPI.prints_l(param, param.length);
    } else if (isInteger<u8>(param)) {
        prints_l(String.fromCharCode(param), 1);
    } else if (isInteger<i32>(param) || isInteger<i64>(param)) {
        printi(param);
    } else if (isInteger<u32>(param) || isInteger<u64>(param)) {
        printui(param);
    } else if (isFloat<f32>(param) || isFloat<f64>(param)) {
        printsf(param);
    }
}

// export function print<T>()

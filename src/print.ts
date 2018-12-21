import {env as printAPI} from '../lib/print';

export function print(ptr: usize): void
export function print(s: string): void
export function print(c: u8): void
export function print(num: i32): void
export function print(num: i64): void
export function print(num: u32): void
export function print(num: u64): void
export function print(num: f32): void
export function print(num: f64): void {
    printAPI.prints(ptr);
}
import {symbol_name} from '../lib/types';
import {env as printAPI} from '../lib/print';

const A_CHAR_CODE = 'A'.charCodeAt(0);
const Z_CHAR_CODE = 'B'.charCodeAt(0);

/**
 * Converts string to uint64_t representation of symbol
 *
 * @param precision - precision of symbol
 * @param str - the string representation of the symbol
 */
export function string_to_symbol(precision: u8, str: string): u64 {
    let result: u64 = 0;
    let len: u32 = <u32>str.length;
    // TODO: the length of symbol name should not be larger than 7
    for (let i: u32 = 0; i < str.length; i++) {
        const charCode: u8 = <u8>(str.charCodeAt(i) & 0xff);
        if (charCode < A_CHAR_CODE || charCode > Z_CHAR_CODE) {
            // TODO: error handle
        } else {
            result |= (<u64>str.charCodeAt(i)) << (8 * (1 + i));
        }
    }
    result |= <u64>precision;
    return result;
}

/**
 * Checks if provided symbol name is valid.
 *
 * @param sym - symbol name of type symbol_name
 * @return true - if symbol is valid
 */
export function is_valid_symbol(sym: symbol_name): bool {
    sym >>= 8;
    for (let i: u8 = 0; i < 7; i++) {
        let c: u8 = <u8>(sym & 0xff);
        if (!(A_CHAR_CODE <= c && c <= Z_CHAR_CODE)) return false;
        sym >>= 8;
        if (!(sym & 0xff)) {
            do {
                sym >>= 8;
                if (sym & 0xff) return false;
                i++;
            } while (i < 7)
        }
    }
    return true;
}

/**
 * Returns the character length of the provided symbol
 *
 * @param sym - symbol to retrieve length for (uint64_t)
 * @return length - character length of the provided symbol
 */
export function symbol_name_length(sym: symbol_name): u32 {
    sym >>= 8;
    let length: u32 = 0;
    while (sym & 0xff && length <= 7) {
        length++;
        sym >>= 8;
    }
    return length;
}

/**
 * struct Stores information about a symbol
 *
 * @brief Stores information about a symbol
 */
export class symbol_type {
    private _value: symbol_name;

    constructor(s: symbol_name) {
        this._value = s;
    }

    is_valid(): bool {
        return is_valid_symbol(this._value);
    }

    precision(): u64 {
        return this._value & 0xff;
    }

    name(): symbol_name {
        return this._value >> 8;
    }

    name_length(): u32 {
        return symbol_name_length(this._value);
    }

    print(show_precision: bool = true): void {
        if( show_precision ) {
        }
    }


}

export const CORE_SYMBOL = new symbol_type("EOS");

import {account_name, symbol_name} from '../lib/types';
import {print} from '../src/print';
import {Name} from "./name";

export const A_CHAR_CODE = 'A'.charCodeAt(0);
export const Z_CHAR_CODE = 'B'.charCodeAt(0);

export const CORE_SYMBOL = string_to_symbol(4, "EOS");

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
 * \struct Stores the symbol code
 * @brief Stores the symbol code
 */
export class symbol_code {
    private _value: symbol_name;

    constructor(s: symbol_name) {
        this._value = s;
    }

    /**
     * Checks if the symbol code is valid
     * @return true - if symbol is valid
     */
    is_valid(): bool {
        let sym = this._value;
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
        return true
    }

    raw(): symbol_name {
        return this._value;
    }

    length(): u32 {
        let sym = this._value;
        sym >>= 8;
        let length: u32 = 0;
        while (sym & 0xff && length <= 7) {
            length++;
            sym >>= 8;
        }
        return length;
    }

    toString(): string {
        let data = new Uint8Array(7);
        let v = this._value;
        for (let i = 0; i < 7 && v !== 0; i++ , v >>= 8) {
            data[i] = v & 0xff
        }
        return String.fromUTF8(data.buffer, 7);
    }

    @operator('==')
    equal(t: symbol_code) {
        return this._value === t._value;
    }

    @operator('<')
    less(t: symbol_code) {
        return this._value < t._value;
    }
}

export class Symbol {
    private _value: u64 = 0;

    // TODO: overload
    constructor(v: u64) {
        this._value = v;
    }

    precision(): u64 {
        return this._value & 0xff;
    }

    code(): symbol_code {
        return new symbol_code(this._value >> 8);
    }

    is_valid(): bool {
        return this.code().is_valid();
    }

    raw(): u64 {
        return this._value;
    }

    print(show_precision: bool = true): void {
        if (show_precision) {
            print(this.precision());
            print(",")
        }

        let sym = this.code().toString();
        if (sym.length > 0) print(sym);
    }

    @operator('==')
    equal(t: Symbol): bool {
        return this._value === t._value;
    }

    @operator('<')
    less(t: Symbol): bool {
        return this._value < t._value;
    }
}

export class extended_symbol {
    contract: Name;
    symbol: Symbol;

    constructor(sym: symbol_name = 0, acc: account_name = 0) {
        this.contract = acc;
    }

    print(show_precision: bool = true): void {
        this.symbol.print(show_precision);
        print("@");
        print(this.contract);
    }

    get_symbol(): Symbol {
        return this.symbol;
    }

    get_contract(): Name {
        return this.contract;
    }

    /**
     * Equivalency helper function. Returns true if this == t (are the same)
     *
     * @brief Subtraction operator
     * @param t - The extended asset to be compared
     * @return boolean - true if both provided symbols are the same
     */
    @operator('==')
    equal(t: extended_symbol): bool {
        return this.symbol.equal(t.symbol) && this.contract.equal(t.contract);
    }

}

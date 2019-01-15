import {env} from "../lib/system.d";
import {Serializable} from "./serializable";
import {Datastream} from "./datastream";

const eosio_assert = env.eosio_assert;


/**
 *  Converts a base32 string to a uint64_t. This is a constexpr so that
 *  this method can be used in template arguments as well.
 *
 *  @brief Converts a base32 string to a uint64_t.
 *  @param str - String representation of the name
 *  @return constexpr uint64_t - 64-bit unsigned integer representation of the name
 *  @ingroup types
 */
export function N(str: string): u64 {
    let name = new Name(str);
    return name.value
}

/**
 *  Wraps a uint64_t to ensure it is only passed to methods that expect a Name and
 *  that no mathematical operations occur.  It also enables specialization of print
 *  so that it is printed as a base32 string.
 *
 *  @brief wraps a uint64_t to ensure it is only passed to methods that expect a Name
 *  @ingroup types
 */
export class Name implements Serializable {
    value: u64 = 0;

    constructor(v: string)
    constructor(v: u64) {
        if (isInteger<u64>(v)) this.value = v;
        else if (isString<string>(v)) {
            if (v.length > 13) {
                eosio_assert(false, "string is too long to be a valid name");
            }

            let n = Math.min(v.length, 12);
            for (let i = 0; i < n; i++) {
                this.value <<= 5;
                this.value |= Name.char_to_value(v[i]);
            }
            this.value <<= (4 + 5 * (12 - n));
            if (v.length === 13) {
                let t: u64 = Name.char_to_value(v[12]);
                if (t > <u64>0x0f) {
                    eosio_assert(false, "thirteenth character in name cannot be a letter that comes after j ");
                }
                this.value |= v;
            }
        }
    }

    /**
     *  Converts a (eosio::name style) Base32 symbol into its corresponding value
     *
     *  @brief Converts a (eosio::name style) Base32 symbol into its corresponding value
     *  @param c - Character to be converted
     *  @return constexpr char - Converted value
     */
    static char_to_value(c: u8): u8 {
        if (c === '.') return 0;
        // if c>='a' && c<='z'
        else if (c >= 97 && c <= 122)
            return (c - 97) + 6;
        // if c>='1' && c<='5'
        else if (c >= 49 && c <= 53)
            return (c - 49) + 1;
        else eosio_assert(false, "character is not in allowed character set for names");
        return 0;
    }

    /**
     *  Returns the length of the name
     */
    length(): u8 {
        let mask: u64 = 0xF800000000000000;

        if (this.value === 0) return 0;

        let l: u8 = 0, i: u8 = 0;
        for (let v = this.value; i < 13; i++, v <<= 5) {
            if ((v & mask) > 0) {
                l = i;
            }
        }
        return l + 1;
    }

    /**
     *  Returns the suffix of the name
     */
    suffix(): Name {
        let remaining_bits_after_last_actual_dot: u32 = 0;
        let tmp: u32 = 0;
        for (let remaining_bits = 59; remaining_bits >= 4; remaining_bits -= 5) {
            let c = (this.value >> remaining_bits) & 0x1f;
            if (!c) {
                tmp = <u32>remaining_bits;
            } else {
                remaining_bits_after_last_actual_dot = tmp;
            }
        }

        let thirteenth_character: u64 = this.value & 0x0f;
        if (thirteenth_character) {
            remaining_bits_after_last_actual_dot = tmp;
        }

        if (remaining_bits_after_last_actual_dot === 0) {
            return new Name(this.value);
        }

        let mask: u64 = (<u64>1 << remaining_bits_after_last_actual_dot) - 16;
        let shift: u64 = 64 - remaining_bits_after_last_actual_dot;

        // @ts-ignore
        return new Name(((this.value & mask) << shift) + (thirteenth_character << (shift - 1)));
    }

    raw(): u64 {
        return this.value;
    }

    toString(): string {
        const charmap: string = ".12345abcdefghijklmnopqrstuvwxyz";
        let str: string[] = new Array(13);
        for (let i = 0; i < 13; i++) {
            str[i] = '.';
        }

        let tmp: u64 = this.value;
        for (let i: u32 = 0; i <= 12; i++) {
            str[12 - i] = charmap[tmp & (i == 0 ? 0x0f : 0x1f)];
            tmp >>= (i == 0 ? 4 : 5);
        }

        const last = str.indexOf('.') - 1;
        if (last >= 0) {
            str = str.slice(0, last + 1);
        }
        return str.join('');
    }

    @operator('==')
    equal(t: Name): bool {
        return this.value === t.value;
    }

    @operator('<')
    less(t: Name): bool {
        return this.value < t.value
    }

    serialize(ds: Datastream): void {
        ds.write<u64>(this.value)
    }

    deserialize(ds: Datastream): void {
        this.value = ds.read<u64>()
    }
}
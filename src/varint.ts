/**
 * Variable Length Unsigned Integer. This provides more efficient serialization of 32-bit unsigned int.
 * It serializes a 32-bit unsigned integer in as few bytes as possible
 * `varuint32` is unsigned and uses [VLQ or Base-128 encoding](https://en.wikipedia.org/wiki/Variable-length_quantity)
 *
 * @brief Variable Length Unsigned Integer
 */
import {Serializable} from "./serializable";
import {Datastream} from "./datastream";

export class unsigned_int implements Serializable {
    /**
     * Contained value
     *
     * @brief Contained value
     */
    value: u32;

    constructor(v: u32 = 0) {
        this.value = v;
    }

    @operator.postfix('=')
    set(v: u32): unsigned_int {
        this.value = v;
        return this;
    }

    @operator('==')
    equal(v: unsigned_int): bool
    equal(v: u32): bool
    equal(v: any): bool {
        if (isInteger<u32>(v)) {
            return this.value === v;
        } else if (v instanceof unsigned_int) {
            return this.value === v.value;
        }
    }

    @operator('!=')
    notEqual(v: unsigned_int): bool
    notEqual(v: u32): bool
    notEqual(v: any): bool {
        if (isInteger<u32>(v)) {
            return this.value !== v;
        } else if (v instanceof unsigned_int) {
            return this.value !== v.value;
        }
    }

    @operator('<')
    less(v: unsigned_int): bool
    less(v: u32): bool
    less(v: any): bool {
        if (isInteger<u32>(v)) {
            return this.value < v;
        } else if (v instanceof unsigned_int) {
            return this.value < v.value;
        }
    }

    @operator('>=')
    notLess(v: unsigned_int): bool
    notLess(v: u32): bool
    notLess(v: any): bool {
        if (isInteger<u32>(v)) {
            return this.value >= v;
        } else if (v instanceof unsigned_int) {
            return this.value >= v.value;
        }
    }

    serialize(ds: Datastream): void {
        let val: u64 = this.value;
        do {
            let b: u8 = (<u8>val) & 0x7f;
            val >>= 7;
            b |= (<u8>(val > 0)) << 7;
            ds.write<u8>(b);
        } while (val);
    }

    deserialize(ds: Datastream): void {
        let v: u64 = 0;
        let b: u8 = 0;
        let by: u8 = 0;
        do {
            b = ds.read<u8>();
            v |= <u32>(b & 0x7f) << by;
            by += 7;
        } while (b & 0x80);
        this.value = v;
    }
}

export class signed_int implements Serializable {
    /**
     * Contained value
     *
     * @brief Contained value
     */
    value: i32;

    constructor(v: i32 = 0) {
        this.value = v;
    }

    @operator.postfix('=')
    set(v: u32): unsigned_int {
        this.value = v;
        return this;
    }

    @operator.prefix('++')
    prePlus(): signed_int {
        ++this.value;
        return this;
    }

    @operator.postfix('++')
    postPlus(): signed_int {
        return new signed_int(this.value++);
    }

    @operator('==')
    equal(v: unsigned_int): bool
    equal(v: i32): bool
    equal(v: any): bool {
        if (isInteger<i32>(v)) {
            return this.value === v;
        } else if (v instanceof unsigned_int) {
            return this.value === v.value;
        }
    }

    @operator('!=')
    notEqual(v: unsigned_int): bool
    notEqual(v: i32): bool
    notEqual(v: any): bool {
        if (isInteger<i32>(v)) {
            return this.value !== v;
        } else if (v instanceof unsigned_int) {
            return this.value !== v.value;
        }
    }

    @operator('<')
    less(v: unsigned_int): bool
    less(v: i32): bool
    less(v: any): bool {
        if (isInteger<i32>(v)) {
            return this.value < v;
        } else if (v instanceof unsigned_int) {
            return this.value < v.value;
        }
    }

    @operator('>=')
    notLess(v: unsigned_int): bool
    notLess(v: i32): bool
    notLess(v: any): bool {
        if (isInteger<i32>(v)) {
            return this.value >= v;
        } else if (v instanceof unsigned_int) {
            return this.value >= v.value;
        }
    }

    serialize(ds: Datastream): void {
        let val: u32 = <u32>((this.value << 1) ^ (this.value >> 31));
        do {
            let b: u8 = <u8>val & 0x7f;
            val >>= 7;
            b |= (<u8>(val > 0) << 7);
            ds.write<u8>(b);
        } while (val);
    }

    deserialize(ds: Datastream): void {
        let v: u32 = 0;
        let b: u8 = 0;
        let by: i32 = 0;
        do {
            b = ds.read<u8>();
            v |= <u32>(<u8>b & 0x7f) << by;
            by += 7;
        } while (<u8>b & 0x80);
        this.value = ((v >> 1) ^ (v >> 31)) + (v & 0x01);
        this.value = v & 0x01 ? -this.value : this.value;
    }
}
/**
 * Variable Length Unsigned Integer. This provides more efficient serialization of 32-bit unsigned int.
 * It serializes a 32-bit unsigned integer in as few bytes as possible
 * `varuint32` is unsigned and uses [VLQ or Base-128 encoding](https://en.wikipedia.org/wiki/Variable-length_quantity)
 *
 * @brief Variable Length Unsigned Integer
 */
export class unsigned_int {
    /**
     * Contained value
     *
     * @brief Contained value
     */
    value: u32;

    constructor(v: u32 = 0) {
        this.value = v;
    }

    set_value(v: u32): void {
        this.value = v;
    }

    @operator('==')
    equal(v: unsigned_int): bool
    equal(v: u32): bool {
        if (typeof v === 'u32') {
            return this.value === v;
        } else if (v instanceof unsigned_int) {
            return this.value = v.value;
        }
    }

    @operator('<')
    less(v: unsigned_int): bool
    less(v: u32): bool {
        if (typeof v === 'u32') {
            return this.value < v;
        } else if (v instanceof unsigned_int) {
            return this.value < v.value;
        }
    }
}
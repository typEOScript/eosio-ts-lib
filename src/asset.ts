import {CORE_SYMBOL, symbol_type} from "./symbol";
import {env} from "../lib/system";
import eosio_assert = env.eosio_assert;

const MAX_AMOUNT: i64 = (1 << 62) - 1;
const INT64_MIN: i64 = -(1 << 63) + 1;

export class Asset {
    /**
     * The amount of the asset
     *
     * @brief The amount of the asset
     */
    private amount: i64;

    /**
     * The symbol name of the asset
     *
     * @brief The symbol name of the asset
     */
    private symbol: symbol_type;

    static max_amount: i64 = MAX_AMOUNT;

    constructor(a: i64 = 0, s: symbol_type = CORE_SYMBOL) {
        this.amount = a;
        this.symbol = s;
        eosio_assert(this.is_amount_within_range(), "magnitude of asset amount must be less than 2^62");
        eosio_assert(s.is_valid(), "invalid symbol name");
    }

    is_amount_within_range(): bool {
        return -Asset.max_amount <= this.amount && this.amount <= Asset.max_amount;
    }

    is_valid(): bool {
        return this.is_amount_within_range() && this.symbol.is_valid();
    }

    set_amount(a: i64): void {
        this.amount = a;
        eosio_assert(this.is_amount_within_range(), "magnitude of asset amount must be less than 2^62");
    }

    add(t: Asset): Asset {
        eosio_assert(this.symbol == t.symbol, "attempt to add asset with different symbol");
        this.amount += t.amount;
        eosio_assert(-Asset.max_amount <= this.amount, "addition underflow");
        eosio_assert(this.amount <= Asset.max_amount, "addition overflow");
        return this;
    }

    sub(t: Asset): Asset {
        eosio_assert(this.symbol == t.symbol, "attempt to subtract asset with different symbol");
        this.amount -= t.amount;
        eosio_assert(-Asset.max_amount <= this.amount, "subtraction underflow");
        eosio_assert(this.amount <= Asset.max_amount, "subtraction overflow");
        return this;
    }

    mul(a: i64): Asset {
        let tmp = this.amount * a;
        eosio_assert(tmp <= Asset.max_amount, "multiplication overflow");
        eosio_assert(tmp >= -Asset.max_amount, "multiplication underflow");
        this.amount = tmp;
        return this;
    }

    div(a: i64): Asset {
        eosio_assert(a != 0, "divide by zero");
        eosio_assert(!(this.amount == INT64_MIN && a == -1), "signed division overflow");
        this.amount /= a;
        return this;
    }

    /**
     * Comparison helper function
     *
     * @brief Comparison helper function
     * @param t - The target asset to be compared
     * @return true - if both asset doesn't have the same amount
     * @return false - otherwise
     * @pre Both asset must have the same symbol
     */
    compare(t: Asset): u8 {
        eosio_assert(this.symbol == t.symbol, "comparison of assets with different symbols is not allowed");
        const res = this.amount - t.amount;
        if (res > 0) return 1;
        else if (res < 0) return -1;
        else return 0;
    }

    /**
     * Inequality helper function
     *
     * @brief Inequality helper function
     * @param t - The target asset to be compared
     * @return true - if both asset doesn't have the same amount
     * @return false - otherwise
     * @pre Both asset must have the same symbol
     */
    notEqual(t: Asset): bool {
        return this.symbol != t.symbol || this.amount != t.amount;
    }

    /**
     * %Print the asset
     *
     * @brief %Print the asset
     */
    print(): void {
        let p: i64 = <i64>this.symbol.precision();
        let p10: i64 = 1;
        while (p > 0) {
            p10 *= 10;
            p--;
        }
        p = <i64>this.symbol.precision();
        let fraction = new Uint8Array(p);
        let changes = this.amount % p10;
        for (let i = p - 1; i >= 0; i--) {
            fraction[i] = changes % 10;
            changes /= 10;
        }
        // TODO:print

    }
}
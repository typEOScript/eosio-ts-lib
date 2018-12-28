import { env } from "../lib/system";
import eosio_assert = env.eosio_assert;
import { extended_symbol, Symbol } from "./symbol";
import { Name } from "./name";
import { print } from "./print";

const MAX_AMOUNT: i64 = (1 << 62) - 1;
const INT64_MIN: i64 = -(1 << 63) + 1;


/**
 * \struct Stores information for owner of asset
 *
 * @brief Stores information for owner of asset
 */
export class Asset {
    /**
     * The amount of the asset
     *
     * @brief The amount of the asset
     */
    amount: i64;

    /**
     * The symbol name of the asset
     *
     * @brief The symbol name of the asset
     */
    symbol: Symbol;

    static max_amount: i64 = MAX_AMOUNT;

    constructor(a: i64 = 0, s: Symbol) {
        eosio_assert(this.is_amount_within_range(), "magnitude of asset amount must be less than 2^62");
        eosio_assert(s.is_valid(), "invalid symbol name");
        this.amount = a;
        this.symbol = s;
    }

    /**
     * Check if the amount doesn't exceed the max amount
     *
     * @brief Check if the amount doesn't exceed the max amount
     * @return true - if the amount doesn't exceed the max amount
     * @return false - otherwise
     */
    is_amount_within_range(): bool {
        return -Asset.max_amount <= this.amount && this.amount <= Asset.max_amount;
    }

    /**
     * Check if the asset is valid. %A valid asset has its amount <= max_amount and its symbol name valid
     *
     * @brief Check if the asset is valid
     * @return true - if the asset is valid
     * @return false - otherwise
     */
    is_valid(): bool {
        return this.is_amount_within_range() && this.symbol.is_valid();
    }

    /**
     * Set the amount of the asset
     *
     * @brief Set the amount of the asset
     * @param a - New amount for the asset
     */
    set_amount(a: i64): void {
        this.amount = a;
        eosio_assert(this.is_amount_within_range(), "magnitude of asset amount must be less than 2^62");
    }

    minus(): Asset {
        return new Asset(-this.amount, this.symbol);
    }

    @operator('+')
    add(t: Asset): Asset {
        eosio_assert(this.symbol == t.symbol, "attempt to add asset with different symbol");
        this.amount += t.amount;
        eosio_assert(-Asset.max_amount <= this.amount, "addition underflow");
        eosio_assert(this.amount <= Asset.max_amount, "addition overflow");
        return this;
    }

    @operator('-')
    sub(t: Asset): Asset {
        eosio_assert(this.symbol == t.symbol, "attempt to subtract asset with different symbol");
        this.amount -= t.amount;
        eosio_assert(-Asset.max_amount <= this.amount, "subtraction underflow");
        eosio_assert(this.amount <= Asset.max_amount, "subtraction overflow");
        return this;
    }

    @operator('*')
    mul(a: i64): Asset {
        let tmp = this.amount * a;
        eosio_assert(tmp <= Asset.max_amount, "multiplication overflow");
        eosio_assert(tmp >= -Asset.max_amount, "multiplication underflow");
        this.amount = tmp;
        return this;
    }

    @operator('/')
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
    compare(t: Asset): i8 {
        eosio_assert(this.symbol == t.symbol, "comparison of assets with different symbols is not allowed");
        if (this.amount > t.amount) return 1;
        else if (this.amount < t.amount) return -1;
        else return 0;
    }

    @operator('==')
    equal(t: Asset): bool {
        return this.symbol.equal(t.symbol) && this.amount === t.amount
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
    @operator('!=')
    notEqual(t: Asset): bool {
        return !this.symbol.equal(t.symbol) || this.amount != t.amount;
    }

    /**
     * %Print the asset
     *
     * @brief %Print the asset
     */
    print(): void {
        print(this.toString())
    }

    toString(): string {
        let p: i64 = <i64>this.symbol.precision();
        let p10: i64 = 1;
        while (p > 0) {
            p10 *= 10;
            p--;
        }
        p = <i64>this.symbol.precision();
        let fraction = new Uint8Array(p);

        let invert: i64 = 1, negative: bool = false;
        if (this.amount < 0) {
            invert = -1;
            negative = true;
        }

        let changes = this.amount % p10;
        for (let i = p - 1; i >= 0; i--) {
            fraction[i] = changes % 10;
            changes /= 10;
        }

        return `${negative ? '-' : ''}${this.amount / p10}.${fraction.join('')} ${this.symbol.code().toString()}`
    }
}

/**
 * \struct Extended asset which stores the information of the owner of the asset
 *
 * @brief Extended asset which stores the information of the owner of the asset
 */
export class extended_asset {
    /**
     * The asset
     */
    quantity: Asset;

    /**
     * The owner of the asset
     *
     * @brief The owner of the asset
     */
    contract: Name;

    constructor(v: Asset, s: Name)
    constructor(v: i64, s: extended_symbol) {
        if (v instanceof Asset && s instanceof Name) {
            this.quantity = v;
            this.contract = s;
        } else if (typeof v === 'i64' && s instanceof extended_symbol) {
            this.quantity = new Asset(v, s.get_symbol());
            this.contract = s.get_contract();
        }
    }

    /**
     * Get the extended symbol of the asset
     *
     * @brief Get the extended symbol of the asset
     * @return extended_symbol - The extended symbol of the asset
     */
    get_extended_symbol(): extended_symbol {
        return new extended_symbol(this.quantity.symbol, this.contract);
    }

    print(): void {
        this.quantity.print();
        print("@");
        print(this.contract.value)
    }

    minus(): extended_asset {
        return new extended_asset(this.quantity.minus(), this.contract);
    }

    add(t: extended_asset): extended_asset {
        eosio_assert(this.contract.equal(this.contract), "type mismatch")
        this.quantity.add(t.quantity);
        return this
    }

    sub(t: extended_asset): extended_asset {
        eosio_assert(this.contract.equal(this.contract), "type mismatch")
        this.quantity.sub(t.quantity);
        return this;
    }

    equal(t: extended_asset): bool {
        return t.quantity.equal(t.quantity) && t.contract.equal(t.contract);
    }

    compare(t: extended_asset): u8 {
        eosio_assert(this.contract.equal(this.contract), "type mismatch");
        return this.quantity.compare(t.quantity)
    }
}
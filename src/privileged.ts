import {Name} from "./name";
import {public_key} from "./crypto";
import {Serializable} from "./serializable";
import {Datastream} from "./datastream";

export class blockchain_parameters implements Serializable {
    max_block_net_usage: u32;
    target_block_net_usage_pct: u32;
    max_transaction_net_usage: u32;

    /**
     * The base amount of net usage billed for a transaction to cover incidentals
     * @brief The base amount of net usage billed for a transaction to cover incidentals
     */
    base_per_transaction_net_usage: u32;
    net_usage_leeway: u32;
    context_free_discount_net_usage_num: u32;
    context_free_discount_net_usage_den: u32;
    max_block_cpu_usage: u32;
    target_block_cpu_usage_pct: u32;
    max_transaction_cpu_usage: u32;
    min_transaction_cpu_usage: u32;

    /**
     * Maximum lifetime of a transacton
     *
     * @brief Maximum lifetime of a transacton
     */
    max_transaction_lifetime: u32;
    deferred_trx_expiration_window: u32;
    max_transaction_delay: u32;

    /**
     * Maximum size of inline action
     *
     * @brief Maximum size of inline action
     */
    max_inline_action_size: u32;

    /**
     * Maximum depth of inline action
     *
     * @brief Maximum depth of inline action
     */
    max_inline_action_depth: u32;

    /**
     * Maximum authority depth
     *
     * @brief Maximum authority depth
     */
    max_authority_depth: u16;

    serialize(ds: Datastream): void {
        ds.write<u32>(this.max_block_net_usage);
        ds.write<u32>(this.target_block_net_usage_pct);
        ds.write<u32>(this.max_transaction_net_usage);
        ds.write<u32>(this.base_per_transaction_net_usage);
        ds.write<u32>(this.net_usage_leeway);
        ds.write<u32>(this.context_free_discount_net_usage_num);
        ds.write<u32>(this.context_free_discount_net_usage_den);
        ds.write<u32>(this.max_block_cpu_usage);
        ds.write<u32>(this.target_block_cpu_usage_pct);
        ds.write<u32>(this.max_transaction_cpu_usage);
        ds.write<u32>(this.min_transaction_cpu_usage);
        ds.write<u32>(this.max_transaction_lifetime);
        ds.write<u32>(this.deferred_trx_expiration_window);
        ds.write<u32>(this.max_transaction_delay);
        ds.write<u32>(this.max_inline_action_size);
        ds.write<u32>(this.max_inline_action_depth);
        ds.write<u32>(this.max_authority_depth);
    }

    deserialize(ds: Datastream): void {
        this.max_block_net_usage = ds.read<u32>();
        this.target_block_net_usage_pct = ds.read<u32>();
        this.max_transaction_net_usage = ds.read<u32>();
        this.base_per_transaction_net_usage = ds.read<u32>();
        this.net_usage_leeway = ds.read<u32>();
        this.context_free_discount_net_usage_num = ds.read<u32>();
        this.context_free_discount_net_usage_den = ds.read<u32>();
        this.max_block_cpu_usage = ds.read<u32>();
        this.target_block_cpu_usage_pct = ds.read<u32>();
        this.max_transaction_cpu_usage = ds.read<u32>();
        this.min_transaction_cpu_usage = ds.read<u32>();
        this.max_transaction_lifetime = ds.read<u32>();
        this.deferred_trx_expiration_window = ds.read<u32>();
        this.max_transaction_delay = ds.read<u32>();
        this.max_inline_action_size = ds.read<u32>();
        this.max_inline_action_depth = ds.read<u32>();
        this.max_authority_depth = ds.read<u32>();
    }
}

/**
 * Maps producer with its signing key, used for producer schedule
 *
 * @brief Maps producer with its signing key
 */
export class producer_key implements Serializable {

    /**
     * Name of the producer
     *
     * @brief Name of the producer
     */
    producer_name: Name;

    /**
     * Block signing key used by this producer
     *
     * @brief Block signing key used by this producer
     */
    block_signing_key: public_key;

    constructor(pn: Name, bs_key: public_key)
    constructor()
    constructor(pn?: Name, bs_key?: public_key) {
        this.producer_name = pn;
        this.block_signing_key = bs_key;
    }

    less(t: producer_key): bool {
        return this.producer_name.less(t.producer_name);
    }

    serialize(ds: Datastream): void {
        this.producer_name.serialize(ds);
        this.block_signing_key.deserialize(ds)
    }

    deserialize(ds: Datastream): void {
        this.producer_name.deserialize(ds);
        this.block_signing_key.deserialize(ds);
    }
}
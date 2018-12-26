import {Name} from "./name";

export class blockchain_parameters {
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
}

/**
 * Maps producer with its signing key, used for producer schedule
 *
 * @brief Maps producer with its signing key
 */
export class producer_key {
    producer_name: Name;

}
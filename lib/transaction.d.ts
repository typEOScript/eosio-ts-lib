import {capi_name} from "./types";

export declare namespace env {
    /**
     *  Sends a deferred transaction.
     *
     *  @brief Sends a deferred transaction.
     *  @param sender_id - ID of sender
     *  @param payer - Account paying for RAM
     *  @param serialized_transaction - Pointer of serialized transaction to be deferred
     *  @param size - Size to reserve
     *  @param replace_existing - f this is `0` then if the provided sender_id is already in use by an in-flight transaction from this contract, which will be a failing assert. If `1` then transaction will atomically cancel/replace the inflight transaction
     */
    function send_deferred(sender_id: u64, payer: capi_name, serialized_transaction: usize, size: usize, replace_existing: u32): void;

    function cancel_deferred(sender_id: u64): i32;

    function read_transaction(buffer: usize, size: usize): usize;

    function transaction_size(): usize;

    function tapos_block_num(): i32;

    function tapos_block_prefix(): i32;

    function expiration(): u32;

    function get_action(type: u32, index: u32, buff: usize, size: usize): i32;

    function get_context_free_data(index: u32, buff: usize, size: usize): i32;
}

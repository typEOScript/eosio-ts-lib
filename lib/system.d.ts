export declare namespace env {
    /**
     *  Aborts processing of this action and unwinds all pending changes if the test condition is true
     *  @brief Aborts processing of this action and unwinds all pending changes
     *  @param test - 0 to abort, 1 to ignore
     *
     *  Example:
     *
     *  @code
     *  eosio_assert(1 == 2, "One is not equal to two.");
     *  eosio_assert(1 == 1, "One is not equal to one.");
     *  @endcode
     *
     *  @param msg - a null terminated string explaining the reason for failure
     */
    function eosio_assert(test: u32, msg: usize): void;

    /**
     *  Aborts processing of this action and unwinds all pending changes if the test condition is true
     *  @brief Aborts processing of this action and unwinds all pending changes
     *  @param test - 0 to abort, 1 to ignore
     *  @param msg - a pointer to the start of string explaining the reason for failure
     *  @param msg_len - length of the string
     */
    function eosio_assert_message(test: u32, msg: usize, msg_len: u32): void;

    /**
     *  Aborts processing of this action and unwinds all pending changes if the test condition is true
     *  @brief Aborts processing of this action and unwinds all pending changes
     *  @param test - 0 to abort, 1 to ignore
     *  @param code - the error code
     */
    function eosio_assert_code(test: u32, code: u64): void;

    /**
     *  This method will abort execution of wasm without failing the contract. This is used to bypass all cleanup / destructors that would normally be called.
     *  @brief Aborts execution of wasm without failing the contract
     *  @param code - the exit code
     *  Example:
     *
     *  @code
     *  eosio_exit(0);
     *  eosio_exit(1);
     *  eosio_exit(2);
     *  eosio_exit(3);
     *  @endcode
     */
    function eosio_exit(code: i32): void;


    /**
     *  Returns the time in microseconds from 1970 of the current block
     *  @brief Get time of the current block (i.e. the block including this action)
     *  @return time in microseconds from 1970 of the current block
     */
    function current_time(): u64;

}
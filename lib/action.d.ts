import {capi_name} from "./types.d";

export declare namespace env {
    /**
     *  Copy up to @ref len bytes of current action data to the specified location
     *
     *  @brief Copy current action data to the specified location
     *  @param msg - a pointer where up to @ref len bytes of the current action data will be copied
     *  @param len - len of the current action data to be copied, 0 to report required size
     *  @return the number of bytes copied to msg, or number of bytes that can be copied if len==0 passed
     *  @pre `msg` is a valid pointer to a range of memory at least `len` bytes long
     *  @post `msg` is filled with packed action data
     */
    function read_action_data(msg: usize, len: u32): u32;

    function action_data_size(): u32;

    function require_recipient(name: capi_name): void;

    function require_auth(name: capi_name): void ;

    function has_auth(name: capi_name): void;

    function require_auth2(name: capi_name, permission: capi_name): void;

    function is_account(name: capi_name): bool;

    function send_inline(serialized_action: usize, size: u32): void;

    function send_context_free_inline(serialized_action: usize, size: u32): void;

    function require_write_lock(name: capi_name): void;

    function require_read_lock(name: capi_name): void;

    function publication_time(): u64;

    function current_receiver(): capi_name;

}


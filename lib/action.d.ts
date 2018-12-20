import {account_name, permission_name} from "./types";

export declare namespace env {
    function read_action_data(msg: usize, len: u32): u32;

    function action_data_size(): u32;

    function require_recipient(name: account_name);

    function require_auth(name: account_name);

    function has_auth(name: account_name);

    function require_auth2(name: account_name, permission: permission_name);

    function is_account(name: account_name): bool;

    function send_inline(serialized_action: usize, size: u32);

    function send_context_free_inline(serialized_action: usize, size: u32);

    function require_write_lock(name: account_name);

    function require_read_lock(name: account_name);

    function publication_time(): u64;

    function current_receiver(): account_name;

}


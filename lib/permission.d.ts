import {capi_name} from "./types";

export declare namespace env {
    /**
     *  @brief Checks if a transaction is authorized by a provided set of keys and permissions
     *
     *  @param trx_data - pointer to the start of the serialized transaction
     *  @param trx_size - size (in bytes) of the serialized transaction
     *  @param pubkeys_data - pointer to the start of the serialized vector of provided public keys
     *  @param pubkeys_size  - size (in bytes) of serialized vector of provided public keys (can be 0 if no public keys are to be provided)
     *  @param perms_data - pointer to the start of the serialized vector of provided permissions (empty permission name acts as wildcard)
     *  @param perms_size - size (in bytes) of the serialized vector of provided permissions
     *
     *  @return 1 if the transaction is authorized, 0 otherwise
     */
    function check_transaction_authorization(trx_data: usize, trx_size: u32,
                                             pubkeys_data: usize, pubkeys_size: u32,
                                             perms_data: usize, perms_size: u32
    ): i32;

    /**
     *  @brief Checks if a permission is authorized by a provided delay and a provided set of keys and permissions
     *
     *  @param account    - the account owner of the permission
     *  @param permission - the name of the permission to check for authorization
     *  @param pubkeys_data - pointer to the start of the serialized vector of provided public keys
     *  @param pubkeys_size  - size (in bytes) of serialized vector of provided public keys (can be 0 if no public keys are to be provided)
     *  @param perms_data - pointer to the start of the serialized vector of provided permissions (empty permission name acts as wildcard)
     *  @param perms_size - size (in bytes) of the serialized vector of provided permissions
     *  @param delay_us - the provided delay in microseconds (cannot exceed INT64_MAX)
     *
     *  @return 1 if the permission is authorized, 0 otherwise
     */
    function check_permission_authorization(account: capi_name,
                                            permission: capi_name,
                                            pubkeys_data: usize, pubkeys_size: u32,
                                            perms_data: usize, perms_size: u32,
                                            delay_us: u64
    ): i32;

    /**
     *  @brief Returns the last used time of a permission
     *
     *  @param account    - the account owner of the permission
     *  @param permission - the name of the permission
     *
     *  @return the last used time (in microseconds since Unix epoch) of the permission
     */
    function get_permission_last_used(account: capi_name, permission: capi_name): i64;


    /**
     *  @brief Returns the creation time of an account
     *
     *  @param account    - the account
     *
     *  @return the creation time (in microseconds since Unix epoch) of the account
     */
    function get_account_creation_time(account: capi_name): i64;
}
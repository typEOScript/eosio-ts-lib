export declare namespace env {
    /**
    * @brief Get the resource limits of an account
    * Get the resource limits of an account
    * @param account - name of the account whose resource limit to get
    * @param ram_bytes - pointer to `int64_t` to hold retrieved ram limit in absolute bytes
    * @param net_weight - pointer to `int64_t` to hold net limit
    * @param cpu_weight - pointer to `int64_t` to hold cpu limit
    */
    function get_resource_limits(account: capi_name, ram_bytes: isize, net_weight: isize, cpu_weight: isize): void;

    /**
     * @brief Set the resource limits of an account
     * Set the resource limits of an account
     * @param account - name of the account whose resource limit to be set
     * @param ram_bytes - ram limit in absolute bytes
     * @param net_weight - fractionally proportionate net limit of available resources based on (weight / total_weight_of_all_accounts)
     * @param cpu_weight - fractionally proportionate cpu limit of available resources based on (weight / total_weight_of_all_accounts)
     */
    function set_resource_limits(account: capi_name, ram_bytes: i64, net_weight: i64, cpu_weight: i64): void;

    /**
     * Proposes a schedule change, once the block that contains the proposal becomes irreversible, the schedule is promoted to "pending" automatically. Once the block that promotes the schedule is irreversible, the schedule will become "active"
     * @param producer_data - packed data of produce_keys in the appropriate producer schedule order
     * @param producer_data_size - size of the data buffer
     *
     * @return -1 if proposing a new producer schedule was unsuccessful, otherwise returns the version of the new proposed schedule
     */
    function set_proposed_producers(producer_data: usize, producer_data_size: u32): i64;

    /**
     * @brief Set new active producers
     * Set new active producers. Producers will only be activated once the block which starts the next round is irrreversible
     * @param producer_data - pointer to producer schedule packed as bytes
     * @param producer_data_size - size of the packed producer schedule
     * @pre `producer_data` is a valid pointer to a range of memory at least `producer_data_size` bytes long that contains serialized produced schedule data
     */
    function set_active_producers(producer_data: usize, producer_data_size: u32): void;
    /**
     * @brief Check if an account is privileged
     * Check if an account is privileged
     * @param account - name of the account to be checked
     * @return true if the account is privileged
     * @return false if the account is not privileged
     */
    is_priv: boolileged(account: capi_name): void;

    /**
     * @brief Set the privileged status of an account
     * Set the privileged status of an account
     * @param account - name of the account whose privileged account to be set
     * @param is_priv - privileged status
     */
    function set_privileged(account: capi_name, is_priv: bool): void;

    /**
     * @brief Set the blockchain parameters
     * Set the blockchain parameters
     * @param data - pointer to blockchain parameters packed as bytes
     * @param datalen - size of the packed blockchain parameters
     * @pre `data` is a valid pointer to a range of memory at least `datalen` bytes long that contains packed blockchain params data
     */
    function set_blockchain_parameters_packed(data: usize, datalen: u32): void;

    /**
     * @brief Retrieve the blolckchain parameters
     * Retrieve the blolckchain parameters
     * @param data - output buffer of the blockchain parameters, only retrieved if sufficent size to hold packed data.
     * @param datalen - size of the data buffer, 0 to report required size.
     * @return size of the blockchain parameters
     * @pre `data` is a valid pointer to a range of memory at least `datalen` bytes long
     * @post `data` is filled with packed blockchain parameters
     */
    function get_blockchain_parameters_packed(data: usize, datalen: u32): u32;

    /**
     * @brief Activate new feature
     * Activate new feature
     * @param f - name (identifier) of the feature to be activated
     */
    function activate_feature(f: i64): void;

}
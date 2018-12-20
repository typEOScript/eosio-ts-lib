/**
 * @brief Name of an account
 */
import {checksum256} from "./types";

declare type account_name = u64;

/**
 * @brief Name of a permission
 */
declare type permission_name = u64;

/**
 * @brief Name of a table
 */
declare type table_name = u64;

/**
 * @brief Time
 */
declare type time = u32;

/**
 * @brief Name of a scope
 */
declare type scope_name = u64;

/**
 * @brief Name of an action
 */
declare type action_name = u64;

/**
 * @brief Macro to align/overalign a type to ensure calls to intrinsics with pointers/references are properly aligned
 */
declare type weight_type = u16;

declare type transaction_id_type = checksum256;

declare type block_id_type = checksum256;
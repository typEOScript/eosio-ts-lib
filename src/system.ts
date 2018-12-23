/**
 *  Returns the time in seconds from 1970 of the block including this action
 *  @brief Get time (rounded down to the nearest second) of the current block (i.e. the block including this action)
 *  @return time in seconds from 1970 of the current block
 */
import {env} from "../lib/system";

export function now(): u32 {
    return <u32>(env.current_time() / 1000000);
}
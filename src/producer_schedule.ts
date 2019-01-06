import {producer_key} from "./privileged";

/**
 *  Defines both the order, account name, and signing keys of the active set of producers.
 *
 *  @brief Defines both the order, account name, and signing keys of the active set of producers.
 */
export class producer_schedule {
    /**
     * Version number of the schedule. It is sequentially incrementing version number
     *
     * @brief Version number of the schedule
     */
    version: u32;

    /**
     * List of producers for this schedule, including its signing key
     *
     * @brief List of producers for this schedule, including its signing key
     */
    producers: Array<producer_key>;
}
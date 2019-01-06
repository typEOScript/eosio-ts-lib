import {time_point, time_point_sec} from "./time";
import {now} from "./system";
import {unsigned_int} from "./varint";
import {Action} from "./action";

export class transaction_header {
    expiration: time_point_sec;
    ref_block_num: u16;
    ref_block_prefix: u32;
    max_net_usage_words: unsigned_int = <u32>0;
    max_cpu_usage_ms: u8 = 0;
    delay_sec: unsigned_int = <u32>0;

    constructor(exp: time_point_sec = new time_point_sec(now() + 60)) {
        this.expiration = exp;
    }

    // TODO: Serialize
}

export class transaction extends transaction_header {
    context_free_actions: Array<Action>;

    constructor(exp: time_point_sec = new time_point_sec(now() + 60)) {
        super(exp)
    }

    send(sender_id: usize, replace_existing: bool = false): void {
        // TODO
    }

}
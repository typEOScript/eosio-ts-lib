import {env} from "../lib/system";
import eosio_assert = env.eosio_assert;
import {UINT32_MAX} from "../lib/constants";

export class microseconds {
    _count: i64;

    static maximum(): microseconds {
        return new microseconds(0x7fffffffffffffff);
    }

    constructor(c: i64 = 0) {
        this._count = c;
    }

    count(): i64 {
        return this._count;
    }

    to_seconds(): i64 {
        return this._count / 1000000;
    }

    @operator('+')
    add(t: microseconds): microseconds {
        return new microseconds(this._count + t._count);
    }

    @operator('-')
    sub(t: microseconds): microseconds {
        return new microseconds(this._count - t._count);
    }

    @operator('==')
    equal(t: microseconds): bool {
        return this._count === t._count;
    }

    @operator('!=')
    notEqual(t: microseconds): bool {
        return this._count !== t._count;
    }

    @operator('<')
    less(t: microseconds): bool {
        return this._count < t._count;
    }

    @operator('<=')
    notLarge(t: microseconds): bool {
        return this._count <= t._count;
    }

    @operator('>')
    large(t: microseconds): bool {
        return this._count > t._count;
    }

    @operator('>=')
    notLess(t: microseconds): bool {
        return this._count >= t._count;
    }

    //TODO: Serialize
}

export function seconds(s: i64): microseconds {
    return new microseconds(s * 1000000);
}

export function milliseconds(s: i64): microseconds {
    return new microseconds(s * 1000);
}

export function minutes(s: i64): microseconds {
    return this.seconds(s * 60);
}

export function hours(h: i64): microseconds {
    return this.minutes(h * 60);
}

export function days(d: i64): microseconds {
    return this.hours(d * 24);
}

/**
 *  A lower resolution time_point accurate only to seconds from 1970
 */
export class time_point {
    elapsed: microseconds;

    constructor(e: microseconds = new microseconds()) {
        this.elapsed = e;
    }

    time_since_epoch(): microseconds {
        return this.elapsed;
    }

    sec_since_epoch(): u32 {
        return <u32>(this.elapsed.count() / 1000000);
    }

    @operator('>')
    more(t: time_point): bool {
        return this.elapsed.count() > t.elapsed.count();
    }

    @operator('>=')
    notLess(t: time_point): bool {
        return this.elapsed.count() >= t.elapsed.count();
    }

    @operator('<')
    less(t: time_point): bool {
        return this.elapsed.count() < t.elapsed.count();
    }

    @operator('<=')
    notMore(t: time_point): bool {
        return this.elapsed.count() <= t.elapsed.count();
    }

    @operator('==')
    equal(t: time_point): bool {
        return this.elapsed.count() == t.elapsed.count();
    }

    @operator('!=')
    notEqual(t: time_point): bool {
        return this.elapsed.count() != t.elapsed.count();
    }

    @operator('+')
    add(t: time_point): time_point {
        return new time_point(this.elapsed + t.elapsed);
    }

    @operator('-')
    sub(t: time_point): time_point {
        return new time_point(this.elapsed - t.elapsed);
    }

    //TODO: Serialize
}

export class time_point_sec {
    utc_seconds: u32;

    constructor(t?: any)
    constructor(t: time_point)
    constructor(t: u32) {
        if (t instanceof time_point) {
            this.utc_seconds = t.time_since_epoch().count() / 1000000
        } else if (typeof t === 'u32') {
            this.utc_seconds = t;
        } else {
            this.utc_seconds = 0;
        }
    }

    maximum(): time_point_sec {
        return new time_point_sec(0xffffffff);
    }

    min(): time_point_sec {
        return new time_point_sec(0);
    }

    sec_since_epoch(): u32 {
        return this.utc_seconds;
    }

    @operator.postfix('=')
    set(t: time_point): time_point_sec {
        this.utc_seconds = <u32>(t.time_since_epoch().count() / 1000000);
        return this;
    }

    @operator('<')
    less(t: time_point_sec): bool {
        return this.utc_seconds < t.utc_seconds;
    }

    @operator('>')
    more(t: time_point_sec): bool {
        return this.utc_seconds > t.utc_seconds;
    }

    @operator('<=')
    notMore(t: time_point_sec): bool {
        return this.utc_seconds <= t.utc_seconds;
    }

    @operator('>=')
    notLess(t: time_point_sec): bool {
        return this.utc_seconds >= t.utc_seconds;
    }

    @operator('+')
    add(t: time_point_sec): time_point_sec {
        this.utc_seconds += t.utc_seconds;
        return this;
    }

    @operator('-')
    sub(t: time_point_sec): time_point_sec {
        this.utc_seconds -= t.utc_seconds;
        return this;
    }

}

/**
 * This class is used in the block headers to represent the block time
 * It is a parameterised class that takes an Epoch in milliseconds
 * and an interval in milliseconds and computes the number of slots.
 **/
export class block_timestamp {
    slot: u32;

    static readonly block_interval_ms: i32 = 500;
    static readonly block_timestamp_epoch = 946684800000;

    constructor(s: u32)
    constructor(s: time_point)
    constructor(s: time_point_sec)
    constructor(s: any = 0) {
        if (isInteger<u32>(s)) {
            this.slot = s;
        } else if (s instanceof time_point) {
            this.set_time_point(s);
        } else if (s instanceof time_point_sec) {
            this.set_time_point(s);
        }
    }

    maximum(): block_timestamp {
        return new block_timestamp(0xffff);
    }

    min(): block_timestamp {
        return new block_timestamp(0);
    }

    next(): block_timestamp {
        eosio_assert(UINT32_MAX - this.slot >= 1, "block timestamp overflow");
        const result = new block_timestamp(this.to_time_point());
        result.slot += 1;
        return result
    }

    to_time_point(): time_point {
        let msec: i64 = this.slot * <i64>block_timestamp.block_interval_ms;
        msec += block_timestamp.block_timestamp_epoch;
        return new time_point(milliseconds(msec))
    }

    set_time_point(t: time_point): void
    set_time_point(t: time_point_sec): void
    set_time_point(t: any): void {
        if (t instanceof time_point) {
            const micro_since_epoch = t.time_since_epoch().count();
            const msec_since_epoch = micro_since_epoch / 1000;
            this.slot = <u32>((msec_since_epoch - block_timestamp.block_timestamp_epoch) / <i64>block_timestamp.block_interval_ms)
        } else if (t instanceof time_point_sec) {
            const sec_since_epoch: i64 = t.sec_since_epoch();
            this.slot = <u32>((sec_since_epoch * 1000 - block_timestamp.block_timestamp_epoch) / block_timestamp.block_interval_ms)
        }
    }
}

export const block_timestamp_types = block_timestamp;
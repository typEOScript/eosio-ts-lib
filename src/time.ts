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

    seconds(s: i64): microseconds {
        return new microseconds(s * 1000000);
    }

    milliseconds(s: i64): microseconds {
        return new microseconds(s * 1000);
    }

    minutes(s: i64): microseconds {
        return this.seconds(s * 60);
    }

    hours(h: i64): microseconds {
        return this.minutes(h * 60);
    }

    days(d: i64): microseconds {
        return this.hours(d * 24);
    }
    //TODO: Serialize
}

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
    large(t: time_point): bool {
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
    notLarge(t: time_point): bool {
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
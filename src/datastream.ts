import {env} from "../lib/system";
import {Serializable} from "./serializable";

/**
 * make a DataStream from an existing complex array.
 * @param arr an array of complex class, which extends Serializable.
 */
export function packComplexArray<T extends Serializable>(arr: T[]): Datastream {
    let len = Datastream.complexArrayPackSize<T>(arr);
    let data = new Uint8Array(len);
    let ds = new Datastream(data.buffer, len);
    ds.writeComplexArray(arr);
    return ds;
}

/**
 * make a DataStream from an existing basic array.
 * @param arr an array of basic class, like u8/i8, u16/i16, u32/i32, u64/i64
 */
export function packBasicArray<T>(arr: T[]): Datastream {
    let len: u32 = <u32>arr.length;
    let bytes = len * sizeof<T>();
    let array = new Uint8Array(bytes);
    let ds = new Datastream(array.buffer, bytes);
    for (let i: u32 = 0; i < len; i++) {
        ds.write<T>(from[i]);
    }
    ds.pos = 0;
    return ds;
}

/**
 * make a DataStream from an existing complex object.
 * @param target a complex object which extends Serializable.
 */
export function packComplex<T extends Serializable>(target: T): Datastream {
    let len = Datastream.packSize(target);
    let data = new Uint8Array(len);
    let ds = new Datastream(data.buffer, len);
    target.serialize(ds);
    return ds;
}

export function unpack<T extends Serializable>(stream: Uint8Array, c: { new(): T }): T
export function unpack<T extends Serializable>(stream: Datastream, c: { new(): T }): T
export function unpack<T extends Serializable>(stream: any, c: { new(): T }): T {
    let result = new c();
    if (isArray<Uint8Array>(stream)) {
        // bytes array
        let ds = new Datastream(stream.buffer, stream.byteLength);
        result.deserialize(ds);
        return result
    } else if (stream instanceof Datastream) {
        result.deserialize(stream);
        return result
    }
}

export class Datastream {
    buffer: usize;
    pos: u32 = 0;
    len: u32;

    private packSizeMode() {
        return this.buffer === 0;
    }

    /**
     * to measure the length of serialized buffer.
     * @param obj an instance of class which implements Serializable.
     */
    static packSize<T extends Serializable>(obj: T): u32 {
        let ins = new Datastream(0, 0);
        obj.serialize(ins);

        return ins.pos;
    }

    static complexArrayPackSize<T extends Serializable>(arr: T[]): u32 {
        let ins = new Datastream(0, 0);
        let len: u32 = <u32>arr.length;
        ins.writeVarint32(len);
        for (let i: u32 = 0; i < len; i++) {
            arr[i].serialize(ins);
        }
        return ins.pos;
    }

    /**
     * Construct a new datastream object given the size of the buffer and start position of the buffer
     *
     * @brief Construct a new datastream object
     * @param buffer - The start position of the buffer
     * @param len - The size of the buffer
     */
    constructor(buffer: usize, len: u32) {
        this.buffer = buffer;
        this.len = len;
    }

    position(): u32 {
        return this.pos;
    }

    size(): u32 {
        return this.len;
    }

    read<T>(): T {
        let value: T = load<T>(this.buffer + this.pos);
        this.pos += sizeof<T>();
        return value;
    }

    write<T>(value: T): void {
        if (!this.packSizeMode()) {
            store<T>(this.buffer + this.pos, value);
        }
        this.pos += sizeof<T>();
    }

    toArray<T>(): T[] {
        if (this.len == 0) return new Array<T>();

        let len = this.len / sizeof<T>();
        let arr = new Array<T>(len);
        let idx = 0;
        for (let i: u32 = 0; i < len; i++) {
            let value: T = load<T>(this.buffer + idx);
            arr[i] = value;
            idx += sizeof<T>();
        }
        return arr;
    }

    readVarint32(): u32 {
        let value: u32 = 0;
        let shift: u32 = 0;
        let b: u8;
        do {
            b = this.read<u8>();
            value |= <u32>(b & 0x7f) << (7 * shift++);
        } while (b & 0x80);
        return value;
    }

    writeVarint32(value: u32): void {
        do {
            let b: u8 = <u8>value & <u8>0x7f;
            value >>= 7;
            b |= ((value > 0 ? 1 : 0) << 7);
            this.write<u8>(b);
        } while (value);
    }

    readStringArray(): string[] {
        let len = this.readVarint32();
        if (len == 0) return new Array<string>();

        let arr = new Array<string>(len);
        for (let i: u32 = 0; i < len; i++) {
            arr[i] = this.readString();
        }
        return arr;
    }

    writeStringArray(arr: string[]): void {
        let len: u32 = arr.length;
        this.writeVarint32(len);
        for (let i: u32 = 0; i < len; i++) {
            this.writeString(arr[i]);
        }
    }

    readArray<T>(): T[] {
        let len = this.readVarint32();
        if (len == 0) return new Array<T>();

        let arr = new Array<T>(len);
        for (let i: u32 = 0; i < len; i++) {
            // arr[i] = {} as T;
            arr[i] = this.read<T>();
        }

        return arr;
    }

    writeArray<T>(arr: T[]): void {
        let len: u32 = <u32>arr.length;
        this.writeVarint32(len);
        for (let i: u32 = 0; i < len; i++) {
            this.write<T>(arr[i]);
        }
    }

    /**
     * read array of complex class which implements Serializable interface.
     */
    readComplexArray<T extends Serializable>(): T[] {
        let len = this.readVarint32();
        if (len == 0) return new Array<T>();

        let arr = new Array<T>(len);
        for (let i: u32 = 0; i < len; i++) {
            arr[i].deserialize(this);
        }
        return arr;
    }

    /**
     * write array of complex class which implements ISerialzable interface.
     */
    writeComplexArray<T extends Serializable>(arr: T[]): void {
        let len: u32 = <u32>arr.length;
        this.writeVarint32(len);
        for (let i: u32 = 0; i < len; i++) {
            arr[i].serialize(this);
        }
    }

    readString(): string {
        let len = this.readVarint32();
        if (len == 0) return "";

        let data = new Uint8Array(len);
        memory.copy(data.buffer, this.buffer + this.pos, len);
        this.pos += len;
        return String.fromUTF8(data.buffer, len);
    }

    writeString(str: string): void {
        let len: u32 = <u32>str.lengthUTF8 - 1;
        this.writeVarint32(len);
        if (len == 0) return;

        if (!this.packSizeMode()) {
            let ptr = str.toUTF8();
            memory.copy(this.buffer + this.pos, ptr, len);
        }
        this.pos += len;
    }

    bytes(): Uint8Array {
        let data = new Uint8Array(this.len);
        memory.copy(data.buffer, this.buffer + this.pos, this.len);
        return data;
    }
}

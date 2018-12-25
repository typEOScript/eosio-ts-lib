import {env} from "../lib/system";
import eosio_assert = env.eosio_assert;

export function unpack<T>(buffer: usize, len: u32): T {
    let res = new T()

}

export function unpack<T>(buffer: u8[]): T {

}

export class Datastream {
    private _buffer: u8[];
    private _pos: usize = 0;
    private _end: usize;

    /**
     * Construct a new datastream object given the size of the buffer and start position of the buffer
     *
     * @brief Construct a new datastream object
     * @param s - The size of the buffer
     */
    constructor(s: usize) {
        // @ts-ignore
        this._buffer = new Uint8Array(s);
        this._end = s;
    }

    skip(s: usize): void {
        this._pos += s;
    }

    /**
     *  Reads a specified number of bytes from the stream into a buffer
     *
     *  @brief Reads a specified number of bytes from this stream into a buffer
     *  @param buffer - The pointer to the destination buffer
     *  @param len - the number of bytes to read
     *  @return true
     */
    read(buffer: u8[], len: usize): bool {
        eosio_assert((this._end - this._pos) >= s, "read");
        this.memcpy(buffer, this._pos, len);
        this._pos += len;
        return true;
    }

    /**
     *  Writes a specified number of bytes into the stream from a buffer
     *
     *  @brief Writes a specified number of bytes into the stream from a buffer
     *  @param buffer - The pointer to the source buffer
     *  @param len - The number of bytes to write
     *  @return true
     */
    write(buffer: u8[], len: usize): bool {
        eosio_assert(this._end - this._pos >= len, "write");
        this.memcpy(buffer, this._pos, len);
        return true;
    }

    memcpy(buf: u8[], pos: usize, len: usize): void {
        let buf = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            buf[i] = this._buffer[pos + i];
        }
    }

    /**
     *  Reads a byte from the stream
     *
     *  @brief Reads a byte from the stream
     *  @param c - The reference to destination byte
     *  @return u8
     */
    get_byte(): u8 {
        eosio_assert(this._pos < this._end, "get");
        const c = this._buffer[this._pos];
        this._pos++;
        return c;
    }

    /**
     *  Writes a byte into the stream
     *
     *  @brief Writes a byte into the stream
     *  @param c byte to write
     *  @return true
     */
    put(c: u8): bool {
        eosio_assert(this._pos < this._end, "put");
        this._buffer[this._pos] = c;
        this._pos++;
        return true;
    }

    /**
     *  Retrieves the current position of the stream
     *
     *  @brief Retrieves the current position of the stream
     *  @return usize - The current position of the stream
     */
    pos(): usize {
        return this._pos;
    }

    valid(): bool {
        return this._pos <= this._end && this._pos >= 0;
    }

    /**
     *  Sets the position within the current stream
     *
     *  @brief Sets the position within the current stream
     *  @param p - The offset relative to the origin
     *  @return true if p is within the range
     *  @return false if p is not within the rawnge
     */
    seekp(p: usize): bool {
        this._pos = p;
        return this._pos <= this._end;
    }

    /**
     *  Gets the position within the current stream
     *
     *  @brief Gets the position within the current stream
     *  @return p - The position within the current stream
     */
    tellp(): usize {
        return this.pos();
    }

    /**
     *  Returns the number of remaining bytes that can be read/skipped
     *
     *  @brief Returns the number of remaining bytes that can be read/skipped
     *  @return usize - The number of remaining bytes
     */
    remaining(): usize {
        return this._end - this._pos;
    }

}




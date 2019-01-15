export class capi_public_key {
    data: u8[] = new Array<u8>(34);
}

export class capi_signature {
    data: u8[] = new Array<u8>(66);
}

export class capi_checksum256 {
    hash: u8[] = new Array<u8>(32);

    // equal(t: checksum256): bool {
    //     if (this.hash.length !== t.hash.length) return false;
    //     for (let i = 0; i < this.hash.length; i++) {
    //         if (this.hash[i] !== t.hash[i]) return false;
    //     }
    //     return true;
    // }
}

export class capi_checksum160 {
    hash: u8[] = new Array<u8>(20);

    // equal(t: checksum160): bool {
    //     if (this.hash.length !== t.hash.length) return false;
    //     for (let i = 0; i < this.hash.length; i++) {
    //         if (this.hash[i] !== t.hash[i]) return false;
    //     }
    //     return true;
    // }
}

export class capi_checksum512 {
    hash: u8[] = new Array<u8>(64);

    // equal(t: checksum512): bool {
    //     if (this.hash.length !== t.hash.length) return false;
    //     for (let i = 0; i < this.hash.length; i++) {
    //         if (this.hash[i] !== t.hash[i]) return false;
    //     }
    //     return true;
    // }
}
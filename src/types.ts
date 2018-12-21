import {account_name, permission_name} from "../lib/types";

export class public_key {
    data: u8[] = new Array<u8>(34);
}

export class signature {
    data: u8[] = new Array<u8>(66);
}

export class checksum256 {
    hash: u8[] = new Array<u8>(32);
}

export class checksum160 {
    hash: u8[] = new Array<u8>(20);
}

export class checksum512 {
    hash: u8[] = new Array<u8>(64);
}

export class account_permission {
    account: account_name;
    permission: permission_name;
}
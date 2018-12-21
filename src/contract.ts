import {account_name} from "../lib/types";

export class Contract {
    protected _self: account_name;

    constructor(name: account_name) {
        this._self = name;
    }

    public get_self(): account_name {
        return this._self
    }
}
export declare namespace env {
    function prints(cstr: usize): void;

    function prints_l(cstr: usize, len: u32): void;

    function printi(value: i64): void;

    function printui(value: u64): void;

    function printsf(value: f32): void;

    function printdf(value: f64): void;

    function printqf(value: usize): void;

    function printn(name: u64): void;

    function printhex(data: usize, datalen: u32): void;
}
export declare namespace env {
    /**
     *  Prints string
     *  @brief Prints string
     *  @param cstr - a null terminated string
     *
     *  Example:
     *
     *  @code
     *  prints("Hello World!"); // Output: Hello World!
     *  @endcode
     */
    function prints(cstr: usize): void;

    /**
     *  Prints string up to given length
     *  @brief Prints string
     *  @param cstr - pointer to string
     *  @param len - len of string to be printed
     *
     *  Example:
     *
     *  @code
     *  prints_l("Hello World!", 5); // Output: Hello
     *  @endcode
     */
    function prints_l(cstr: usize, len: u32): void;

    /**
     * Prints value as a 64 bit signed integer
     * @brief Prints value as a 64 bit signed integer
     * @param value of 64 bit signed integer to be printed
     *
     *  Example:
     *
     *  @code
     *  printi(-1e+18); // Output: -1000000000000000000
     *  @endcode
     */
    function printi(value: i64): void;

    /**
     * Prints value as a 64 bit unsigned integer
     * @brief Prints value as a 64 bit unsigned integer
     * @param value of 64 bit unsigned integer to be printed
     *
     *  Example:
     *
     *  @code
     *  printui(1e+18); // Output: 1000000000000000000
     *  @endcode
     */
    function printui(value: u64): void;

    /**
     * Prints value as single-precision floating point number
     * @brief Prints value as single-precision floating point number (i.e. float)
     * @param value of float to be printed
     *
     *  Example:
     *
     *  @code
     *  float value = 5.0 / 10.0;
     *  printsf(value); // Output: 0.5
     *  @endcode
     */
    function printsf(value: f32): void;

    /**
     * Prints value as double-precision floating point number
     * @brief Prints value as double-precision floating point number (i.e. double)
     * @param value of double to be printed
     *
     *  Example:
     *
     *  @code
     *  double value = 5.0 / 10.0;
     *  printdf(value); // Output: 0.5
     *  @endcode
     */
    function printdf(value: f64): void;

    /**
     * Prints value as quadruple-precision floating point number
     * @brief Prints value as quadruple-precision floating point number (i.e. long double)
     * @param value is a pointer to the long double to be printed
     *
     *  Example:
     *
     *  @code
     *  long double value = 5.0 / 10.0;
     *  printqf(value); // Output: 0.5
     *  @endcode
     */
    function printqf(value: usize): void;

    /**
     * Prints a 64 bit names as base32 encoded string
     * @brief Prints a 64 bit names as base32 encoded string
     * @param name - 64 bit name to be printed
     *
     * Example:
     * @code
     * printn(N(abcde)); // Output: abcde
     * @endcode
     */
    function printn(name: u64): void;

    function printhex(data: usize, datalen: u32): void;
}
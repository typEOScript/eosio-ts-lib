export declare namespace env {
    /**
     * Allocate additional memory
     *
     * @brief Allocate additional memory
     * @param size - Number of additional bytes to be allocated
     * @return void* - Pointer to start of the new allocated memory
     */
    function malloc(size: usize): usize;

    /**
     * Allocate a block of memory for an array of **count** elements, each of them **size** bytes long, and initializes all bits with 0
     *
     * @brief Allocate a block of memory for an array of **count** elements, each of them **size** bytes long, and initializes all bits with 0
     * @param count - Number of elements to allocate
     * @param size - Size of each element
     * @return void* - Pointer to start of the new allocated memory
     */
    function calloc(count: usize, size: usize): usize;

    /**
     * Reallocate the given area of memory, which is allocated by malloc(), calloc(), or realloc() previously
     *
     * @brief Reallocate the given area of memory
     * @param ptr - Pointer to the memory area to be reallocated
     * @param size - New size of the memory
     * @return void* - Pointer to the new reallocated memory
     */
    function realloc(ptr: usize, size: usize): usize;

    /**
     *
     * Deallocates the given area of memory which is previously allocated by malloc(), calloc(), or realloc()
     * @brief Deallocates the given area of memory
     *
     * @param ptr - Pointer to the memory to be deallocated
     */
    function free(ptr: usize);
}
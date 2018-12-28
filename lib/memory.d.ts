export declare namespace env {
    function malloc(size: usize): usize;

    function calloc(count: usize, size: usize): usize;

    function realloc(ptr: usize, size: usize): usize;

    function free(ptr: usize);
}
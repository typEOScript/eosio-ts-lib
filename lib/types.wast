(module
 (type $v (func))
 (type $ii (func (param i32) (result i32)))
 (type $iiv (func (param i32 i32)))
 (type $iI (func (param i32) (result i64)))
 (type $iIv (func (param i32 i64)))
 (memory $0 0)
 (table $0 1 anyfunc)
 (elem (i32.const 0) $null)
 (global $HEAP_BASE i32 (i32.const 8))
 (export "memory" (memory $0))
 (export "table" (table $0))
 (export "public_key#get:data" (func $public_key#get:data))
 (export "public_key#set:data" (func $public_key#set:data))
 (export "signature#get:data" (func $signature#get:data))
 (export "signature#set:data" (func $signature#set:data))
 (export "checksum256#get:hash" (func $checksum256#get:hash))
 (export "checksum256#set:hash" (func $checksum256#set:hash))
 (export "checksum160#get:hash" (func $checksum160#get:hash))
 (export "checksum160#set:hash" (func $checksum160#set:hash))
 (export "checksum512#get:hash" (func $checksum512#get:hash))
 (export "checksum512#set:hash" (func $checksum512#set:hash))
 (export "account_permission#get:account" (func $account_permission#get:account))
 (export "account_permission#set:account" (func $account_permission#set:account))
 (export "account_permission#get:permission" (func $account_permission#get:permission))
 (export "account_permission#set:permission" (func $account_permission#set:permission))
 (start $start)
 (func $start (; 0 ;) (type $v)
  nop
  nop
 )
 (func $null (; 1 ;) (type $v)
 )
 (func $public_key#get:data (; 2 ;) (type $ii) (param $0 i32) (result i32)
  get_local $0
  i32.load
 )
 (func $public_key#set:data (; 3 ;) (type $iiv) (param $0 i32) (param $1 i32)
  get_local $0
  get_local $1
  i32.store
 )
 (func $signature#get:data (; 4 ;) (type $ii) (param $0 i32) (result i32)
  get_local $0
  i32.load
 )
 (func $signature#set:data (; 5 ;) (type $iiv) (param $0 i32) (param $1 i32)
  get_local $0
  get_local $1
  i32.store
 )
 (func $checksum256#get:hash (; 6 ;) (type $ii) (param $0 i32) (result i32)
  get_local $0
  i32.load
 )
 (func $checksum256#set:hash (; 7 ;) (type $iiv) (param $0 i32) (param $1 i32)
  get_local $0
  get_local $1
  i32.store
 )
 (func $checksum160#get:hash (; 8 ;) (type $ii) (param $0 i32) (result i32)
  get_local $0
  i32.load
 )
 (func $checksum160#set:hash (; 9 ;) (type $iiv) (param $0 i32) (param $1 i32)
  get_local $0
  get_local $1
  i32.store
 )
 (func $checksum512#get:hash (; 10 ;) (type $ii) (param $0 i32) (result i32)
  get_local $0
  i32.load
 )
 (func $checksum512#set:hash (; 11 ;) (type $iiv) (param $0 i32) (param $1 i32)
  get_local $0
  get_local $1
  i32.store
 )
 (func $account_permission#get:account (; 12 ;) (type $iI) (param $0 i32) (result i64)
  get_local $0
  i64.load
 )
 (func $account_permission#set:account (; 13 ;) (type $iIv) (param $0 i32) (param $1 i64)
  get_local $0
  get_local $1
  i64.store
 )
 (func $account_permission#get:permission (; 14 ;) (type $iI) (param $0 i32) (result i64)
  get_local $0
  i64.load offset=8
 )
 (func $account_permission#set:permission (; 15 ;) (type $iIv) (param $0 i32) (param $1 i64)
  get_local $0
  get_local $1
  i64.store offset=8
 )
)

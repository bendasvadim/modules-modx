<?php
$xpdo_meta_map['bvBillUserTransaction']= array (
  'package' => 'bvbill',
  'version' => '1.1',
  'table' => 'bvbill_user_transaction',
  'extends' => 'xPDOSimpleObject',
  'tableMeta' => 
  array (
    'engine' => 'InnoDB',
  ),
  'fields' => 
  array (
    'user_id' => NULL,
    'refferal_id' => NULL,
    'fullname' => '',
    'phone' => '',
    'status_id' => 0,
    'createdon' => '0000-00-00 00:00:00',
    'updatedon' => '0000-00-00 00:00:00',
  ),
  'fieldMeta' => 
  array (
    'user_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
    ),
    'refferal_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
    ),
    'fullname' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'phone' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'amount' => 
    array (
      'dbtype' => 'decimal',
      'precision' => '10,2',
      'null' => false,
      'default' => 0.0,
    ),
    'status_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => true,
      'default' => 0,
    ),
    'createdon' => 
    array (
      'dbtype' => 'datetime',
      'phptype' => 'datetime',
      'null' => true,
      'default' => '0000-00-00 00:00:00',
    ),
    'updatedon' => 
    array (
      'dbtype' => 'datetime',
      'phptype' => 'datetime',
      'null' => true,
      'default' => '0000-00-00 00:00:00',
    ),
  ),
  'indexes' => 
  array (
    'user_id' => 
    array (
      'alias' => 'user_id',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'user_id' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
    'status_id' => 
    array (
      'alias' => 'status_id',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'status_id' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
  'aggregates' => 
  array (
    'UserRefferalStatus' => 
    array (
      'class' => 'bvBillUserRefferalStatus',
      'local' => 'status_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
    'User' => 
    array (
      'class' => 'modUser',
      'local' => 'user_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
    'UserProfile' => 
    array (
      'class' => 'modUserProfile',
      'local' => 'user_id',
      'foreign' => 'internalKey',
      'owner' => 'foreign',
      'cardinality' => 'one',
    ),
    'Refferal' => 
    array (
      'class' => 'modUser',
      'local' => 'refferal_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
    'RefferalProfile' => 
    array (
      'class' => 'modUserProfile',
      'local' => 'refferal_id',
      'foreign' => 'internalKey',
      'owner' => 'foreign',
      'cardinality' => 'one',
    ),
  ),
);

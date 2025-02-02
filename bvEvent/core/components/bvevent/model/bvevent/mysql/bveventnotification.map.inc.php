<?php
$xpdo_meta_map['bvEventNotification']= array (
  'package' => 'bvevent',
  'version' => '1.1',
  'table' => 'bvevent_notifications',
  'extends' => 'xPDOSimpleObject',
  'tableMeta' => 
  array (
    'engine' => 'InnoDB',
  ),
  'fields' => 
  array (
    'user_id' => NULL,
    'title' => NULL,
    'text' => NULL,
    'createdon' => '0000-00-00 00:00:00',
    'updatedon' => '0000-00-00 00:00:00',
    'is_read' => 0,
    'properties' => NULL,
  ),
  'fieldMeta' => 
  array (
    'user_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'null' => false,
      'index' => 'fk',
    ),
    'title' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
      'null' => false,
    ),
    'text' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
      'null' => false,
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
    'is_read' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'default' => 0,
      'null' => false,
    ),
    'properties' => 
    array (
      'dbtype' => 'text',
      'null' => true,
    ),
  ),
  'indexes' => 
  array (
    'user_id' => 
    array (
      'alias' => 'user_id',
      'primary' => false,
      'unique' => false,
      'columns' => 
      array (
        'user_id' => 
        array (
        ),
      ),
    ),
    'createdon' => 
    array (
      'alias' => 'createdon',
      'primary' => false,
      'unique' => false,
      'columns' => 
      array (
        'createdon' => 
        array (
        ),
      ),
    ),
    'is_read' => 
    array (
      'alias' => 'is_read',
      'primary' => false,
      'unique' => false,
      'columns' => 
      array (
        'is_read' => 
        array (
        ),
      ),
    ),
  ),
  'aggregates' => 
  array (
    'User' => 
    array (
      'class' => 'modUser',
      'local' => 'user_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);

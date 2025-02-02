<?php

$xpdo_meta_map = array (
  'xPDOSimpleObject' => 
  array (
    0 => 'modExtraNotification',
  ),
);

$this->map['modUser']['composites']['Notifications'] = array(
    'class' => 'modExtraNotification',
    'local' => 'id',
    'foreign' => 'user_id',
    'cardinality' => 'many',
    'owner' => 'local',
);

$this->map['modUserProfile']['composites']['UserNotifications'] = array(
    'class'       => 'modExtraNotification',
    'local'       => 'internalKey',
    'foreign' => 'user_id',
    'cardinality' => 'many',
    'owner' => 'local',
);
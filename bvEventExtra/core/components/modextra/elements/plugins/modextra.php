<?php
/** @var modX $modx */
switch ($modx->event->name) {
    case 'OnMODXInit':
        $modx->log(modX::LOG_LEVEL_INFO, 'Добавление связей для удаления уведомлений...');

        if (!isset($modx->xpdo_meta_map['modUser']['composites']['Notifications'])) {
            $modx->xpdo_meta_map['modUser']['composites']['Notifications'] = array(
                'class' => 'modExtraNotification',
                'local' => 'id',
                'foreign' => 'user_id',
                'cardinality' => 'many',
                'owner' => 'local',
            );
        }

        if (!isset($modx->xpdo_meta_map['modUserProfile']['composites']['UserNotifications'])) {
            $modx->xpdo_meta_map['modUserProfile']['composites']['UserNotifications'] = array(
                'class'       => 'modExtraNotification',
                'local'       => 'internalKey',
                'foreign' => 'user_id',
                'cardinality' => 'many',
                'owner' => 'local',
            );
        }

        break;
}

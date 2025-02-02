<?php
/**
 * Этот резолвер расширяет метамап для modUser и modUserProfile, добавляя обратную связь с bvNotification.
 */
if ($object->xpdo) {
    $modx =& $object->xpdo;

    // Добавляем агрегат для modUser: получать уведомления по связи user_id -> id
    /*if (!isset($modx->xpdo_meta_map['modUser']['aggregates']['Notifications'])) {
        $modx->xpdo_meta_map['modUser']['aggregates']['Notifications'] = array(
            'class'       => 'bvNotification',
            'local'       => 'id',
            'foreign'     => 'user_id',
            'cardinality' => 'many',
            'owner'       => 'local',
        );
    }

    // Аналогично, для modUserProfile: связь по полю internalKey (соответствует id пользователя)
    if (!isset($modx->xpdo_meta_map['modUserProfile']['aggregates']['Notifications'])) {
        $modx->xpdo_meta_map['modUserProfile']['aggregates']['Notifications'] = array(
            'class'       => 'bvNotification',
            'local'       => 'internalKey',
            'foreign'     => 'user_id',
            'cardinality' => 'many',
            'owner'       => 'local',
        );
    }

    $modx->log(modX::LOG_LEVEL_INFO, 'Обратные связи для modUser и modUserProfile добавлены.');*/
}

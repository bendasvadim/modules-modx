<?php
/**
 * Этот резолвер регистрирует кастомные события для работы с уведомлениями.
 */
if ($object->xpdo) {
    $modx =& $object->xpdo;

    $events = [
        'OnUserNotification',
        'OnNotificationRead',
        'OnNotificationDeleted',
    ];

    foreach ($events as $eventName) {
        if (!$modx->getObject('modEvent', ['name' => $eventName])) {
            $event = $modx->newObject('modEvent');
            $event->set('name', $eventName);
            $event->set('service', 6); // Custom events
            $event->set('groupname', 'Notifications');
            if ($event->save()) {
                $modx->log(modX::LOG_LEVEL_INFO, "Событие {$eventName} зарегистрировано.");
            } else {
                $modx->log(modX::LOG_LEVEL_ERROR, "Ошибка при регистрации события {$eventName}.");
            }
        }
    }
}

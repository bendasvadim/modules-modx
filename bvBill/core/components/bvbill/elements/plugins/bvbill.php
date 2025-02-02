<?php
/** @var modX $modx */
switch ($modx->event->name) {
    case 'OnUserSave':

        if ($mode === 'new') {
            $userId = $user->get('id');

            if ($userId) {
                $balance = $modx->newObject('bvBillUserBalance');
                $balance->set('user_id', $userId);
                $balance->set('balance', 0.00);
                $balance->set('createdon', date('Y-m-d H:i:s'));
                $balance->set('updatedon', date('Y-m-d H:i:s'));
                $balance->save();

                $modx->log(modX::LOG_LEVEL_INFO, "Создан баланс для нового пользователя с ID {$userId}");
            }
        }

        break;

}

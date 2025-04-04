<?php
/** @var modX $modx */
switch ($modx->event->name) {
    case 'OnUserSave':

        if ($mode === 'new') {
            $userId = $user->get('id');

            if ($userId) {

                $bvBill = $modx->getService('bvBill', 'bvBill', MODX_CORE_PATH . 'components/bvbill/model/', $scriptProperties);
                if (!$bvBill) {
                    return 'Could not load bvBill class!';
                }

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

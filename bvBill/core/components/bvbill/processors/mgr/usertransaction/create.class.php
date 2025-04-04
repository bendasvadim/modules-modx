<?php

class bvBillUserTransactionCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'bvBillUserTransaction';
    public $classKey = 'bvBillUserTransaction';
    public $languageTopics = ['bvbill'];
    //public $permission = 'save';

    public function process() {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $response = parent::process();
        if ($response->isError()) {
            return $response;
        }

        $transaction = $this->object;
        $userId = $transaction->get('user_id');
        $amount = $transaction->get('amount');

        /** @var bvBillUserBalance $userBalance */
        $userBalance = $this->modx->getObject('bvBillUserBalance', ['user_id' => $userId]);
        if ($userBalance) {
            $userBalance->set('balance', $userBalance->get('balance') + $amount);
            $userBalance->save();
        } else {
            // Если записи о балансе нет, создаем новую
            $userBalance = $this->modx->newObject('bvBillUserBalance');
            $userBalance->set('user_id', $userId);
            $userBalance->set('balance', $amount);
            $userBalance->save();
        }

        return $response;
    }

    /**
     * @return bool
     */
    public function beforeSet()
    {
        $this->setProperty('createdon', date('Y-m-d H:i:s'));
        return parent::beforeSet();
    }

}

return 'bvBillUserTransactionCreateProcessor';
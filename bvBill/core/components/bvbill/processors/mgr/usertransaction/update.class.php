<?php

class bvBillUserTransactionUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'bvBillUserTransaction';
    public $classKey = 'bvBillUserTransaction';
    public $languageTopics = ['bvbill'];
    //public $permission = 'save';

    public function process() {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $transaction = $this->object;
        $userId = $transaction->get('user_id');
        $oldAmount = $transaction->get('amount');
        $newAmount = $this->getProperty('amount');

        $amountDifference = $newAmount - $oldAmount;

        /** @var bvBillUserBalance $userBalance */
        $userBalance = $this->modx->getObject('bvBillUserBalance', ['user_id' => $userId]);
        if ($userBalance) {
            $newBalance = $userBalance->get('balance') + $amountDifference;
            if ($newBalance < 0) {
                return $this->failure($this->modx->lexicon('bvbill_insufficient_funds'));
            }
            $userBalance->set('balance', $newBalance);
            $userBalance->save();
        } else {
            if ($amountDifference < 0) {
                return $this->failure($this->modx->lexicon('bvbill_insufficient_funds'));
            }
            // Если записи о балансе нет, создаем новую
            $userBalance = $this->modx->newObject('bvBillUserBalance');
            $userBalance->set('user_id', $userId);
            $userBalance->set('balance', $amountDifference);
            $userBalance->save();
        }

        return parent::process();
    }

    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return bool|string
     */
    public function beforeSave()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }

    /**
     * @return bool
     */
    public function beforeSet()
    {
        $id = (int)$this->getProperty('id');
        if (empty($id)) {
            return $this->modx->lexicon('bvbill_item_err_ns');
        }
        $this->setProperty('updatedon', date('Y-m-d H:i:s'));

        return parent::beforeSet();
    }
}

return 'bvBillUserTransactionUpdateProcessor';
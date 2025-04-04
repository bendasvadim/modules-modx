<?php

class bvBillUserTransactionRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'bvBillUserTransaction';
    public $classKey = 'bvBillUserTransaction';
    public $languageTopics = ['bvbill'];
    //public $permission = 'remove';

    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('bvbill_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var bvBillUserTransaction $transaction */
            if (!$transaction = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('bvbill_item_err_nf'));
            }

            $userId = $transaction->get('user_id');
            $amount = $transaction->get('amount');

            /** @var bvBillUserBalance $userBalance */
            if ($userBalance = $this->modx->getObject('bvBillUserBalance', ['user_id' => $userId])) {
                $newBalance = $userBalance->get('balance') - $amount;

                if ($newBalance < 0) {
                    return $this->failure($this->modx->lexicon('bvbill_insufficient_funds'));
                }

                $userBalance->set('balance', $newBalance);
                $userBalance->save();
            } else {
                return $this->failure($this->modx->lexicon('bvbill_no_balance_record'));
            }

            $transaction->remove();
        }

        return $this->success();
    }
}

return 'bvBillUserTransactionRemoveProcessor';

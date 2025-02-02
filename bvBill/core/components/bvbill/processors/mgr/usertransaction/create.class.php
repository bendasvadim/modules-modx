<?php

class bvBillUserTransactionCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'bvBillUserTransaction';
    public $classKey = 'bvBillUserTransaction';
    public $languageTopics = ['bvbill'];
    //public $permission = 'save';

    /**
     * @return bool
     */
    public function beforeSet()
    {
        return parent::beforeSet();
    }

}

return 'bvBillUserTransactionCreateProcessor';
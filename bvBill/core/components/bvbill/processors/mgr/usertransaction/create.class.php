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
        $this->setProperty('createdon', date('Y-m-d H:i:s'));
        return parent::beforeSet();
    }

}

return 'bvBillUserTransactionCreateProcessor';
<?php

class modExtraUserTransactionCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'modExtraUserTransaction';
    public $classKey = 'modExtraUserTransaction';
    public $languageTopics = ['modextra'];
    //public $permission = 'save';

    /**
     * @return bool
     */
    public function beforeSet()
    {
        return parent::beforeSet();
    }

}

return 'modExtraUserTransactionCreateProcessor';
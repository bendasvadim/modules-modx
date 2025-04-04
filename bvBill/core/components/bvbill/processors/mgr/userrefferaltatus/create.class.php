<?php

class bvBillUserRefferalStatusCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'bvBillUserRefferalStatus';
    public $classKey = 'bvBillUserRefferalStatus';
    public $languageTopics = ['bvbill'];
    //public $permission = 'save';

    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('bvbill_item_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name])) {
            $this->modx->error->addField('name', $this->modx->lexicon('bvbill_item_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'bvBillUserRefferalStatusCreateProcessor';
<?php

class bvBillUserRefferalsCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'bvBillUserRefferals';
    public $classKey = 'bvBillUserRefferals';
    public $languageTopics = ['bvbill'];
    //public $permission = 'save';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('fullname'));
        if (empty($name)) {
            $this->modx->error->addField('fullname', $this->modx->lexicon('modextra_item_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['fullname' => $name])) {
            $this->modx->error->addField('fullname', $this->modx->lexicon('modextra_item_err_ae'));
        }
        $this->setProperty('createdon', date('Y-m-d H:i:s'));
        return parent::beforeSet();
    }

}

return 'bvBillUserRefferalsCreateProcessor';
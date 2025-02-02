<?php

class modExtraUserBalanceUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'modExtraUserBalance';
    public $classKey = 'modExtraUserBalance';
    public $languageTopics = ['modextra'];
    //public $permission = 'save';


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
            return $this->modx->lexicon('modextra_item_err_ns');
        }
        $this->setProperty('editedon', date('Y-m-d H:i:s'));

        return parent::beforeSet();
    }
}

return 'modExtraUserBalanceUpdateProcessor';

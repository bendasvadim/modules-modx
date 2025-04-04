<?php

class bvBillUserRefferalsUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'bvBillUserRefferals';
    public $classKey = 'bvBillUserRefferals';
    public $languageTopics = ['bvbill'];
    //public $permission = 'save';

    public function process() {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
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

return 'bvBillUserRefferalsUpdateProcessor';
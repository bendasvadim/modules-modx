<?php

class bvEventNotificationUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'bvEventNotification';
    public $classKey = 'bvEventNotification';
    public $languageTopics = ['bvevent'];
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
            return $this->modx->lexicon('bvevent_item_err_ns');
        }

        return parent::beforeSet();
    }
}

return 'bvEventNotificationUpdateProcessor';

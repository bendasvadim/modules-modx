<?php

class bvEventNotificationCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'bvEventNotification';
    public $classKey = 'bvEventNotification';
    public $languageTopics = ['bvevent'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $this->setProperty('createdon', date('Y-m-d H:i:s'));
        return parent::beforeSet();
    }

}

return 'bvEventNotificationCreateProcessor';
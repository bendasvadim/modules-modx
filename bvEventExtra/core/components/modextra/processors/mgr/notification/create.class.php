<?php

class modExtraNotificationCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'modExtraNotification';
    public $classKey = 'modExtraNotification';
    public $languageTopics = ['modextra'];
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

return 'modExtraNotificationCreateProcessor';
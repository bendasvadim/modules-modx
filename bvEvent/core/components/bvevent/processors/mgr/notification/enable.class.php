<?php

class bvEventNotificationEnableProcessor extends modObjectProcessor
{
    public $objectType = 'bvEventNotification';
    public $classKey = 'bvEventNotification';
    public $languageTopics = ['bvevent'];
    //public $permission = 'save';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('bvevent_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var bvEventItem $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('bvevent_item_err_nf'));
            }

            $object->set('is_read', true);
            $object->save();
        }

        return $this->success();
    }

}

return 'bvEventNotificationEnableProcessor';

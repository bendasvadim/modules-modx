<?php

class bvEventNotificationRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'bvEventNotification';
    public $classKey = 'bvEventNotification';
    public $languageTopics = ['bvevent'];
    //public $permission = 'remove';


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

            $object->remove();
        }

        return $this->success();
    }

}

return 'bvEventNotificationRemoveProcessor';
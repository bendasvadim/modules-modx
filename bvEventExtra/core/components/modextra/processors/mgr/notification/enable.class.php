<?php

class modExtraNotificationEnableProcessor extends modObjectProcessor
{
    public $objectType = 'modExtraNotification';
    public $classKey = 'modExtraNotification';
    public $languageTopics = ['modextra'];
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
            return $this->failure($this->modx->lexicon('modextra_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var modExtraItem $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('modextra_item_err_nf'));
            }

            $object->set('is_read', true);
            $object->save();
        }

        return $this->success();
    }

}

return 'modExtraNotificationEnableProcessor';

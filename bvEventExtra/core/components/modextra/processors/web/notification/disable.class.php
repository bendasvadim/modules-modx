<?php

class modExtraNotificationDisableProcessor extends modObjectProcessor
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
            $userId = $this->modx->user->get('id');
            if ($object->get('user_id') !== $userId) {
                return $this->failure($this->modx->lexicon('modextra_notification_err_access_denied'));
            }

            $object->set('is_read', false);
            $object->save();
        }

        return $this->success();
    }

}

return 'modExtraNotificationDisableProcessor';

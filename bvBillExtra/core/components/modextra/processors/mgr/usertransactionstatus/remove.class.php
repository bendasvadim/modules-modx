<?php

class modExtraUserTransactionStatusRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'modExtraUserTransactionStatus';
    public $classKey = 'modExtraUserTransactionStatus';
    public $languageTopics = ['modextra'];
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
            return $this->failure($this->modx->lexicon('modextra_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var modExtraUserTransactionStatus $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('modextra_item_err_nf'));
            }

            $object->remove();
        }

        return $this->success();
    }

}

return 'modExtraUserTransactionStatusRemoveProcessor';
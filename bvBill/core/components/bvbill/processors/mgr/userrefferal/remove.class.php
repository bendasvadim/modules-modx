<?php

class bvBillUserRefferalsRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'bvBillUserRefferals';
    public $classKey = 'bvBillUserRefferals';
    public $languageTopics = ['bvbill'];
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
            return $this->failure($this->modx->lexicon('bvbill_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var bvBillUserRefferals $Refferals */
            if (!$Refferals = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('bvbill_item_err_nf'));
            }

            $Refferals->remove();
        }

        return $this->success();
    }
}

return 'bvBillUserRefferalsRemoveProcessor';

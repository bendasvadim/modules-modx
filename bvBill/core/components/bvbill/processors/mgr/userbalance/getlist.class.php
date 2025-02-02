<?php

class bvBillUserBalanceGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'bvBillUserBalance';
    public $classKey = 'bvBillUserBalance';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    //public $permission = 'list';


    /**
     * We do a special check of permissions
     * because our objects is not an instances of modAccessibleObject
     *
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $c->leftJoin('modUser', 'User', 'User.id = bvBillUserBalance.user_id');
        $c->select($this->modx->getSelectColumns('bvBillUserBalance', 'bvBillUserBalance'));
        $c->select(['username' => 'User.username']);

        return $c;
    }


    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = $object->toArray();
        $array['actions'] = [];

        // Edit
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('bvbill_item_update'),
            //'multiple' => $this->modx->lexicon('bvbill_items_update'),
            'action' => 'updateUserBalance',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'bvBillUserBalanceGetListProcessor';
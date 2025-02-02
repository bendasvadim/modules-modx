<?php

class modExtraUserTransactionGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'modExtraUserTransaction';
    public $classKey = 'modExtraUserTransaction';
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
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $c->leftJoin('modUser', 'User', 'User.id = modExtraUserBalance.user_id');
        $c->select($this->modx->getSelectColumns('modExtraUserBalance', 'modExtraUserBalance'));
        $c->select(['username' => 'User.username']);

        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where([
                'id:LIKE' => "%{$query}%",
                'OR:username:LIKE' => "%{$query}%",
            ]);
        }

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
            'title' => $this->modx->lexicon('modextra_item_update'),
            //'multiple' => $this->modx->lexicon('modextra_items_update'),
            'action' => 'updateUserTransaction',
            'button' => true,
            'menu' => true,
        ];

        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('modextra_item_remove'),
            'multiple' => $this->modx->lexicon('modextra_items_remove'),
            'action' => 'removeUserTransaction',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'modExtraUserTransactionGetListProcessor';
<?php

class bvBillUserTransactionGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'bvBillUserTransaction';
    public $classKey = 'bvBillUserTransaction';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    //public $permission = 'list';

    /**
     * Проверка прав доступа
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
     * Подготовка запроса перед выборкой
     * @param xPDOQuery $c
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $c->leftJoin('modUser', 'User', 'User.id = bvBillUserTransaction.user_id');
        $c->leftJoin('bvBillUserTransactionStatus', 'Status', 'Status.id = bvBillUserTransaction.status_id');

        $c->select($this->modx->getSelectColumns('bvBillUserTransaction', 'bvBillUserTransaction'));
        $c->select([
            'username' => 'User.username',
            'status_name' => 'Status.name',
            'createdon' => 'bvBillUserTransaction.createdon'
        ]);

        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where([
                'id:LIKE' => "%{$query}%",
                'OR:User.username:LIKE' => "%{$query}%",
                'OR:Status.name:LIKE' => "%{$query}%",
            ]);
        }

        return $c;
    }

    /**
     * Форматирование строки перед выводом
     * @param xPDOObject $object
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = $object->toArray();
        $array['actions'] = [];

        // Редактирование
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('bvbill_item_update'),
            'action' => 'updateUserTransaction',
            'button' => true,
            'menu' => true,
        ];

        // Удаление
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('bvbill_item_remove'),
            'action' => 'removeUserTransaction',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }
}

return 'bvBillUserTransactionGetListProcessor';

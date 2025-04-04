<?php

class bvBillUserRefferalsGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'bvBillUserRefferals';
    public $classKey = 'bvBillUserRefferals';
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
        $c->leftJoin('modUser', 'User', 'User.id = bvBillUserRefferals.user_id');
        $c->leftJoin('bvBillUserRefferalStatus', 'Status', 'Status.id = bvBillUserRefferals.status_id');

        $c->select($this->modx->getSelectColumns('bvBillUserRefferalStatus', 'bvBillUserRefferalStatus'));
        $c->select([
            'username' => 'User.username',
            'status_name' => 'Status.name',
            'createdon' => 'bvBillUserRefferals.createdon'
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
            'action' => 'updateUserRefferal',
            'button' => true,
            'menu' => true,
        ];

        // Удаление
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('bvbill_item_remove'),
            'action' => 'removeUserRefferal',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }
}

return 'bvBillUserRefferalsGetListProcessor';

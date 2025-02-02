<?php

class modExtraNotificationGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'modExtraNotification';
    public $classKey = 'modExtraNotification';
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
        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where([
                'text:LIKE' => "%{$query}%",
                'OR:user_id:LIKE' => "%{$query}%",
            ]);
        }

        $userId = $this->modx->user->get('id');
        $c->where(['user_id' => $userId]);

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
            'action' => 'updateNotification',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['is_read']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('modextra_item_enable'),
                'multiple' => $this->modx->lexicon('modextra_items_enable'),
                'action' => 'enableNotification',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('modextra_item_disable'),
                'multiple' => $this->modx->lexicon('modextra_items_disable'),
                'action' => 'disableNotification',
                'button' => true,
                'menu' => true,
            ];
        }

        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('modextra_item_remove'),
            'multiple' => $this->modx->lexicon('modextra_items_remove'),
            'action' => 'removeNotification',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'modExtraNotificationGetListProcessor';
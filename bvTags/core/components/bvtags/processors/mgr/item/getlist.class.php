<?php

class bvTagsItemGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'bvTagsItem';
    public $classKey = 'bvTagsItem';
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
                'name:LIKE' => "%{$query}%",
                'OR:description:LIKE' => "%{$query}%",
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
        $array['name'] = $object->get('name'); // важно!

        // Edit
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('bvtags_item_update'),
            //'multiple' => $this->modx->lexicon('bvtags_items_update'),
            'action' => 'updateItem',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('bvtags_item_enable'),
                'multiple' => $this->modx->lexicon('bvtags_items_enable'),
                'action' => 'enableItem',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('bvtags_item_disable'),
                'multiple' => $this->modx->lexicon('bvtags_items_disable'),
                'action' => 'disableItem',
                'button' => true,
                'menu' => true,
            ];
        }

        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('bvtags_item_remove'),
            'multiple' => $this->modx->lexicon('bvtags_items_remove'),
            'action' => 'removeItem',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'bvTagsItemGetListProcessor';

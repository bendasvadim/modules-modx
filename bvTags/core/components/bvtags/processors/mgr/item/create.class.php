<?php

class bvTagsItemCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'bvTagsItem';
    public $classKey = 'bvTagsItem';
    public $languageTopics = ['bvtags'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('bvtags_item_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name])) {
            $this->modx->error->addField('name', $this->modx->lexicon('bvtags_item_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'bvTagsItemCreateProcessor';
<?php

class bvTagsItemRemoveProcessor extends modObjectProcessor
{
  public $objectType = 'bvTagsItem';
  public $classKey = 'bvTagsItem';
  public $languageTopics = ['bvtags'];
  //public $permission = 'remove';


  /**
   * @return array|string
   */
  public function process()
  {
    $this->modx->log(MODX_LOG_LEVEL_ERROR, print_r('process', true));
    if (!$this->checkPermissions()) {
      return $this->failure($this->modx->lexicon('access_denied'));
    }

    $ids = $this->modx->fromJSON($this->getProperty('ids'));
    if (empty($ids)) {
      return $this->failure($this->modx->lexicon('bvtags_item_err_ns'));
    }

    foreach ($ids as $id) {
      /** @var bvTagsItem $object */
      if (!$object = $this->modx->getObject($this->classKey, $id)) {
        return $this->failure($this->modx->lexicon('bvtags_item_err_nf'));
      }
      $tag = $object->get('name');
      if ($object->remove()) {
        $this->removeTagFromResources($tag);
      }
    }

    return $this->success();
  }

  protected function removeTagFromResources($tag)
  {
    $tag = trim($tag);
    if (empty($tag)) {
      return;
    }

    // Получаем все TV с типом bvtags
    $c = $this->modx->newQuery('modTemplateVar', ['type' => 'bvtags']);
    $tvs = $this->modx->getIterator('modTemplateVar', $c);

    foreach ($tvs as $tv) {
      $tvId = $tv->get('id');

      // Ищем ресурсы, в которых используется этот тег
      $c = $this->modx->newQuery('modTemplateVarResource', [
        'tmplvarid' => $tvId,
        'value:LIKE' => "%{$tag}%",
      ]);

      $tvResources = $this->modx->getIterator('modTemplateVarResource', $c);

      /** @var modTemplateVarResource $tvResource */
      foreach ($tvResources as $tvResource) {
        $value = $tvResource->get('value');
        $tags = array_filter(array_map('trim', explode(',', $value)));

        $updatedTags = array_filter($tags, fn($t) => $t !== $tag);
        $newValue = implode(',', $updatedTags);

        if ($value !== $newValue) {
          $tvResource->set('value', $newValue);
          $tvResource->save();
        }
      }
    }

    $this->modx->log(modX::LOG_LEVEL_INFO, "[bvTags] Тег '{$tag}' удалён из ресурсов");
  }

}

return 'bvTagsItemRemoveProcessor';

<?php
$tv = $modx->newObject('modTemplateVar');
$tv->fromArray([
  'name' => 'bvTagsTV',
  'caption' => 'Теги из компонента bvTags',
  'description' => 'Выбор тегов из собственного компонента',
  'type' => 'text', // можно оставить text, но тип ввода переопределим
  'elements' => '',
  'rank' => 0,
  'display' => 'default',
  'default_text' => '',
], '', true, true);

// Привязка к шаблону по желанию
// $tv->addTemplateVarTemplate(['tmplvarid' => $tv->get('id'), 'templateid' => 1]);

$category = $modx->getObject('modCategory', ['category' => 'bvTags']);
if ($category) {
  $tv->set('category', $category->get('id'));
}

$tv->save();
$modx->log(modX::LOG_LEVEL_INFO, 'TV bvTagsTV created');

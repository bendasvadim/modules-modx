<?php
$tvName = 'bvTagsTV';
$tv = $modx->getObject('modTemplateVar', ['name' => $tvName]);
if (!$tv) {
  $tv = $modx->newObject('modTemplateVar');
  $tv->fromArray([
    'name' => $tvName,
    'caption' => 'Tags from component bvTags',
    'type' => 'text',
  ]);
  $tv->save();
  $modx->log(modX::LOG_LEVEL_INFO, "TV {$tvName} created");
}
return true;

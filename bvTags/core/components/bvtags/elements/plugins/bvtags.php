<?php
if ($modx->event->name === 'OnTVInputRenderList') {
  $modx->event->output(MODX_CORE_PATH . 'components/bvtags/elements/tv/input/');
}

if ($modx->event->name === 'OnTVInputPropertiesList') {
  $modx->event->output(MODX_CORE_PATH . 'components/bvtags/elements/tv/input/options/');
}

if ($modx->event->name === 'OnTVInputRender') {
  if ($params['tv']->get('name') === 'bvTagsTV') {
    return $modx->controller->loadInputOptions($params['tv']->get('type'));
  }
}

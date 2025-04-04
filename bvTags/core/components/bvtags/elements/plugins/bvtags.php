<?php
switch ($modx->event->name) {

    case 'OnMODXInit':
        // Явно регистрируем кастомный тип TV
        $modx->tvInputTypes['bvtags'] = MODX_CORE_PATH . 'components/bvtags/elements/tv/input/';
        break;

    case 'OnTVInputRenderList':
        $modx->event->output(MODX_CORE_PATH . 'components/bvtags/elements/tv/input/');
        break;

    case 'OnTVInputPropertiesList':
        $modx->event->output(MODX_CORE_PATH . 'components/bvtags/elements/tv/input/options/');
        break;
}
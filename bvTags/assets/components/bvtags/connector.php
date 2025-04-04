<?php
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    /** @noinspection PhpIncludeInspection */
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
} else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var bvTags $bvTags */
$bvTags = $modx->getService('bvTags', 'bvTags', MODX_CORE_PATH . 'components/bvtags/model/');
$modx->lexicon->load('bvtags:default');

// handle request
$corePath = $modx->getOption('bvtags_core_path', null, $modx->getOption('core_path') . 'components/bvtags/');
$path = $modx->getOption('processorsPath', $bvTags->config, $corePath . 'processors/');
$modx->getRequest();

/** @var modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest([
    'processors_path' => $path,
    'location' => '',
]);
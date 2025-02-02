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
/** @var bvBill $bvBill */
$bvBill = $modx->getService('bvBill', 'bvBill', MODX_CORE_PATH . 'components/bvbill/model/');
$modx->lexicon->load('bvbill:default');

// handle request
$corePath = $modx->getOption('bvbill_core_path', null, $modx->getOption('core_path') . 'components/bvbill/');
$path = $modx->getOption('processorsPath', $bvBill->config, $corePath . 'processors/');
$modx->getRequest();

/** @var modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest([
    'processors_path' => $path,
    'location' => '',
]);
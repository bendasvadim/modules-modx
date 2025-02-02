<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/bvBill/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/bvbill')) {
            $cache->deleteTree(
                $dev . 'assets/components/bvbill/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/bvbill/', $dev . 'assets/components/bvbill');
        }
        if (!is_link($dev . 'core/components/bvbill')) {
            $cache->deleteTree(
                $dev . 'core/components/bvbill/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/bvbill/', $dev . 'core/components/bvbill');
        }
    }
}

return true;
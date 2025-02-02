<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/bvEvent/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/bvevent')) {
            $cache->deleteTree(
                $dev . 'assets/components/bvevent/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/bvevent/', $dev . 'assets/components/bvevent');
        }
        if (!is_link($dev . 'core/components/bvevent')) {
            $cache->deleteTree(
                $dev . 'core/components/bvevent/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/bvevent/', $dev . 'core/components/bvevent');
        }
    }
}

return true;
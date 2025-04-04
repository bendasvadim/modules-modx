<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/bvTags/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/bvtags')) {
            $cache->deleteTree(
                $dev . 'assets/components/bvtags/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/bvtags/', $dev . 'assets/components/bvtags');
        }
        if (!is_link($dev . 'core/components/bvtags')) {
            $cache->deleteTree(
                $dev . 'core/components/bvtags/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/bvtags/', $dev . 'core/components/bvtags');
        }
    }
}

return true;
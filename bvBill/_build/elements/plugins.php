<?php

return [
    'bvBill' => [
        'file' => 'bvbill',
        'description' => 'Создаёт баланс для нового пользователя при его создании.',
        'events' => [
            'OnUserSave' => [],
            'OnPackageInstall' => [],
        ],
        'static' => true,
        'source' => 1,
        'static_file' => 'core/components/bvbill/elements/plugins/bvbill.php',
    ],
];
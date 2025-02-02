<?php

return [
    'modExtra' => [
        'file' => 'modextra',
        'description' => 'Создаёт баланс для нового пользователя при его создании.',
        'events' => [
            'OnUserSave' => [],
            'OnPackageInstall' => [],
        ],
        'static' => true,
        'source' => 1,
        'static_file' => 'core/components/modextra/elements/plugins/modextra.php',
    ],
];
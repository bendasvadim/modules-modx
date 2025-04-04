<?php

class bvBillUserRefferalsGetProcessor extends modObjectGetProcessor
{
    public $objectType = 'bvBillUserRefferals';
    public $classKey = 'bvBillUserRefferals';
    public $languageTopics = ['bvbill:default'];
    //public $permission = 'view';

    /**
     * Проверка прав доступа
     * @return mixed
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        return parent::process();
    }

    /**
     * Форматируем выходные данные, добавляя username и профиль пользователя
     * @return array
     */
    public function cleanup()
    {
        $data = $this->object->toArray();

        // Получаем данные пользователя
        if ($user = $this->modx->getObject('modUser', $data['user_id'])) {
            $data['username'] = $user->get('username');

            // Получаем профиль пользователя
            if ($profile = $user->getOne('Profile')) {
                $data['fullname'] = $profile->get('fullname');
                $data['email'] = $profile->get('email');
            }
        }

        return $this->success('', $data);
    }
}

return 'bvBillUserRefferalsGetProcessor';

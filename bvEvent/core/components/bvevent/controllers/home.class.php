<?php

/**
 * The home manager controller for bvEvent.
 *
 */
class bvEventHomeManagerController extends modExtraManagerController
{
    /** @var bvEvent $bvEvent */
    public $bvEvent;


    /**
     *
     */
    public function initialize()
    {
        $this->bvEvent = $this->modx->getService('bvEvent', 'bvEvent', MODX_CORE_PATH . 'components/bvevent/model/');
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return ['bvevent:default'];
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('bvevent');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->bvEvent->config['cssUrl'] . 'mgr/main.css');
        $this->addJavascript($this->bvEvent->config['jsUrl'] . 'mgr/bvevent.js');
        $this->addJavascript($this->bvEvent->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->bvEvent->config['jsUrl'] . 'mgr/misc/combo.js');
        $this->addJavascript($this->bvEvent->config['jsUrl'] . 'mgr/widgets/notifications.grid.js');
        $this->addJavascript($this->bvEvent->config['jsUrl'] . 'mgr/widgets/notifications.windows.js');
        $this->addJavascript($this->bvEvent->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->bvEvent->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addHtml('<script type="text/javascript">
        bvEvent.config = ' . json_encode($this->bvEvent->config) . ';
        bvEvent.config.connector_url = "' . $this->bvEvent->config['connectorUrl'] . '";
        Ext.onReady(function() {MODx.load({ xtype: "bvevent-page-home"});});
        </script>');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        $this->content .= '<div id="bvevent-panel-home-div"></div>';

        return '';
    }
}
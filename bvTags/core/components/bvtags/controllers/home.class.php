<?php

/**
 * The home manager controller for bvTags.
 *
 */
class bvTagsHomeManagerController extends modExtraManagerController
{
    /** @var bvTags $bvTags */
    public $bvTags;


    /**
     *
     */
    public function initialize()
    {
        $this->bvTags = $this->modx->getService('bvTags', 'bvTags', MODX_CORE_PATH . 'components/bvtags/model/');
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return ['bvtags:default'];
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
        return $this->modx->lexicon('bvtags');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->bvTags->config['cssUrl'] . 'mgr/main.css');
        $this->addJavascript($this->bvTags->config['jsUrl'] . 'mgr/bvtags.js');
        $this->addJavascript($this->bvTags->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->bvTags->config['jsUrl'] . 'mgr/misc/combo.js');
        $this->addJavascript($this->bvTags->config['jsUrl'] . 'mgr/widgets/items.grid.js');
        $this->addJavascript($this->bvTags->config['jsUrl'] . 'mgr/widgets/items.windows.js');
        $this->addJavascript($this->bvTags->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->bvTags->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addHtml('<script type="text/javascript">
        bvTags.config = ' . json_encode($this->bvTags->config) . ';
        bvTags.config.connector_url = "' . $this->bvTags->config['connectorUrl'] . '";
        Ext.onReady(function() {MODx.load({ xtype: "bvtags-page-home"});});
        </script>');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        $this->content .= '<div id="bvtags-panel-home-div"></div>';

        return '';
    }
}
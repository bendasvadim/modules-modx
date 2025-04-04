<?php

/**
 * The home manager controller for bvBill.
 *
 */
class bvBillHomeManagerController extends modExtraManagerController
{
    /** @var bvBill $bvBill */
    public $bvBill;

    /**
     *
     */
    public function initialize()
    {
        $this->bvBill = $this->modx->getService('bvBill', 'bvBill', MODX_CORE_PATH . 'components/bvbill/model/');
        parent::initialize();
    }

    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return ['bvbill:default'];
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
        return $this->modx->lexicon('bvbill');
    }

    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->bvBill->config['cssUrl'] . 'mgr/main.css');
        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/bvbill.js');
        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/misc/combo.js');

        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/widgets/userbalance.grid.js');
        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/widgets/userbalance.windows.js');

        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/widgets/usertransaction.grid.js');
        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/widgets/usertransaction.windows.js');

        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/widgets/usertransactionstatus.grid.js');
        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/widgets/usertransactionstatus.windows.js');

        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/widgets/userrefferal.grid.js');
        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/widgets/userrefferal.windows.js');

        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/widgets/userrefferalstatus.grid.js');
        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/widgets/userrefferalstatus.windows.js');

        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->bvBill->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addHtml('<script type="text/javascript">
        bvBill.config = ' . json_encode($this->bvBill->config) . ';
        bvBill.config.connector_url = "' . $this->bvBill->config['connectorUrl'] . '";
        Ext.onReady(function() {MODx.load({ xtype: "bvbill-page-home"});});
        </script>');
    }

    /**
     * @return string
     */
    public function getTemplateFile()
    {
        $this->content .= '<div id="bvbill-panel-home-div"></div>';
        return '';
    }
}
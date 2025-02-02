bvBill.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'bvbill-panel-home',
            renderTo: 'bvbill-panel-home-div'
        }]
    });
    bvBill.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.page.Home, MODx.Component);
Ext.reg('bvbill-page-home', bvBill.page.Home);
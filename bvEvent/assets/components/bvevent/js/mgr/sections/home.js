bvEvent.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'bvevent-panel-home',
            renderTo: 'bvevent-panel-home-div'
        }]
    });
    bvEvent.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(bvEvent.page.Home, MODx.Component);
Ext.reg('bvevent-page-home', bvEvent.page.Home);
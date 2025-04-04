bvTags.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'bvtags-panel-home',
            renderTo: 'bvtags-panel-home-div'
        }]
    });
    bvTags.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(bvTags.page.Home, MODx.Component);
Ext.reg('bvtags-page-home', bvTags.page.Home);
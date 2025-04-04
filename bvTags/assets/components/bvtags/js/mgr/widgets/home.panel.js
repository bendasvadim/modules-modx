bvTags.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'bvtags-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('bvtags') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('bvtags_items'),
                layout: 'anchor',
                items: [{
                    html: _('bvtags_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'bvtags-grid-items',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    bvTags.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(bvTags.panel.Home, MODx.Panel);
Ext.reg('bvtags-panel-home', bvTags.panel.Home);

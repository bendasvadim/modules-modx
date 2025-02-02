bvEvent.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'bvevent-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('bvevent') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('bvevent_notifications'),
                layout: 'anchor',
                items: [{
                    html: _('bvevent_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'bvevent-grid-notifications',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    bvEvent.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(bvEvent.panel.Home, MODx.Panel);
Ext.reg('bvevent-panel-home', bvEvent.panel.Home);

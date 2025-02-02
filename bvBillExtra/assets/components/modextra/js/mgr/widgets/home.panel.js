modExtra.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'modextra-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('modextra') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: 'userbalance',
                layout: 'anchor',
                items: [{
                    html: _('modextra_notifications'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'modextra-grid-userbalance',
                    cls: 'main-wrapper',
                }]
            },{
                title: 'usertransaction',
                layout: 'anchor',
                items: [{
                    html: _('modextra_usertransaction'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'modextra-grid-usertransaction',
                    cls: 'main-wrapper',
                }]
            },{
                title: 'usertransactionstatus',
                layout: 'anchor',
                items: [{
                    html: _('modextra_usertransactionstatus'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'modextra-grid-usertransactionstatus',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    modExtra.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(modExtra.panel.Home, MODx.Panel);
Ext.reg('modextra-panel-home', modExtra.panel.Home);


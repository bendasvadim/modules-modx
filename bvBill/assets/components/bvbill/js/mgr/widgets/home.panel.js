bvBill.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'bvbill-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('bvbill') + '</h2>',
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
                    html: _('bvbill_notifications'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'bvbill-grid-userbalance',
                    cls: 'main-wrapper',
                }]
            },{
                title: 'usertransaction',
                layout: 'anchor',
                items: [{
                    html: _('bvbill_usertransaction'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'bvbill-grid-usertransaction',
                    cls: 'main-wrapper',
                }]
            },{
                title: 'usertransactionstatus',
                layout: 'anchor',
                items: [{
                    html: _('bvbill_usertransactionstatus'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'bvbill-grid-usertransactionstatus',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    bvBill.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.panel.Home, MODx.Panel);
Ext.reg('bvbill-panel-home', bvBill.panel.Home);


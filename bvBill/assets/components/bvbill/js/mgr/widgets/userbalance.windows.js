bvBill.window.UpdateUserBalance = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvbill-userbalance-window-update';
    }
    Ext.applyIf(config, {
        title: _('bvbill_userbalance_update'),
        width: 400,
        autoHeight: true,
        url: bvBill.config.connector_url,
        action: 'mgr/userbalance/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit();
            }, scope: this
        }]
    });
    bvBill.window.UpdateUserBalance.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.window.UpdateUserBalance, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'displayfield',
            fieldLabel: _('bvbill_userbalance_username'),
            name: 'username',
            id: config.id + '-username',
            anchor: '100%'
        }, {
            xtype: 'numberfield',
            fieldLabel: _('bvbill_userbalance_balance'),
            name: 'balance',
            id: config.id + '-balance',
            anchor: '100%',
            allowBlank: false,
            decimalPrecision: 2,
            minValue: 0,
            allowNegative: false,
            enableKeyEvents: true,
            listeners: {
                keypress: function (field, e) {
                    var charCode = e.getCharCode();
                    if (charCode !== 46 && (charCode < 48 || charCode > 57)) {
                        e.stopEvent();
                    }
                }
            }
        }];
    },

    loadDropZones: function () {}

});
Ext.reg('bvbill-userbalance-window-update', bvBill.window.UpdateUserBalance);
bvBill.window.UpdateUserTransaction = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvbill-usertransaction-window-update';
    }
    Ext.applyIf(config, {
        title: _('bvbill_usertransaction_update'),
        width: 400,
        autoHeight: true,
        url: bvBill.config.connector_url,
        action: 'mgr/usertransaction/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit();
            }, scope: this
        }]
    });
    bvBill.window.UpdateUserTransaction.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.window.UpdateUserTransaction, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'displayfield',
            fieldLabel: _('bvbill_usertransaction_username'),
            name: 'username',
            id: config.id + '-username',
            anchor: '100%'
        }, {
            xtype: 'numberfield',
            fieldLabel: _('bvbill_usertransaction_amount'),
            name: 'amount',
            id: config.id + '-amount',
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
        }, {
            xtype: 'bvbill-combo-transaction-status',
            fieldLabel: _('bvbill_usertransaction_status'),
            name: 'status',
            hiddenName: 'status',
            id: config.id + '-status',
            anchor: '100%'
        }];
    },

    loadDropZones: function () {}

});
Ext.reg('bvbill-usertransaction-window-update', bvBill.window.UpdateUserTransaction);

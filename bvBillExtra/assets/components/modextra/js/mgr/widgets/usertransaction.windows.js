modExtra.window.UpdateUserTransaction = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modextra-usertransaction-window-update';
    }
    Ext.applyIf(config, {
        title: _('modextra_usertransaction_update'),
        width: 400,
        autoHeight: true,
        url: modExtra.config.connector_url,
        action: 'mgr/usertransaction/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit();
            }, scope: this
        }]
    });
    modExtra.window.UpdateUserTransaction.superclass.constructor.call(this, config);
};
Ext.extend(modExtra.window.UpdateUserTransaction, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'displayfield',
            fieldLabel: _('modextra_usertransaction_username'),
            name: 'username',
            id: config.id + '-username',
            anchor: '100%'
        }, {
            xtype: 'numberfield',
            fieldLabel: _('modextra_usertransaction_amount'),
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
            xtype: 'modextra-combo-transaction-status',
            fieldLabel: _('modextra_usertransaction_status'),
            name: 'status',
            hiddenName: 'status',
            id: config.id + '-status',
            anchor: '100%'
        }];
    },

    loadDropZones: function () {}

});
Ext.reg('modextra-usertransaction-window-update', modExtra.window.UpdateUserTransaction);

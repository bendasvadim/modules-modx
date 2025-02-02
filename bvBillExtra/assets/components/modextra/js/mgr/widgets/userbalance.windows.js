modExtra.window.UpdateUserBalance = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modextra-userbalance-window-update';
    }
    Ext.applyIf(config, {
        title: _('modextra_userbalance_update'),
        width: 400,
        autoHeight: true,
        url: modExtra.config.connector_url,
        action: 'mgr/userbalance/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit();
            }, scope: this
        }]
    });
    modExtra.window.UpdateUserBalance.superclass.constructor.call(this, config);
};
Ext.extend(modExtra.window.UpdateUserBalance, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'displayfield',
            fieldLabel: _('modextra_userbalance_username'),
            name: 'username',
            id: config.id + '-username',
            anchor: '100%'
        }, {
            xtype: 'numberfield',
            fieldLabel: _('modextra_userbalance_balance'),
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
Ext.reg('modextra-userbalance-window-update', modExtra.window.UpdateUserBalance);
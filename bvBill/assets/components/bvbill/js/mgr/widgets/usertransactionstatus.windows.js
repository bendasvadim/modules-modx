bvBill.window.CreateUserTransactionStatus = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvbill-usertransactionstatus-window-create';
    }
    Ext.applyIf(config, {
        title: _('bvbill_usertransactionstatus_create'),
        width: 400,
        autoHeight: true,
        url: bvBill.config.connector_url,
        action: 'mgr/usertransactionstatus/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit();
            }, scope: this
        }]
    });
    bvBill.window.CreateUserTransactionStatus.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.window.CreateUserTransactionStatus, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('bvbill_usertransactionstatus_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '100%',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('bvbill_usertransactionstatus_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {}

});
Ext.reg('bvbill-usertransactionstatus-window-create', bvBill.window.CreateUserTransactionStatus);

bvBill.window.UpdateUserTransactionStatus = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvbill-usertransactionstatus-window-update';
    }
    Ext.applyIf(config, {
        title: _('bvbill_usertransactionstatus_update'),
        width: 400,
        autoHeight: true,
        url: bvBill.config.connector_url,
        action: 'mgr/usertransactionstatus/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit();
            }, scope: this
        }]
    });
    bvBill.window.UpdateUserTransactionStatus.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.window.UpdateUserTransactionStatus, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('bvbill_usertransactionstatus_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '100%',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('bvbill_usertransactionstatus_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {}

});
Ext.reg('bvbill-usertransactionstatus-window-update', bvBill.window.UpdateUserTransactionStatus);

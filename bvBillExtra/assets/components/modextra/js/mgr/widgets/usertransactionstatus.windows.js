modExtra.window.CreateUserTransactionStatus = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modextra-usertransactionstatus-window-create';
    }
    Ext.applyIf(config, {
        title: _('modextra_usertransactionstatus_create'),
        width: 400,
        autoHeight: true,
        url: modExtra.config.connector_url,
        action: 'mgr/usertransactionstatus/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit();
            }, scope: this
        }]
    });
    modExtra.window.CreateUserTransactionStatus.superclass.constructor.call(this, config);
};
Ext.extend(modExtra.window.CreateUserTransactionStatus, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('modextra_usertransactionstatus_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '100%',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('modextra_usertransactionstatus_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {}

});
Ext.reg('modextra-usertransactionstatus-window-create', modExtra.window.CreateUserTransactionStatus);

modExtra.window.UpdateUserTransactionStatus = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modextra-usertransactionstatus-window-update';
    }
    Ext.applyIf(config, {
        title: _('modextra_usertransactionstatus_update'),
        width: 400,
        autoHeight: true,
        url: modExtra.config.connector_url,
        action: 'mgr/usertransactionstatus/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit();
            }, scope: this
        }]
    });
    modExtra.window.UpdateUserTransactionStatus.superclass.constructor.call(this, config);
};
Ext.extend(modExtra.window.UpdateUserTransactionStatus, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('modextra_usertransactionstatus_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '100%',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('modextra_usertransactionstatus_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {}

});
Ext.reg('modextra-usertransactionstatus-window-update', modExtra.window.UpdateUserTransactionStatus);

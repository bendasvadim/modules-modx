bvBill.window.CreateUserRefferalStatus = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvbill-userrefferalstatus-window-create';
    }
    Ext.applyIf(config, {
        title: _('bvbill_userrefferalstatus_create'),
        width: 400,
        autoHeight: true,
        url: bvBill.config.connector_url,
        action: 'mgr/userrefferalstatus/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit();
            }, scope: this
        }]
    });
    bvBill.window.CreateUserRefferalStatus.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.window.CreateUserRefferalStatus, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('bvbill_userrefferalstatus_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '100%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('bvbill_userrefferalstatus_color'),
            name: 'color',
            id: config.id + '-color',
            anchor: '100%',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('bvbill_userrefferalstatus_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {}

});
Ext.reg('bvbill-userrefferalstatus-window-create', bvBill.window.CreateUserRefferalStatus);

bvBill.window.UpdateUserRefferalStatus = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvbill-userrefferalstatus-window-update';
    }
    Ext.applyIf(config, {
        title: _('bvbill_userrefferalstatus_update'),
        width: 400,
        autoHeight: true,
        url: bvBill.config.connector_url,
        action: 'mgr/userrefferalstatus/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit();
            }, scope: this
        }]
    });
    bvBill.window.UpdateUserRefferalStatus.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.window.UpdateUserRefferalStatus, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('bvbill_userrefferalstatus_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '100%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('bvbill_userrefferalstatus_color'),
            name: 'color',
            id: config.id + '-color',
            anchor: '100%',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('bvbill_userrefferalstatus_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {}

});
Ext.reg('bvbill-userrefferalstatus-window-update', bvBill.window.UpdateUserRefferalStatus);

bvBill.window.CreateUserRefferal = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvbill-userrefferal-window-create';
    }
    Ext.applyIf(config, {
        title: _('bvbill_userrefferal_create'),
        width: 400,
        autoHeight: true,
        url: bvBill.config.connector_url,
        action: 'mgr/userrefferal/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit();
            }, scope: this
        }]
    });
    bvBill.window.CreateUserRefferal.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.window.CreateUserRefferal, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'bvbill-combo-user',
            fieldLabel: _('bvbill_userrefferal_username'),
            name: 'user_id',
            id: config.id + '-user_id',
            anchor: '100%'
        }, {
            xtype: 'textfield',
            fieldLabel: _('bvbill_userrefferal_fullname'),
            name: 'fullname',
            id: config.id + '-fullname',
            anchor: '99%'
        }, {
            xtype: 'textfield',
            fieldLabel: _('bvbill_userrefferal_phone'),
            name: 'phone',
            id: config.id + '-phone',
            anchor: '99%'
        }, {
            xtype: 'bvbill-combo-refferal-status',
            fieldLabel: _('bvbill_userrefferal_status'),
            name: 'status_id',
            hiddenName: 'status_id',
            id: config.id + '-status_id',
            anchor: '100%'
        }];
    },

    loadDropZones: function () {}

});
Ext.reg('bvbill-userrefferal-window-create', bvBill.window.CreateUserRefferal);

bvBill.window.UpdateUserRefferal = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvbill-userrefferal-window-update';
    }
    Ext.applyIf(config, {
        title: _('bvbill_userrefferal_update'),
        width: 400,
        autoHeight: true,
        url: bvBill.config.connector_url,
        action: 'mgr/userrefferal/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit();
            }, scope: this
        }]
    });
    bvBill.window.UpdateUserRefferal.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.window.UpdateUserRefferal, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'displayfield',
            fieldLabel: _('bvbill_userrefferal_username'),
            name: 'username',
            id: config.id + '-username',
            anchor: '100%'
        }, {
            xtype: 'textfield',
            fieldLabel: _('bvbill_userrefferal_fullname'),
            name: 'fullname',
            id: config.id + '-fullname',
            anchor: '99%'
        }, {
            xtype: 'textfield',
            fieldLabel: _('bvbill_userrefferal_phone'),
            name: 'phone',
            id: config.id + '-phone',
            anchor: '99%'
        }, {
            xtype: 'bvbill-combo-refferal-status',
            fieldLabel: _('bvbill_userrefferal_status'),
            name: 'status_id',
            hiddenName: 'status_id',
            id: config.id + '-status_id',
            anchor: '100%'
        }];
    },

    loadDropZones: function () {}

});
Ext.reg('bvbill-userrefferal-window-update', bvBill.window.UpdateUserRefferal);

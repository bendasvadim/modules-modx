modExtra.window.CreateNotification = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modextra-notification-window-create';
    }
    Ext.applyIf(config, {
        title: _('modextra_notification_create'),
        width: 550,
        autoHeight: true,
        url: modExtra.config.connector_url,
        action: 'mgr/notification/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modExtra.window.CreateNotification.superclass.constructor.call(this, config);
};
Ext.extend(modExtra.window.CreateNotification, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('modextra_notification_title'),
            name: 'title',
            id: config.id + '-title',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'htmleditor',
            fieldLabel: _('modextra_notification_text'),
            name: 'text',
            id: config.id + '-text',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'modx-combo-user',
            fieldLabel: _('modextra_notification_user_id'),
            name: 'user_id',
            hiddenName: 'user_id',
            id: config.id + '-user_id',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('modextra_notification_is_read'),
            name: 'is_read',
            id: config.id + '-is_read',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('modextra-notification-window-create', modExtra.window.CreateNotification);

modExtra.window.UpdateNotification = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modextra-notification-window-update';
    }
    Ext.applyIf(config, {
        title: _('modextra_notification_update'),
        width: 550,
        autoHeight: true,
        url: modExtra.config.connector_url,
        action: 'mgr/notification/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    modExtra.window.UpdateNotification.superclass.constructor.call(this, config);
};
Ext.extend(modExtra.window.UpdateNotification, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('modextra_notification_title'),
            name: 'title',
            id: config.id + '-title',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'htmleditor',
            fieldLabel: _('modextra_notification_text'),
            name: 'text',
            id: config.id + '-text',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'modx-combo-user',
            fieldLabel: _('modextra_notification_user_id'),
            name: 'user_id',
            hiddenName: 'user_id',
            id: config.id + '-user_id',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('modextra_notification_is_read'),
            name: 'is_read',
            id: config.id + '-is_read',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('modextra-notification-window-update', modExtra.window.UpdateNotification);
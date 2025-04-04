bvEvent.window.CreateNotification = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvevent-notification-window-create';
    }
    Ext.applyIf(config, {
        title: _('bvevent_notification_create'),
        width: 550,
        autoHeight: true,
        url: bvEvent.config.connector_url,
        action: 'mgr/notification/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    bvEvent.window.CreateNotification.superclass.constructor.call(this, config);
};
Ext.extend(bvEvent.window.CreateNotification, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('bvevent_notification_title'),
            name: 'title',
            id: config.id + '-title',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textarea',
            fieldLabel: _('bvevent_notification_text'),
            name: 'text',
            id: config.id + '-text',
            anchor: '99%',
            allowBlank: false,
            height: 150,
        }, {
            xtype: 'modx-combo-user',
            fieldLabel: _('bvevent_notification_user_id'),
            name: 'user_id',
            hiddenName: 'user_id',
            id: config.id + '-user_id',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('bvevent_notification_is_read'),
            name: 'is_read',
            id: config.id + '-is_read',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('bvevent-notification-window-create', bvEvent.window.CreateNotification);

bvEvent.window.UpdateNotification = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvevent-notification-window-update';
    }
    Ext.applyIf(config, {
        title: _('bvevent_notification_update'),
        width: 550,
        autoHeight: true,
        url: bvEvent.config.connector_url,
        action: 'mgr/notification/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    bvEvent.window.UpdateNotification.superclass.constructor.call(this, config);
};
Ext.extend(bvEvent.window.UpdateNotification, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('bvevent_notification_title'),
            name: 'title',
            id: config.id + '-title',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textarea',
            fieldLabel: _('bvevent_notification_text'),
            name: 'text',
            id: config.id + '-text',
            anchor: '99%',
            allowBlank: false,
            height: 150,
        }, {
            xtype: 'modx-combo-user',
            fieldLabel: _('bvevent_notification_user_id'),
            name: 'user_id',
            hiddenName: 'user_id',
            id: config.id + '-user_id',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('bvevent_notification_is_read'),
            name: 'is_read',
            id: config.id + '-is_read',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('bvevent-notification-window-update', bvEvent.window.UpdateNotification);
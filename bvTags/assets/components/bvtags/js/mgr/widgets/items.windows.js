bvTags.window.CreateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvtags-item-window-create';
    }
    Ext.applyIf(config, {
        title: _('bvtags_item_create'),
        width: 550,
        autoHeight: true,
        url: bvTags.config.connector_url,
        action: 'mgr/item/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    bvTags.window.CreateItem.superclass.constructor.call(this, config);
};
Ext.extend(bvTags.window.CreateItem, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('bvtags_item_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('bvtags_item_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('bvtags-item-window-create', bvTags.window.CreateItem);


bvTags.window.UpdateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvtags-item-window-update';
    }
    Ext.applyIf(config, {
        title: _('bvtags_item_update'),
        width: 550,
        autoHeight: true,
        url: bvTags.config.connector_url,
        action: 'mgr/item/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    bvTags.window.UpdateItem.superclass.constructor.call(this, config);
};
Ext.extend(bvTags.window.UpdateItem, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('bvtags_item_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('bvtags_item_active'),
            name: 'active',
            id: config.id + '-active',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('bvtags-item-window-update', bvTags.window.UpdateItem);

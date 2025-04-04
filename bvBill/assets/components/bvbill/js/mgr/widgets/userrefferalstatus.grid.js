bvBill.grid.UserRefferalStatus = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvbill-grid-userrefferaltatus';
    }
    Ext.applyIf(config, {
        url: bvBill.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/userrefferaltatus/getlist'
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateUserRefferalStatus(grid, e, row);
            }
        },
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0,
        },
        paging: true,
        remoteSort: true,
        autoHeight: true,
    });
    bvBill.grid.UserRefferalStatus.superclass.constructor.call(this, config);

    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(bvBill.grid.UserRefferalStatus, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();
        var row = grid.getStore().getAt(rowIndex);
        var menu = bvBill.utils.getMenu(row.data['actions'], this, ids);
        this.addContextMenuItem(menu);
    },

    createUserRefferalStatus: function (btn, e) {
        var w = MODx.load({
            xtype: 'bvbill-userrefferaltatus-window-create',
            id: Ext.id(),
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.show(e.target);
    },

    enableUserRefferalStatus: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/userrefferaltatus/enable',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
    },

    disableUserRefferalStatus: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/userrefferaltatus/disable',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
    },

    removeUserRefferalStatus: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: _('bvbill_item_remove'),
            text: _('bvbill_item_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/userrefferaltatus/remove',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
    },

    updateUserRefferalStatus: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/userrefferaltatus/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'bvbill-userrefferaltatus-window-update',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
            }
        });
    },

    getFields: function () {
        return ['id', 'name', 'active', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('id'),
            dataIndex: 'id',
            sortable: true,
            width: 50
        }, {
            header: _('bvbill_userrefferaltatus_name'),
            dataIndex: 'name',
            sortable: true,
            width: 150
        }, {
            header: _('bvbill_userrefferaltatus_active'),
            dataIndex: 'active',
            renderer: bvBill.utils.renderBoolean,
            sortable: true,
            width: 100
        }, {
            header: _('bvbill_grid_actions'),
            dataIndex: 'actions',
            renderer: bvBill.utils.renderActions,
            sortable: false,
            width: 100
        }];
    },

    getTopBar: function () {
        return [{
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('bvbill_item_create'),
            handler: this.createUserRefferalStatus,
            scope: this
        }, '->', {
            xtype: 'bvbill-field-search',
            width: 250,
            listeners: {
                search: {
                    fn: function (field) {
                        this._doSearch(field);
                    }, scope: this
                },
                clear: {
                    fn: function (field) {
                        field.setValue('');
                        this._clearSearch();
                    }, scope: this
                },
            }
        }];
    },

    _getSelectedIds: function () {
        var ids = [];
        var selected = this.getSelectionModel().getSelections();
        for (var i in selected) {
            if (!selected.hasOwnProperty(i)) {
                continue;
            }
            ids.push(selected[i]['id']);
        }
        return ids;
    },

    _doSearch: function (tf) {
        this.getStore().baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
    },

    _clearSearch: function () {
        this.getStore().baseParams.query = '';
        this.getBottomToolbar().changePage(1);
    }
});
Ext.reg('bvbill-grid-userrefferaltatus', bvBill.grid.UserRefferalStatus);

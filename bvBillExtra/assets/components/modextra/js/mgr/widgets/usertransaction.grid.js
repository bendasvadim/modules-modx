modExtra.grid.UserTransaction = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modextra-grid-usertransaction';
    }
    Ext.applyIf(config, {
        url: modExtra.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/usertransaction/getlist'
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateUserTransaction(grid, e, row);
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
    modExtra.grid.UserTransaction.superclass.constructor.call(this, config);
};
Ext.extend(modExtra.grid.UserTransaction, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();
        var row = grid.getStore().getAt(rowIndex);
        var menu = modExtra.utils.getMenu(row.data['actions'], this, ids);
        this.addContextMenuItem(menu);
    },

    createUserTransaction: function (btn, e) {
        var w = MODx.load({
            xtype: 'modextra-usertransaction-window-create',
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

    updateUserTransaction: function (btn, e, row) {
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
                action: 'mgr/usertransaction/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'modextra-usertransaction-window-update',
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

    removeUserTransaction: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: _('modextra_item_remove'),
            text: _('modextra_item_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/usertransaction/remove',
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

    getFields: function () {
        return ['id', 'user_id', 'username', 'amount', 'status', 'createdon', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('id'),
            dataIndex: 'id',
            sortable: true,
            width: 50
        }, {
            header: _('modextra_usertransaction_username'),
            dataIndex: 'username',
            sortable: true,
            width: 150
        }, {
            header: _('modextra_usertransaction_amount'),
            dataIndex: 'amount',
            sortable: true,
            width: 100
        }, {
            header: _('modextra_usertransaction_status'),
            dataIndex: 'status',
            sortable: true,
            width: 100
        }, {
            header: _('modextra_usertransaction_createdon'),
            dataIndex: 'createdon',
            sortable: true,
            width: 150
        }, {
            header: _('modextra_grid_actions'),
            dataIndex: 'actions',
            renderer: modExtra.utils.renderActions,
            sortable: false,
            width: 100
        }];
    },

    getTopBar: function () {
        return [{
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('modextra_item_create'),
            handler: this.createUserTransaction,
            scope: this
        }, '->', {
            xtype: 'modextra-field-search',
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
    }
});
Ext.reg('modextra-grid-usertransaction', modExtra.grid.UserTransaction);

modExtra.grid.UserTransactionStatus = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modextra-grid-usertransactionstatus';
    }
    Ext.applyIf(config, {
        url: modExtra.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/usertransactionstatus/getlist'
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateUserTransactionStatus(grid, e, row);
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
    modExtra.grid.UserTransactionStatus.superclass.constructor.call(this, config);

    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(modExtra.grid.UserTransactionStatus, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();
        var row = grid.getStore().getAt(rowIndex);
        var menu = modExtra.utils.getMenu(row.data['actions'], this, ids);
        this.addContextMenuItem(menu);
    },

    createUserTransactionStatus: function (btn, e) {
        var w = MODx.load({
            xtype: 'modextra-usertransactionstatus-window-create',
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

    enableUserTransactionStatus: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/usertransactionstatus/enable',
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

    disableUserTransactionStatus: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/usertransactionstatus/disable',
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

    removeUserTransactionStatus: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: _('modextra_item_remove'),
            text: _('modextra_item_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/usertransactionstatus/remove',
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
        return ['id', 'name', 'active', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('id'),
            dataIndex: 'id',
            sortable: true,
            width: 50
        }, {
            header: _('modextra_usertransactionstatus_name'),
            dataIndex: 'name',
            sortable: true,
            width: 150
        }, {
            header: _('modextra_usertransactionstatus_active'),
            dataIndex: 'active',
            renderer: modExtra.utils.renderBoolean,
            sortable: true,
            width: 100
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
            handler: this.createUserTransactionStatus,
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
Ext.reg('modextra-grid-usertransactionstatus', modExtra.grid.UserTransactionStatus);

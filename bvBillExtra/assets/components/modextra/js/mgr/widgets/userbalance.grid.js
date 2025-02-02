modExtra.grid.UserBalance = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'modextra-grid-userbalance';
    }
    Ext.applyIf(config, {
        url: modExtra.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/userbalance/getlist'
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateUserBalance(grid, e, row);
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
    modExtra.grid.UserBalance.superclass.constructor.call(this, config);

    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(modExtra.grid.UserBalance, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();
        var row = grid.getStore().getAt(rowIndex);
        var menu = modExtra.utils.getMenu(row.data['actions'], this, ids);
        this.addContextMenuItem(menu);
    },

    updateUserBalance: function (btn, e, row) {
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
                action: 'mgr/userbalance/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'modextra-userbalance-window-update',
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
        return ['id', 'user_id', 'username', 'balance', 'updatedon', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('id'),
            dataIndex: 'id',
            sortable: true,
            width: 50
        }, {
            header: _('modextra_userbalance_username'),
            dataIndex: 'username',
            sortable: true,
            width: 150
        }, {
            header: _('modextra_userbalance_balance'),
            dataIndex: 'balance',
            sortable: true,
            width: 100
        }, {
            header: _('modextra_userbalance_updatedon'),
            dataIndex: 'updatedon',
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
        return ['->', {
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
    },
});
Ext.reg('modextra-grid-userbalance', modExtra.grid.UserBalance);

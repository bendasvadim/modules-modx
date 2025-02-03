bvBill.grid.UserTransaction = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bvbill-grid-usertransaction';
    }
    Ext.applyIf(config, {
        url: bvBill.config.connector_url,
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
    bvBill.grid.UserTransaction.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.grid.UserTransaction, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();
        var row = grid.getStore().getAt(rowIndex);
        var menu = bvBill.utils.getMenu(row.data['actions'], this, ids);
        this.addContextMenuItem(menu);
    },

    createUserTransaction: function (btn, e) {
        var w = MODx.load({
            xtype: 'bvbill-usertransaction-window-create',
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
                            xtype: 'bvbill-usertransaction-window-update',
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
            title: _('bvbill_item_remove'),
            text: _('bvbill_item_remove_confirm'),
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
        return ['id', 'user_id', 'username', 'amount', 'status_id', 'status', 'status_name', 'createdon', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('id'),
            dataIndex: 'id',
            sortable: true,
            width: 50
        }, {
            header: _('bvbill_usertransaction_username'),
            dataIndex: 'username',
            sortable: true,
            width: 150
        }, {
            header: _('bvbill_usertransaction_amount'),
            dataIndex: 'amount',
            sortable: true,
            width: 100
        }, {
            header: _('bvbill_usertransaction_status'),
            dataIndex: 'status_name',
            sortable: true,
            width: 100
        }, {
            header: _('bvbill_usertransaction_createdon'),
            dataIndex: 'createdon',
            renderer: bvBill.utils.formatDate,
            sortable: true,
            width: 150
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
            handler: this.createUserTransaction,
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

    onClick: function (e) {
        var elem = e.getTarget();
        if (elem.nodeName == 'BUTTON') {
            var row = this.getSelectionModel().getSelected();
            if (typeof(row) != 'undefined') {
                var action = elem.getAttribute('action');
                if (action == 'showMenu') {
                    var ri = this.getStore().find('id', row.id);
                    return this._showMenu(this, ri, e);
                }
                else if (typeof this[action] === 'function') {
                    this.menu.record = row.data;
                    return this[action](this, e);
                }
            }
        }
        return this.processEvent('click', e);
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
Ext.reg('bvbill-grid-usertransaction', bvBill.grid.UserTransaction);

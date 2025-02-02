bvBill.combo.Search = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        xtype: 'twintrigger',
        ctCls: 'x-field-search',
        allowBlank: true,
        msgTarget: 'under',
        emptyText: _('search'),
        name: 'query',
        triggerAction: 'all',
        clearBtnCls: 'x-field-search-clear',
        searchBtnCls: 'x-field-search-go',
        onTrigger1Click: this._triggerSearch,
        onTrigger2Click: this._triggerClear,
    });
    bvBill.combo.Search.superclass.constructor.call(this, config);
    this.on('render', function () {
        this.getEl().addKeyListener(Ext.EventObject.ENTER, function () {
            this._triggerSearch();
        }, this);
    });
    this.addEvents('clear', 'search');
};
Ext.extend(bvBill.combo.Search, Ext.form.TwinTriggerField, {

    initComponent: function () {
        Ext.form.TwinTriggerField.superclass.initComponent.call(this);
        this.triggerConfig = {
            tag: 'span',
            cls: 'x-field-search-btns',
            cn: [
                {tag: 'div', cls: 'x-form-trigger ' + this.searchBtnCls},
                {tag: 'div', cls: 'x-form-trigger ' + this.clearBtnCls}
            ]
        };
    },

    _triggerSearch: function () {
        this.fireEvent('search', this);
    },

    _triggerClear: function () {
        this.fireEvent('clear', this);
    },

});
Ext.reg('bvbill-combo-search', bvBill.combo.Search);
Ext.reg('bvbill-field-search', bvBill.combo.Search);

bvBill.combo.TransactionStatus = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'status',
        id: 'bvbill-combo-transaction-status',
        hiddenName: 'status',
        displayField: 'name',
        valueField: 'id',
        fields: ['id', 'name'],
        pageSize: 10,
        emptyText: _('bvbill_combo_select_status'),
        url: bvBill.config.connector_url,
        baseParams: {
            action: 'mgr/usertransactionstatus/getlist',
            combo: true,
            addall: config.addall || 0
        },
    });
    bvBill.combo.TransactionStatus.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.combo.TransactionStatus, MODx.combo.ComboBox);
Ext.reg('bvbill-combo-transaction-status', bvBill.combo.TransactionStatus);

modExtra.combo.Search = function (config) {
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
    modExtra.combo.Search.superclass.constructor.call(this, config);
    this.on('render', function () {
        this.getEl().addKeyListener(Ext.EventObject.ENTER, function () {
            this._triggerSearch();
        }, this);
    });
    this.addEvents('clear', 'search');
};
Ext.extend(modExtra.combo.Search, Ext.form.TwinTriggerField, {

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
Ext.reg('modextra-combo-search', modExtra.combo.Search);
Ext.reg('modextra-field-search', modExtra.combo.Search);

modExtra.combo.TransactionStatus = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'status',
        id: 'modextra-combo-transaction-status',
        hiddenName: 'status',
        displayField: 'name',
        valueField: 'id',
        fields: ['id', 'name'],
        pageSize: 10,
        emptyText: _('modextra_combo_select_status'),
        url: modExtra.config.connector_url,
        baseParams: {
            action: 'mgr/usertransactionstatus/getlist',
            combo: true,
            addall: config.addall || 0
        },
    });
    modExtra.combo.TransactionStatus.superclass.constructor.call(this, config);
};
Ext.extend(modExtra.combo.TransactionStatus, MODx.combo.ComboBox);
Ext.reg('modextra-combo-transaction-status', modExtra.combo.TransactionStatus);

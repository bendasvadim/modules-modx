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
        name: 'status_id',
        id: 'bvbill-combo-transaction-status',
        hiddenName: 'status_id',
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

bvBill.combo.User = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        name: 'user',
        fieldLabel: _('bvbill_user_' + (config.name || 'createdby')),
        hiddenName: config.name || 'createdby',
        displayField: 'username',
        valueField: 'id',
        anchor: '99%',
        fields: ['username', 'id', 'fullname'],
        pageSize: 20,
        url: MODx.config.connector_url,
        typeAhead: true,
        editable: true,
        action: 'getList',
        allowBlank: true,
        baseParams: {
            action: 'security/user/getlist',
            combo: 1,
            id: config.value
        },
        tpl: new Ext.XTemplate(''
            + '<tpl for="."><div class="x-combo-list-item">'
            + '<small>({id})</small> <b>{username}</b><br/>{fullname}</span>'
            + '</div></tpl>', {
            compiled: true
        })
    });
    bvBill.combo.User.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.combo.User, MODx.combo.ComboBox);
Ext.reg('bvbill-combo-user', bvBill.combo.User);

bvBill.combo.TransactionType = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        store: new Ext.data.SimpleStore({
            fields: ['value', 'display'],
            data: [
                ['1', 'Начисление'],
                ['0', 'Списание']
            ]
        }),
        mode: 'local',
        displayField: 'display',
        valueField: 'value',
        hiddenName: 'type',
        editable: false,
        triggerAction: 'all',
        forceSelection: true,
        selectOnFocus: true
    });
    bvBill.combo.TransactionType.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.combo.TransactionType, MODx.combo.ComboBox);
Ext.reg('bvbill-combo-transaction-type', bvBill.combo.TransactionType);

bvBill.combo.RefferalStatus = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'status_id',
        id: 'bvbill-combo-refferal-status',
        hiddenName: 'status_id',
        displayField: 'name',
        valueField: 'id',
        fields: ['id', 'name'],
        pageSize: 10,
        emptyText: _('bvbill_combo_select_status'),
        url: bvBill.config.connector_url,
        baseParams: {
            action: 'mgr/userrefferaltatus/getlist',
            combo: true,
            addall: config.addall || 0
        },
    });
    bvBill.combo.RefferalStatus.superclass.constructor.call(this, config);
};
Ext.extend(bvBill.combo.RefferalStatus, MODx.combo.ComboBox);
Ext.reg('bvbill-combo-refferal-status', bvBill.combo.RefferalStatus);

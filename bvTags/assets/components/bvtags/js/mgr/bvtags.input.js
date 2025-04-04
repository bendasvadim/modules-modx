Ext.onReady(function () {
  const tvId = MODx.tvbvtagsTV;
  const defaultValue = MODx.tvbvtagsTV_default || '';
  const containerId = `tv-tags-${tvId}`;
  const inputId = `tv${tvId}`;
  const wrapperId = `tv-input-bvtagsTV`;

  // Инициализируем текстовое поле
  const field = MODx.load({
    xtype: 'textfield',
    applyTo: inputId,
    id: inputId,
    width: 400,
    enableKeyEvents: true,
    allowBlank: true,
    value: defaultValue,
    listeners: {
      keydown: { fn: MODx.fireResourceFormChange, scope: this },
    },
  });

  Ext.getCmp('modx-panel-resource').getForm().add(field);

  // Получаем список тегов и отрисовываем
  Ext.Ajax.request({
    url: '/assets/components/bvtags/connector.php',
    params: {
      action: 'mgr/item/taggetlist',
      limit: 0,
    },
    success: function (response) {
      const data = Ext.decode(response.responseText);
      if (!data.results) return;

      const html = ['<ul class="modx-tag-list" id="' + containerId + '">'];
      data.results.forEach(tag => {
        html.push(`<li class="modx-tag-opt" title="${tag.name}">${tag.name}</li>`);
      });
      html.push('</ul>');

      Ext.get(wrapperId).insertHtml('beforeEnd', html.join(''), false);

      // Обработка кликов
      Ext.select(`#${containerId} li`, true).on('click', function (e, el) {
        const li = Ext.get(el);
        const tf = Ext.getCmp(inputId);
        if (!li || !tf) return;

        let val = tf.getValue();
        const tag = li.dom.title;

        if (li.hasClass('modx-tag-checked')) {
          tf.setValue(Ext.util.Format.trimCommas(val.replace(tag, '')));
          li.removeClass('modx-tag-checked');
        } else {
          tf.setValue(Ext.util.Format.trimCommas(val + (val ? ',' : '') + tag));
          li.addClass('modx-tag-checked');
        }
        MODx.fireResourceFormChange();
      });
    }
  });
});

/*MODx.combo.bvTags = function(config) {
  config = config || {};
  Ext.applyIf(config,{
    name: config.name || 'tv95',
    hiddenName: config.name || 'tv95',
    displayField: 'name',
    valueField: 'name',
    fields: ['name'],
    url: '/assets/components/bvtags/connector.php',
    baseParams: {
      action: 'mgr/item/getlist'
    },
    mode: 'remote',
    editable: true,
    typeAhead: false,
    forceSelection: false,
    triggerAction: 'all',
    selectOnFocus: true,
    allowBlank: true,
  });
  MODx.combo.bvTags.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.bvTags, MODx.combo.ComboBox);
Ext.reg('bvtags-combo', MODx.combo.bvTags);


Ext.onReady(function () {
  MODx.load({
    xtype: 'bvtags-combo',
    renderTo: 'tv-input-bvtagsTV',
    value: MODx.tvbvtagsTV_default || '',
    width: 600,
    allowBlank: true,
    listeners: {
      change: MODx.fireResourceFormChange
    }
  });
});*/
<input id="tv{$tv->id}" name="tv{$tv->id}" type="text" class="textfield"
       value="{$tv->get('value')|escape}" tvtype="{$tv->type}" />
<div id="tv-tags-{$tv->id}-tag-list" class="modx-tag-list"></div>

<script type="text/javascript">
  // <![CDATA[
  {literal}
  Ext.onReady(function () {
    const id = {/literal}{$tv->id}{literal};
    const inputId = 'tv' + id;
    const tagListId = 'tv-tags-' + id + '-tag-list';

    const field = MODx.load({
      xtype: 'textfield',
      applyTo: inputId,
      width: 400,
      id: inputId,
      enableKeyEvents: true,
      msgTarget: 'under',
      allowBlank: true,
      listeners: { 'keydown': { fn: MODx.fireResourceFormChange, scope: this } }
    });

    Ext.getCmp('modx-panel-resource').getForm().add(field);

    // Загружаем список тегов через AJAX
    Ext.Ajax.request({
      url: MODx.config.assets_url + 'components/bvtags/connector.php',
      params: {
        action: 'mgr/item/taggetlist',
        active: 1,
      },
      success: function (response) {
        const data = Ext.decode(response.responseText);
        if (!data.success || !data.results) return;

        const values = field.getValue().split(',').map(v => v.trim());
        const tagList = Ext.get(tagListId);
        tagList.dom.innerHTML = '';

        data.results.forEach(function (item) {
          const isChecked = values.includes(item.name);
          const li = document.createElement('li');
          li.className = 'modx-tag-opt' + (isChecked ? ' modx-tag-checked' : '');
          li.textContent = item.name;
          li.title = item.name;
          li.addEventListener('click', function () {
            const current = field.getValue().split(',').map(v => v.trim()).filter(Boolean);
            if (li.classList.contains('modx-tag-checked')) {
              li.classList.remove('modx-tag-checked');
              field.setValue(current.filter(t => t !== item.name).join(','));
            } else {
              li.classList.add('modx-tag-checked');
              if (!current.includes(item.name)) current.push(item.name);
              field.setValue(current.join(','));
            }
            MODx.fireResourceFormChange();
          });
          tagList.dom.appendChild(li);
        });
      }
    });

    // Поддержка reset
    const panel = Ext.getCmp('modx-panel-resource');
    if (panel) {
      panel.on('tv-reset', function (o) {
        if (o.id != id) return;
        location.reload(); // Простой способ сбросить UI
      });
    }
  });
    {/literal}
  // ]]>
</script>

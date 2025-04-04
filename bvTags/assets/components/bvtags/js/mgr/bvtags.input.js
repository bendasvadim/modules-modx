Ext.onReady(function () {
  MODx.load({
    xtype: 'superboxselect',
    name: 'tv' + MODx.tvbvtagsTV,
    hiddenName: 'tv' + MODx.tvbvtagsTV,
    allowAddNewData: false,
    store: new Ext.data.JsonStore({
      url: MODx.config.connector_url,
      baseParams: {
        action: 'bvtags/item/getlist',
        active: 1
      },
      fields: ['id', 'name'],
      root: 'results'
    }),
    displayField: 'name',
    valueField: 'name',
    mode: 'remote',
    anchor: '100%',
    value: MODx.tvbvtagsTV_default
  });
});

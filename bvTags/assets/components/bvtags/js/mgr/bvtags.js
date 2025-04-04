var bvTags = function (config) {
    config = config || {};
    bvTags.superclass.constructor.call(this, config);
};
Ext.extend(bvTags, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('bvtags', bvTags);

bvTags = new bvTags();
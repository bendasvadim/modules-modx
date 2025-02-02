var bvEvent = function (config) {
    config = config || {};
    bvEvent.superclass.constructor.call(this, config);
};
Ext.extend(bvEvent, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('bvevent', bvEvent);

bvEvent = new bvEvent();
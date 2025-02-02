var bvBill = function (config) {
    config = config || {};
    bvBill.superclass.constructor.call(this, config);
};
Ext.extend(bvBill, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('bvbill', bvBill);

bvBill = new bvBill();
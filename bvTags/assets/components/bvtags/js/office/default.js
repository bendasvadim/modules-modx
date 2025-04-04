Ext.onReady(function () {
    bvTags.config.connector_url = OfficeConfig.actionUrl;

    var grid = new bvTags.panel.Home();
    grid.render('office-bvtags-wrapper');

    var preloader = document.getElementById('office-preloader');
    if (preloader) {
        preloader.parentNode.removeChild(preloader);
    }
});
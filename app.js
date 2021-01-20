Ext.application({
  requires: ['Ext.container.Viewport'],
  name: 'HL',
  appFolder: 'app',
  controllers: ['House'],
  launch: function() {
      Ext.create('Ext.container.Viewport', {
          layout: 'fit',
          items: {
            xtype: 'houselist'
        }
      });
  }
});
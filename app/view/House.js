Ext.define('HL.view.House', {
  extend: 'Ext.window.Window',
  alias: 'widget.housewindow',

  title: 'Объект',
  layout: 'fit',
  autoShow: true,

  initComponent: function () {
    this.items = [{
      xtype: 'form',
      items: [{
        xtype: 'numberfield',
        padding: 10,
        name: 'id',
        fieldLabel: 'Артикул'
      }, {
        xtype: 'textfield',
        padding: 10,
        name: 'name',
        fieldLabel: 'Название'
      }, {
        xtype: 'textfield',
        padding: 10,
        name: 'description',
        fieldLabel: 'Описание',
      }, {
        xtype: 'numberfield',
        padding: 10,
        name: 'price',
        fieldLabel: 'Цена',
      }]
    }];
    this.dockedItems = [{
      xtype: 'toolbar',
      docked: 'top',
      items: [{
        text: 'Создать',
        action: 'new'
      }, {
        text: 'Сохранить',
        action: 'save'
      }, {
        text: 'Удалить',
        action: 'delete'
      }]
    }];
    this.buttons = [{
      text: 'Очистить',
      scope: this,
      action: 'clear'
    }];

    this.callParent(arguments);
  }
});


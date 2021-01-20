Ext.define('HL.controller.House', {
  extend: 'Ext.app.Controller',

  views: ['HouseList', 'House' ],
  stores: ['HouseStore'],
  models: ['House'],

  init: function () {
    this.control({
      'viewport > houselist': {
        itemdblclick: this.editHouse
      },    
      'housewindow button[action=new]': {
        click: this.createHouse
      },
      'housewindow button[action=save]': {
        click: this.updateHouse
      },
      'housewindow button[action=delete]': {
        click: this.deleteHouse
      },
      'housewindow button[action=clear]': {
        click: this.clearForm
      }
    });
  },
  // обновление
  updateHouse: function (button) {
    var win = button.up('window'),
      form = win.down('form'),
      values = form.getValues(),
      id = form.getRecord().get('id');
    values.id = id;
    Ext.Ajax.request({
      url: 'api/product/update.php',
      method: 'POST',
      async: false,
      params: Ext.encode(values),
      success: function (response) {
        var data = Ext.decode(response.responseText);
        if (response.status === 200) {
          Ext.Msg.alert('Обновление', data.message);
          var store = Ext.widget('houselist').getStore();
          var record = store.getById(id);
          store.add(record);
          store.reload();
          win.close();
        }
        else {
          Ext.Msg.alert('Обновление', 'Не удалось обновить данные объекта');
        }
      }
    });
  },
  // создание
  createHouse: function (button) {
    var win = button.up('window'),
      form = win.down('form'),
      values = form.getValues();
      id = form.getRecord().get('id');

    Ext.Ajax.request({
      url: 'api/product/create.php',
      method: 'POST',
      async: false,
      params: Ext.encode(values),
      success: function (response) {
        var data = Ext.decode(response.responseText);
        if (response.status === 201) {
          Ext.Msg.alert('Создание', data.message);
          var store = Ext.widget('houselist').getStore();
          var record = store.getById(id);
          store.add(record);
          store.reload();
          win.close();
        }
        else {
          Ext.Msg.alert('Создание', 'Не удалось создать новый объект!');
        }
      }
    });
  },
  // удаление
  deleteHouse: function (button) {
    var win = button.up('window'),
      form = win.down('form'),
      id = form.getRecord().get('id');
    Ext.Ajax.request({
      url: 'api/product/delete.php',
      method: 'GET',
      async: false,
      params: { id: id },
      success: function (response) {
        var data = Ext.decode(response.responseText);
        if (response.status === 200) {
          Ext.Msg.alert('Удаление', data.message);
          var store = Ext.widget('houselist').getStore();
          var record = store.getById(id);
          store.remove(record);
          win.close();
        }
        else {
          Ext.Msg.alert('Удаление', 'Не удалось удалить Обьект из каталога');
        }
      }
    });
  },
  clearForm: function (grid, record) {
    var view = Ext.widget('housewindow');
    view.down('form').getForm().reset();
  },
  editHouse: function (grid, record) {
    var view = Ext.widget('housewindow');
    view.down('form').loadRecord(record);
  },
  updateImage: function (item) {
    var view = Ext.widget('houselist');
    view.down('form').getForm().reset();
  }
});                
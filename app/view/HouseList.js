Ext.define('HL.view.HouseList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.houselist',

  title: 'Список Обьектов',
  store: 'HouseStore',

  initComponent: function () {
    this.columns = [
      { header: 'Артикул', dataIndex: 'id', flex: 1 },
      {
        header: 'Изображение', 
        dataIndex: 'image_item', 
        flex: 1,
        renderer: function (value) {
          let image = value ? value : './app/assets/img/no_photo.jpg';
          return '<img style="width: 70%;height: 100%;margin-right: 10px;" src="' + image + '">';
        },

        xtype: 'actioncolumn',
        width: 50,
        items: [{
          icon: './app/assets/img/icons/edit_image.png',
          tooltip: 'Изменить',                   
          handler: function (grid, rowIndex, colIndex) {
            var rec = grid.getStore().getAt(rowIndex);
            var id = rec.raw.id;
            var myForm = new Ext.form.Panel({
              title: 'Загрузите Файл',              
              floating: true,
              closable: true,              
              items: Ext.create('Ext.form.Panel', {
                bodyStyle: 'padding:5px 5px 0',
                renderTo: Ext.getBody(),
                items: [{
                  xtype: 'filefield',
                  name: 'document',
                  fieldLabel: 'Выберите файл: ',
                  buttonText: 'Выбрать...',
                  msgTarget: 'side',
                  allowBlank: false
                }],
                buttons: [{
                  action: 'image',
                  text: 'Загрузить файл',
                  handler: function () {
                    var form = this.up('form').getForm();
                    var win = this.up('window');
                    if (form.isValid()) {
                      form.submit({
                        url: './app/actions/upload_file.php',
                        waitMsg: 'Загрузка...',
                        success: function (fp, o) {
                          Ext.Ajax.request({
                            url: 'api/product/update_image.php',
                            method: 'POST',
                            async: false,
                            params: {link_image: o.result.file, id: id},
                            success: function (response) {
                              if (response.status === 200) {
                                Ext.Msg.alert('Загрузка прошла успешно', 'Файл ' + o.result.file + " загружен");
                                var store = Ext.widget('houselist').getStore();
                                var record = store.getById(id);
                                store.add(record);
                                store.reload();
                              }
                              else {
                                Ext.Msg.alert('Изображение', 'Не удалось загрузить изображение');
                              }
                            }
                          });
                        }
                      });
                    }
                  }
                }]
              })
            });
            myForm.show();
          }
        }]
      },
      { header: 'Название', dataIndex: 'name', flex: 1 },
      { header: 'Описание', dataIndex: 'description', flex: 1 },
      { header: 'Цена', dataIndex: 'price', flex: 1 },
      { header: 'Дата создания', dataIndex: 'created', flex: 1 },
      { header: 'Последнее изменение', dataIndex: 'modified', flex: 1 },
    ];

    this.callParent(arguments);
  }
});
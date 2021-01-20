Ext.define('HL.store.HouseStore', {
  extend: 'Ext.data.Store',
  model: 'HL.model.House',
  autoLoad: true,
  storeId: 'HouseStore',
  proxy: {
    type: 'rest',
    url: 'api/product/read.php',
    reader: {
        type: 'json',
        root: 'data'
    },
    writer: {
        type: 'json'
    }
  }
});
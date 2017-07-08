(function() {

    var _comment = Ext.id();
    var _image = Ext.id();
    var clientId;


    var imageStore = new Ext.data.JsonStore( {
        url : 'employee/get-image.html',
        root : 'images',
        fields : [ 'name', 'url', {
            name : 'size',
            type : 'float'
        } ]
    });
   /* var tpl = new Ext.XTemplate('<tpl for=".">',
        '<div class="thumb-wrap" id="{name}">',
        '<div class="thumb"><img src="{url}" title="{name}"></div>',
        '<span class="x-editable">{shortName}</span></div>', '</tpl>',
        '<div class="x-clear"></div>');*/

    var tpl = new Ext.XTemplate('<tpl for=".">',
        '<div class="thumb-wrap" id="photo">',
        '<div class="thumb"><img src="1.jpg" title="atm"></div>',
        '<span class="x-editable">{shortName}</span></div>', '</tpl>',
        '<div class="x-clear"></div>');

    var imagePanel = new Ext.form.FieldSet( {
        id : 'images-view',
        width : 500,
        height : 300,
        title : 'Фото',

        items : new Ext.DataView( {
            store : imageStore,
            tpl : tpl,
            autoHeight : true,
            multiSelect : true,
            overClass : 'x-view-over',
            itemSelector : 'div.thumb-wrap',
            emptyText : 'No images to display'
        })
    });

    container = new Ext.FormPanel( {
        id : 'view-scan-info-form-component',
        frame : true,
        closable : true,
        header : false,
        autoScroll : true,
        labelWidth : 250,
        items : [
            {
            xtype : 'panel',
            title : 'Информация о клиенте',
            frame : true,
            bodyStyle : 'padding:5px 5px 0',
            autoScroll : true,
            items : [imagePanel,

                {
                    id : _comment,
                    name : 'comment',
                    width: 400,
                    height: 50,
                    emptyText : 'Введите комментарий',
                    xtype : 'textarea'
                }
                /*,
                {
                    html:'<img src="1.jpg">'
                }*/

            ],
            bbar :[
                "->",
                {
                    text:'Паспорт совпал',
                    xtype:'button',
                    handler : function(self) {
                        Ext.Ajax.request({
                            url: 'clients/match-doc.html',
                            params: {
                                snils: clientId},
                            success: function (response) {
                                var data = Ext.decode(response.responseText);
                                if (data.success) {
                                    Ext.MessageBox.alert('Информация','Проставлен признак совпадения скана');
                                    //clientGrid.store.reload(data);
                                }
                                else {
                                    console.log('Error: ' + response.responseText);
                                }
                            }
                        });
                    }
                },"-",
                {
                    text:'Паспорт не совпал',
                    xtype:'button',
                    handler : function(self) {
                        Ext.Ajax.request({
                            url: 'clients/unmatch-doc.html',
                            params: {
                                snils: clientId},
                            success: function (response) {
                                var data = Ext.decode(response.responseText);
                                if (data.success) {
                                    Ext.MessageBox.alert('Информация','Проставлен признак несовпадения скана');
                                    //clientGrid.store.reload(data);
                                }
                                else {
                                    console.log('Error: ' + response.responseText);
                                }
                            }
                        });
                    }
                },"-",
                {
                    text:'Показать скан',
                    xtype:'button',
                    handler : function(self) {
                        window.open(String.format('http://mdev.bops.local:8086/lkk/v1/scan/{0}',clientId));
                    }
                }
            ]

        }

        ],
        loadData : function(data) {
            this.setTitle("Проверка фото");
            this.data = data;
            clientId=data['clientId'];

        }
    });
    return container;
})();
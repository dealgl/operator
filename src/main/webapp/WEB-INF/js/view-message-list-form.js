(function() {

    var _new_message = Ext.id();
    var _client;

    var pagingToolBar = {
        xtype:'paging',
        store:imageStore,
        pageSize:10,
        displayInfo:true
    }

    var sm = new Ext.grid.CheckboxSelectionModel({
        singleSelect:true
    });

    var imageStore = new Ext.data.JsonStore( {
        url : 'employee/get-image.html',
        root : 'images',
        fields : [ 'name', 'url', {
            name : 'size',
            type : 'float'
        } ]
    });

    var messageStore = new Ext.data.Store({
        autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root : 'info',
            fields : [ 'id','date_posted','body','client_id']
        })
    });

    var pagingToolBar = {
        xtype:'paging',
        store:messageStore,
        pageSize:10,
        displayInfo:true
    }

    var tpl = new Ext.XTemplate('<tpl for=".">',
        '<div class="thumb-wrap" id="{name}">',
        '<div class="thumb"><img src="{url}" title="{name}"></div>',
        '<span class="x-editable">{shortName}</span></div>', '</tpl>',
        '<div class="x-clear"></div>');

    var imagePanel = new Ext.form.FieldSet( {
        id : 'images-view',
        width : 500,
        height : 350,
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

    var messageGrid =new Ext.grid.GridPanel ({
        height:280,
        columnLines : true,
        autoScroll: true,
        store: messageStore,
        bbar:pagingToolBar,
        columns: [
            sm,
            {
                header : 'Дата сообщения',
                dataIndex : 'date_posted',
                sortable : true
            },
            {
                header : 'Текст',
                dataIndex : 'body'
            },
            {
                header : 'client_id',
                dataIndex : 'client_id',
                hidden:true
            }


        ],
        viewConfig : {
            forceFit: true,
            stripeRows: true,
            emptyText: 'Записи не найдены!'
        },
        sm : sm
    });

    container = new Ext.FormPanel( {
        id : 'view-message-list-form-component',
        frame : true,
        closable : true,
        header : false,
        autoScroll : true,
        labelWidth : 250,
        items : [
            {
            xtype : 'panel',
            title : 'Информация о сообщениях',
            frame : true,
            bodyStyle : 'padding:5px 5px 0',
            autoScroll : true,
            items : [/*imagePanel*/messageGrid
            ],
            bbar :[
                {
                    id:_new_message,
                    name : 'new_message',
                    width : 800,
                    emptyText : 'Введите новое сообщение для клиента',
                    allowBlank : false,
                    xtype : 'textfield'
                },
                "-",
                {
                    text:'Отправить',
                    handler : function(self) {
                        Ext.Ajax.request({
                            url: 'clients/new-message.html',                            params: {
                                message: Ext.getCmp(_new_message).getValue(),
                                client_id:1
                            },
                            success: function (response) {
                                var data = Ext.decode(response.responseText);
                                if (data.success /*&& data.data && data.data[0]*/) {
                                    menu.showMessages('111-222-333 44');
                                }
                                else {
                                    console.log('Error: ' + response.responseText);
                                }
                            }
                        });
                    }
                },
                "-"
            ]

        }

        ],
        loadData : function(data) {
            this.setTitle("Сообщения");
            this.data = data;
            messageStore.loadData(data);
        }
    });
    return container;
})();
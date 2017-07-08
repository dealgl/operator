(function() {

    var _new_message = Ext.id();
    var _client;
    var _fio;

    var pagingToolBar = {
        xtype:'paging',
        store:imageStore,
        pageSize:10,
        displayInfo:true
    }

    var sm = new Ext.grid.CheckboxSelectionModel({
        singleSelect:false
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
            fields : [ 'id','date_posted','body','client_id','type_message','status_message']
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
        //height:280,
        autoHeight : true,
        columnLines : true,
        autoScroll: true,
        store: messageStore,
        //bbar:pagingToolBar,
        columns: [
            sm,
            {
                header : 'id',
                dataIndex : 'id',
                sortable : true,
                hidden:true
            },
            {
                header : 'Дата сообщения',
                dataIndex : 'date_posted',
                sortable : true,
                width : 20
            },
            {
                header : 'Статус сообщения',
                dataIndex : 'status_message',
                sortable : true,
                width : 10
            },

            {
                header : 'Тип сообщения',
                dataIndex : 'type_message',
                sortable : true,
                width : 10,
                renderer: function(val) {
                    if (val=='1'){
                        return 'Входящее';
                    }
                    if (val=='2'){
                        return 'Исходящее';
                    }
                }
            },
            {
                header : 'Текст',
                dataIndex : 'body',
                renderer : function (value,metaData){
                    return '<div style="white-space:normal">'+value+'</div>';
                }
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
        }
        ,
        /*tbar : [
            {
                text: 'Просмотрено',
                handler : function(self) {
                    var ids = '';
                    Ext.each(sm.getSelections(), function (item) {
                        ids += ',' + item.data.client_id;
                    });
                    if (ids.length > 0) {
                        ids = ids.substr(1);
                    }
                    if (ids == '') {
                        Ext.MessageBox.alert('Информация', 'Не выбрано сообщение !');
                    }
                        else {

                    Ext.Ajax.request({
                        url: 'clients/check-view.html',
                        waitMsg: 'Подождите...',
                        params: {
                            message_id: ids
                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);

                            if (data.success ) {
                                
                                menu.showMessages(_client);

                            }
                            else {
                                console.log('Error: ' + response.responseText);
                            }
                        }
                    });

                }
                }

            }
        ],*/
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
            title : 'Информация о сообщениях '+data['client'],
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
                    emptyText : 'Введите новое сообщение для клиента '+ data['client']+' '+data['snils'],
                    allowBlank : false,
                    xtype : 'textarea',
                    height : 400
                },
                "-",
                {
                    text:'Отправить',
                    handler : function(self) {
                        var ids = '';
                        Ext.each(sm.getSelections(), function(item) {
                            ids += ',' + item.data.id;
                        });
                        if (ids.length > 0){
                            ids = ids.substr(1);
                        }
                        if (ids==''){
                            Ext.MessageBox.alert('Информация','Не выбрано сообщение для ответа!');
                        } else {

                            Ext.Ajax.request({
                                url: 'clients/new-message.html', params: {
                                    message: Ext.getCmp(_new_message).getValue(),
                                    message_id: ids,
                                    client_id: _client
                                },
                                success: function (response) {
                                    var data = Ext.decode(response.responseText);
                                    if (data.success /*&& data.data && data.data[0]*/) {
                                        menu.showMessages(_client);
                                    }
                                    else {
                                        console.log('Error: ' + response.responseText);
                                    }
                                }
                            });

                        }
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
            _client = data['snils'];
            _fio = data['client'];

        }
    });
    return container;
})();
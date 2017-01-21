(function () {
    var container;
    var _viewDoc = Ext.id();
    var _snils = Ext.id();
    var sm = new Ext.grid.CheckboxSelectionModel({
        singleSelect:true
    });

    var store = new Ext.data.Store({
        autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root : 'info',
            fields : [ 'client_id','fio','snils','match']
        })

    });

    var clientGrid =new Ext.grid.GridPanel ({
        height:280,
        columnLines : true,
        autoScroll: true,
        store: store,
        columns: [
            sm,
            {
                header : 'ФИО',
                dataIndex : 'fio',
                sortable : true,
                renderer: function (value, p, record) {
                    return String.format('<b><a onclick="menu.showScan(\'{1}\');" href="#">{0}</a></b>',value, record.data['client_id']);
                }


            },
            {
                header : 'СНИЛС',
                dataIndex : 'snils'
            },
            {
                header: 'Статус проверки',
                dataIndex: 'match',
                renderer: function(val) {
                    if (val=='1'){
                        return 'Проверен';
                    }else
                    if (val=='0'){
                        return 'Не проверен';
                    }
                }
            }

        ],
        viewConfig : {
            forceFit: true,
            stripeRows: true,
            emptyText: 'Файлы не найдены!'
        },
        tbar : [
            {
                id : _snils,
                name : 'name',
                width : 200,
                emptyText : 'Введите СНИЛС для поиска',
                allowBlank : false,
                xtype : 'textfield'
                //,
                //maskRe : '\d{3}-\d{3}-\d{3} \d{2}$'
            },
            "-",
            {
                text: 'Найти',
                handler : function(self) {
                    Ext.Ajax.request({
                        url: 'clients/find-client.html',
                        params: {
                            snils: Ext.getCmp(_snils).getValue()
                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);

                            if (data.success /*&& data.data && data.data[0]*/) {
                                clientGrid.store.loadData(data);

                            }
                            else {
                                console.log('Error: ' + response.responseText);
                            }
                        }
                    });

                }
            },
            "-",
            {
                text: 'Просмотр',
                handler : function(self) {
                    var ids = '';
                    Ext.each(sm.getSelections(), function(item) {
                        ids += ',' + item.data.client_id;
                    });
                    if (ids.length > 0){
                        ids = ids.substr(1);
                    }
                    if (ids==''){
                        Ext.MessageBox.alert('Информация','Не выбран клиент!');
                    }else {
                        window.open(String.format('clients/show-client-file.html?id={0}',ids));
                    }

                }
            },
            "-",
            {
                text: 'Установить признак проверки',
                handler : function(self) {
                    var ids = '';
                    Ext.each(sm.getSelections(), function(item) {
                        ids += ',' + item.data.client_id;
                    });
                    if (ids.length > 0){
                        ids = ids.substr(1);
                    }
                    if (ids==''){
                        Ext.MessageBox.alert('Информация','Не выбран клиент!');
                    }else {
                        Ext.Ajax.request({
                            url: 'clients/set-match.html',
                            params: {
                                snils: ids
                            },
                            success: function (response) {
                                var data = Ext.decode(response.responseText);

                                if (data.success /*&& data.data && data.data[0]*/) {
                                    clientGrid.store.loadData(data);
                                    Ext.MessageBox.alert('Информация','Скан проверен!');
                                    }
                                else {
                                    console.log('Error: ' + response.responseText);
                                }
                            }
                        });
                    }

                }
            }

        ],
        sm : sm
    });

    container = new Ext.FormPanel({
        id :'view-check-clients-form-component',
        frame :true,
        closable : true,
        header : false,
        autoScroll : true,
        labelWidth : 250,
        defaults: {
            style: {
                marginBottom: '5px'
            }
        },
        items : [
                clientGrid
        ],
        loadData : function(data) {
            this.setTitle("Проверка фото");
            this.data = data;
        },
        setWindow : function(window) {
            this.window = window;
        }
    });

    return container;

})();
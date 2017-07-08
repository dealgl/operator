(function () {
    var container;
    var type=0;
    var _mess = Ext.id();
    var _unreg = Ext.id();
    var _blockBtn =Ext.id();
    var _unlockBtn =Ext.id();
    var _emailBtn = Ext.id();
    var _smsBtn = Ext.id();
    var _viewDoc = Ext.id();
    var _snils = Ext.id();
    var param;
    var _phone = Ext.id();
    var _mail =Ext.id();

    var sm = new Ext.grid.CheckboxSelectionModel({
        singleSelect:true,
        listeners:{
            'selectionchange' : function() {
                if (this.getCount() == 0) {
                    Ext.getCmp(_mess).setDisabled(true);
                    Ext.getCmp(_blockBtn).setDisabled(true);
                    Ext.getCmp(_unlockBtn).setDisabled(true);
                    Ext.getCmp(_emailBtn).setDisabled(true);
                    Ext.getCmp(_smsBtn).setDisabled(true);
                }
                else {
                    Ext.getCmp(_mess).enable();
                    Ext.getCmp(_blockBtn).enable();
                    Ext.getCmp(_unlockBtn).enable();
                    Ext.getCmp(_emailBtn).enable();
                    Ext.getCmp(_smsBtn).enable();
                }

            }
        }
    });

    var statusSelect = new Ext.form.ComboBox(
        {
            fieldLabel	: 	'Поиск по',
            width 		: 	100,
            mode 		: 	'local',
            hiddenName 	: 	'',
            valueField 	: 	'status',
            store 		: 	new Ext.data.ArrayStore(
                {
                    fields	: [ 'status_id', 'status' ],
                    data 	: [
                        [ '0', 'СНИЛС' ],
                        [ '1', 'Логин-phone' ],
                        [ '2', 'Логин-email' ]
                    ]
                }),
            allowBlank 		: 	false,
            emptyText 		: 	'Поиск по',
            displayField 	: 	'status',
            loadingText 	: 	'Загрузка...',
            triggerAction 	: 	'all',
            editable 		: 	false,
            listeners: {
                select: function(combo, record, index) {
                    if (index==1) {
                        Ext.getCmp(_snils).emptyText='9xxxxxxxxx';
                        Ext.getCmp(_snils).applyEmptyText();
                        Ext.getCmp(_snils).reset();

                        type = 1;
                    }
                    if  (index==0) {
                        Ext.getCmp(_snils).emptyText='Введите СНИЛС';
                        Ext.getCmp(_snils).applyEmptyText();
                        Ext.getCmp(_snils).reset();
                        type=0;
                    }
                    if  (index==2) {
                        Ext.getCmp(_snils).emptyText='Введите mail';
                        Ext.getCmp(_snils).applyEmptyText();
                        Ext.getCmp(_snils).reset();
                        type=2;
                    }
                }
            }
        });

var store = new Ext.data.Store({
        autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root : 'info',
            fields : [ 'fio','snils','doc_number','doc_type','status','birth_date','passport','email','phone','regflag','old_user','is_block_user']
        })

    });

    var clientGrid =new Ext.grid.EditorGridPanel ({
        autoHeight :true,
        columnLines : true,
        autoScroll: true,
        store: store,
        columns: [
            sm,
            {
                header : 'ФИО',
                dataIndex : 'fio',
                sortable : true
            },
            {
                header : 'Дата рождения(YYYY-MM-DD)',
                dataIndex : 'birth_date',
                sortable : true
            },
            {
                header : 'Паспорт',
                dataIndex : 'passport',
                sortable : true
            },
            {
                header : 'Логин e-mail',
                dataIndex : 'email',
                sortable : true,
                editor : new Ext.form.TextField({
                })
            },
            {
                header : 'Логин phone',
                dataIndex : 'phone',
                sortable : true,
                editor : new Ext.form.TextField({
                })
            },
            {
                header : 'СНИЛС',
                dataIndex : 'snils',
                editor : new Ext.form.TextField({
                })
            },
            {
                header: 'Номер договора',
                dataIndex: 'doc_number'
            },
            {
                header: 'Тип договора',
                dataIndex: 'doc_type'
            },
            {
                header: 'Статус договора',
                dataIndex: 'status'
            }
            ,
            {
                header: 'Статус блокировки',
                dataIndex: 'is_block_user',
                renderer: function(val) {
                    if (val=='10'){
                        return 'Заблокирован';
                    }else
                        return 'Не заблокирован';

                }
            }
            ,
            {
                header: 'Пользователь старого ЛКК',
                dataIndex: 'old_user',
                renderer: function(val) {
                    if (val=='1'){
                        return 'Да';
                    }else
                        return 'Нет';

                }
            }
            ,
            {
                header: 'Статус регистрации',
                dataIndex: 'regflag',
                renderer: function(val) {
                    if (val=='1'){
                        return 'Зарегистрирован';
                    }else
                        return 'Не зарегистрирован';

                }
            }
        ],
        viewConfig : {
            forceFit: true,
            stripeRows: true,
            emptyText: 'Данные не найдены'
        },
        tbar : [
 //           statusSelect,
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
                id : _phone,
                name : 'phone',
                width : 200,
                emptyText : 'Введите телефон 9xxxxxxxxx',
                allowBlank : false,
                xtype : 'textfield'
                //,
                //maskRe : '\d{3}-\d{3}-\d{3} \d{2}$'
            },
            "-",
            {
                id : _mail,
                name : 'mail',
                width : 200,
                emptyText : 'Введите e-mail',
                allowBlank : false,
                xtype : 'textfield'
                //,
                //maskRe : '\d{3}-\d{3}-\d{3} \d{2}$'
            },
            "-",

            {
                text: 'Найти',
                handler : function(self) {
                    if (Ext.getCmp(_snils).getValue()!=""){
                        param=Ext.getCmp(_snils).getValue();
                        type=0;
                    }
                    if (Ext.getCmp(_phone).getValue()!=""){
                        param=Ext.getCmp(_phone).getValue();
                        type=1;
                    }
                    if (Ext.getCmp(_mail).getValue()!=""){
                        param=Ext.getCmp(_mail).getValue();
                        type=2;
                    }

                    Ext.Ajax.request({
                        url: 'clients/find-client.html',
                        waitMsg : 	'Подождите...',
                        params: {
                            snils: param,
                            type: type
                        },
                        success: function (response) {
                            var data = Ext.decode(response.responseText);

                            if (data.success /*&& data.data && data.data[0]*/) {
                                clientGrid.store.loadData(data);
                                if ((data['info'][0]['old_user']=='1') ){
                                    Ext.getCmp(_unreg).enable();
                                } else
                                    Ext.getCmp(_unreg).setDisabled(true);

                            }
                            else {
                                console.log('Error: ' + response.responseText);
                            }
                        }
                    });
                }


                
            },
            "->",
            {
                id : _mess,
                text: 'Сообщения',
                disabled:true,
                xtype:'button',
                handler : function(self) {
                    var ids = '';
                    var idf = '';
                    Ext.each(sm.getSelections(), function(item) {
                        ids += ',' + item.data.snils;
                        idf += ',' + item.data.fio;
                    });
                    if (ids.length > 0){
                        ids = ids.substr(1);
                        idf = idf.substr(1);
                    }
                    if (ids==''){
                        Ext.MessageBox.alert('Информация','Не выбран клиент!');
                    } else {
                        menu.showMessages(ids,idf);
                    }
                }
            },
            "-",
            {
                id : _unlockBtn,
                text: 'Разблокировать',
                xtype:'button',
                disabled:true,
                handler : function(self) {
                    var ids = '';
                    var idf = '';
                    Ext.each(sm.getSelections(), function(item) {
                        ids += ',' + item.data.snils;
                    });
                    if (ids.length > 0){
                        ids = ids.substr(1);
                    }
                    if (ids==''){
                        Ext.MessageBox.alert('Информация','Не выбран клиент!');
                    } else {
                        Ext.Ajax.request({
                            url: 'clients/unlock-client.html',
                            params: {
                                snils: ids},
                            success: function (response) {
                                var data = Ext.decode(response.responseText);
                                if (data.success) {
                                    Ext.MessageBox.alert('Информация','Успешно!Учетная запись '+data['fio']+' '+data['snils']+' была разблокирована');
                                    clientGrid.store.reload(data);
                                }
                                else {
                                    console.log('Error: ' + response.responseText);
                                }
                            }
                        });
                    }
                }
            },
            "-",
            {
                id :_unreg,
                disabled:true,
                text: 'Разрегистрировать',
                xtype:'button',
                handler : function(self) {
                    var ids = '';
                    Ext.each(sm.getSelections(), function(item) {
                        ids += ',' + item.data.snils;
                    });
                    if (ids.length > 0){
                        ids = ids.substr(1);
                    }
                    if (ids==''){
                        Ext.MessageBox.alert('Информация','Не выбран клиент!');
                    } else {
                        Ext.Ajax.request({
                            url: 'clients/unreg-client.html',
                            params: {
                                snils: ids},
                            success: function (response) {
                                var data = Ext.decode(response.responseText);
                                if (data.success) {
                                    Ext.MessageBox.alert('Информация','Клиент разрегистрирован!');
                                    clientGrid.store.reload(data);
                                }
                                else {
                                    console.log('Error: ' + response.responseText);
                                }
                            }
                        });
                    }
                }
            },
            "-",
            {
                id : _emailBtn,
                text: 'Отправить ссылку на email',
                disabled:true,
                xtype:'button',
                handler : function(self) {
                    var ids = '';
                    Ext.each(sm.getSelections(), function(item) {
                        ids += ',' + item.data.snils;
                    });
                    if (ids.length > 0){
                        ids = ids.substr(1);
                    }
                    if (ids==''){
                        Ext.MessageBox.alert('Информация','Не выбран клиент!');
                    } else {
                        Ext.Ajax.request({
                            url: 'clients/send-email-client.html',
                            params: {
                                snils: ids},
                            success: function (response) {
                                var data = Ext.decode(response.responseText);
                                if (data.success) {
                                    Ext.MessageBox.alert('Информация','Клиенту отправлена ссылка по e-mail');
                                    //clientGrid.store.reload(data);
                                }
                                else {
                                    console.log('Error: ' + response.responseText);
                                }
                            }
                        });
                    }

                }
            },
            "-",
            {
                id : _smsBtn,
                text: 'Отправить пароль по смс',
                disabled:true,
                xtype:'button',
                handler : function(self) {
                    var ids = '';
                    Ext.each(sm.getSelections(), function(item) {
                        ids += ',' + item.data.snils;
                    });
                    if (ids.length > 0){
                        ids = ids.substr(1);
                    }
                    if (ids==''){
                        Ext.MessageBox.alert('Информация','Не выбран клиент!');
                    } else {

                        Ext.MessageBox.confirm('Подтверждение', 'Была ли попытка отправить ссылку на е-мейл?', function(button) {
                            if (button == 'yes') {

                                Ext.Ajax.request({
                                    url: 'clients/sms-send-client.html',
                                    params: {
                                        snils: ids},
                                    success: function (response) {
                                        var data = Ext.decode(response.responseText);
                                        if (data.success) {
                                            Ext.MessageBox.alert('Информация','Клиенту отправлен пароль по смс');
                                            //clientGrid.store.reload(data);
                                        }
                                        else {
                                            console.log('Error: ' + response.responseText);
                                        }
                                    }
                                });

                            }

                        });


                    }

                }
            },
            "-",
            /*{
                text: 'Просмотреть данные клиента',
                xtype:'button',
                handler : function(self) {

                }
            },
            "-",
*/

/*            {
                text: 'Войти под логином',
                xtype:'button',
                handler : function(self) {
                    var ids = '';
                    Ext.each(sm.getSelections(), function(item) {
                        ids += ',' + item.data.snils;
                    });
                    if (ids.length > 0){
                        ids = ids.substr(1);
                    }
                    if (ids==''){
                        Ext.MessageBox.alert('Информация','Не выбран клиент!');
                    } else {
                        Ext.Ajax.request({
                            url: 'clients/send-email-client-login.html',
                            params: {
                                snils: ids},
                            success: function (response) {
                                var data = Ext.decode(response.responseText);
                                if (data.success) {
                                    Ext.MessageBox.alert('Информация','Клиенту отправлена ссылка по e-mail');
                                    //clientGrid.store.reload(data);
                                }
                                else {
                                    console.log('Error: ' + response.responseText);
                                }
                            }
                        });
                    }
                 
                    window.open('https://dev.npf.idefa.ru/personal');
                }
            },
            "-",*/
            {
                id:_blockBtn,
                text: 'Заблокировать',
                disabled:true,
                handler:function(self){
                    var ids = '';
                    Ext.each(sm.getSelections(), function(item) {
                        ids += ',' + item.data.snils;
                    });
                    if (ids.length > 0){
                        ids = ids.substr(1);
                    }
                    if (ids==''){
                        Ext.MessageBox.alert('Информация','Не выбран клиент!');
                    } else {
                        Ext.Ajax.request({
                            url: 'clients/block-client.html',
                             params: {
                                snils: ids},
                            success: function (response) {
                                var data = Ext.decode(response.responseText);
                                if (data.success) {
                                    Ext.MessageBox.alert('Информация','Успешно! Учетная запись '+data['fio']+' '+data['snils']+' была заблокирована');
                                    clientGrid.store.reload(data);
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

        ],
        sm : sm
    });

    container = new Ext.FormPanel({
        id :'view-get-clients-form-component',
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
            /*{
                id : _viewDoc,
                xtype : 'panel',
                frame : true,
                collapsible : true,
                title: 'Документы',
                items :[
                    {
                        xtype:'fieldset',
                        autoHeight: true,
                        items :[
                            fileGrid
                        ]
                    }
                ]

            }*/
        ],
        loadData : function(data) {
            this.setTitle("Клиенты");
            this.data = data;

        },
        setWindow : function(window) {
            this.window = window;
        }
    });

    return container;

})();
(function () {
    var container;

    var _snils = Ext.id();
    var _phone = Ext.id();
    var _mail =Ext.id();
    var type=0;
    var param;
    var store = new Ext.data.Store({
        autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root : 'info',
            fields : [ 'fio','snils','created','message_code','pass','email','phone','reg_check_reg_message','reg_check_overall_result']
        })
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

    var clientGrid =new Ext.grid.EditorGridPanel ({
        autoHeight :true,
        columnLines : true,
        autoScroll: true,
        store: store,
        columns: [
            {
                header : 'ФИО',
                dataIndex : 'fio',
                sortable : true,
                width : 20
            },
            {
                header : 'Дата время попытки регистрации(YYYY-MM-DD hh:mm:ss)',
                dataIndex : 'created',
                sortable : true,
                width : 10
            },
            {
                header : 'Паспорт',
                dataIndex : 'pass',
                sortable : true,
                width : 10
            },
            {
                header : 'Логин e-mail',
                dataIndex : 'email',
                sortable : true,
                width : 10,
                editor : new Ext.form.TextField({
                })
            },
            {
                header : 'Логин phone',
                dataIndex : 'phone',
                sortable : true,
                width : 10,
                editor : new Ext.form.TextField({
                })
            },
            {
                header : 'СНИЛС',
                dataIndex : 'snils',
                width : 10,
                editor : new Ext.form.TextField({
                })
            },
            {
                header: 'Результат попытки',
                dataIndex: 'message_code',
                width : 10,
                renderer: function(val) {
                    if (val=='account_created'){
                        return 'Успех';
                    }else
                        return 'Не успех';

                }
            },
            {
                hidden : true,
                header : 'Общий результат попытки',
                dataIndex : 'reg_check_overall_result',
                width : 10
            },
            {
                header : 'Сообщение',
                dataIndex : 'reg_check_reg_message',
               renderer : function (value,metaData){
                                     return '<div style="white-space:normal">'+value+'</div>';
                    }
            }
        ],
        viewConfig : {
            forceFit: true,
            stripeRows: true,
            emptyText: 'Данные не найдены'
        },
        tbar : [
           // statusSelect,
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
                handler : function(self)    {
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
                        url: 'clients/attempts.html',
                        waitMsg : 	'Подождите...',
                        params: {
                            snils: param,
                            type: type
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
            }
        ]

    });

    container = new Ext.FormPanel({
        id :'view-reg-attempts-form-component',
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
            this.setTitle("Попытки регистрации");
            this.data = data;

        },
        setWindow : function(window) {
            this.window = window;
        }
    });
    return container;
})();
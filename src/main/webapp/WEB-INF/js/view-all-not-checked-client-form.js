(function () {
    var container;
    var _viewDoc = Ext.id();
    var _snils = Ext.id();
    var _notMatchBtn=Ext.id();
    var _matchBtn=Ext.id();
    var _showBtn=Ext.id();
    var clientId;
    var type=0;
    var param;
    var _phone = Ext.id();
    var _mail =Ext.id();

    var sm = new Ext.grid.CheckboxSelectionModel({
        singleSelect:true,
        listeners:{
            'selectionchange' : function() {
                if (this.getCount() == 0) {
                    Ext.getCmp(_notMatchBtn).setDisabled(true);
                    Ext.getCmp(_matchBtn).setDisabled(true);
                    Ext.getCmp(_showBtn).setDisabled(true);
                }
                else {
                    Ext.getCmp(_notMatchBtn).enable();
                    Ext.getCmp(_matchBtn).enable();
                    Ext.getCmp(_showBtn).enable();
                }

            }
        }
    });

    var findSelector = new Ext.form.ComboBox(
        {
            fieldLabel	: 	'����� ��',
            width 		: 	100,
            mode 		: 	'local',
            hiddenName 	: 	'',
            valueField 	: 	'status',
            store 		: 	new Ext.data.ArrayStore(
                {
                    fields	: [ 'status_id', 'status' ],
                    data 	: [
                        [ '0', '�����' ],
                        [ '1', '�����-phone' ],
                        [ '2', '�����-email' ]
                    ]
                }),
            allowBlank 		: 	false,
            emptyText 		: 	'����� ��',
            displayField 	: 	'status',
            loadingText 	: 	'��������...',
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
                        Ext.getCmp(_snils).emptyText='������� �����';
                        Ext.getCmp(_snils).applyEmptyText();
                        Ext.getCmp(_snils).reset();
                        type=0;
                    }
                    if  (index==2) {
                        Ext.getCmp(_snils).emptyText='������� mail';
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
            fields : ['clientId','created','fio','snils','reg_flag','birthday','passport','doc_check']
        })

    });

    var clientGrid =new Ext.grid.EditorGridPanel ({
        autoHeight:true,
        columnLines : true,
        autoScroll: true,
        store: store,
        columns: [
            sm,
            {
                header : 'ClientId',
                dataIndex : 'clientId',
                hidden : true
            },
            {
                header : '���� �����������',
                dataIndex : 'created',
                sortable : true
            },
            {
                header: '������ �����������',
                dataIndex: 'reg_flag',
                renderer: function(val) {
                    if (val=='1'){
                        return '���������������';
                    }else
                        return '�� ���������������';

                }
            },

            {
                header : 'ĸ�',
                dataIndex : 'fio',
                sortable : true
            },
            {
                header : '�����',
                dataIndex : 'snils',
                editor : new Ext.form.TextField({
                })
            },
            {
                header : '�������',
                dataIndex : 'passport'
            },
            {
                header: '������ ��������',
                dataIndex: 'doc_check',
                renderer: function(val) {
                    if (val=='1'){
                        return '������';
                    } else
                    if (val=='2'){
                        return '�� ������';
                    }
                    else
                    if (val=='0'){
                        return '�� ��������';
                    }
                }
            },

            {
                header:'���� ��������',
                dataIndex: 'birthday'
            }

        ],
        viewConfig : {
            forceFit: true,
            stripeRows: true,
            emptyText: '������ �� �������!'
        },
        tbar : [
            {
                id : _snils,
                name : 'name',
                width : 200,
                emptyText : '������� ����� ��� ������',
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
                emptyText : '������� ������� 9xxxxxxxxx',
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
                emptyText : '������� e-mail',
                allowBlank : false,
                xtype : 'textfield'
                //,
                //maskRe : '\d{3}-\d{3}-\d{3} \d{2}$'
            },
            "-",
            {
                text: '�����',
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
                        url: 'clients/all-not-check-snils.html',
                        waitMsg : 	'���������...',
                        params: {
                            snils: param,
                            type:type
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
            "->",
            {
                text: '��������',
                handler : function(self) {

                    menu.checkClients();
                }

            },
            "-",
            {
                id:_matchBtn,
                text:'������� ������',
                disabled:true,
                xtype:'button',
                handler : function(self) {
                    var ids = '';
                    Ext.each(sm.getSelections(), function (item) {
                        ids += ',' + item.data.snils;
                    });
                    if (ids.length > 0) {
                        ids = ids.substr(1);
                    }
                    if (ids == '') {
                        Ext.MessageBox.alert('����������', '�� ������ ������!');
                    }
                    else
                    {
                        Ext.Ajax.request({
                            url: 'clients/match-doc.html',
                            params: {
                                snils: ids
                            },
                            success: function (response) {
                                var data = Ext.decode(response.responseText);
                                if (data.success) {
                                    Ext.MessageBox.alert('����������', '���������� ������� ���������� �����');
                                    //clientGrid.store.reload(data);
                                }
                                else {
                                    console.log('Error: ' + response.responseText);
                                }
                            }
                        });
                    }
                }
            },"-",
            {
                id:_notMatchBtn,
                disabled:true,
                text:'������� �� ������',
                xtype:'button',
                handler : function(self) {
                    var ids = '';
                    Ext.each(sm.getSelections(), function (item) {
                        ids += ',' + item.data.snils;
                    });
                    if (ids.length > 0) {
                        ids = ids.substr(1);
                    }
                    if (ids == '') {
                        Ext.MessageBox.alert('����������', '�� ������ ������!');
                    } else
                    {
                        Ext.Ajax.request({
                            url: 'clients/unmatch-doc.html',
                            params: {
                                snils: ids
                            },
                            success: function (response) {
                                var data = Ext.decode(response.responseText);
                                if (data.success) {
                                    Ext.MessageBox.alert('����������', '���������� ������� ������������ �����');
                                    //clientGrid.store.reload(data);
                                }
                                else {
                                    console.log('Error: ' + response.responseText);
                                }
                            }
                        });
                }
                }
            },"-",
            {
                id :_showBtn,
                text:'�������� ����',
                xtype:'button',
                disabled:true,
                handler : function(self) {
                    var ids = '';
                    Ext.each(sm.getSelections(), function(item) {
                        ids += ',' + item.data.snils;
                    });
                    if (ids.length > 0){
                        ids = ids.substr(1);
                    }
                    if (ids==''){
                        Ext.MessageBox.alert('����������','�� ������ ������!');
                    } else {
                        alert(ids);
                        window.open(String.format('http://mdev.bops.local:8086/lkk/v1/scan/{0}', ids));
                    }
                }
            }
            /*,
            {
                text: '�������� �����',
                handler:function(self){
                    var ids = '';
                    var fio = '';
                    Ext.each(sm.getSelections(), function(item) {
                        ids += ',' + item.data.snils;
                        fio += ',' + item.data.fio;
                    });
                    if (ids.length > 0){
                        ids = ids.substr(1);
                    }
                    if (ids==''){
                        Ext.MessageBox.alert('����������','�� ������ ������!');
                    } else {
                        //menu.showMessages(ids,fio);
                        menu.showFormCheckScan(ids,fio);
                        
                    }
                }
            }*/
        ],
        sm : sm
    });

    container = new Ext.FormPanel({
        id :'view-all-not-checked-client-form-component',
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
            this.setTitle("�������� ���� ��������");
            this.data = data;
            clientId=data['clientId'];
            if (data['info'][0]) {
                store.loadData(data);
            }
        },
        setWindow : function(window) {
            this.window = window;
        }
    });

    return container;

})();
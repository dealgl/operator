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
            fields : ['fio','snils','doc_number','doc_type','status']
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
                header : 'ĸ�',
                dataIndex : 'fio',
                sortable : true
            },
            {
                header : '�����',
                dataIndex : 'snils'
            },
            {
                header: '����� ��������',
                dataIndex: 'doc_number'
            },
            {
                header: '��� ��������',
                dataIndex: 'doc_type'
            },
            {
                header: '������',
                dataIndex: 'status',
                renderer: function(val) {
                    if (val=='1'){
                        return '���������';
                    }else
                    if (val=='0'){
                        return '������������';
                    }
                }
            }

        ],
        viewConfig : {
            forceFit: true,
            stripeRows: true,
            emptyText: '����� �� �������!'
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
                text: '�����',
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
                text: '���������',
                handler:function(self){
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
                        menu.showMessages(ids);
                    }
                }
            }

        ],
        sm : sm
    });

    container = new Ext.FormPanel({
        id :'view-get-messages-form-component',
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
                title: '���������',
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
            this.setTitle("��������� ��������");
            this.data = data;
         /*   if (data['transferFiles'][0]) {
                store.loadData(data);
            }*/
        },
        setWindow : function(window) {
            this.window = window;
        }
    });

    return container;

})();
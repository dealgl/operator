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
            fields : ['date','fio','snils','text']
        })

    });

    var clientGrid =new Ext.grid.EditorGridPanel ({
        //height:500,
        autoHeight :true,
        columnLines : true,
        autoScroll: true,
        store: store,
        columns: [
            sm,
            {
                header : '����',
                dataIndex : 'date',
                sortable : true,
                width : 20
            },

            {
                header : 'ĸ�',
                dataIndex : 'fio',
                sortable : true,
                width : 30
            },
            {
                header : '�����',
                dataIndex : 'snils',
                width : 10,
                editor : new Ext.form.TextField({
                })
            },
            {
                header: '����� ���������',
                dataIndex: 'text',
                renderer : function (value,metaData){
                    return '<div style="white-space:normal">'+value+'</div>';
                }
            }

        ],
        viewConfig : {
            forceFit: true,
            stripeRows: true,
            emptyText: '������ �� �������!'
        },
        tbar : [
            "->",
            {
                text: '��������',
                handler : function(self) {
                    menu.getMessages();
                }

            },
            "-",
            {
                text: '���������',
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
                        menu.showMessages(ids,fio);
                    }
                }
            },
            "-",
            "-"
        ],
        sm : sm
    });

    container = new Ext.FormPanel({
        id :'view-all-messages-form-component',
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
            this.setTitle("������������ ���������");
            this.data = data;
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
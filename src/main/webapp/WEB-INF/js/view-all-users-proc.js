/**
 *  agreement info grid singleton
 */

(function() {

    var store = new Ext.data.GroupingStore({
        autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root: 'users',
            fields: ['id', 'fio', 'department', 'phone','position','lotus' ]
        								}),
        sortInfo : {field : 'fio', direction : 'ASC'},
        groupField : 'department'
        });
   

 var grid = new Ext.grid.GridPanel({
        id: 'view-all-users-component',
        closable: true,
        frame : true,
        autoScroll: true,
        viewConfig: {
            forceFit:true
        },
        enableHdMenu : false,
        store: store,
        columns: [ 
            new Ext.grid.RowNumberer({width: 30}),
            {
                header: 'ФИО',
                dataIndex: 'fio',
                widht : 400,
                sortable : true/*,
                renderer: function (value, p, record) {
                	//return String.format('<b><a href="{1}" target="_blank">{0}</a></b><br/>', value,record.data['link']); 
                }*/
            }
            , 
            {
                header: 'Телефон',
                width: 30, 
                sortable : true,
                dataIndex: 'phone'
            },
            {
                header: 'Lotus address',
                width: 80, 
                sortable : true,
                dataIndex: 'lotus'
            },
            {
                header: 'Подразделение',
                width: 40, 
                hidden: true,
                dataIndex: 'department'
            }
        ],
        view: new Ext.grid.GroupingView({
            forceFit:true,
            groupTextTpl: '{group}',
            emptyText: 'Записи не найдены'
        }),

        loadData : function(data) {
            this.setTitle('Сотрудники процессинга');
            this.getStore().loadData(data);
        }		

    });
    return grid;
  

})();
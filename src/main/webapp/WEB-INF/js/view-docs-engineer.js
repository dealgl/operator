/**
 *  agreement info grid singleton
 */

(function() {

    var store = new Ext.data.GroupingStore({
        autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root: 'contracts',
            fields: ['noteid', 'title', 'description', 'updatedAt','name',
            {name: 'created', mapping:'created', type: 'date', dateFormat: 'd.m.Y H:i:s'},
             {name: 'startdate', mapping:'startdate', type: 'date', dateFormat: 'd.m.Y'}, 'link' ]
        								}),
        sortInfo : {field : 'title', direction : 'ASC'},
        groupField : 'description'
        });
   

 var grid = new Ext.grid.GridPanel({
        id: 'view-docs-engineer-component',
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
                header: 'Название',
                dataIndex: 'title',
                widht : 450,
                sortable : true,
                renderer: function (value, p, record) {
                	return String.format('<b><a href="{1}" target="_blank">{0}</a></b><br/>', value,record.data['link']); 
                }
            }
            , {
                header: 'Дата ввода в действие',
                width: 40, 
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('d.m.Y'),
                dataIndex: 'startdate'
                
            },
            {
                header : 'Сфера применения',
                dataIndex: 'description',
                hidden : true,
                groupRenderer : function (v, dummy, r) {
                    return String.format('<span class="z-important">{0}</span>', v);
                }
            }
     
        ],
        view: new Ext.grid.GroupingView({
            forceFit:true,
            groupTextTpl: '{group}',
            emptyText: 'Записи не найдены'
        }),

        loadData : function(data) {
            this.setTitle('Инструкции инженерные');
            this.getStore().loadData(data);
        }		

    });
    return grid;
  

})();
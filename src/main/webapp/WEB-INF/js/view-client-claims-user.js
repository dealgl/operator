/**
 *  agreement info grid singleton
 */

(function() {

    var store = new Ext.data.GroupingStore({
        autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root: 'contracts',
            fields: ['id', 'file_name', 'description', 'user_id']}),
        sortInfo : {field : 'file_name', direction : 'ASC'},
        groupField : 'description'
        });
   
    var _winFiles =  Ext.id();
    var _desc =  Ext.id();
    
    var winFiles = new Ext.Window({
    	title : 'Форма добавления файла',
        layout:'fit',
        width : 305,
        height : 130,//90
        plain: true,
        modal: true,
        border : false,
        items: [
           {
        	   id : _winFiles,
               xtype : 'form',
               layout : 'fit',               
               fileUpload : true,               
               items : [
					{
					    xtype : 'hidden',
					    name : 'UNID'
					},    
					{
			     		xtype : 'fileuploadfield',
			            name : 'upload',
			            buttonText : 'Открыть',
			            width : 290
			        },
			        {
				    	xtype : 'label',
				    	text :'Описание'
					},
                    {
                   	 	id : _desc,
						xtype: 'textfield',
                   	 	width: 290,
                   	 	name: 'firstname',
                   	 	fieldLabel : 'Имя'
                    }
			        
                ],
                buttons : [
                           {
                        	   xtype : 'button',
                               text : 'Добавить файл',
                               handler : function(self) {
                        	   		Ext.getCmp(_winFiles).getForm().submit({                    	
                                        url: 'clientclaims/save-file-client-claims.html',
                                        waitMsg: 'Добавление файла...',
                                        params : {
                        	   				description : Ext.getCmp(_desc).getValue()
										},
                                        timeout: 30000,
                                        success: function(form, action) {
                                            winFiles.close();
                                            menu.showClientClaims();
										},
                                        failure: function(form, action) {
                                            if (action.failureType == 'server') {
                                                var msg = Ext.decode(action.response.responseText);
                                                App.ui.error(msg.message.replace(/\n/g, '<br/>'));
                                            } else if (action.failureType == 'connect') {
                                                App.ui.error('Error during this operation');
                                            } else {
                                                App.ui.error('Error during this operation');
                                            }
                                        }
                                    });        	   		
                               }
                           },
                           {
                               text : 'Отмена',
                               handler : function() {
                        	   		winFiles.close();
                        	   		menu.showClientClaims();
                               }
                           }
                ]
            }
        ]
    });


 var grid = new Ext.grid.GridPanel({
        id: 'view-client-claims-component',
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
                dataIndex: 'file_name',
                widht : 300,
                sortable : true,
                renderer: function (value, p, record) {
                	return String.format('<b><a href="{1}" target="_blank">{0}</a></b><br/>', value,record.data['id']); 
                }
            },
            {
                header: 'Автор',
                width: 60, 
                sortable : true,
                dataIndex: 'user_id'
                
            },
            {
                header : 'Описание',
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
        
        tbar : [
                
                {
                	  xtype : 'button',
                	  text : 'Добавить файл',
                	  handler : function(self) {
                			winFiles.show();
                  	}
                  },
                                     {
                                      	xtype : 'button',
                                      	text : 'Скачать файл',
                                      	handler : function(self) {
                                         }
                                      },
                                      
                                      {
                                      	xtype : 'button',
                                      	text : 'Удалить файл',
                                      	handler : function(self) {
                                    
                                      }
                                      },
                                      {
                                      	xtype : 'button',
                                      	text : 'Обновить форму',
                                      	handler : function(self) {

                                      	}
                                      
                                      }
                ],
        
        loadData : function(data) {
            this.setTitle('Претензии клиентов');
            this.getStore().loadData(data);
        }		

    });
    return grid;
  

})();
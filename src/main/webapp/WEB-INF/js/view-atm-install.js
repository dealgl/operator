/**
 * Organization Info view
 */

(function () {

    var container;
    
    var id_sec = '';
    
    var _viewDoc = Ext.id();
    var _winFiles =  Ext.id();
    var _adr =  Ext.id();
    var _currency = Ext.id();
    var _koef_0 = Ext.id();
    var _koef_1 = Ext.id();
    var _bloomCode = Ext.id();
    var _period = Ext.id();
    var _group = Ext.id();
    

	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect:true
	});

	var store = new Ext.data.Store({
		autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root: 'file',
            fields: 
           	['file','name','id']
        })

    });
	
    var winFiles = new Ext.Window({
    	title : 'Форма добавления файла',
        layout:'fit',
        width : 300,
        height : 90,
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
			        }
                ],
                buttons : [
                           {
                        	   xtype : 'button',
                               text : 'Добавить файл',
                               handler : function(self) {
                        		 menu.showATMInstall();
                        	   		Ext.getCmp(_winFiles).getForm().submit({                    	
                                        url: 'atminstall/save-atm-file.html',
                                        waitMsg: 'Добавление файла...',
                                        params : {
                        	   				code : id_sec
										},
                                        timeout: 30000,
                                        success: function(form, action) {
                                            App.ui.message('Файл успешно загружен!');
                                            winFiles.close();
                                            menu.showATMInstall();
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
                               }
                           }
                ]
            }
        ]
    });
    
    var fileGrid =new Ext.grid.GridPanel ({
    	height:280,
    	columnLines : true,
        autoScroll: true,
        store: store,
        columns: [
            new Ext.grid.RowNumberer({width: 30}),
            sm,
            {
                header: 'Имя файла',
                width: 50,
                dataIndex: 'name'
            }
        ],
        viewConfig : {
            forceFit: true,
            stripeRows: true,
            emptyText: 'Файлы не найдены!'
        },
        tbar : [
                {
              	  xtype : 'button',
              	  text : 'Добавить файл',
              	  handler : function(self) {
              	  winFiles.doLayout();
              	  winFiles.show();
                	}
                },
                                    {
                                    	xtype : 'button',
                                    	text : 'Скачать файл',
                                    	handler : function(self) {
                                    		var ids = '';
                                    		Ext.each(sm.getSelections(), function(item) {
                                    			ids += ',' + item.data.id;
    										
                                    		});
                                    		if (ids.length > 0)
                                    			ids = ids.substr(1);
                                    		window.open(String.format('atminstall/view-atm-file.html?type={0}',ids));
                                       }
                                    },
                                    
                                    {
                                    	xtype : 'button',
                                    	text : 'Удалить файл',
                                    	handler : function(self) {
                                    	var ids = '';
    									Ext.each(sm.getSelections(), function(item) {
    										ids += ',' + item.data.id;
    										
    									});
    									if (ids.length > 0)
    										ids = ids.substr(1);
    									
										Ext.Ajax.request( {
											url : 'atminstall/delete-atm-file.html',
											params : {
												name: ids
											},
											timeout : 1000000000,
											waitMsg : 'Request to Database...',
											success : function(xhr) {
												var answer = Ext.decode(xhr.responseText);
												if (answer.success) {
													menu.showATMInstall();
										} else if (answer.code == 'login') {
											App.ui.sessionExpired();
										} else {
											App.ui.error('External server error', answer.message);
										}
									},
									failure : function() {
										App.ui.error('Error!');
									}
										});
                                    }
                                    },
                                    {
                                    	xtype : 'button',
                                    	text : 'Обновить форму',
                                    	icon :'home/dgluhov/Pictures/refreshBtn.GIF',
                                    	handler : function(self) {
                                    	 menu.showATMInstall();
                                    	}
                                    }
                                    
                ],
        sm : sm
    });
    
    container = new Ext.FormPanel({
        id :'view-atm-install-component',
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
            {
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
                        
            }
        ],
        loadData : function(data) {
        	this.setTitle("Установка банкомата <br/><b>" + "Документы" + "</b>");        	
        	this.data = data;
            if (data['file'][0]){
            	store.loadData(data);
            }
        },
        setWindow : function(window) {
            this.window = window;
        }
    });

    return container;

})();
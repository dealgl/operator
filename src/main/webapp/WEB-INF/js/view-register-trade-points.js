/**
 *  agreement info grid singleton
 */

(function() {

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
    
	var _ADDBTN = Ext.id();
	var _DELBTN = Ext.id();
	var _RFRBTN = Ext.id();
    
    var _desc =  Ext.id();

	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect:true
	});

	var store = new Ext.data.Store({
		autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root: 'file',
            fields: 
           	['id','file_name','file_content','description','user_id']
        })

    });
	

    
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
                                        url: 'registertradepoints/save-register-trade-points-doc.html',
                                        waitMsg: 'Добавление файла...',
                                        params : {
                        	   				description : Ext.getCmp(_desc).getValue()
										},
                                        timeout: 30000,
                                        success: function(form, action) {
                                            winFiles.close();
                                            menu.showRegisterTradePoints();
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
                        	   		menu.showRegisterTradePoints();
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
                header: 'id',
                width: 50,
                hidden : true,
                dataIndex: 'id'
            },
            {
                header: 'Имя файла',
                width: 50,
                dataIndex: 'file_name'
            },
            {
                header: 'Добавил',
                width: 50,
                dataIndex: 'user_id'
            },
            {
                header: 'Описание',
                width: 50,
                dataIndex: 'description'
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
              	  id : _ADDBTN,
               	  icon :'/portal/img/vwicn082.gif',
              	  handler : function(self) {
              	  winFiles.doLayout();
              	  winFiles.show();
                	}
                },
                                    {
                                    	xtype : 'button',
                                    	text : 'Скачать файл',
                                    	icon :'/portal/img/vwicn079.gif',                  	
                                    	handler : function(self) {
                                    		var ids = '';
                                    		var idn = '';
                                    		Ext.each(sm.getSelections(), function(item) {
                                    			ids += ',' + item.data.id;
                                    			idn +=',' + item.data.file_name;
                                    		});
                                    		if (ids.length > 0)
                                    			ids = ids.substr(1);
                                    		if (idn.length > 0)
                                    			idn = idn.substr(1);
                                    		if (ids == '') {
                								Ext.MessageBox
                										.show( {
                											title : 'Информация',
                											msg : 'Необходимо выбрать файл для открытия!',
                											buttons : Ext.MessageBox.OK,
                											icon : Ext.MessageBox.INFO
                										});
                							} else  {
                								window.open(String.format('tradeclaims/view-trade-claims-doc.html?id={0}&type={1}',ids,idn));
                								} 
                                       }
                                    },
                                    
                                    {
                                    	xtype : 'button',
                                    	text : 'Удалить файл',
                                    	id : _DELBTN,
                                    	icon :'/portal/img/vwicn081.gif',
                                    	handler : function(self) {
                                    	var ids = '';
    									Ext.each(sm.getSelections(), function(item) {
    										ids += ',' + item.data.id;
    										
    									});
    									if (ids.length > 0)
    										ids = ids.substr(1);

                                		if (ids == '') {
            								Ext.MessageBox
            										.show( {
            											title : 'Информация',
            											msg : 'Необходимо выбрать файл для удаления!',
            											buttons : Ext.MessageBox.OK,
            											icon : Ext.MessageBox.INFO
            										});
            							} else  {

    										Ext.Ajax.request( {
    											url : 'tradeclaims/delete-trade-claims-doc.html',
    											params : {
    												id: ids
    											},
    											timeout : 1000000000,
    											waitMsg : 'Выполняется операция...',
    											success : function(xhr) {
    												var answer = Ext.decode(xhr.responseText);
    												if (answer.success) {
    													 menu.showRegisterTradePoints();
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
    									
    									
                                    }
                                    },
                                    {
                                    	xtype : 'button',
                                    	text : 'Обновить форму',
                                    	id : _RFRBTN,
                                    	icon :'/portal/img/favicon.png',
                                    	handler : function(self) {
                                    	 	menu.showRegisterTradePoints();
                                    	}
                                    }
                                    
                ],
        sm : sm
    });
    
    container = new Ext.FormPanel({
        id :'view-register-trade-point-claims-component',
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
        	this.setTitle("Регистрация торговых точек<br/><b>" + "Документы" + "</b>");        	
        	this.data = data;
            if (data['file'][0]){
            	store.loadData(data);
            }
            
            if (data['role']=='2'){
            	Ext.getCmp(_ADDBTN).disable();
            	Ext.getCmp(_DELBTN).disable();
            	Ext.getCmp(_RFRBTN).disable();
            } 
            
        },
        setWindow : function(window) {
            this.window = window;
        }
    });

    return container;

})();
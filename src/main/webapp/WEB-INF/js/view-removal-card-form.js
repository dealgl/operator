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
           	['file','name','address']
        })

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
            },
            {
                header: 'Адрес рассылки',
                width: 50,
                dataIndex: 'address'
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
                                    			ids += ',' + item.data.name;
    										
                                    		});
                                    		if (ids.length > 0)
                                    			ids = ids.substr(1);
                                    		window.open(String.format('nbs/view-nbs-file.html?type={0}',ids));
                                       }
                                    },
                                    
                                    {
                                    	xtype : 'button',
                                    	text : 'Удалить файл',
                                    	handler : function(self) {
                                    	var ids = '';
    									Ext.each(sm.getSelections(), function(item) {
    										ids += ',' + item.data.name;
    										
    									});
    									if (ids.length > 0)
    										ids = ids.substr(1);
    									
										Ext.Ajax.request( {
											url : 'nbs/delete-nbs-file.html',
											params : {
												name: ids
											},
											timeout : 1000000000,
											waitMsg : 'Request to Database...',
											success : function(xhr) {
												var answer = Ext.decode(xhr.responseText);
												if (answer.success) {
													 menu.showNBS();
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
                                    	 	menu.showNBS();
                                    	}
                                    }

                ],
        sm : sm
    });
    
    container = new Ext.FormPanel({
        id :'view-removal-card-form-component',
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
                title: 'Инструкция по выдаче изъятых пластиковых карт',
                items :[
                        {
                           	xtype:'fieldset',
                            autoHeight: true,
                            items :[
									{
										html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">TEST</span>'
									}
                                    
                                    //fileGrid	
                                    ]
                        }           
                        ]
                        
            }
        ],
        loadData : function(data) {
        	this.setTitle("Изъятие пластиковых карт");        	
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
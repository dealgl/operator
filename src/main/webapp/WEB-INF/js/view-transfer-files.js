 
/**
 * @author mikluha 
 * Created 2013-05-29
*/

(function () {

    var container;

	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect:false
	});
 	var store = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'transferFiles',
			fields : [ 'files','date','path']
		})
	});

    
    var fileGrid =new Ext.grid.GridPanel ({
    	height:280,
    	columnLines : true,
        autoScroll: true,
        store: store,
        columns: [
             
            sm,
            {
				header : 'Файлы',
				dataIndex : 'files',
				sortable : true,
				width : 20
			},
            {
				header : 'Дата ',
				dataIndex : 'date',
				sortable : true,
				width : 20
			},
            {
				header : 'Путь',
				dataIndex : 'path',
				sortable : true,
				width : 20
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
						text : 'Обновить содержимое папки',
						handler : function(self) {
						 	menu.showTransferFiles();
						}
					
					},
					"-",
					{
						xtype : 'button',
						text : 'Корректировка основания платежа',
						handler : function(self) {
						var ids = '';
						Ext.each(sm.getSelections(), function(item) {
							ids += ',' + item.data.path;
						});
						if (ids.length > 0){
							ids = ids.substr(1);
						}
					
					
					if (ids == '') {
						Ext.MessageBox
								.show( {
									title : 'Информация',
									msg : 'Необходимо отметить файлы для обработки!',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO
								});
					} else {
							
						Ext.Ajax.request( {
							url : 'documents/correct-transfer-pay-main.html',
							params : {
								path : ids
							},
							timeout : 1000000000,
							waitMsg : 'Выполняется запрос к Bloomberg',
							success : function(xhr) {
								var answer = Ext.decode(xhr.responseText);
								if (answer.success) {
									Ext.MessageBox.show( {
										title : 'Информация',
										msg : 'Корректировка основания платежа успешно завершена!',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.INFO
									});
									//container.loadData(answer);
									menu.showTransferFiles();
						} else if (answer.code == 'login') {
							App.ui.sessionExpired();
						} else {
							App.ui.error('Внутрення ошибка сервера', answer.message);
						}
					},
					failure : function() {
						App.ui.error('Сервер недоступен');
					}
						});
						} //else
					
					}
					
					}
                ],
        sm : sm
    });
    
    container = new Ext.FormPanel({
        id :'view-transfer-files-form',
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
                 
            	xtype : 'panel',
                frame : true,
                collapsible : true,
                title: 'Файлы проводок',
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
		    	this.setTitle("Файлы проводок");        	
		    	this.data = data;
		        	store.loadData(data);
	        	
        }
    });

    return container;

})();
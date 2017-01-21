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
            new Ext.grid.RowNumberer({width: 30}),
            sm,
    	    {
    			header : 'Имя',
    			dataIndex : 'files',
    			sortable : true,
    			width : 20
    		},
            {
    			header : 'Путь',
    			dataIndex : 'path',
    			sortable : true,
    			width : 50
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
					text : 'Скачать файл',
					icon : '/portal/img/vwicn079.gif',
					handler : function(self) {
						var idn = '';
						Ext.each(sm.getSelections(), function(item) {
							idn += ',' + item.data.files;
						});
						if (idn.length > 0)
							idn = idn.substr(1);
						if (idn == '') {
							Ext.MessageBox.show( {
								title : 'Информация',
								msg : 'Необходимо выбрать файл для открытия!',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
						} else {
								Ext.each(sm.getSelections(), function(item) {
									window.open(String.format('geb/view-geb-file.html?type={0}',item.data.files));
								});
								container.window.close();
						}
					}
				},
				"-",
                 {
                                    	xtype : 'button',
                                    	text : 'Содержимое проводок',
                                    	icon : '/portal/img/favicon.png',
                                    	handler : function(self) {
											menu.showLoadTransFormGeb();
                                    	}
                  },
                 "-",
				 {
						xtype : 'button',
						text : 'Загрузка проводок',
						icon : '/portal/img/vwicn082.gif',
						handler : function(self) {
						var ids = '';
						Ext.each(sm.getSelections(), function(item) {
							ids += ',' + item.data.files;
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
					} else	
					
						{
						Ext.Ajax.request( {
							url : 'geb/load-trans-file-geb.html',
							params : {
								path : ids
							},
							timeout : 1000000000,
							waitMsg : 'Выполняется корректировка основания',
							success : function(xhr) {
								var answer = Ext.decode(xhr.responseText);
								if (answer.success) {
									Ext.MessageBox.show( {
										title : 'Информация',
										msg : 'Загрузка проводок успешно завершена!',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.INFO
									});
									menu.showLoadTransFormGeb();
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
					}
						
							
						}
					}
                                    
                ],
        sm : sm
    });
    
    container = new Ext.FormPanel({
        id :'view-geb-files-form-component',
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
        	this.setTitle("ГАЗЭНЕРГОБАНК<br/><b>" + "Документы" + "</b>");        	
        	this.data = data;
			if (data['transferFiles'][0]) {
				store.loadData(data);
			}
        },
        setWindow : function(window) {
            this.window = window;
        }
    });

    return container;

})();
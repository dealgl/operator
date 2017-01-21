/**
 * Organization Info view
 */

(function() {

	var container;

	var id_sec = '';

	var _viewDoc = Ext.id();
	var _winFiles = Ext.id();
	var _adr = Ext.id();
	var _currency = Ext.id();
	var _koef_0 = Ext.id();
	var _koef_1 = Ext.id();
	var _bloomCode = Ext.id();
	var _period = Ext.id();
	var _group = Ext.id();
	var _desc = Ext.id();
	
	var sm = new Ext.grid.CheckboxSelectionModel( {
		singleSelect : false
	});

	var store = new Ext.data.Store( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'transferFiles',
			fields : [ 'files','date','path']          
		})
	});

	var winFiles = new Ext.Window( {
		title : 'Форма добавления файла',
		layout : 'fit',
		width : 305,
		height : 130,
		plain : true,
		modal : true,
		border : false,
		items : [ {
			id : _winFiles,
			xtype : 'form',
			layout : 'fit',
			fileUpload : true,
			items : [ {
				xtype : 'hidden',
				name : 'UNID'
			}, {
				xtype : 'fileuploadfield',
				name : 'upload',
				buttonText : 'Открыть',
				width : 290
			}, {
				xtype : 'label',
				text : 'Описание'
			}, {
				id : _desc,
				xtype : 'textfield',
				width : 290,
				name : 'firstname',
				fieldLabel : 'Имя'
			}
			],
			buttons : [ {
				xtype : 'button',
				text : 'Добавить файл',
				handler : function(self) {
					Ext.getCmp(_winFiles).getForm().submit( {
						url : 'vuz/save-vuz-file.html',
						waitMsg : 'Добавление файла...',
						params : {
							description : Ext.getCmp(_desc).getValue()
						},
						timeout : 300000000,
						success : function(form, action) {
						menu.showVuz();
					},
					failure : function(form, action) {
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
			}, {
				text : 'Отмена',
				handler : function() {
					winFiles.close();
					menu.showVuz();
				}
			} ]
		} ]
	});

	var fileGrid = new Ext.grid.GridPanel( {
		height : 380,
		columnLines : true,
		autoScroll : true,
		store : store,
		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}), sm, 
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
			forceFit : true,
			stripeRows : true,
			emptyText : 'Файлы не найдены!'
		},
		tbar : [
				{
					xtype : 'button',
					text : 'Добавить файл',
					icon : '/portal/img/vwicn082.gif',
					handler : function(self) {
						winFiles.show();
					}
				},
				"-",				
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
									window.open(String.format('vuz/view-file-vuz-proceed.html?type={0}',item.data.files));
								});
								container.window.close();
						}
					}
				},
				"-",
                {
                	xtype : 'button',
                	text : 'Удалить файл',
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
									menu.showVuz();
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
                "-",
                {
					xtype : 'button',
					text : 'Содержимое проводок',
					icon : '/portal/img/favicon.png',
					handler : function(self) {
						//menu.showVuz();
						
						menu.showLoadTransForm();
					}
				},
				"-",
				{
					xtype : 'button',
					text : 'Корректировка основания платежа',
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
				} else {
					Ext.Ajax.request( {
						url : 'vuz/correct-transfer-pay-vuz-main.html',
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
									msg : 'Корректировка основания платежа успешно завершена!',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO
								});
								menu.showVuz();
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
				},
                {
					xtype : 'button',
					text : 'Загрузка проводок',
					icon : '/portal/img/favicon.png',
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
						url : 'vuz/load-trans-file-vuz.html',
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
								menu.showLoadTransForm();
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

	container = new Ext.FormPanel( {
		id : 'view-vuz-files-form-component',
		frame : true,
		closable : true,
		header : false,
		autoScroll : true,
		labelWidth : 250,
		defaults : {
			style : {
				marginBottom : '5px'
			}
		},
		items : [ {
			id : _viewDoc,
			xtype : 'panel',
			frame : true,
			collapsible : true,
			title : 'Файлы проводок',
			items : [ {
				xtype : 'fieldset',
				autoHeight : true,
				items : [ fileGrid ]
			} ]

		} ],

		loadData : function(data) {
			this.setTitle("ВУЗ-банк<br/><b>"
					+ "Документы" + "</b>");
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

})();;
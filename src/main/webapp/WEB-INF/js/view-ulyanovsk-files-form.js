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
		singleSelect : true
	});

	var store = new Ext.data.Store( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			//root : 'file',
			//fields : [ 'id', 'file_name', 'file_content', 'description','user_id' ]
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
						url : 'ulyanovsk/save-ulyanovsk-file.html',
						waitMsg : 'Добавление файла...',
						params : {
							description : Ext.getCmp(_desc).getValue()
						},
						timeout : 300000000,
						success : function(form, action) {
						menu.showEvUlyanovsk();
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
					menu.showEvUlyanovsk();
				}
			} ]
		} ]
	});

	var fileGrid = new Ext.grid.GridPanel( {
		height : 280,
		columnLines : true,
		autoScroll : true,
		store : store,
		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}), sm, 
		/*{
			header : 'id',
			width : 50,
			hidden : true,
			dataIndex : 'id'
		},
		{
			header : 'Имя файла',
			width : 50,
			dataIndex : 'file_name'
		},
		{
			header : 'Добавил',
			width : 50,
			dataIndex : 'user_id'
		},
		{
			header : 'Описание',
			width : 50,
			dataIndex : 'description'
		}*/
	    {
			header : 'Имя',
			dataIndex : 'files',
			sortable : true,
			width : 20
		},
        /*{
			header : 'Дата ',
			dataIndex : 'date',
			sortable : true,
			width : 20
		},*/
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
				/*{
					xtype : 'button',
					text : 'Скачать файл',
					icon : '/portal/img/vwicn079.gif',
					handler : function(self) {
						var ids = '';
						var idn = '';
						Ext.each(sm.getSelections(), function(item) {
							ids += ',' + item.data.id;
							idn += ',' + item.data.file_name;
						});
						if (ids.length > 0)
							ids = ids.substr(1);
						if (idn.length > 0)
							idn = idn.substr(1);
						if (ids == '') {
							Ext.MessageBox.show( {
								title : 'Информация',
								msg : 'Необходимо выбрать файл для открытия!',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
						} else {
							window.open(String.format('ev/view-file-ev.html?id={0}&type={1}',ids,idn));
						}
					}
				},*/

				{
					xtype : 'button',
					text : 'Скачать файл',
					icon : '/portal/img/vwicn079.gif',
					handler : function(self) {
						var ids = '';
						var idn = '';
						Ext.each(sm.getSelections(), function(item) {
							//ids += ',' + item.data.id;
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
							window.open(String.format('ulyanovsk/view-file-ulyanovsk-proceed.html?id={0}&type={1}',ids,idn));
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
									menu.showEvUlyanovsk();
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
					text : 'Обновить форму',
					icon : '/portal/img/favicon.png',
					handler : function(self) {
						menu.showEvUlyanovsk();
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
						url : 'ulyanovsk/correct-transfer-pay-ulyanovsk-main.html',
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
								//container.loadData(answer);
								menu.showEvUlyanovsk();
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

	container = new Ext.FormPanel( {
		id : 'view-ulyanovsk-files-form-component',
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
			this.setTitle(" Экспресс-Волга (Ульяновский филиал)<br/><b>" + "Документы" + "</b>");
			this.data = data;
			/*if (data['file'][0]) {
				store.loadData(data);
			}*/
			
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
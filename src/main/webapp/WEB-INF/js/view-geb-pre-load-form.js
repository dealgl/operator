/**
 * Organization Info view
 */

(function() {

	var container;
	
	var sm = new Ext.grid.CheckboxSelectionModel( {
		singleSelect : false
	});

	var store = new Ext.data.Store( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'rsTrans',
			fields : ['f_id', 'dr_number','cr_number','dr_amount','cr_amount','comments',
			          'doc_kind','shifr','pack','date',
			          'v6_id','result']          
		})
	});

	var fileGrid = new Ext.grid.GridPanel( {
		height : 480,
		columnLines : true,
		autoScroll : true,
		store : store,
		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}), sm, 
		{
			header : 'f_id',
			dataIndex : 'f_id',
			sortable : true,
			hidden: true,
			width : 20
		},
		{
			header : 'DR_NUMBER',
			dataIndex : 'dr_number',
			sortable : true,
			width : 50
		},
        {
			header : 'CR_NUMBER',
			dataIndex : 'cr_number',
			sortable : true,
			width : 50
		},
		{
			header : 'DB_AMOUNT',
			dataIndex : 'dr_amount',
			sortable : true,
			width : 30
		},
		{
			header : 'CR_AMOUNT',
			dataIndex : 'cr_amount',
			sortable : true,
			width : 30
		},
		{
			header : 'COMMENTS',
			dataIndex : 'comments',
			sortable : true,
			width : 100
		},
		{
			header : 'DOC_KIND',
			dataIndex : 'doc_kind',
			sortable : true,
			width : 15
		},
		{
			header : 'SHIFR',
			dataIndex : 'shifr',
			sortable : true,
			width : 20
		},
		{
			header : 'PACK',
			dataIndex : 'pack',
			sortable : true,
			width : 15
		},
		{
			header : 'DATE',
			dataIndex : 'date',
			sortable : true,
			width : 30
		},
		{
			header : 'V6_ID',
			dataIndex : 'v6_id',
			sortable : true,
			width : 20
		},
		
		{
			header : 'RESULT',
			dataIndex : 'result',
			sortable : true,
			width : 25
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
					text : 'Загрузка в RS',
					icon : '/portal/img/vwicn079.gif',
					handler : function(self) {
						var idn = '';
						Ext.each(sm.getSelections(), function(item) {
							idn += ',' + item.data.f_id;
						});
						if (idn.length > 0)
							idn = idn.substr(1);
						if (idn == '') {
							Ext.MessageBox.show( {
								title : 'Информация',
								msg : 'Необходимо выбрать файл для загрузки!',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
						} else {
							Ext.Ajax.request( {
								url : 'geb/import-to-rs.html',
								params : {
									transId : idn
								},
								timeout : 1000000000,
								waitMsg : 'Выполняется импорт проводок',
								success : function(xhr) {
									var answer = Ext.decode(xhr.responseText);
									if (answer.success) {
										Ext.MessageBox.show( {
											title : 'Информация',
											msg : 'Загрузка проводок успешно завершена!',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO
										});
										//menu.showLoadTransFormGeb();
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
					text : 'Удалить проводки',
					icon :'/portal/img/vwicn081.gif',
					handler : function(self) {
					
                	var ids = '';
					Ext.each(sm.getSelections(), function(item) {
						ids += ',' + item.data.f_id;
					});
					if (ids.length > 0)
						ids = ids.substr(1);

            		if (ids == '') {
						Ext.MessageBox
								.show( {
									title : 'Информация',
									msg : 'Необходимо выбрать проводки для удаления!',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO
								});
					} else  {

						Ext.Ajax.request( {
							url : 'geb/geb-delete-pre-trans-file.html',
							params : {
								id: ids
							},
							timeout : 1000000000,
							waitMsg : 'Выполняется операция...',
							success : function(xhr) {
								var answer = Ext.decode(xhr.responseText);
								if (answer.success) {
									menu.showGebPreLoadTransForm();
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
				}
				
				
				
				
		],
		sm : sm
	});

	container = new Ext.FormPanel( {
		id : 'view-geb-pre-load-form-component',
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
			xtype : 'panel',
			frame : true,
			collapsible : true,
			title : 'Предварительный просмотр',
			items : [ {
				xtype : 'fieldset',
				autoHeight : true,
				items : [ fileGrid ]
			} ]

		} ],

		loadData : function(data) {
			this.setTitle("ГЭБ<br/><b>"
					+ "Предварительный просмотр" + "</b>");
			this.data = data;
			if (data['rsTrans'][0]) {
				store.loadData(data);
			}
		},
		setWindow : function(window) {
			this.window = window;
		}
	});

	return container;

})();;
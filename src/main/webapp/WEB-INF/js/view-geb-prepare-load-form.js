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
			fields : ['id', 'file','rd','db','cr','f1','f2','desc','cd','date','f3','f4']          
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
			header : 'id',
			dataIndex : 'id',
			sortable : true,
			hidden: true,
			width : 20
		},
		
		{
			header : 'NAME',
			dataIndex : 'file',
			sortable : true,
			width : 20
		},
        {
			header : 'RD',
			dataIndex : 'rd',
			sortable : true,
			width : 40
		},
		{
			header : 'DB',
			dataIndex : 'db',
			sortable : true,
			width : 50
		},
		{
			header : 'CR',
			dataIndex : 'cr',
			sortable : true,
			width : 50
		},
		{
			header : 'F1',
			dataIndex : 'f1',
			sortable : true,
			width : 50
		},
		{
			header : 'F2',
			dataIndex : 'f2',
			sortable : true,
			width : 50
		},
		{
			header : 'DESC',
			dataIndex : 'desc',
			sortable : true,
			width : 50
		},
		{
			header : 'CD',
			dataIndex : 'cd',
			sortable : true,
			width : 50
		},
		{
			header : 'DATE',
			dataIndex : 'date',
			sortable : true,
			width : 40
		},
		{
			header : 'F3',
			dataIndex : 'f3',
			sortable : true,
			width : 20
		},
		{
			header : 'F4',
			dataIndex : 'f4',
			sortable : true,
			width : 20
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
					text : 'Обработка проводок',
					icon : '/portal/img/vwicn079.gif',
					handler : function(self) {
						var idn = '';
						Ext.each(sm.getSelections(), function(item) {
							idn += ',' + item.data.id;
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
									Ext.Ajax.request({
										url : 'geb/geb-trans-pre-load.html',
										params : {
											transId: idn
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
				},
				"-",
                {
					xtype : 'button',
					text : 'Подготовленные в RS',
					icon : '/portal/img/favicon.png',
					handler : function(self) {
						menu.showGebPreLoadTransForm();
					}
				},
				"-",
				{
					xtype : 'button',
					text : 'Сохранить изменения',
					icon : '/portal/img/favicon.png',
					handler : function(self) {
					//	menu.showLoadTransForm();
					}
				},
				"-",
				{
					xtype : 'button',
					text : 'Удалить проводки',
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
									msg : 'Необходимо выбрать проводки для удаления!',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO
								});
					} else  {

						Ext.Ajax.request( {
							url : 'geb/geb-delete-trans-file.html',
							params : {
								id: ids
							},
							timeout : 1000000000,
							waitMsg : 'Выполняется операция...',
							success : function(xhr) {
								var answer = Ext.decode(xhr.responseText);
								if (answer.success) {
									menu.showLoadTransFormGeb();
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
		id : 'view-geb-prepare-load-form-component',
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
			title : 'Содержимое проводок',
			items : [ {
				xtype : 'fieldset',
				autoHeight : true,
				items : [ fileGrid ]
			} ]

		} ],

		loadData : function(data) {
			this.setTitle("ГЭБ<br/><b>"
					+ "Содержимое проводок" + "</b>");
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
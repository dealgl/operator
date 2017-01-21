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

	var sm = new Ext.grid.CheckboxSelectionModel( {
		singleSelect : true
	});

	var store = new Ext.data.Store( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'file',
			fields : [ 'id', 'file_name', 'file_content', 'description',
					'user_id' ]
		})

	});

	var fileGrid = new Ext.grid.GridPanel( {
		height : 280,
		columnLines : true,
		autoScroll : true,
		store : store,
		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}), sm, {
			header : 'id',
			width : 50,
			hidden : true,
			dataIndex : 'id'
		}, {
			header : 'Имя файла',
			width : 50,
			dataIndex : 'file_name'
		}, {
			header : 'Добавил',
			width : 50,
			dataIndex : 'user_id'
		}, {
			header : 'Описание',
			width : 50,
			dataIndex : 'description'
		} ],
		viewConfig : {
			forceFit : true,
			stripeRows : true,
			emptyText : 'Файлы не найдены!'
		},
		tbar : [
				{
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
							window.open(String.format(
									'ev/view-file-ev.html?id={0}&type={1}',
									ids, idn));
						}
						
					}
				} ],
		sm : sm
	});

	container = new Ext.FormPanel( {
		id : 'view-ev-files-form-user-component',
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
			title : 'Документы',
			items : [ {
				xtype : 'fieldset',
				autoHeight : true,
				items : [ fileGrid ]
			} ]

		} ],
		loadData : function(data) {
			this.setTitle("Экспресс-Волга (Головной филиал)<br/><b>"
					+ "Документы" + "</b>");
			this.data = data;
			if (data['file'][0]) {
				store.loadData(data);
			}
		},
		setWindow : function(window) {
			this.window = window;
		}
	});

	return container;

})();
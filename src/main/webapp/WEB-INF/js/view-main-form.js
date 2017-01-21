/**
 * created by den
 */

(function() {
	 var _cardlist_p_client_name = Ext.id();
	 var _cardlist_p_client_account = Ext.id();
  	 var _cardlist_p_client_card = Ext.id();
  	 var _cardlist_p_client_number = Ext.id();
  	 
  	 var _date_begin = Ext.id();
  	 var _date_end  = Ext.id();
  	 
	 var store = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'info',
			fields : ['date_create','status','employee','file_name','file_id',
			          'amount','req_usd','refund_usd','req_eur','refund_eur',
			          'req_rur','refund_rur'
			          ]
		})
	});

	var filterForm = new Ext.form.FormPanel(
			{
				region : 'north',
				height : 180,
				labelWidth : 140,
				style : 'padding:5px;',
				items : [ {
					xtype : 'panel',
					layout : 'fit',
					width : 560,
					height : 180,
					items : [ { 
						xtype : 'fieldset',
						border : true,
						items : [
{
	id : _date_begin,
	xtype : 'datefield',
    format : 'd.m.Y',
    allowBlank : false,
    fieldLabel : 'Дата с',
    name : 'dateBegin'
},
{
	id : _date_end,
	xtype : 'datefield',
    format : 'd.m.Y',
    allowBlank : false,
    fieldLabel : 'Дата по',
    name : 'dateBegin'
} ,
								{
									xtype : 'button',
									text :'<font style="font-size: 12px;">Запрос</font>', 
									style : 'margin-left: 250px;margin-top:20px',
									width : 90  ,
									  handler : function(self) {
									 	menu.showSettlementMain(Ext.getCmp(_date_begin).getValue(),Ext.getCmp(_date_end).getValue());
									 } 
								},
								{
									xtype : 'button',
									text :'<font style="font-size: 12px;">Загрузить файл</font>', 
									style : 'margin-left: 250px;margin-top:20px',
									width : 90  ,
									  handler : function(self) {
										  menu.showImportVisa();
									 } 
								},
								
								
								]
					} ]
				} ]
			});

	var grid = new Ext.grid.GridPanel(
			{
				frame : true,
				region : 'center',
				autoScroll : true,
				enableHdMenu : true,
				store : store,
				columnLines :true,
				columns : [ 
				{
					header : 'Дата создания',
					dataIndex : 'date_create',
					sortable : true,
					width : 40
				},
				{
					header : 'Статус',
					dataIndex : 'status',
					sortable : true,
					width : 40
				},
				{
					header : 'Сотрудник',
					dataIndex : 'employee', 
					sortable : true,
					width : 50
				},
				{
					header :'<font style="font-size: 12px;">Имя файла</font>',  
					dataIndex : 'file_name',
					sortable : true,
					width : 40
				},
				{
					header :'<font style="font-size: 12px;">ID файла</font>', 
					dataIndex : 'file_id',
					sortable : true,
					width : 40
				},
				{
					header :'<font style="font-size: 12px;">Кол-во</font>',
					dataIndex : 'amount',
					sortable : true,
					width : 25
				},
				{ 
					header : '<font style="font-size: 12px;">Треб.USD</font>',
					dataIndex : 'req_usd',
					sortable : true,
					width : 30
				},
				{
					header : '<font style="font-size: 12px;">Возм.USD</font>',
					dataIndex : 'refund_usd',
					sortable : true,
					width : 30
				},
				{
					header : '<font style="font-size: 12px;">Треб.EUR</font>',
					dataIndex : 'req_eur',
					sortable : true,
					width : 35
				},
				{
					header :'<font style="font-size: 12px;">Возм.EUR</font>', 
					dataIndex : 'refund_eur',
					sortable : true,
					width : 30
				},
				{
					header :'<font style="font-size: 12px;">Треб.RUR</font>',
					dataIndex : 'req_rur',
					sortable : true,
					width : 30
				},
				{
					header : '<font style="font-size: 12px;">Возм.RUR</font>',
					dataIndex : 'refund_rur',
					sortable : true,
					width : 30
				} 
				],
				viewConfig : new Ext.grid.GroupingView(
						{
							forceFit : true,
							groupTextTpl : '{group}<span style="font-size: xx-small">(яПНяПНяПНяПНяПН: {[values.rs.length]})</span>',
							emptyText : 'Записи не найдены',
							enableGroupingMenu : false,
							startCollapsed : true
						})
			});

	var grid1 = new Ext.grid.GridPanel(
			{
				frame : true,
				region : 'south',
				autoScroll : true,
				enableHdMenu : true,
				store : store,
				columnLines :true,
				columns : [ 
				{
					header : 'Дата создания',
					dataIndex : 'date_create',
					sortable : true,
					width : 40
				},
				{
					header : 'Статус',
					dataIndex : 'status',
					sortable : true,
					width : 40
				},
				{
					header : 'Сотрудник',
					dataIndex : 'employee', 
					sortable : true,
					width : 50
				},
				{
					header :'<font style="font-size: 12px;">Имя файла</font>',  
					dataIndex : 'file_name',
					sortable : true,
					width : 40
				},
				{
					header :'<font style="font-size: 12px;">ID файла</font>', 
					dataIndex : 'file_id',
					sortable : true,
					width : 40
				},
				{
					header :'<font style="font-size: 12px;">Кол-во</font>',
					dataIndex : 'amount',
					sortable : true,
					width : 25
				},
				{ 
					header : '<font style="font-size: 12px;">Треб.USD</font>',
					dataIndex : 'req_usd',
					sortable : true,
					width : 30
				},
				{
					header : '<font style="font-size: 12px;">Возм.USD</font>',
					dataIndex : 'refund_usd',
					sortable : true,
					width : 30
				},
				{
					header : '<font style="font-size: 12px;">Треб.EUR</font>',
					dataIndex : 'req_eur',
					sortable : true,
					width : 35
				},
				{
					header :'<font style="font-size: 12px;">Возм.EUR</font>', 
					dataIndex : 'refund_eur',
					sortable : true,
					width : 30
				},
				{
					header :'<font style="font-size: 12px;">Треб.RUR</font>',
					dataIndex : 'req_rur',
					sortable : true,
					width : 30
				},
				{
					header : '<font style="font-size: 12px;">Возм.RUR</font>',
					dataIndex : 'refund_rur',
					sortable : true,
					width : 30
				} 
				],
				viewConfig : new Ext.grid.GroupingView(
						{
							forceFit : true,
							groupTextTpl : '{group}<span style="font-size: xx-small">(яПНяПНяПНяПНяПН: {[values.rs.length]})</span>',
							emptyText : 'Записи не найдены',
							enableGroupingMenu : false,
							startCollapsed : true
						})
			});
	
	return new Ext.Panel( {
		id : 'view-main-form-component',
		title : '<font style="font-size: 12px;">Full Settlement</font>',
		closable : true,
		frame : true,
		layout : 'border',
		items : [ filterForm, grid,grid1 ], 
		loadData : function(data) {  
	    	this.setTitle("Full Settlement");        	
	    	this.data = data;
	        	store.loadData(data);
	        	/*Ext.getCmp(_cardlist_p_client_name).setValue(data['cardlist_p_client_name']); 
	         	Ext.getCmp(_cardlist_p_client_account).setValue(data['cardlist_p_client_account']);
	        	Ext.getCmp(_cardlist_p_client_card).setValue(data['cardlist_p_client_card']);
	        	Ext.getCmp(_cardlist_p_client_number).setValue(data['cardlist_p_client_number']);
	    */}  
	});
})();
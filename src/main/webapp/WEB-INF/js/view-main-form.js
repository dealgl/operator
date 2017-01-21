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
    fieldLabel : '���� �',
    name : 'dateBegin'
},
{
	id : _date_end,
	xtype : 'datefield',
    format : 'd.m.Y',
    allowBlank : false,
    fieldLabel : '���� ��',
    name : 'dateBegin'
} ,
								{
									xtype : 'button',
									text :'<font style="font-size: 12px;">������</font>', 
									style : 'margin-left: 250px;margin-top:20px',
									width : 90  ,
									  handler : function(self) {
									 	menu.showSettlementMain(Ext.getCmp(_date_begin).getValue(),Ext.getCmp(_date_end).getValue());
									 } 
								},
								{
									xtype : 'button',
									text :'<font style="font-size: 12px;">��������� ����</font>', 
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
					header : '���� ��������',
					dataIndex : 'date_create',
					sortable : true,
					width : 40
				},
				{
					header : '������',
					dataIndex : 'status',
					sortable : true,
					width : 40
				},
				{
					header : '���������',
					dataIndex : 'employee', 
					sortable : true,
					width : 50
				},
				{
					header :'<font style="font-size: 12px;">��� �����</font>',  
					dataIndex : 'file_name',
					sortable : true,
					width : 40
				},
				{
					header :'<font style="font-size: 12px;">ID �����</font>', 
					dataIndex : 'file_id',
					sortable : true,
					width : 40
				},
				{
					header :'<font style="font-size: 12px;">���-��</font>',
					dataIndex : 'amount',
					sortable : true,
					width : 25
				},
				{ 
					header : '<font style="font-size: 12px;">����.USD</font>',
					dataIndex : 'req_usd',
					sortable : true,
					width : 30
				},
				{
					header : '<font style="font-size: 12px;">����.USD</font>',
					dataIndex : 'refund_usd',
					sortable : true,
					width : 30
				},
				{
					header : '<font style="font-size: 12px;">����.EUR</font>',
					dataIndex : 'req_eur',
					sortable : true,
					width : 35
				},
				{
					header :'<font style="font-size: 12px;">����.EUR</font>', 
					dataIndex : 'refund_eur',
					sortable : true,
					width : 30
				},
				{
					header :'<font style="font-size: 12px;">����.RUR</font>',
					dataIndex : 'req_rur',
					sortable : true,
					width : 30
				},
				{
					header : '<font style="font-size: 12px;">����.RUR</font>',
					dataIndex : 'refund_rur',
					sortable : true,
					width : 30
				} 
				],
				viewConfig : new Ext.grid.GroupingView(
						{
							forceFit : true,
							groupTextTpl : '{group}<span style="font-size: xx-small">(�����: {[values.rs.length]})</span>',
							emptyText : '������ �� �������',
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
					header : '���� ��������',
					dataIndex : 'date_create',
					sortable : true,
					width : 40
				},
				{
					header : '������',
					dataIndex : 'status',
					sortable : true,
					width : 40
				},
				{
					header : '���������',
					dataIndex : 'employee', 
					sortable : true,
					width : 50
				},
				{
					header :'<font style="font-size: 12px;">��� �����</font>',  
					dataIndex : 'file_name',
					sortable : true,
					width : 40
				},
				{
					header :'<font style="font-size: 12px;">ID �����</font>', 
					dataIndex : 'file_id',
					sortable : true,
					width : 40
				},
				{
					header :'<font style="font-size: 12px;">���-��</font>',
					dataIndex : 'amount',
					sortable : true,
					width : 25
				},
				{ 
					header : '<font style="font-size: 12px;">����.USD</font>',
					dataIndex : 'req_usd',
					sortable : true,
					width : 30
				},
				{
					header : '<font style="font-size: 12px;">����.USD</font>',
					dataIndex : 'refund_usd',
					sortable : true,
					width : 30
				},
				{
					header : '<font style="font-size: 12px;">����.EUR</font>',
					dataIndex : 'req_eur',
					sortable : true,
					width : 35
				},
				{
					header :'<font style="font-size: 12px;">����.EUR</font>', 
					dataIndex : 'refund_eur',
					sortable : true,
					width : 30
				},
				{
					header :'<font style="font-size: 12px;">����.RUR</font>',
					dataIndex : 'req_rur',
					sortable : true,
					width : 30
				},
				{
					header : '<font style="font-size: 12px;">����.RUR</font>',
					dataIndex : 'refund_rur',
					sortable : true,
					width : 30
				} 
				],
				viewConfig : new Ext.grid.GroupingView(
						{
							forceFit : true,
							groupTextTpl : '{group}<span style="font-size: xx-small">(�����: {[values.rs.length]})</span>',
							emptyText : '������ �� �������',
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
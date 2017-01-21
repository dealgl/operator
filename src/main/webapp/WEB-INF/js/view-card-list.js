/**
 * author ikram 
 * modify by den
 */

(function() {
	 var _cardlist_p_client_name = Ext.id();
	 var _cardlist_p_client_account = Ext.id();
  	 var _cardlist_p_client_card = Ext.id();
	 var store = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'cardlist_hm',
			fields : [ 'contr_id', 'client_name', 'amount_blocked',
					'amount_balance', 'amount_available', 'limit_info',
					'contr_curr', 'date_expire', 'card_type', 'contr_number',
					'status', 'is_expired', 'rbs_number', 'show_fin' ]
		})
	});

	var filterForm = new Ext.form.FormPanel(
			{
				region : 'north',
				height : 150,
				labelWidth : 140,
				style : 'padding:5px;',
				items : [ {
					xtype : 'panel',
					layout : 'fit',
					width : 560,
					height : 150,
					items : [ { 
						xtype : 'fieldset',
						border : true,
						items : [
								{	id :_cardlist_p_client_name,
									xtype : 'textfield',
									fieldLabel : 'ĸ� �������',
									width : 200,
									allowBlank : true,
									name : 'p_client_name'
								},
								{	id :_cardlist_p_client_account,
									xtype : 'textfield',
									fieldLabel : '��������� ���� ���',
									width : 200,
									allowBlank : true,
									//maxLength:20,
									//minLength:20,
									name : 'p_client_account'

								},
								{   id :_cardlist_p_client_card,
									xtype : 'textfield',
									fieldLabel : '����� �����',
									width : 200,
									//maxLength:16,
									//minLength:16,
									allowBlank : true,
									name : 'p_client_card'

								},
								{
									xtype : 'button',
									text : '�����',
									style : 'margin-left: 250px;margin-top:20px',
									width : 90  ,
									  handler : function(self) {
									 	menu.showCardInformation(Ext.getCmp(_cardlist_p_client_name).getValue(),Ext.getCmp(_cardlist_p_client_account).getValue(),Ext.getCmp(_cardlist_p_client_card).getValue());
									 } 
								} ]
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
				columns : [ {
					header : 'contr_id',
					dataIndex : 'contr_id',
					sortable : true,
					hidden : true,
					width : 35
				}, {
					header : '������',
					dataIndex : 'client_name',
					sortable : true,
					width : 80,
	                renderer: function (value, p, record) {
									return String.format('<b><a onclick="menu.showCardInformation(\'{1}\');" href="#">{0}</a></b>',value, record.data['client_name']);
				                }
				}, {
					header : '��� �����',
					dataIndex : 'card_type',
					sortable : true,
					width : 40
				},{
					header : '���',
					dataIndex : 'contr_curr',
					sortable : true,
					width : 15
				},{
					header : '����� �',
					dataIndex : 'contr_number',
					sortable : true,
					width : 50,
	                renderer: function (value, p, record) {
					return String.format('<b><a onclick="menu.showFurtherFieldsCard(\'{1}\');" href="#">{0}</a></b>',
							value, record.data['contr_id']);
                }

				},{
					header : '���� ���',
					dataIndex : 'limit_info',
					sortable : true,
					width : 35
				}, {
					header : '������',
					dataIndex : 'amount_balance',
					sortable : true,
					width : 25
				}, {
					header : '����',
					dataIndex : 'amount_blocked',
					sortable : true,
					width : 25
				}, {
					header : '����',
					dataIndex : 'amount_available',
					sortable : true,
					width : 25
				},  {
					header : '���� ��',
					dataIndex : 'date_expire',
					sortable : true,
					width : 35
				},{
					header : '������',
					dataIndex : 'status',
					sortable : true,
					width : 30
				}, {
					header : 'is_expired',
					dataIndex : 'is_expired',
					sortable : true,
					hidden : true,
					width : 30
				}, {
					header : 'rbs_number',
					dataIndex : 'rbs_number',
					sortable : true,
					hidden:true,
					width : 30
				}, {
					header : 'show_fin',
					dataIndex : 'show_fin',
					sortable : true,
					hidden : true,
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
		id : 'view-card-list-component',
		title : '������ ����',
		closable : true,
		frame : true,
		layout : 'border',
		items : [ filterForm, grid ], 
		loadData : function(data) {  
	    	this.setTitle("������ ����");        	
	    	this.data = data;
	        	store.loadData(data);
	        	Ext.getCmp(_cardlist_p_client_name).setValue(data['cardlist_p_client_name']); 
	         	Ext.getCmp(_cardlist_p_client_account).setValue(data['cardlist_p_client_account']);
	        	Ext.getCmp(_cardlist_p_client_card).setValue(data['cardlist_p_client_card']);
	    }  
	});
})();
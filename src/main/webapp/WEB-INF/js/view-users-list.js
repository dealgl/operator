/**
 * @author mikluha 
 * Created 2013-06-26 
 */

(function() {

	 var _p_user_name = Ext.id();
	 var store = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'portalUsersList',
			fields : [ 'user_id','user_name', 'office_name', 'group_sname',
					'infunit_name', 'status'  ]
		})
	});

	var filterForm = new Ext.form.FormPanel(
			{
				region : 'north',
				height : 160,
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
								{	id :_p_user_name,
									xtype : 'textfield',
									fieldLabel : 'ĸ� ������������',
									width : 200,
									allowBlank : true,
									name : 'p_user_name'
								},
								{
									xtype : 'button',
									text : '�����',
									style : 'margin-left: 250px;margin-top:20px',
									width : 90  ,
									  handler : function(self) {
									 	menu.showUsersList(Ext.getCmp(_p_user_name).getValue());
									 } 
								},
								{
									xtype : 'button',
									text : '�������� ������������',
									style : 'margin-left: 250px;margin-top:20px',
									width : 90  ,
									  handler : function(self) {
									 	menu.showUserCardRegisterForm();
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
					header : 'user_id',
					dataIndex : 'user_id',
					sortable : true,
					hidden : true,
					width : 35
				}, {
					header : 'ĸ�',
					dataIndex : 'user_name',
					sortable : true,
					width : 80,
	                renderer: function (value,p,record) {
	                	 return String.format('<b><a onclick="menu.showUserCardEditForm(\'{1}\');" href="#">{0}</a></b>',value,record.data['user_id']);
		                } 
				}, {
					header : '����',
					dataIndex : 'office_name',
					sortable : true,
					width : 40
				},{
					header : '������',
					dataIndex : 'group_sname',
					sortable : true,
					width : 40
				},{
					header : '���������� ��������',
					dataIndex : 'infunit_name',
					sortable : true,
					width : 15
				},{
					header : '������',
					dataIndex : 'status',
					sortable : true,
					width : 50 
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
		id : 'view-users-list-component',
		title : '������ �������������',
		closable : true,
		frame : true,
		layout : 'border',
		items : [ filterForm, grid ], 
		loadData : function(data) {  
	    	this.setTitle("������ �������������");        	
	    	this.data = data;
	        	store.loadData(data);
	        	if (data['p_user_name'] != 'asdftgddsfasdd')
	        		{
	        			Ext.getCmp(_p_user_name).setValue(data['p_user_name']); 
	        		};																
	    }  
	});
})();
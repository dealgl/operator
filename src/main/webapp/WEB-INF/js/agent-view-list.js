/**
 * author den 
 **/

(function() {

	// var _date = Ext.id();  
	// var _date2 = Ext.id();

	var store = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'accTransferList',
			fields : [ 'trans_date', 'operation_name',
					'trans_curr', 'contract_name', 'contract_number',
					'trans_amount', 'trans_details', 'result' ]
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
								{
									xtype : 'textfield',
									fieldLabel : 'Название контракта',
									width : 200,
									allowBlank : true,
									name : 'pcontractname'
								},
								{
									xtype : 'textfield',
									fieldLabel : 'Номер контракта',
									width : 200,
									allowBlank : true,
									name : 'pcontractnumber'

								},
								{
									xtype : 'textfield',
									fieldLabel : 'Сумма операции',
									width : 200,
									allowBlank : true,
									name : 'ptransamount'

								},
								{
									xtype : 'button',
									text : 'Поиск',
									style : 'margin-left: 250px;margin-top:20px',
									width : 90,
									handler : function(self) {
										
										 filterForm
												.getForm()
												.submit(
														{
															url : 'webservices/account-transfer-list-main.html',
															waitMsg : 'Выборка данных...',
															timeout : 60000,
															success : function(
																	form,
																	action) {
																grid
																		.getStore()
																		.loadData(
																				Ext
																						.decode(action.response.responseText));
															},
															failure : function(
																	form,
																	action) {
																if (action.failureType == 'server') {
																	var answer = Ext
																			.decode(action.response.responseText);
																	if (answer.code == 'login') {
																		App.ui
																				.sessionExpired();
																	} else {
																		App.ui
																				.error(answer.message);
																	}
																} else if (action.failureType == 'connect') {
																	App.ui
																			.error('connect');
																} else if (action.failureType == 'client') {
																	App.ui
																			.error(
																					'client',
																					filterForm
																							.getForm()
																							.invalidList());
																} else {
																	App.ui
																			.error('other');
																}
															}

														}); 
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
				columns : [ 
				{
					header : 'Дата и время',
					dataIndex : 'trans_date',
					sortable : true,
					width : 35
				}, 
				{
					header : 'Клиент',
					dataIndex : 'contract_name',
					sortable : true,
					width : 35
				}, 
				{
					header : 'Операция',
					dataIndex : 'operation_name',
					sortable : true,
					width : 35
				}, 
				{
					header : 'Контракт №', 
					dataIndex : 'contract_number',
					sortable : true,
					width : 35,
					renderer: function (value, p, record) {
	                	return String.format('<b><a onclick="menu.showCardInformation(null,\'{1}\',null);" href="#">{0}</a></b>',value, record.data['contract_number']);
				}
				}, 
				{
					header : 'Сумма',
					dataIndex : 'trans_amount',
					sortable : true,
					width : 35
				}, 
				{
					header : 'Вал',
					dataIndex : 'trans_curr',
					sortable : true,
					width : 35
				}, 
				{
					header : 'Примечание',
					dataIndex : 'trans_details',
					sortable : true,
					width : 35
				}, 
				{
					header : 'Результат',
					dataIndex : 'result',
					sortable : true,
					width : 35
				}

				],
				viewConfig : new Ext.grid.GroupingView(
						{
							forceFit : true,
							groupTextTpl : '{group}<span style="font-size: xx-small">(Всего: {[values.rs.length]})</span>',
							emptyText : 'Записи не найдены',
							enableGroupingMenu : false,
							startCollapsed : true
						})
			});

	return new Ext.Panel( {
		id : 'account-transfer-list-component',
		title : 'Список карт',
		closable : true,
		frame : true,
		layout : 'border',
		items : [ filterForm, grid ],
		/*loadData : function(data) {  
	    	this.setTitle("Список карт");        	
	    	this.data = data;
	        	store.loadData(data);
	    }*/
 
		afterDataLoaded : function() {
			grid.getStore().removeAll();
		} 
	});
})();
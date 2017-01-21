/**
 * author ikram 
  */

(function() { 
	var _date_from = Ext.id();
	var _date_to = Ext.id();
	var _overdate = Ext.id();
	var _judicdate = Ext.id();
 	var store = new Ext.data.GroupingStore({
		autoDestroy : true,
		reader : new Ext.data.JsonReader({
			root : 'collectionList',
			fields : [ 'oper_date_open','oper_date_close','oper_type','oper_comment','oper_officer']
										})
		}); 

		var filterForm = new Ext.form.FormPanel(
			{
				region : 'north',
				height : 160,
				labelWidth : 40,
				style : 'padding:5px;',
				items : [ 
				          {
					xtype : 'panel',
					layout : 'fit',
					width : 756,
					height : 150,
					items : [ {
						xtype : 'fieldset',
						border : false,
						layout : 'column',   
						autoHeight : true,
						items : [
								{
									xtype : 'label',
									text :'Период с     ',
									style : 'margin-top: 5px' 
						     	},
						     	{
									id : _date_from,
						     		xtype : 'datefield',
									format : 'd.m.Y',
									fieldLabel : 'Период с ',
									name : 'dateStart',
									allowBlank : false
								},
								{
									xtype : 'label',
									style : 'margin-left: 15px;margin-top: 5px',
									text :'     по     '
						     	},
								{
									id :_date_to,
						     		xtype : 'datefield',
									format : 'd.m.Y',
									fieldLabel : ' по ',
									name : 'dateEnd',
									allowBlank : false
								},
								{
									xtype : 'button',
									text : 'Обновить',
									style : 'margin-left: 20px',
									handler : function(self) {
										
										filterForm
												.getForm()
												.submit(
														{
															url : 'webservices/collection-list-main.html',
															waitMsg : 'Выборка данных...', 
															timeout : 60000,
															params : {
																		card_id : data['card_id'],
																		date_from : Ext.getCmp(_date_from).getRawValue(),  
																		date_to : 	Ext.getCmp(_date_to).getRawValue()/*,
																		auth_status : "http://192.168.68.104:6666/xmlpserver/UPK/PUBLIC/COLLECTION/OverdueDebtCardLetter/OverdueDebtCardLetter.xdo?id=tech&passwd=tech1&_xmode=4&xdo_BI_XF=rtf&_xf=rtf&_xpt=1&scs_number="//+rbs_number+"&report_date="+Ext.getCmp(_overdate).getRawValue()+"&lower_limit=1&upper_limit=100000"
																		*/
																	},
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
								}
								]
					},
				    {
			        	 xtype : 'fieldset',
			        	 border : false,
			        	 layout : 'column',
			        	 autoHeight : true,
			        	 items : [
			                        {
								    	xtype : 'label',
								    	text :'Уведомление о наличии просроченной задолженности на ',
										style : 'margin-top: 5px'
			                        },
			                        {
										id : _overdate,
							     		xtype : 'datefield',
										format : 'd.m.Y',
										fieldLabel : 'Период с ',
										name : 'overdate',
										allowBlank : false
									},
			                        
									{
										xtype : 'button',
										text : 'Печать',
										style : 'margin-left: 20px',
										handler : function(self) {
			                        	window.open(String.format("http://192.168.68.104:6666/xmlpserver/UPK/PUBLIC/COLLECTION/OverdueDebtCardLetter/OverdueDebtCardLetter.xdo?id=tech&passwd=tech1&_xmode=4&xdo_BI_XF=rtf&_xf=rtf&_xpt=1&scs_number="+data['rbs_number']+"&report_date="+Ext.getCmp(_overdate).getRawValue()+"&lower_limit=1&upper_limit=100000")); 
 			                        	container.window.close();

												}
									} 
			     		          ]
			         },
				    {
			        	 xtype : 'fieldset',
			        	 border : false,
			        	 layout : 'column',
			        	 autoHeight : true,
			        	 items : [
			                        
									{
								    	xtype : 'label',
								    	text :'Предсудебное уведомление о наличии просроченной задолженности ',
										style : 'margin-top: 5px'
			                        },
			                        {
									    id : _judicdate,
							     		xtype : 'datefield',
										format : 'd.m.Y',
										fieldLabel : 'Период с ',
										name : 'judicdate',
										allowBlank : false
									},
									{
										xtype : 'button',
										text : 'Печать',
										style : 'margin-left: 20px',
										handler : function(self) {
			                        	window.open(String.format("http://192.168.68.104:6666/xmlpserver/UPK/PUBLIC/COLLECTION/JudicalOverdueDebtCardLetter/JudicalOverdueDebtCardLetter.xdo?id=tech&passwd=tech1&_xmode=4&xdo_BI_XF=rtf&_xf=rtf&_xpt=1&scs_number="+data['rbs_number']+"&report_date="+Ext.getCmp(_judicdate).getRawValue()+"&lower_limit=1&upper_limit=100000")); 
 			                        	container.window.close();

												}
									}
			     		          ]
			         } 

					]
				}
				]
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
					header : 'Дата открытия',
					dataIndex : 'oper_date_open',
					sortable : true,
					width : 30
				},
	           {
					header : 'Дата закрытия',
					dataIndex : 'oper_date_close',
					sortable : true,
					width : 30
				},
				{
					header : 'Тип операции',
					dataIndex : 'oper_type',
					sortable : true,
					width : 30
				},
				{
					header : 'Комментарий',
					dataIndex : 'oper_comment',
					sortable : true,
					width : 80 
                
				},
				{
					header : 'Оператор',
					dataIndex : 'oper_officer',
					sortable : true,
					width : 20
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
		id : 'view-collection-list-component',
		title : 'Начисление процентов на задолженность',
		closable : true,
		frame : true,
		layout : 'border',
		items : [ filterForm, grid ],
        loadData : function(data) {  
    	this.setTitle("Начисление процентов на задолженность");        	
    	this.data = data;
        	store.loadData(data);
            Ext.getCmp(_date_from).setValue(data['date_from']);
            Ext.getCmp(_date_to).setValue(data['date_to']);
            Ext.getCmp(_judicdate).setValue(data['date_to']);
            Ext.getCmp(_overdate).setValue(data['date_to']);
              
    }

		
	});
} ) ();
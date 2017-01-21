/**
 * author ikram 
 * modify by den
 */

(function() { 

	var _dateS = Ext.id();
	var _dateE = Ext.id();
	var _period = Ext.id();
	var _limit_info = Ext.id();
	var _end_bal = Ext.id();
	var _begin_bal = Ext.id();
	var _blocked = Ext.id();
	var _available = Ext.id();
	var _transfer_minus = Ext.id();
	var _client_name = Ext.id();
	var _user_message = Ext.id();
	var _rbs_number = Ext.id();
	var _rbs_curr = Ext.id();
	var _contract_name = Ext.id();
	var _transfer_plus = Ext.id();
	var userId;
	
	var store = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'furtherInfoCard',
			fields : [ 'trans_date','posting_date','fee_amount','trans_amount',
			           'account_amount','trans_curr','trans_descr','doc_id']
		})
	});

	var filterForm = new Ext.form.FormPanel(
			{
				region : 'north',
				height : 160,
				labelWidth : 40,
				style : 'padding:5px;',
				items : [ {
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
									text :'Выписка за период с '
						     	},
						     	{
									id : _dateS,
						     		xtype : 'datefield',
									format : 'd.m.Y',
									fieldLabel : 'Выписка за период с ',
									name : 'dateStart',
									allowBlank : false
								},
								{
									xtype : 'label',
									text :'  по '
						     	},
								{
									id :_dateE,
						     		xtype : 'datefield',
									format : 'd.m.Y',
									fieldLabel : ' по ',
									name : 'dateEnd',
									allowBlank : false
								},
								{
									xtype : 'button',
									text : 'Выписка',
									style : 'margin-left: 20px',
									handler : function(self) {
										menu.showAbstractOfCard(data['contr_id'],'C',Ext.getCmp(_dateS).getRawValue(),Ext.getCmp(_dateE).getRawValue());  
									}
								}, 
								
								{
									xtype : 'button',
									text : '   Печать',
									icon :'/portal/img/print.gif',
									style : 'margin-left: 10px',
									handler : function(self) {
										window.open(String.format("http://192.168.68.104:6666/xmlpserver/UPK/PUBLIC/COLLECTION/CardTransactionListPrint/CardTransactionListPrint.xdo?id=tech&passwd=tech1&_xmode=4&xdo_BI_XF=rtf&_xf=rtf&_xpt=1&p_user_id="+userId+"&p_date_from="+Ext.getCmp(_dateS).getRawValue()+"&p_date_to="+Ext.getCmp(_dateE).getRawValue()+"&p_contr_type=C&p_contr_id="+data['contr_id'])); 
 			                        	container.window.close();
		                        	}
								},
								{
									xtype : 'button',
									text : '   Сохранение в файле',
									style : 'margin-left: 10px',
									icon :'/portal/img/save.gif',
									handler : function(self) {
		                        	}
								}
								
								
								]
					},
				    {
			        	 xtype : 'fieldset',
			        	 border : false,
			        	 layout : 'table',
			        	 autoHeight : true,
			        	 defaults: {
			                    style: {
			                        padding: '10px'
			                    }
			                },
			             layoutConfig: {
			                    columns : 8
			                },
			        	 items : [
			                        {
								    	xtype : 'label',
								    	
								    	text :'Кредитный лимит'
			                        },
			                        {
			                            id : _limit_info,
			                        	xtype: 'displayfield',
			                        	style : 'color:#3764A0;font-weight:bold;font-size:11px',
			                            cls: 'z-title',
			                            name : 'limit_info'
			                        },
			                        
			                        {
								    	xtype : 'label',
								    	text :'Входящий остаток'
			                        },
			                        
			                        {
			                            id : _begin_bal,
			                        	xtype: 'displayfield',
			                            cls: 'z-title',
			                            style : 'color:#3764A0;font-weight:bold;font-size:11px',
			                            name : 'begin_bal'
			                        },
			                        {
								    	xtype : 'label',
								    	text :'Расходов за период'
			                        },
			                        
			                        {
			                            id : _transfer_minus,
			                        	xtype: 'displayfield',
			                            cls: 'z-title',
			                            style : 'color:#3764A0;font-weight:bold;font-size:11px',
			                            name : 'transfer_minus'
			                        },
									
			                        {
								    	xtype : 'label',
								    	text :'Поступления за период'
			                        },
			                        {
			                            id : _transfer_plus,
			                        	xtype: 'displayfield',
			                            cls: 'z-title',
			                            style : 'color:#3764A0;font-weight:bold;font-size:11px',
			                            name : 'incoming'
			                        },
			                        {
								    	xtype : 'label',
								    	text :'Исходящий остаток'
			                        },
			                        {
			                            id : _end_bal,
			                        	xtype: 'displayfield',
			                            cls: 'z-title',
			                            style : 'color:#3764A0;font-weight:bold;font-size:11px',
			                            name : 'end_bal'
			                        },
			                        {
								    	xtype : 'label',
								    	text :'Заблокировано'
			                        },
			                        {
			                            id: _blocked,
			                        	xtype: 'displayfield',
			                            cls: 'z-title',
			                            style : 'color:#3764A0;font-weight:bold;font-size:11px',
			                            name : 'blocked'
			                        },
			                        {
								    	xtype : 'label',
								    	text :'Доступно'
			                        },
			                        {
			                            id : _available,
			                        	xtype: 'displayfield',
			                            cls: 'z-title',
			                            style : 'color:#3764A0;font-weight:bold;font-size:11px',
			                            name : 'available'
			                        }
			                        
			     		          ]
			         },
			         {
							xtype : 'fieldset',
							border : true,
							layout : 'table',
							autoHeight : true,
							 defaults: {
			                    style: {
			                        padding: '20px'
			                    }
			                },
			             layoutConfig: {
			                    columns : 6
			                },
							items : [
							         	{
									    	xtype : 'label',
									    	text :'Держатель карточки'
				                        },
				                        {
				                            id : _client_name,
				                        	xtype: 'displayfield',
				                            cls: 'z-title',
				                            style : 'color:#3764A0;font-weight:bold;font-size:11px',
				                            name : 'client_name'
				                        },
							         	{
									    	xtype : 'label',
									    	text :'Валюта счета'
				                        },
				                        {
				                            id : _rbs_curr,
				                        	xtype: 'displayfield',
				                            cls: 'z-title',
				                            style : 'color:#3764A0;font-weight:bold;font-size:11px',
				                            name : 'client_name'
				                        },
							         	{
									    	xtype : 'label',
									    	text :'Счет №'
				                        },
				                        {
				                            id : _rbs_number,
				                        	xtype: 'displayfield',
				                            cls: 'z-title',
				                            style : 'color:#3764A0;font-weight:bold;font-size:11px',
				                            name : 'client_name'
				                        }
							         ]
			         
			         }
					]
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
								header : 'ИД документа',
								dataIndex : 'doc_id',
								sortable : true,
								hidden : true,
								width : 30
							},
	           {
					header : 'Дата операции',
					dataIndex : 'trans_date',
					sortable : true,
					width : 30
				},
				{
					header : 'Дата проводки',
					dataIndex : 'posting_date',
					sortable : true,
					width : 30
				},
				{
					header : 'Содержание операции',
					dataIndex : 'trans_descr',
					sortable : true,
					width : 80,
	                renderer: function (value, p, record) {
                	return String.format('<b><a onclick="menu.showTransInformation(\'{1}\');" href="#">{0}</a></b>',value, record.data['doc_id']);
                }
				},
				{
					header : 'Валюта',
					dataIndex : 'trans_curr',
					sortable : true,
					width : 20
				},
				{
					header : 'Сумма в валюте операции',
					dataIndex : 'trans_amount',
					sortable : true,
					width : 50
				}, 
				{
					header : 'Сумма в валюте счета',
					dataIndex : 'account_amount',
					sortable : true,
					width : 50
				},
				{
					header : 'Коммисия',
					dataIndex : 'fee_amount',
					sortable : true,
					width : 25
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
		id : 'view-abstract-card-info-component',
		title : 'Выписка по карте',
		closable : true,
		frame : true,
		layout : 'border',
		items : [ filterForm, grid ],

		/*afterDataLoaded : function() {
			grid.getStore().removeAll();
		}*/
        loadData : function(data) { 
    	this.setTitle("Выписка по карте");        	
    	this.data = data;
        	store.loadData(data);
        	
             Ext.getCmp(_limit_info).setValue(data['headInfoCard'][0]['limit_info']);
             Ext.getCmp(_end_bal).setValue(data['headInfoCard'][0]['end_bal']);
             Ext.getCmp(_begin_bal).setValue(data['headInfoCard'][0]['begin_bal']);
             Ext.getCmp(_blocked).setValue(data['headInfoCard'][0]['blocked']);
             Ext.getCmp(_available).setValue(data['headInfoCard'][0]['available']);
             Ext.getCmp(_transfer_minus).setValue(data['headInfoCard'][0]['transfer_minus']);
             Ext.getCmp(_transfer_plus).setValue(data['headInfoCard'][0]['transfer_plus']);
           
             Ext.getCmp(_dateE).setValue(data['dateEnd']);
             Ext.getCmp(_dateS).setValue(data['dateStart']);
             //Ext.getCmp(_period).setValue(data['dateStart']+"-"+data['dateEnd']);
              Ext.getCmp(_client_name).setValue(data['headInfoCard'][0]['client_name']);
             //Ext.getCmp(_user_message).setValue(data['headInfoCard'][0]['user_message']);
            Ext.getCmp(_rbs_number).setValue(data['headInfoCard'][0]['rbs_number']);
            Ext.getCmp(_rbs_curr).setValue(data['headInfoCard'][0]['rbs_curr']);
            userId = data['userId'];
            // Ext.getCmp(_contract_name).setValue(data['headInfoCard'][0]['contract_name']);
    }

		
	});
})();
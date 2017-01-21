/**
 * @author ��� 
 * Created 2013-08-09
 */

(function() {

	var _date_to = Ext.id();
	var _date_from = Ext.id();
	var index=0;
	

 	var store = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'listResume',
			fields : [ 'id','fio','direction','recruter','phone',
			           'skype','mark','url','district','date_colloquy','autocall']
		})
	});

 	var storeAutoCall = new Ext.data.Store( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'listAutoCallResume',
			fields : [ 'id','fio']
		})
	});
 	
 	
 	
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect:false
	});
 	
	var pics = {
	        p82: 'style="background: url(img/vwicn082.gif) no-repeat center transparent;"'
   };
	
	var executeCall = function(index) {
		
		if (index>=data['storeSize']){
			App.ui.error('������� ������ ������');								
			return;
		}
		
		var item = storeAutoCall.getAt(index);
		//alert(item);
		var idr = item.data.id;
		//alert(idr);
		Ext.Ajax.request( {
			url : 'resume/get-auto-call-session.html',
			params : {
				idr : idr
			},
			timeout : 10 * 60 * 1000, // 10 min
			waitMsg : '����������� ����������',
			success : function(xhr) {
				var answer = Ext.decode(xhr.responseText);
				if (answer.success) {
					index = index+1;
					menu.showResumeInfo(idr);
					executeCall(index);
		} else if (answer.code == 'login') {
			App.ui.sessionExpired();
		} else {
			App.ui.error('��������� ������ �������', answer.message);
		}
	},
	failure : function() {
		App.ui.error('������ ����������');
	}
		});
	
	}
		
	
	var filterForm = new Ext.form.FormPanel(
			{
				region : 'north',
				height : 210,
				labelWidth : 140,
				style : 'padding:5px;',
				items : [ {
					xtype : 'panel',
					layout : 'fit',
					width : 450,
					height : 140,
					items : [ {
						xtype : 'fieldset',
						border : false,
						items : [
								{
									id:_date_from,
						     		xtype : 'datefield',
									format : 'd.m.Y',
									fieldLabel : '���� �������� �',
									name : 'date_from',
									allowBlank : false
								},
								{
									id:_date_to,
						     		xtype : 'datefield',
									format : 'd.m.Y',
									fieldLabel : '���� �������� ��',
									name : 'sms_date_to',
									allowBlank : false
								},
								{
									xtype : 'button',
									text : '��������� �� �������� �����',
									style : 'margin-left: 5px',
									width : 90,
									handler : function(self) {
									 menu.showImportDealForm();
									//		menu.showCandidateSheets(Ext.getCmp(_date_from).getRawValue(),Ext.getCmp(_date_to).getRawValue(),Ext.getCmp(_district).getValue());  
								}},
								
								
								
								/*

								{
											xtype : 'button',
											text : '������� ���������� ������',
											style : 'margin-left: 250px;margin-top:5px',
											width : 90,
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
															title : '����������',
															msg : '���������� ��������� ������� ������ ��� ��������!',
															buttons : Ext.MessageBox.OK,
															icon : Ext.MessageBox.INFO
														});
											} else  {
													
												Ext.Ajax.request( {
													url : 'resume/delete-resume.html',
													params : {
														ids : ids
													},
													timeout : 10 * 60 * 1000, // 10 min
													waitMsg : '����������� ������ � ����',
													success : function(xhr) {
														var answer = Ext.decode(xhr.responseText);
														if (answer.success) {
															Ext.MessageBox.show( {
																title : '����������',
																msg : '��������� ������ �������!',
																buttons : Ext.MessageBox.OK,
																icon : Ext.MessageBox.INFO
															});
															menu.showCandidateSheets();
															//container.loadData(answer);
												} else if (answer.code == 'login') {
													App.ui.sessionExpired();
												} else {
													App.ui.error('��������� ������ �������', answer.message);
												}
											},
											failure : function() {
												App.ui.error('������ ����������');
											}
												});
												} 
											
								}},
								{
									xtype : 'button',
									text : '������� ����������',
									style : 'margin-left: 250px;margin-top:5px',
									width : 90,
									handler : function(self) {
									var rec;
									var idr;
									store.each(function(item){
										rec = item.data.autocall;
										if (rec==1){ 
											idr=item.data.id;
											Ext.Ajax.request( {
												url : 'resume/invoke-auto-call.html',
												params : {
													idr : idr
												},
												timeout : 10 * 60 * 1000, // 10 min
												waitMsg : '����������� ����������',
												success : function(xhr) {
													var answer = Ext.decode(xhr.responseText);
													if (answer.success) {
														menu.showResumeInfo(idr);
														//menu.showCandidateSheets();
											} else if (answer.code == 'login') {
												App.ui.sessionExpired();
											} else {
												App.ui.error('��������� ������ �������', answer.message);
											}
										},
										failure : function() {
											App.ui.error('������ ����������');
										}
											});
											
										}	
									});
								}},
								{
									xtype : 'button',
									text : '���������� ������� ����-�������',
									style : 'margin-left: 250px;margin-top:5px',
									width : 90,
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
													title : '����������',
													msg : '���������� ��������� ������� ������ ��� ��������� ��������!',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.INFO
												});
									} else  {
											
										Ext.Ajax.request( {
											url : 'resume/set-auto-call-array.html',
											params : {
												ids : ids
											},
											timeout : 10 * 60 * 1000, // 10 min
											waitMsg : '����������� ������ � ����',
											success : function(xhr) {
												var answer = Ext.decode(xhr.responseText);
												if (answer.success) {
													Ext.MessageBox.show( {
														title : '����������',
														msg : '��������� ������ �������!',
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
													});
													menu.showCandidateSheets();
													//container.loadData(answer);
										} else if (answer.code == 'login') {
											App.ui.sessionExpired();
										} else {
											App.ui.error('��������� ������ �������', answer.message);
										}
									},
									failure : function() {
										App.ui.error('������ ����������');
									}
										});
										} 
									
						}}
						*/

										
										
										
										]
					}
					/*,
					{
						xtype : 'fieldset',
						border : false,
						items : [
						         
{
	xtype : 'button',
	text : '������� ������� ����-�������',
	style : 'margin-left: 250px;margin-top:5px',
	width : 90,
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
					title : '����������',
					msg : '���������� ��������� ������� ������!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO
				});
	} else  {
			
		Ext.Ajax.request( {
			url : 'resume/del-auto-call-array.html',
			params : {
				ids : ids
			},
			timeout : 10 * 60 * 1000, // 10 min
			waitMsg : '����������� ������ � ����',
			success : function(xhr) {
				var answer = Ext.decode(xhr.responseText);
				if (answer.success) {
					Ext.MessageBox.show( {
						title : '����������',
						msg : '��������� ������ �������!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					menu.showCandidateSheets();
		} else if (answer.code == 'login') {
			App.ui.sessionExpired();
		} else {
			App.ui.error('��������� ������ �������', answer.message);
		}
	},
	failure : function() {
		App.ui.error('������ ����������');
	}
		});
		} 
	
}}
						         
						         
						         
						         ]
					}*/
					]
				},
				
				{
					xtype : 'panel',
					width : 900,
					height : 50,
					items : [ {
						xtype : 'fieldset',
						border : false,
						layout : 'column',	
						items : [
{
	xtype : 'button',
	text : '������������ ������',
	style : 'margin-left: 5px',
	width : 90,
	handler : function(self) {
		menu.showCandidateSheetsExt();  
}},
{
	xtype : 'button',
	text : '������� ���������� ������',
	style : 'margin-left: 5px',
	width : 90,
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
					title : '����������',
					msg : '���������� ��������� ������� ������ ��� ��������!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO
				});
	} else  {
			
		Ext.Ajax.request( {
			url : 'resume/delete-resume-ext.html',
			params : {
				ids : ids
			},
			timeout : 10 * 60 * 1000, // 10 min
			waitMsg : '����������� ������ � ����',
			success : function(xhr) {
				var answer = Ext.decode(xhr.responseText);
				if (answer.success) {
					Ext.MessageBox.show( {
						title : '����������',
						msg : '��������� ������ �������!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					menu.showCandidateSheetsExt();
					//container.loadData(answer);
		} else if (answer.code == 'login') {
			App.ui.sessionExpired();
		} else {
			App.ui.error('��������� ������ �������', answer.message);
		}
	},
	failure : function() {
		App.ui.error('������ ����������');
	}
		});
		} 
	
}},
{
	xtype : 'button',
	text : '���������� ������� ����-�������',
	style : 'margin-left:5px',
	width : 90,
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
					title : '����������',
					msg : '���������� ��������� ������� ������ ��� ��������� ��������!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO
				});
	} else  {
			
		Ext.Ajax.request( {
			url : 'resume/set-auto-call-array-ext.html',
			params : {
				ids : ids
			},
			timeout : 10 * 60 * 1000, // 10 min
			waitMsg : '����������� ������ � ����',
			success : function(xhr) {
				var answer = Ext.decode(xhr.responseText);
				if (answer.success) {
					Ext.MessageBox.show( {
						title : '����������',
						msg : '��������� ������ �������!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					menu.showCandidateSheetsExt();

		} else if (answer.code == 'login') {
			App.ui.sessionExpired();
		} else {
			App.ui.error('��������� ������ �������', answer.message);
		}
	},
	failure : function() {
		App.ui.error('������ ����������');
	}
		});
		} 
	
}},
{
	xtype : 'button',
	text : '������� ������� ����-�������',
	style : 'margin-left: 5px',
	width : 90,
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
					title : '����������',
					msg : '���������� ��������� ������� ������!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO
				});
	} else  {
			
		Ext.Ajax.request( {
			url : 'resume/del-auto-call-array-ext.html',
			params : {
				ids : ids
			},
			timeout : 10 * 60 * 1000, // 10 min
			waitMsg : '����������� ������ � ����',
			success : function(xhr) {
				var answer = Ext.decode(xhr.responseText);
				if (answer.success) {
					Ext.MessageBox.show( {
						title : '����������',
						msg : '��������� ������ �������!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					menu.showCandidateSheetsExt();
		} else if (answer.code == 'login') {
			App.ui.sessionExpired();
		} else {
			App.ui.error('��������� ������ �������', answer.message);
		}
	},
	failure : function() {
		App.ui.error('������ ����������');
	}
		});
		} 
	
}},

{
	xtype : 'button',
	text : '������� ����������',
	style : 'margin-left: 15px',
	width : 90,
	handler : function(self) {
	
		App.ui.executeExtCall(0,storeAutoCall.getCount(),storeAutoCall);
		
		}
}

						         ]
					}]
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
				           	new Ext.grid.RowNumberer({width: 20}),
				           	sm,
	            {
					header : 'ĸ�',
					dataIndex : 'fio',
					sortable : true,
					width : 100,
					
					renderer : function(value, meta, record) {
						return String.format('<b><a href="#" onclick="menu.showExtResumeInfo(\'{1}\');">{0}</a></b>',value, record['id']);
					}

					
				},
				{
					header : '��������',
					dataIndex : 'direction',
					sortable : true,
					width :100 
				},
				{
					header : '����-������',
					dataIndex : 'autocall',
					sortable : true,
					width : 30, 
					renderer: function (value, meta, record) {							
						if(value==1){
							meta.attr = pics.p82;									 
						}	
					}
				},
				{
					header : '�����',
					dataIndex : 'district',
					sortable : true,
					width : 50 
				},
				/*{
					header : '���� �������������',
					dataIndex : 'date',
					sortable : true,
					width : 40
				},*/
				{
					header : '��������',
					dataIndex : 'recruter',
					sortable : true,
					width : 80
				},
				{
					header : '����� ��������',
					dataIndex : 'phone',
					sortable : true,
					width : 80
				},
				{
					header : '����� ������',
					dataIndex : 'skype',
					sortable : true,
					width : 80
				},
				{
					header : '���� ������',
					dataIndex : 'date_colloquy',
					sortable : true,
					width : 80
				},
				{
					header : '������',
					dataIndex : 'mark',
					sortable : true,
					width : 10
				},
				{
					header : '������ �� CV',
					dataIndex : 'url',
					sortable : true,
					width : 80,
					renderer : function(value, meta, record) {
						return String.format('<b><a href="#" onclick="menu.showCandidateUrl(\'{1}\');">{0}</a></b>',value,value/*, record['id']*/);
					}
				}
				
				],
				sm : sm,
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
		id : 'view-params-resume-form-ext-component',
		title : '������ ���������� �� �����',
		closable : true,
		frame : true,
		layout : 'border',
		items : [ filterForm , grid ], 
		loadData : function(data) {  
	    	this.setTitle("������ ���������� �� �����");        	
	    	this.data = data;
	    	store.loadData(data);
	    	storeAutoCall.loadData(data); 
	        Ext.getCmp(_date_from).setValue(data['date_from']);
	        Ext.getCmp(_date_to).setValue(data['date_to']);
	        
	    }    
	});
})();
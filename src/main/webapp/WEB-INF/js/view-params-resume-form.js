/**
 * @author вут 
 * Created 2013-08-09
 */

(function() {

	var _date_to = Ext.id();
	var _date_from = Ext.id();
	var _district = Ext.id();
	var _vacancy = Ext.id();
	var index=0;
	

 	var store = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'listResume',
			fields : [ 'id','fio','autocall','job','birth_date','status','comment','address','date','date_update']
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
			App.ui.error('Звонить больше некому');								
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
			waitMsg : 'Выполняется автодозвон',
			success : function(xhr) {
				var answer = Ext.decode(xhr.responseText);
				if (answer.success) {
					index = index+1;
					menu.showResumeInfo(idr);
					executeCall(index);
		} else if (answer.code == 'login') {
			App.ui.sessionExpired();
		} else {
			App.ui.error('Внутрення ошибка сервера', answer.message);
		}
	},
	failure : function() {
		App.ui.error('Сервер недоступен');
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
									fieldLabel : 'Дата загрузки с',
									name : 'date_from',
									allowBlank : false
								},
								{
									id:_date_to,
						     		xtype : 'datefield',
									format : 'd.m.Y',
									fieldLabel : 'Дата загрузки по',
									name : 'sms_date_to',
									allowBlank : false
								},
								{
									id:_district,
						     		xtype : 'textfield',
									fieldLabel : 'Город',
									name : 'district',
									allowBlank : true
								},
								 {
 									id : _vacancy,
 			                  		xtype : 'combo',
 									width : 150,
 									fieldLabel : 'Вакансии в КБ Пойдем',
 									mode : 'local',
 									hiddenName : 'SITE',
 									valueField : 'name',
 									displayField : 'name',
 									triggerAction : 'all',
 									typeAhead : true,
 									forceSelection : true,
 									selectOnFocus : true,
 									allowBlank : true,
 									emptyText : 'Вакансия в КБ Пойдем',
 									store : new Ext.data.ArrayStore({
 												fields : ['id', 'name'],
 												data : [
 														['0','фк'],
 														['1','као'],
 														['2','кассир'],
 														]
 											}),
 											listeners : {
 												select : function(combo, rec) {
 																				}
 														}
 								},

								
								
								
								/*{
									id:_vacancy,
						     		xtype : 'textfield',
									fieldLabel : 'Вакансия в КБ Пойдем!',
									name : 'vacancy',
									allowBlank : true
								}*/
								
								/*

								{
											xtype : 'button',
											text : 'Удалить отмеченные резюме',
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
															title : 'Информация',
															msg : 'Необходимо галочками выбрать данные для удаления!',
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
													waitMsg : 'Выполняется запрос к базе',
													success : function(xhr) {
														var answer = Ext.decode(xhr.responseText);
														if (answer.success) {
															Ext.MessageBox.show( {
																title : 'Информация',
																msg : 'Выбранные данные удалены!',
																buttons : Ext.MessageBox.OK,
																icon : Ext.MessageBox.INFO
															});
															menu.showCandidateSheets();
															//container.loadData(answer);
												} else if (answer.code == 'login') {
													App.ui.sessionExpired();
												} else {
													App.ui.error('Внутрення ошибка сервера', answer.message);
												}
											},
											failure : function() {
												App.ui.error('Сервер недоступен');
											}
												});
												} 
											
								}},
								{
									xtype : 'button',
									text : 'Прозвон кандидатов',
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
												waitMsg : 'Выполняется автодозвон',
												success : function(xhr) {
													var answer = Ext.decode(xhr.responseText);
													if (answer.success) {
														menu.showResumeInfo(idr);
														//menu.showCandidateSheets();
											} else if (answer.code == 'login') {
												App.ui.sessionExpired();
											} else {
												App.ui.error('Внутрення ошибка сервера', answer.message);
											}
										},
										failure : function() {
											App.ui.error('Сервер недоступен');
										}
											});
											
										}	
									});
								}},
								{
									xtype : 'button',
									text : 'Проставить признак авто-дозвона',
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
													title : 'Информация',
													msg : 'Необходимо галочками выбрать данные для установки признака!',
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
											waitMsg : 'Выполняется запрос к базе',
											success : function(xhr) {
												var answer = Ext.decode(xhr.responseText);
												if (answer.success) {
													Ext.MessageBox.show( {
														title : 'Информация',
														msg : 'Выбранные данные удалены!',
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
													});
													menu.showCandidateSheets();
													//container.loadData(answer);
										} else if (answer.code == 'login') {
											App.ui.sessionExpired();
										} else {
											App.ui.error('Внутрення ошибка сервера', answer.message);
										}
									},
									failure : function() {
										App.ui.error('Сервер недоступен');
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
	text : 'Удалить признак авто-дозвона',
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
					title : 'Информация',
					msg : 'Необходимо галочками выбрать данные!',
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
			waitMsg : 'Выполняется запрос к базе',
			success : function(xhr) {
				var answer = Ext.decode(xhr.responseText);
				if (answer.success) {
					Ext.MessageBox.show( {
						title : 'Информация',
						msg : 'Выбранные данные удалены!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					menu.showCandidateSheets();
		} else if (answer.code == 'login') {
			App.ui.sessionExpired();
		} else {
			App.ui.error('Внутрення ошибка сервера', answer.message);
		}
	},
	failure : function() {
		App.ui.error('Сервер недоступен');
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
	text : 'Сформировать список',
	style : 'margin-left: 5px',
	width : 90,
	handler : function(self) {
		menu.showCandidateSheets(Ext.getCmp(_date_from).getRawValue(),Ext.getCmp(_date_to).getRawValue(),Ext.getCmp(_vacancy).getValue(),Ext.getCmp(_district).getValue());  
}},
{
	xtype : 'button',
	text : 'Удалить отмеченные резюме',
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
					title : 'Информация',
					msg : 'Необходимо галочками выбрать данные для удаления!',
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
			waitMsg : 'Выполняется запрос к базе',
			success : function(xhr) {
				var answer = Ext.decode(xhr.responseText);
				if (answer.success) {
					Ext.MessageBox.show( {
						title : 'Информация',
						msg : 'Выбранные данные удалены!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					menu.showCandidateSheets();
					//container.loadData(answer);
		} else if (answer.code == 'login') {
			App.ui.sessionExpired();
		} else {
			App.ui.error('Внутрення ошибка сервера', answer.message);
		}
	},
	failure : function() {
		App.ui.error('Сервер недоступен');
	}
		});
		} 
	
}},
{
	xtype : 'button',
	text : 'Проставить признак авто-дозвона',
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
					title : 'Информация',
					msg : 'Необходимо галочками выбрать данные для установки признака!',
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
			waitMsg : 'Выполняется запрос к базе',
			success : function(xhr) {
				var answer = Ext.decode(xhr.responseText);
				if (answer.success) {
					Ext.MessageBox.show( {
						title : 'Информация',
						msg : 'Выбранные данные удалены!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					menu.showCandidateSheets();
					//container.loadData(answer);
		} else if (answer.code == 'login') {
			App.ui.sessionExpired();
		} else {
			App.ui.error('Внутрення ошибка сервера', answer.message);
		}
	},
	failure : function() {
		App.ui.error('Сервер недоступен');
	}
		});
		} 
	
}},
{
	xtype : 'button',
	text : 'Удалить признак авто-дозвона',
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
					title : 'Информация',
					msg : 'Необходимо галочками выбрать данные!',
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
			waitMsg : 'Выполняется запрос к базе',
			success : function(xhr) {
				var answer = Ext.decode(xhr.responseText);
				if (answer.success) {
					Ext.MessageBox.show( {
						title : 'Информация',
						msg : 'Выбранные данные удалены!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					menu.showCandidateSheets();
		} else if (answer.code == 'login') {
			App.ui.sessionExpired();
		} else {
			App.ui.error('Внутрення ошибка сервера', answer.message);
		}
	},
	failure : function() {
		App.ui.error('Сервер недоступен');
	}
		});
		} 
	
}},

{
	xtype : 'button',
	text : 'Прозвон кандидатов',
	style : 'margin-left: 15px',
	width : 90,
	handler : function(self) {
		App.ui.executeCall(0,storeAutoCall.getCount(),storeAutoCall);
	//executeCall(0);
	//alert(data['storeSize']);
	
	/*var rec;
	var idr;
	store.each(function(item){
		rec = item.data.autocall;
		if (rec==1){ 
			idr=item.data.id;
			//alert(idr);
			//alert(item.data.fio);
			Ext.Ajax.request( {
				url : 'resume/get-auto-call-session.html',
				params : {
					idr : idr
				},
				timeout : 10 * 60 * 1000, // 10 min
				waitMsg : 'Выполняется автодозвон',
				success : function(xhr) {
					var answer = Ext.decode(xhr.responseText);
					if (answer.success) {
						menu.showResumeInfo(idr);
						//menu.showCandidateSheets();
			} else if (answer.code == 'login') {
				App.ui.sessionExpired();
			} else {
				App.ui.error('Внутрення ошибка сервера', answer.message);
			}
		},
		failure : function() {
			App.ui.error('Сервер недоступен');
		}
			});
			
		}	
	});*/
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
					header : 'ФИО',
					dataIndex : 'fio',
					sortable : true,
					width : 100,
					renderer : function(value, meta, record) {
						return String.format('<b><a href="#" onclick="menu.showResumeInfo(\'{1}\');">{0}</a></b>',value, record['id']);
					}
					
					
				},
				{
					header : 'Желаемая долность',
					dataIndex : 'job',
					sortable : true,
					width :100 
				},
				/*{
					header : 'Дата рождения',
					dataIndex : 'birth_date',
					sortable : true,
					width : 40
				},*/
				{
					header : 'Авто-дозвон',
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
					header : 'Статус',
					dataIndex : 'status',
					sortable : true,
					width : 50, 
					renderer: function (val) {							
					 if (val=='1'){
		                	return 'Собеседование назначено';
		                }else
		                if (val=='0'){
		                	return 'Прозвона не было';
		                }
		                else
		                    if (val=='2'){
		                    	return 'Кандидат отклонен';
		                    }
			                else
			                    if (val=='3'){
			                    	return 'Резерв';
			                    }
						
					}
				},
				{
					header : 'Дата собеседования',
					dataIndex : 'date',
					sortable : true,
					width : 40
				},
				{
					header : 'Адрес собеседования',
					dataIndex : 'address',
					sortable : true,
					width : 80
				},
				{
					header : 'Комментарий',
					dataIndex : 'comment',
					sortable : true,
					width : 80
				},
				{
					header : 'Обновление',
					dataIndex : 'date_update',
					sortable : true,
					width : 80
				}

				
				
				
				
				],
				sm : sm,
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
		id : 'view-params-resume-form-component',
		title : 'Список резюме',
		closable : true,
		frame : true,
		layout : 'border',
		items : [ filterForm , grid ], 
		loadData : function(data) {  
	    	this.setTitle("Список резюме");        	
	    	this.data = data;
	    	store.loadData(data);
	    	storeAutoCall.loadData(data); 
	        Ext.getCmp(_date_from).setValue(data['date_from']);
	        Ext.getCmp(_date_to).setValue(data['date_to']);
	        
	    }    
	});
})();
(function() {

	var container;
	var _reason = Ext.id();

	var statusSelect = new Ext.form.ComboBox(
			{
				fieldLabel	: 	'Новый статус',
				width 		: 	200,
				mode 		: 	'local',
				hiddenName 	: 	'',
				valueField 	: 	'status',
				store 		: 	new Ext.data.ArrayStore( 
									{
										fields	: [ 'status_id', 'status' ],
										data 	: [ 
													[ '0', 'Обслуживается' ],
													[ '1', 'Заблокирована' ],
													[ '2', 'Утеряна' ],
													[ '3', 'Украдена' ],
													[ '4', 'К закрытию' ]
											   	  ]
									}),
				allowBlank 		: 	false,
				emptyText 		: 	'Укажите новый статус карты',
				displayField 	: 	'status',
				loadingText 	: 	'Поиск...',
				triggerAction 	: 	'all',
				editable 		: 	false
			});
	
	container = new Ext.FormPanel( 
			{
				border 		:	false,
				baseCls 	: 	'x-plain',
				layout 		: 	'fit',
				labelWidth	: 	100,
				width 		: 	500,
				height 		: 	230,
				items 		: [ 
								{
									xtype	: 	'panel',
									title 	: 	'Изменить статус карты',
									frame 	: 	true,
									items 	: 	[ 	
													{
														xtype 	: 	'fieldset',
														border 	: 	false,
														items 	: 	[ 
																		{
																			xtype : 'fieldset',
																			border : false,
																			items : [ 
										        										statusSelect,
										        										{
																	                    	id:_reason,
																	                        fieldLabel : 'Укажите причину изменения статуса карты',
																	                        maxLength  : 500,
																	                        xtype : 'textarea',
																	                        width : 300,
																	                        height : 50,
																	                        name : 'text'
																	                     }
										        									]
																		} 
																	]
													} 
												]
								} 
							],
				buttons	:	[
								{
									xtype 	: 	'button',
									text 	: 	'Изменить',
									handler : function(self) {
										if (
												data['card_block_grant_value']=="-1" 
												&& statusSelect.getValue()!="Обслуживается"
												&& data['p_change_status_card_status']=="Обслуж"
											) 
												{
													App.ui.error('У вас недостаточно прав для блокировки карт!');
													return false;
												}
										if (
												data['card_unblock_grant_value']=="-1" 
												&& statusSelect.getValue()=="Обслуживается"
												&& data['p_change_status_card_status']!="Обслуж"
											)
     											{
													App.ui.error('У вас недостаточно прав для разблокировки карт!');
													return false;
												} 
										if (data['p_change_status_card_status']=="=>PIN<=")  
											{
												App.ui.error('Для проведения данной операции необходимо сбросить PIN!');
												return false;
											}
										if (data['p_change_status_card_status']=="Неактив") 
											{
												App.ui.error('Для проведения данной операции необходимо активировать карту!');
												return false;
											}
										if (Ext.getCmp(_reason).getValue()=="") {
											App.ui.error('Необходимо указать причину изменения статуса');
											return false;
										}
										if (statusSelect.getValue()=="") {
											App.ui.error('Необходимо выбрать новый статус карты');
											return false;
										}
										Ext.Ajax.request( 
															{
																url 	: 	'webservices/set-status-card.html',
																params 	:	{
																				ws_SetCardStatus_inContractID	:	data['p_change_status_card_contr_id'],//data['furtherInfoCard'][0]['contr_id'],//data['contrIdForStatus'],
																				ws_SetCardStatus_inNewStatus 	: 	statusSelect.getValue(),
																				ws_SetCardStatus_inDescription	:	Ext.getCmp(_reason).getValue() 
																				
																			},
																timeout : 	600000,
																waitMsg : 	'Выполняется изменение статуса карты',
																success : 	function(xhr) {
																								var answer = Ext.decode(xhr.responseText);
																								if (answer.success) {
																    													Ext.MessageBox.show( 
																	    													{
																	    														title 	: 	'Информация',
																	    														msg		: 	answer['change_status_card_answer'],
																	    														buttons : 	Ext.MessageBox.OK,
																	    														icon 	: 	Ext.MessageBox.INFO,
																																fn		: 	function(btn) 	{
																																								menu.showFurtherFieldsCard(data['p_change_status_card_contr_id']);
																																				   			}
																	    													});
																														container.window.close();
																													} 
																								else if (answer.code == 'login') 
																										{
																											App.ui.sessionExpired();
																										} else 
																											{ }
																							},
																failure	:	function() {
																							App.ui.error('Сервер недоступен');
																						}
															});
		
								} 
							}, 
							{
									xtype 	: 	'button',
									text 	: 	'Активировать карту',
									handler : function(self) {
									 
									if (data['card_activate_grant_value']=="-1") 
										{
											App.ui.error('У вас недостаточно прав для активации карт!');
											return false;
										} 
									if (data['p_change_status_card_status']!="Неактив") 
										{
											App.ui.error('Карта уже активирована!');
											return false;
										}
									Ext.Ajax.request( 
														{
															url 	: 	'webservices/set-status-card.html',
															params 	:	{
																			ws_SetCardStatus_inContractID	:	data['p_change_status_card_contr_id'],
																			ws_SetCardStatus_inNewStatus 	: 	'unlock_card',
																			ws_SetCardStatus_inDescription	:	'активация карты'
																			
																		},
															timeout : 	600000,
															waitMsg : 	'Выполняется активация карты',
															success : 	function(xhr) {
																							var answer = Ext.decode(xhr.responseText);
																							if (answer.success) {
															    													Ext.MessageBox.show( 
																    													{
																    														title 	: 	'Информация',
																    														msg		: 	answer['change_status_card_answer'],
																    														buttons : 	Ext.MessageBox.OK,
																    														icon 	: 	Ext.MessageBox.INFO,
																															fn		: 	function(btn) 	{
																																							menu.showFurtherFieldsCard(data['p_change_status_card_contr_id']);
																																			   			}
																    													});
																													container.window.close();
																												} 
																							else if (answer.code == 'login') 
																									{
																										App.ui.sessionExpired();
																									} else 
																										{ }
																						},
															failure	:	function() {
																						App.ui.error('Сервер недоступен');
																					}
														});
		
								}
							},  
							{
									xtype 	: 	'button',
									text 	: 	'Разблокировать PIN',
									handler : function(self) {
									
									if (data['unlock_pin_change_grant_value']=="-1") 
										{
											App.ui.error('У вас недостаточно прав для данной операции!');
											return false;
										}
									if (data['p_change_status_card_status']!="=>PIN<=")  
										{
											App.ui.error('Карта не заблокирована по PIN!');
											return false;
										}
									Ext.Ajax.request( 
														{
															url 	: 	'webservices/set-status-card.html',
															params 	:	{
																			ws_SetCardStatus_inContractID	:	data['p_change_status_card_contr_id'],
																			ws_SetCardStatus_inNewStatus 	: 	'unlock_pin',
																			ws_SetCardStatus_inDescription	:	'разблокировать pin'
																			
																		},
															timeout : 	600000,
															waitMsg : 	'Выполняется изменение статуса карты',
															success : 	function(xhr) {
																							var answer = Ext.decode(xhr.responseText);
																							if (answer.success) {
															    													Ext.MessageBox.show( 
																    													{
																    														title 	: 	'Информация',
																    														msg		: 	answer['change_status_card_answer'],
																    														buttons : 	Ext.MessageBox.OK,
																    														icon 	: 	Ext.MessageBox.INFO,
																															fn		: 	function(btn) 	{
																																							menu.showFurtherFieldsCard(data['p_change_status_card_contr_id']);
																																			   			}
																    													});
																													container.window.close(); 
																												} 
																							else if (answer.code == 'login') 
																									{
																										App.ui.sessionExpired();
																									} else 
																										{ }
																						},
															failure	:	function() {
																						App.ui.error('Сервер недоступен');
																					}
														});
		
								}
							},
							{
								text 	: 	'Отмена',
								handler : 	function() {
															container.window.close();
														}
							} 
						],  			
						loadData : function(data) {
				        	this.data = data;
				        }, 
						setWindow : function(window) {
														this.window = window; 
													 }
				});
	return container;
})();
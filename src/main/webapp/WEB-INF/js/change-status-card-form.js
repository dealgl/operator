(function() {

	var container;
	var _reason = Ext.id();

	var statusSelect = new Ext.form.ComboBox(
			{
				fieldLabel	: 	'����� ������',
				width 		: 	200,
				mode 		: 	'local',
				hiddenName 	: 	'',
				valueField 	: 	'status',
				store 		: 	new Ext.data.ArrayStore( 
									{
										fields	: [ 'status_id', 'status' ],
										data 	: [ 
													[ '0', '�������������' ],
													[ '1', '�������������' ],
													[ '2', '�������' ],
													[ '3', '��������' ],
													[ '4', '� ��������' ]
											   	  ]
									}),
				allowBlank 		: 	false,
				emptyText 		: 	'������� ����� ������ �����',
				displayField 	: 	'status',
				loadingText 	: 	'�����...',
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
									title 	: 	'�������� ������ �����',
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
																	                        fieldLabel : '������� ������� ��������� ������� �����',
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
									text 	: 	'��������',
									handler : function(self) {
										if (
												data['card_block_grant_value']=="-1" 
												&& statusSelect.getValue()!="�������������"
												&& data['p_change_status_card_status']=="������"
											) 
												{
													App.ui.error('� ��� ������������ ���� ��� ���������� ����!');
													return false;
												}
										if (
												data['card_unblock_grant_value']=="-1" 
												&& statusSelect.getValue()=="�������������"
												&& data['p_change_status_card_status']!="������"
											)
     											{
													App.ui.error('� ��� ������������ ���� ��� ������������� ����!');
													return false;
												} 
										if (data['p_change_status_card_status']=="=>PIN<=")  
											{
												App.ui.error('��� ���������� ������ �������� ���������� �������� PIN!');
												return false;
											}
										if (data['p_change_status_card_status']=="�������") 
											{
												App.ui.error('��� ���������� ������ �������� ���������� ������������ �����!');
												return false;
											}
										if (Ext.getCmp(_reason).getValue()=="") {
											App.ui.error('���������� ������� ������� ��������� �������');
											return false;
										}
										if (statusSelect.getValue()=="") {
											App.ui.error('���������� ������� ����� ������ �����');
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
																waitMsg : 	'����������� ��������� ������� �����',
																success : 	function(xhr) {
																								var answer = Ext.decode(xhr.responseText);
																								if (answer.success) {
																    													Ext.MessageBox.show( 
																	    													{
																	    														title 	: 	'����������',
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
																							App.ui.error('������ ����������');
																						}
															});
		
								} 
							}, 
							{
									xtype 	: 	'button',
									text 	: 	'������������ �����',
									handler : function(self) {
									 
									if (data['card_activate_grant_value']=="-1") 
										{
											App.ui.error('� ��� ������������ ���� ��� ��������� ����!');
											return false;
										} 
									if (data['p_change_status_card_status']!="�������") 
										{
											App.ui.error('����� ��� ������������!');
											return false;
										}
									Ext.Ajax.request( 
														{
															url 	: 	'webservices/set-status-card.html',
															params 	:	{
																			ws_SetCardStatus_inContractID	:	data['p_change_status_card_contr_id'],
																			ws_SetCardStatus_inNewStatus 	: 	'unlock_card',
																			ws_SetCardStatus_inDescription	:	'��������� �����'
																			
																		},
															timeout : 	600000,
															waitMsg : 	'����������� ��������� �����',
															success : 	function(xhr) {
																							var answer = Ext.decode(xhr.responseText);
																							if (answer.success) {
															    													Ext.MessageBox.show( 
																    													{
																    														title 	: 	'����������',
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
																						App.ui.error('������ ����������');
																					}
														});
		
								}
							},  
							{
									xtype 	: 	'button',
									text 	: 	'�������������� PIN',
									handler : function(self) {
									
									if (data['unlock_pin_change_grant_value']=="-1") 
										{
											App.ui.error('� ��� ������������ ���� ��� ������ ��������!');
											return false;
										}
									if (data['p_change_status_card_status']!="=>PIN<=")  
										{
											App.ui.error('����� �� ������������� �� PIN!');
											return false;
										}
									Ext.Ajax.request( 
														{
															url 	: 	'webservices/set-status-card.html',
															params 	:	{
																			ws_SetCardStatus_inContractID	:	data['p_change_status_card_contr_id'],
																			ws_SetCardStatus_inNewStatus 	: 	'unlock_pin',
																			ws_SetCardStatus_inDescription	:	'�������������� pin'
																			
																		},
															timeout : 	600000,
															waitMsg : 	'����������� ��������� ������� �����',
															success : 	function(xhr) {
																							var answer = Ext.decode(xhr.responseText);
																							if (answer.success) {
															    													Ext.MessageBox.show( 
																    													{
																    														title 	: 	'����������',
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
																						App.ui.error('������ ����������');
																					}
														});
		
								}
							},
							{
								text 	: 	'������',
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
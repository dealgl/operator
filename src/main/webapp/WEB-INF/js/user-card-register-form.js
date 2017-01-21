 /**
 * @author mikluha 
 * Created 2013-07-01
 */

(function() {
	
	var group_combo_select = new Ext.form.ComboBox(
			{
				fieldLabel 		: 	'Группа пользователя',
				hiddenName 		: 	'group_name',
				valueField 		: 	'group_id',
				store 			: 	new Ext.data.Store( 
										{
											proxy : new Ext.data.HttpProxy( 
														{ 
															url : 'addsqlutils/get-user-group-list.html'
														}),
											reader : new Ext.data.JsonReader(
														{
															root : 'get_user_group_list'
														}, 
														[ 
														  	{
														  		name : 'group_id'
														  	},
														  	{
														  		name : 'group_name'
														  	}
														 ]
														)
										}),
				allowBlank 		: 	false,
				emptyText 		: 	'Выберите группу',
				displayField	:	'group_name',
				loadingText 	: 	'Поиск...',
				triggerAction 	: 	'all',
				editable 		:	false
			});  
	var office_combo_select = new Ext.form.ComboBox(
			{
				fieldLabel 		: 	'Филиал пользователя',
				hiddenName 		: 	'office_name',
				valueField 		: 	'office_id',
				store 			: 	new Ext.data.Store(  
										{
											proxy : new Ext.data.HttpProxy( 
														{ 
															url : 'addsqlutils/get-user-office-list.html'
														}),
											reader : new Ext.data.JsonReader(
														{
															root : 'get_user_office_list'
														}, 
														[ 
														  	{
														  		name : 'office_id'
														  	},
														  	{
														  		name : 'office_name'
														  	}
														 ]
														)
										}),
				allowBlank 		: 	false,
				emptyText 		: 	'Выберите филиал',
				displayField	:	'office_name',
				loadingText 	: 	'Поиск...',
				triggerAction 	: 	'all',
				editable 		:	false
			});  
	
	var infunit_combo_select = new Ext.form.ComboBox(
			{
				fieldLabel 		: 	'Видимость данных',
				hiddenName 		: 	'infunit_name',
				valueField 		: 	'infunit_id',
				store 			: 	new Ext.data.Store( 
										{
											proxy : new Ext.data.HttpProxy( 
														{ 
															url : 'addsqlutils/get-user-infunit-list.html'
														}),
											reader : new Ext.data.JsonReader(
														{
															root : 'get_user_infunit_list'
														}, 
														[ 
														  	{
														  		name : 'infunit_id'
														  	},
														  	{
														  		name : 'infunit_name'
														  	}
														 ]
														)
										}), 
				allowBlank 		: 	false,
				emptyText 		: 	'Выберите инфоузел',
				displayField	:	'infunit_name',
				loadingText 	: 	'Поиск...',
				triggerAction 	: 	'all',
				editable 		:	false
			});  
	 	
	  
	 

	var container;
	
	var _user_name = Ext.id();
	var _user_login = Ext.id();
	var _user_mail_work = Ext.id();
	var _user_is_active = Ext.id();
	 
 
	container = new Ext.FormPanel({
		baseCls	: 	'x-plain',
		width	: 	570,
		height 	: 	300,
 		items 	:	
 					[
 					 	{
	 						xtype		:	'fieldset',
	 						layout 		: 	'auto',
	 						labelWidth	: 	130,
	 						items		:
		 									[
		 									 	{
		 									 		layout	: 	'form',
		 									 		title	:	'Добавить пользователя',
		 									 		items	:  
		 									 					[
						 		      	 				         	{
						 		      	 				         		id 			:   _user_name,
						 		      	 				         		xtype		: 	'textfield',
						 		      	 				         		fieldLabel	:	'ФИО пользователя',
						 		      	 				         		name		: 	'user_name',
						 		      	 				         		anchor		: 	'100%' 
						 		      	 					
						 		      	 				         	},
						 		      	 				         	{
						 		      	 				         		id 			:   _user_login,
						 		      	 				         		xtype		: 	'textfield',
						 		      	 				         		fieldLabel	: 	'Логин пользователя',
						 		      	 				         		name		: 	'user_login',
						 		      	 				         		anchor		: 	'100%'
						 		      	 					
						 		      	 				         	},
						 		      	 				         	group_combo_select,
						 		      	 				         	office_combo_select,
						 		      	 				         	infunit_combo_select,
						 		      	 				         	{
						 		      	 				         		id 			:   _user_mail_work,
						 		      	 				         		xtype		: 	'textfield',
						 		      	 				         		fieldLabel	: 	'E-mail',
						 		      	 				         		name		: 	'user_mail_work',
						 		      	 				         		anchor		: 	'100%' 
						 		      	 					
						 		      	 				         	},
						 		      	 				         	{
																		id 			:	_user_is_active,
																		xtype 		: 	'checkbox',
																		fieldLabel	: 	'Доступ предоставлен'
																	}
						 		      	 				         ]
						 		      	 		}
						 		      	 	]
 					 	}
 					],
 		buttons	:	
 					[
 		          		{
 		          			text: 'Сохранить',
 		          			handler : function(self) { 
 		          										function is_empty(str)
															{
 																str= str.replace(/^\s+|\s+$/, '');
	 															if( str.length==0)
																	return true;
																		else
																	return false;
															}
 		          										var is_active;
 		          										if (Ext.getCmp(_user_is_active).getValue() == true)
 		          											{
 		          												is_active = 'Y';	
 		          											}
 		          										else 
 		          											{	
 		          												is_active = 'N'; 
 		          											}
 		          										 if (
 		          										 		is_empty(Ext.getCmp(_user_name).getValue()) == true 
 		          										 		|| is_empty(Ext.getCmp(_user_login).getValue()) == true 
 		          										 		|| is_empty(Ext.getCmp(_user_mail_work).getValue()) == true 
 		          										 		|| is_empty(group_combo_select.getValue()) == true
 		          										 		|| is_empty(infunit_combo_select.getValue()) == true
 		          										 		|| is_empty(office_combo_select.getValue()) == true)
 		          										 	{
 		          												App.ui.error('Заполните все поля карточки!');
 		          												return false;
 		          											 }
							 	  							Ext.Ajax.request({
																url : 'webservices/user-card-register.html',
																params : {
																			ws_prtl_user_card_register_in_user_name 		: 	Ext.getCmp(_user_name).getValue(),
																			ws_prtl_user_card_register_in_user_login 		:	Ext.getCmp(_user_login).getValue(),
																			ws_prtl_user_card_register_in_user_office_id  	: 	office_combo_select.getValue(),
																			ws_prtl_user_card_register_in_user_infunit_id	:	infunit_combo_select.getValue(),
																			ws_prtl_user_card_register_in_user_group_id  	:	group_combo_select.getValue(),
																			ws_prtl_user_card_register_in_user_mail_work 	:	Ext.getCmp(_user_mail_work).getValue(),
																			ws_prtl_user_card_register_in_user_is_active  	: 	is_active
																		},
																timeout : 600000,
																waitMsg : 'Выполняется сохранение карточки пользователя',
																success : function(xhr) {
																							var answer = Ext.decode(xhr.responseText);
																							if (answer.success) {
																													Ext.MessageBox.show({
																																			title : 'Информация',
																																			msg : answer['user_card_register_answer'],
																																			buttons : Ext.MessageBox.OK,
																																			icon : Ext.MessageBox.INFO 
																																		});
																													if (answer['user_card_register_answer'] =='Пользователь добавлен')
																														{
																															container.window.close();
																														}																																		
																												} else if (answer.code == 'login') { 
																																						App.ui.sessionExpired();
																																					} else { }
																						},
																failure : function() {
																						App.ui.error('Сервер недоступен');
																					 }
															});  
								}  
 		          		},
 		          		{ 
 		          			text	:	'Отмена',
 		          			handler	:	function() 
 		          							{ 
 		          								container.window.close();
 		          							}
 		          		} 
 		          	],
	 		        setWindow : function(window) 
	 		        				{
	 		        					this.window = window;
	 		        				},
		loadData : function(data) 
			{
				this.data = data;
			}
		});
	return container;
})(); 
 
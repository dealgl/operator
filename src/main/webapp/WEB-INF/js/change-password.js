(function() {
 
	
    var container;
    
	var _newpassword = Ext.id();
	var _confirmnewpassword = Ext.id();
	     
    container = new Ext.FormPanel({
		id :'change-password-component',
		border : false,
        baseCls : 'x-plain',
        layout : 'fit',
        labelWidth: 100,
        width: 400,
        height: 200,
        items : [
		            {
		                xtype : 'panel',
		                title : 'Изменить пароль',
		                frame : true,
		                items: [
				                    {
				                        xtype : 'fieldset',
				                        border : false,
				                        items :[
						                            {
						                                xtype : 'fieldset',
						                                border : false,
						                                items : [
						                                         	{
							                                         	id : _newpassword,
							                                         	xtype : 'textfield',
							                                            fieldLabel: 'Новый пароль',
							                                            width : 200,
							                                            allowBlank:false,
							                                            inputType       : 'password',
								                                        vtype :'alphanum',
							                                            name : 'newpassword'
								                                    },
								                                    {
								                                     	id : _confirmnewpassword,
								                                     	xtype : 'textfield',
								                                        fieldLabel: 'Подтвердите новый пароль',
								                                        width : 200,
								                                        allowBlank:false,
								                                        inputType       : 'password',
								                                        vtype :'alphanum',
								                                        name : 'confirmnewpassword' 
								                                        
								                                    } 
								                                ]
						                            }
					                            ]
				                    }
				               ]
		            }
		         ],
        buttons: [
					{
						xtype 	: 'button',
						text 	: 'Изменить',
						handler : function(self) {
							if (Ext.getCmp(_newpassword).getValue() != Ext.getCmp(_confirmnewpassword).getValue()) {
								Ext.MessageBox
									.show( {
										title : 'Информация',
										msg : 'Пароли не совпадают!',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.INFO
									});
							} else {
								Ext.Ajax.request(
									{
										url : 'clients/change-password.html',
										params :
										{
											newpassword : Ext.getCmp(_newpassword).getValue()
										},
										timeout : 600000, // 10 min
										waitMsg : 'Изменение пароля',
										success : function(xhr) {
											var answer = Ext.decode(xhr.responseText);
											if (answer.success) {
												Ext.MessageBox
													.show( {
														title : 'Информация',
														msg : 'Пароль успешно изменен!',
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
													});
												container.window.close();
											}
											else if (answer.code == 'login') {
												App.ui.sessionExpired();
											}
											else {

											}
										},
										failure : function() {
											App.ui.error('Сервер недоступен');
										}
									});

							}

					}
					},
					{
		                text: 'Закрыть',
		                handler : function() {
		                    					container.window.close();
		                					 }
					}
        ],
        setWindow : function(window) {
            this.window = window;
        }
    });

    return container;

})();
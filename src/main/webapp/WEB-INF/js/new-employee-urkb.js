(function() {

    var container;
    
    var _phone =  Ext.id();
    var _lastname =  Ext.id();
    var _firstname =  Ext.id();
    var _middlename =  Ext.id();
    var _department =  Ext.id();
    var _position =  Ext.id();
    var _lotus =  Ext.id();
    var _description =  Ext.id();
    
    container = new Ext.FormPanel({
        border : false,
        baseCls : 'x-plain',
        layout : 'fit',
        labelWidth: 150,
        width: 620,
        height: 330,
        items : [
            {
                xtype : 'panel',
                title : 'Форма добавления нового сотрудника',
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
                                         	id : _lastname,
                                         	xtype : 'textfield',
                                            fieldLabel: 'Фамилия',
                                            width : 200,
                                            allowBlank:false,
                                            name : 'lastname'
                                    },
                                    {
                                     	id : _firstname,
                                     	xtype : 'textfield',
                                        fieldLabel: 'Имя',
                                        width : 200,
                                        allowBlank:false,
                                        name : 'firstname'
                                    },
                                    {
                                     	id : _middlename,
                                     	xtype : 'textfield',
                                        fieldLabel: 'Отчество',
                                        width : 200,
                                        allowBlank:false,
                                        name : 'middlename'
                                    },
                                    {
                                     	id : _department,
                                     	xtype : 'textfield',
                                        fieldLabel: 'Подразделение',
                                        width : 300,
                                        allowBlank:false,
                                        name : 'department'
                                    },
                                    {
                                     	id : _position,
                                     	xtype : 'textfield',
                                        fieldLabel: 'Должность',
                                        width : 300,
                                        allowBlank:false,
                                        name : 'position'
                                    },
                                    {
                                     	id : _lotus,
                                     	xtype : 'textfield',
                                        fieldLabel: 'Лотус адрес',
                                        width : 300,
                                        name : 'lotus'
                                    },
                                    {
                                    	id : _phone,
                                    	xtype : 'textfield',
                                        fieldLabel: 'Номер телефона',
                                        width : 200,
                                        name : 'phone',
                                    },
                                    {
                                    	id : _description,
                                    	xtype : 'textfield',
                                        fieldLabel: 'Описание деятельности',
                                        width : 200,
                                        name : 'description',
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
						xtype : 'button',
						text : 'Добавить',
						handler : function(self) {
						Ext.Ajax.request( {
							url : 'contacts/new-contact-urkb.html',
							params : {
								phone : Ext.getCmp(_phone).getValue(),
								lastname : Ext.getCmp(_lastname).getValue(),
								firstname : Ext.getCmp(_firstname).getValue(),
								middlename : Ext.getCmp(_middlename).getValue(),
								department : Ext.getCmp(_department).getValue(),
								position : Ext.getCmp(_position).getValue(),
								lotus : Ext.getCmp(_lotus).getValue(),
								description : Ext.getCmp(_description).getValue()
							},
							timeout : 10 * 60 * 1000, // 10 min
							waitMsg : 'Сохранение нового контакта',
							success : function(xhr) {
								var answer = Ext.decode(xhr.responseText);
								if (answer.success) {
									container.window.close();
									menu.showContacts();
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

					},
					
					{
                text: 'Отмена',
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
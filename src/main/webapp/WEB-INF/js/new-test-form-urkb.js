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
        fileUpload : true,
        layout : 'fit',
        //labelWidth: 50,
        width: 480,
        height: 170,
        items : [
            {
                xtype : 'panel',
                title : 'Форма добавления нового файла',
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
                    			     		xtype : 'fileuploadfield',
                    			            name : 'upload',
                    			            buttonText : 'Открыть',
                    			            width : 290
                   			        },
                                    {
                                    	id : _description,
                                    	xtype : 'textfield',
                                        fieldLabel: 'Описание',
                                        width : 290,
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
						
						container.getForm().submit({                    	
                            url: 'clientclaims/save-file-client-claims.html',
                            waitMsg: 'Добавление файла...',
                            /*params : {
            	   				description : Ext.getCmp(_description).getValue()
							},*/
                            timeout: 30000,
                            success: function(form, action) {
                                //winFiles.close();
                                //menu.showClientClaims();
                                container.window.close();
							},
                            failure: function(form, action) {
								container.window.close();
                                if (action.failureType == 'server') {
                                    var msg = Ext.decode(action.response.responseText);
                                    App.ui.error(msg.message.replace(/\n/g, '<br/>'));
                                } else if (action.failureType == 'connect') {
                                    App.ui.error('Error during this operation');
                                } else {
                                    App.ui.error('Error during this operation');
                                }
                            }
                        });        	   		
						
						/*Ext.Ajax.request( {
							url: 'clientclaims/save-file-client-claims.html',
							params : {
								
								description : Ext.getCmp(_description).getValue()
							},
							timeout : 10 * 60 * 1000, // 10 min
							waitMsg : 'Добавление файла',
							success : function(xhr) {
								var answer = Ext.decode(xhr.responseText);
								if (answer.success) {
									container.window.close();
									menu.showClientClaims();
						} else if (answer.code == 'login') {
							App.ui.sessionExpired();
						} else {
							App.ui.error('Внутрення ошибка сервера', answer.message);
						}
					},
					failure : function() {
						App.ui.error('Сервер недоступен');
					}
						});*/

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
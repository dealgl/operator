(function() {
 
	
    var container;
    
	var _newpassword = Ext.id();
	var _confirmnewpassword = Ext.id();
	     
    container = new Ext.FormPanel({
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
						App.ui.error("Находится в стадии разработки");
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
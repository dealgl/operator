(function() {

    var container;
    
    var _text = Ext.id();
    var face_id;
	
    container = new Ext.FormPanel({
        border : false,
        baseCls : 'x-plain',
        layout : 'fit',
        labelWidth: 150,
        width: 420,
        height: 280,
        items : [
            {
                xtype : 'panel',
                title : 'Статус',
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
											xtype : 'label',
											text : 'Комментарий'
										},
										{
											id:_text,
                                         	maxLength  : 1500,
                                            xtype : 'textarea',
                                            width : 170,
                                            height : 70,
                                            name : 'text'
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
                text: 'Сохранить',
                handler : function() {
            	Ext.Ajax.request( {
					url : 'resume/set-reserve-status.html',
					params : {
						face_id:face_id,
						declineComment : Ext.getCmp(_text).getValue()
					},
					timeout : 1000000000,
					waitMsg : 'Выполняется операция...',
					success : function(xhr) {
						var answer = Ext.decode(xhr.responseText);
						if (answer.success) {
							container.window.close();
						} else if (answer.code == 'login') {
							App.ui
									.sessionExpired();
						} else {
							App.ui.error('External server error',answer.message);
						}
					},
					failure : function() {
						App.ui
								.error('Error!');
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
        },
    	loadData : function(data) {
        	this.data = data;
        	face_id=data['face_id'];
        }
    });

    return container;

})();
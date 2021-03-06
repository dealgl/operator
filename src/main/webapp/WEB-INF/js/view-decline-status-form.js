(function() {

    var container;
    
    var _text = Ext.id();
    var face_id;
   
	var managerComboSelect = new Ext.form.ComboBox( {
		fieldLabel : '��������',
		width : 150,
		hiddenName : 'bank',
		valueField : 'bank_id',
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : 'dictionary/show-fin-ins.html'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'info'
			}, [ {name : 'bank'},
			     {name : 'bank_id'}])
		}),
		allowBlank : false,
		emptyText : '�������� ���������',
		displayField : 'bank',
		loadingText : '�����...',
		triggerAction : 'all'
	});

	var vacancyComboSelect = new Ext.form.ComboBox( {
		fieldLabel : '��������',
		width : 150,
		hiddenName : 'bank',
		valueField : 'bank_id',
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : 'dictionary/show-fin-ins.html'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'info'
			}, [ {name : 'bank'},
			     {name : 'bank_id'}])
		}),
		allowBlank : false,
		emptyText : '�������� ��������',
		displayField : 'bank',
		loadingText : '�����...',
		triggerAction : 'all'
	});
	
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
                title : '������',
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
											text : '�����������'
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
                text: '���������',
                handler : function() {
            	Ext.Ajax.request( {
					url : 'resume/set-decline-status.html',
					params : {
						face_id:face_id,
						declineComment : Ext.getCmp(_text).getValue()
					},
					timeout : 1000000000,
					waitMsg : '����������� ��������...',
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
                text: '������',
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
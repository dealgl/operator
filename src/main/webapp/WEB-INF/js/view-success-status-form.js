(function() {

    var container;
    
    var _date = Ext.id();
    var _time = Ext.id();
    var _city = Ext.id();
    var _address = Ext.id();
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
                                    	id : _date,
                                    	xtype : 'datefield',
                                        format : 'd.m.Y',
                                        fieldLabel : '����',
                                        name : 'date'
                                    },
                                    {
                                    	id : _time,
                                    	xtype : 'textfield',
                                        fieldLabel : '�����',
                                        name : 'time',
                                        value:'00:00',
                                        width : 200
                                    },
                                    {
                                     	id : _city,
                                     	xtype : 'textfield',
                                        fieldLabel: '�����',
                                        width : 200,
                                        //allowBlank:false,
                                        name : 'city'
                                         
                                     },
                                     {
                                      	id : _address,
                                      	xtype : 'textfield',
                                        fieldLabel: '������ �����',
                                        width : 200,
                                       // allowBlank:false,
                                        name : 'name'
                                          
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
					url : 'resume/set-success-status.html',
					params : {
						face_id:face_id,
						date : Ext.getCmp(_date).getValue(),
						time : Ext.getCmp(_time).getValue(),
						district : Ext.getCmp(_city).getValue(),
						address : Ext.getCmp(_address).getValue(),
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
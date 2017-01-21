(function() {

    var container;
    
    var _dateBegin = Ext.id();
    var _dateEnd = Ext.id();
   
	var bankComboSelect = new Ext.form.ComboBox( {
		fieldLabel : '����',
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
		emptyText : '�������� ����',
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
                title : '��������� ������',
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
                                    	id : _dateBegin,
                                    	xtype : 'datefield',
                                        format : 'd.m.Y',
                                        allowBlank : false,
                                        fieldLabel : '��������� ����',
                                        name : 'dateBegin'
                                    },
                                    {
                                    	id : _dateEnd,
                                    	xtype : 'datefield',
                                        format : 'd.m.Y',
                                        allowBlank : false,
                                        fieldLabel : '�������� ����',
                                        name : 'dateEnd'
                                    },
                                    bankComboSelect
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        buttons: [
            {
                text: '������������',
                handler : function() {
            	//App.ui.error(bankComboSelect.getValue());
            	
            	
                Ext.Ajax.request({
                    url: 'convert/convert-date.html',
                    timeout : 1000000000,
                    waitMsg: 'Loading...',
	                params : {
                		dateBegin : Ext.getCmp(_dateBegin).getRawValue(),
                		dateEnd : Ext.getCmp(_dateEnd).getRawValue()
                    },
                    success: function(xhr) {                                           
                        var ret = Ext.decode(xhr.responseText);
                            if (ret.success) {
                            	var ds = ret['paramDateBegin'];
                            	var de = ret['paramDateEnd'];
                            	window.open(String.format('http://192.168.68.104:6666/xmlpserver/UPK/PUBLIC/COLLECTION/atm_loading_today_UR/atm_loading_today_UR.xdo?id=tech&passwd=tech1&_xmode=4&xdo_BI_XF=rtf&_xf=rtf&_xpt=1&pF_I=��ޱ��������',bankComboSelect.getValue(),ds,de ));
                            	container.window.close();
                            } else if (ret.code == 'login') {
                                App.ui.sessionExpired();
                            } else {
                                App.ui.error(ret.message);
                            }
                        
                    },
                    failure: function(xhr) {
                        App.ui.error(xhr.statusText, xhr.status);
                    }
                });
                
            	//window.open(String.format('http://192.168.68.104:6666/xmlpserver/UPK/PUBLIC/COLLECTION/OpenWayReport/OpenWayReport.xdo?id=tech&passwd=tech1&_xmode=4&xdo_BI_XF=rtf&_xf=rtf&_xpt=1&p_fi_id={0}&p_date_from=17-12-2012&p_date_to=17-12-2012',bankComboSelect.getValue()/*93*/));
            	//container.window.close();
    
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
        }
    });

    return container;

})();
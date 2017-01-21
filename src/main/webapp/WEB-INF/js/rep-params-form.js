(function() {

    var container;
    
    var _dateBegin = Ext.id();
    var _dateEnd = Ext.id();
   
	var managerComboSelect = new Ext.form.ComboBox( {
		fieldLabel : 'Менеджер',
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
		emptyText : 'Выберите менеджера',
		displayField : 'bank',
		loadingText : 'Поиск...',
		triggerAction : 'all'
	});

	var vacancyComboSelect = new Ext.form.ComboBox( {
		fieldLabel : 'Вакансия',
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
		emptyText : 'Выберите вакансию',
		displayField : 'bank',
		loadingText : 'Поиск...',
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
                title : 'Параметры отчета',
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
                                        fieldLabel : 'Начальная дата',
                                        name : 'dateBegin'
                                    },
                                    {
                                    	id : _dateEnd,
                                    	xtype : 'datefield',
                                        format : 'd.m.Y',
                                        allowBlank : false,
                                        fieldLabel : 'Конечная дата',
                                        name : 'dateEnd'
                                    },
                                    managerComboSelect,
                                    vacancyComboSelect
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        buttons: [
            {
                text: 'Генерировать',
                handler : function() {
            	App.ui.error("Находится в стадии разработки");
            	//window.open(String.format('http://192.168.68.104:6666/xmlpserver/UPK/PUBLIC/COLLECTION/OpenWayReport/OpenWayReport.xdo?id=tech&passwd=tech1&_xmode=4&xdo_BI_XF=rtf&_xf=rtf&_xpt=1&p_fi_id={0}&p_date_from=17-12-2012&p_date_to=17-12-2012',bankComboSelect.getValue()/*93*/));
            	//container.window.close();
    
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
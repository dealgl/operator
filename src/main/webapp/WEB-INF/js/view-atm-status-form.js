/**
 * Organization Info view
 */

(function () {

    var container;

	var _RFRBTN = Ext.id();

	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect:true
	});

	var pics = {
		        p81: 'style="background: url(img/vwicn081.gif) no-repeat center transparent;"'
	   };
	
    var store = new Ext.data.Store({
		autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root: 'atms',
            fields: 
           	['terminal_id','location','is_online','status','fin_inst','device_type','device_name','ip_addr']
        })

    });
	
    var bankComboSelect = new Ext.form.ComboBox( {
		fieldLabel : 'Банк',
		width : 150,
		hiddenName : 'bank',
		valueField : 'bank',
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : 'dictionary/show-fin-ins-atm.html'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'info'
			}, [ {name : 'bank'},
			     {name : 'bank_id'}])
		}),
		allowBlank : false,
		emptyText : 'Выберите банк',
		displayField : 'bank',
		loadingText : 'Поиск...',
		triggerAction : 'all'
	});
	
    var fileGrid =new Ext.grid.GridPanel ({
    	height:500,
    	columnLines : true,
        autoScroll: true,
        store: store,
        columns: [
            new Ext.grid.RowNumberer({width: 30}),
            sm,
            {
                header: 'TERMINAL_ID',
                width: 40,
                dataIndex: 'terminal_id'
            },
            {
                header: 'LOCATION',
                width: 50,
                dataIndex: 'location'
            },
            {
                header: 'IS_ONLINE',
                width: 40,
                dataIndex: 'is_online',
                renderer: function (value, meta, record) {							
				if(value=='N'){
					meta.attr = pics.p81;									 
				}								
            }

            },
            {
                header: 'FINANCIAL_INST',
                width: 50,
                dataIndex: 'fin_inst'
            },
            {
                header: 'DEVICE_NAME',
                width: 50,
                dataIndex: 'device_name'
            },
            {
                header: 'DEVICE_TYPE',
                width: 50,
                dataIndex: 'device_name'
            },
            {
                header: 'IP',
                width: 50,
                dataIndex: 'ip_addr'
            }
        ],
        
        viewConfig : {
            forceFit: true,
            stripeRows: true,
            emptyText: 'Файлы не найдены!'
        },
        tbar : [bankComboSelect,
                                    {
                                    	xtype : 'button',
                                    	text : 'Подробнее',
                                    	icon :'/portal/img/icon-info.gif',                  	
                                    	handler : function(self) {
                                    		/*var ids = '';
                                    		var idn = '';
                                    		Ext.each(sm.getSelections(), function(item) {
                                    			ids += ',' + item.data.id;
                                    			idn +=',' + item.data.file_name;
                                    		});
                                    		if (ids.length > 0)
                                    			ids = ids.substr(1);
                                    		if (idn.length > 0)
                                    			idn = idn.substr(1);
                                    		if (ids == '') {
                								Ext.MessageBox
                										.show( {
                											title : 'Информация',
                											msg : 'Необходимо выбрать сотрудника для редактирования!',
                											buttons : Ext.MessageBox.OK,
                											icon : Ext.MessageBox.INFO
                										});
                							} else  {

                									menu.showEmployeeUrkbInfo(ids);
                								}*/ 
                                       }
                                    },
                                    {
                                    	xtype : 'button',
                                    	text : 'Обновить форму',
                                    	id : _RFRBTN,
                                    	icon :'/portal/img/favicon.png',
                                    	handler : function(self) {
                                    	 	menu.showAtmStatus(bankComboSelect.getValue());
                                    	}
                                    }
                ],
        sm : sm
    });
    
    container = new Ext.FormPanel({
        id :'view-atm-status-form-component',
        frame :true,
        closable : true,
        header : false,
        layout:'absolute',
        autoScroll : true,
        labelWidth : 250,
        preventBodyReset: true,
         
        defaults: {
            style: {
                marginBottom: '5px'
            }
        }, 
        items : [            
            {
            	xtype : 'panel',
                frame : true,
                collapsible : true,
                title: 'Информация по банкоматам',
                items :[
                        {
                           	xtype:'fieldset',
                            autoHeight: true,
                            items :[
                                    	fileGrid
                                   ]
                         }           
                        ] 
                        
            } 
        ],
        
        loadData : function(data) { 
        	this.setTitle("Информация по банкоматам");        	
        	this.data = data;
            //if (data['atms']){
            	store.loadData(data);
            	bankComboSelect.setValue(data['atms'][0]['fin_inst']);
            //}
        },
        setWindow : function(window) {
            this.window = window;
        }
    });

    return container;

})();
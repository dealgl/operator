/**
 * @author mikluha 
 * Created 2013-04-29
 */

(function() {
 
	  
	//var _sms_phone_number = Ext.id();
	var _sms_date_to = Ext.id();
	var _sms_date_from = Ext.id();
	var sms_store = new Ext.data.Store( {
									proxy : new Ext.data.HttpProxy( { 
										url : 'webservices/sms-info-add.html'
									}),
									reader : new Ext.data.JsonReader( {
										root : 'sms_map_info'
									}, [ {name : 'phone_number_value'},
									     {name : 'phone_number_id'}])
								});
	 var SMSComboSelect = new Ext.form.ComboBox( {
		fieldLabel : 'Номер телефона',
		width : 150,
		hiddenName : 'phone_number_value',
		valueField : 'phone_number_value',
		//value:'0',
		
		store : sms_store,
		allowBlank : false,
		emptyText : 'Выберите номер',
		displayField : 'phone_number_value',
		loadingText : 'Поиск...',
		triggerAction : 'all'
	}); 

	 
	
 	var store = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'atmsSMSInfo',
			fields : [ 'datefrom', 'datesend', 'phonenumber','smsstatus', 'smstext']
		})
	});
 
	var filterForm = new Ext.form.FormPanel(
			{
				region : 'north',
				height : 150,
				labelWidth : 140,
				style : 'padding:5px;',
				items : [ {
					xtype : 'panel',
					layout : 'fit',
					width : 400,
					height : 150,
					items : [ {
						xtype : 'fieldset',
						border : true,
						items : [
								SMSComboSelect,
								{
									id:_sms_date_from,
						     		xtype : 'datefield',
									format : 'd.m.Y',
									fieldLabel : 'Дата с',
									name : 'sms_date_from',
									allowBlank : false
								},
								{
									id:_sms_date_to,
						     		xtype : 'datefield',
									format : 'd.m.Y',
									fieldLabel : 'Дата по',
									name : 'sms_date_to',
									allowBlank : false 
								},
								{
									xtype : 'button',
									text : 'Поиск',
									style : 'margin-left: 250px;margin-top:20px',
									width : 90,
									handler : function(self) {
										menu.showSmsInfoExt(data['card_id'],data['sms_list'],SMSComboSelect.getValue() ,Ext.getCmp(_sms_date_from).getRawValue(),Ext.getCmp(_sms_date_to).getRawValue());  
										}}  ]
					} ]
				} ]
			});

	var grid = new Ext.grid.GridPanel(
			{
				frame : true,
				region : 'center',
				autoScroll : true,
				enableHdMenu : true,
				store : store,
				columns : [ {
					header : 'datefrom',
					dataIndex : 'datefrom',
					sortable : true,
					width : 20
				}, {
					header : 'datesend',
					dataIndex : 'datesend',
					sortable : true,
					width : 20 
				}, {
					header : 'phonenumber',
					dataIndex : 'phonenumber',
					sortable : true,
					width : 15
				},{
					header : 'smsstatus',
					dataIndex : 'smsstatus',
					sortable : true,
					width : 30
				},{
					header : 'smstext',
					dataIndex : 'smstext',
					sortable : true,
					width : 175 
				}
				],
				viewConfig : new Ext.grid.GroupingView(
						{
							forceFit : true,
							groupTextTpl : '{group}<span style="font-size: xx-small">(Всего: {[values.rs.length]})</span>',
							emptyText : 'Записи не найдены',
							enableGroupingMenu : false,
							startCollapsed : true
						})
			});

	return new Ext.Panel( {
		id : 'view-sms-info-ext-component',
		title : 'Список карт',
		closable : true,
		frame : true,
		layout : 'border',
		items : [ filterForm , grid ],  
		loadData : function(data) {  
	    	this.setTitle("Журнал смс информирования");        	
	    	this.data = data;
	        	store.loadData(data);
	        	Ext.getCmp(_sms_date_from).setValue(data['sms_date_from']);
	            Ext.getCmp(_sms_date_to).setValue(data['sms_date_to']);
	          //  Ext.getCmp(SMSComboSelect).setValue('324124213');//sms_store.getAt(0).get('phone_number_value');
	        //    Ext.getCmp(_sms_phone_number).setValue(data['sms_phone_number']);
	           // SMSComboSelect.onTriggerClick();
	    }    
	});
})();
/**
 * author ikram modify by den
 */

(function() {
	var _date_from = Ext.id();
	var _date_to = Ext.id();

	var store = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'authList',
			fields : [ 'auth_amount2', 'auth_amount1', 'auth_date',
					'auth_curr', 'auth_status', 'auth_result', 'auth_code',
					'auth_country', 'auth_city', 'auth_details' ]
		})
	});

	var status_values = [ [ 'Все' ], [ 'Активные' ], [ 'Проведенные' ],
			[ 'Отклоненные' ], [ 'Отмененные' ] ];
	var statusField = new Ext.form.ComboBox( {
		fieldLabel : 'Статус',
		hiddenName : 'status',
		store : new Ext.data.SimpleStore( {
			fields : [ 'status' ],
			data : status_values
		}),
		displayField : 'status',
		typeAhead : true,
		mode : 'local',
		triggerAction : 'all',
		emptyText : 'Выберите статус...',
		selectOnFocus : true
	});

	var filterForm = new Ext.form.FormPanel(
			{
				region : 'north',
				height : 60,
				labelWidth : 40,
				style : 'padding:5px;',
				items : [ {
					xtype : 'panel',
					layout : 'fit',
					width : 756,
					height : 50,
					items : [ {
						xtype : 'fieldset',
						border : false,
						layout : 'column',
						autoHeight : true,
						items : [
								{
									xtype : 'label',
									text : 'Авторизации за период с     ',
									style : 'margin-top: 5px'
								},
								{
									id : _date_from,
									xtype : 'datefield',
									format : 'd.m.Y',
									fieldLabel : 'Авторизации за период с ',
									name : 'dateStart',
									allowBlank : false
								},
								{
									xtype : 'label',
									style : 'margin-left: 15px;margin-top: 5px',
									text : '     по     '
								},
								{
									id : _date_to,
									xtype : 'datefield',
									format : 'd.m.Y',
									fieldLabel : ' по ',
									name : 'dateEnd',
									allowBlank : false
								},
								statusField,
								{
									xtype : 'button',
									text : 'Обновить',
									style : 'margin-left: 20px',
									handler : function(self) {

										filterForm
												.getForm()
												.submit(
														{
															url : 'webservices/auth-list-main.html',
															waitMsg : 'Выборка данных...',
															timeout : 60000,
															params : {
																card_id : data['card_id'],
																date_from : Ext
																		.getCmp(
																				_date_from)
																		.getRawValue(),
																date_to : Ext
																		.getCmp(
																				_date_to)
																		.getRawValue(),
																auth_status : statusField
																		.getValue()
															},
															success : function(
																	form,
																	action) {
																grid
																		.getStore()
																		.loadData(
																				Ext
																						.decode(action.response.responseText));
															},
															failure : function(
																	form,
																	action) {
																if (action.failureType == 'server') {
																	var answer = Ext
																			.decode(action.response.responseText);
																	if (answer.code == 'login') {
																		App.ui
																				.sessionExpired();
																	} else {
																		App.ui
																				.error(answer.message);
																	}
																} else if (action.failureType == 'connect') {
																	App.ui
																			.error('connect');
																} else if (action.failureType == 'client') {
																	App.ui
																			.error(
																					'client',
																					filterForm
																							.getForm()
																							.invalidList());
																} else {
																	App.ui
																			.error('other');
																}
															}

														});
									}
								} ]
					}

					]
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
					header : 'Дата операции',
					dataIndex : 'auth_date',
					sortable : true,
					width : 35
				}, {
					header : 'Статус',
					dataIndex : 'auth_status',
					sortable : true,
					width : 30
				}, {
					header : 'Сумма в вал операции',
					dataIndex : 'auth_amount1',
					sortable : true,
					width : 35
				}, {
					header : 'Вал',
					dataIndex : 'auth_curr',
					sortable : true,
					width : 20

				}, {
					header : 'Сумма в вал карты',
					dataIndex : 'auth_amount2',
					sortable : true,
					width : 35
				}, {
					header : 'Отв',
					dataIndex : 'auth_result',
					sortable : true,
					width : 20
				}, {
					header : 'Код автор',
					dataIndex : 'auth_code',
					sortable : true,
					width : 30
				}, {
					header : 'Стр',
					dataIndex : 'auth_country',
					sortable : true,
					width : 25
				}, {
					header : 'Город',
					dataIndex : 'auth_city',
					sortable : true,
					width : 40
				}, {
					header : 'Описание',
					dataIndex : 'auth_details',
					sortable : true,
					width : 40
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
		id : 'view-auth-list-component',
		title : 'Список авторизаций',
		closable : true,
		frame : true,
		layout : 'border',
		items : [ filterForm, grid ],
		loadData : function(data) {
			this.setTitle("Список авторизаций");
			this.data = data;
			store.loadData(data);
			Ext.getCmp(_date_from).setValue(data['date_from']);
			Ext.getCmp(_date_to).setValue(data['date_to']);
			statusField.setValue(data['auth_status']);

		}

	});
})();
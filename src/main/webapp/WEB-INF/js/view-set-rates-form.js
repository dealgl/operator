/**
 * set rates form
 */

(function () {

    var container;

    var statusSelect = new Ext.form.ComboBox(
			{
				fieldLabel	: 	'����� ������',
				width 		: 	100,
				mode 		: 	'local',
				hiddenName 	: 	'',
				valueField 	: 	'status',
				store 		: 	new Ext.data.ArrayStore( 
									{
										fields	: [ 'status_id', 'status' ],
										data 	: [ 
													[ '0', '�������������' ],
													[ '1', '�������������' ],
													[ '2', '�������' ],
													[ '3', '��������' ],
													[ '4', '� ��������' ]
											   	  ]
									}),
				allowBlank 		: 	false,
				emptyText 		: 	'������� ����� ������ �����',
				displayField 	: 	'status',
				loadingText 	: 	'�����...',
				triggerAction 	: 	'all',
				editable 		: 	false
			});
   
    
    container = new Ext.FormPanel({
        id :'view-set-rates-form-component',
        frame :true,
        closable : true,
        header : false,
        autoScroll : true,
        labelWidth : 250,
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
                layout: 'column',
                title: '<font style="font-size: 12px;">��������� ������</font>',
                items : [
							{
								xtype : 'label',
								text :'���� � ',
								style : 'margin-top: 5px' 
					     	} ,
					     	{
					     		//id : _dateStart, 
					     		xtype : 'datefield',
								format : 'd.m.Y',
								fieldLabel : '���� � ',
								name : 'in_date',
								allowBlank : true 
							},
							{
								xtype : 'label',
								text :' �� ',
								style : 'margin-top: 5px' 
					     	} ,
					     	{
					     		//id : _dateEnd, 
					     		style : 'margin-left: 5px',
					     		xtype : 'datefield',
								format : 'd.m.Y',
								fieldLabel : ' �� ',
								name : 'to_date',
								allowBlank : true 
							},

							
							{
								xtype : 'button',
								text : '����������',
								style : 'margin-left: 20px',
								handler : function(self) {
								/*	Ext.Ajax.request( {
										url : 'reports/calc-data-for-corp.html',
										params : {
											date_start : Ext.getCmp(_dateStart).getRawValue(),
											date_end: Ext.getCmp(_dateEnd).getRawValue(),
											cardId:data['card_id'],
											max_amount_month:data['productCorpInfoM'][0]['max_amount_month'],
											max_amount_day:data['productCorpInfoD'][0]['max_amount_day']
										},
										timeout : 1000000000,
										waitMsg : '����������� ������...',
										success : function(xhr) {
											var answer = Ext.decode(xhr.responseText);
											if (answer.success) {
												Ext.getCmp(_summa).setValue(answer['info'][0]['summa']);
												Ext.getCmp(_max_amount_month).setValue(answer['max_amount_month']);
												Ext.getCmp(_max_amount_day).setValue(answer['max_amount_day']);
												
									} else if (answer.code == 'login') {
										App.ui.sessionExpired();
									} else {
										App.ui.error('��������� ������ �������', answer.message);
									}
								},
								failure : function() {
									App.ui.error('������ ����������');
								}
									});	*/
								}
							} 
						]
            }	
             ,   
              {
            	xtype : 'fieldset',
            	layout: 'table',
                defaults: {
                    style: {
                        padding: '10px'
                    }
                },
                layoutConfig: {
                    columns : 4
                },
                items :[

                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:12px;">�������� ����</span>'
                        },
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:12px;">USDRUB</span>'
                        },
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:12px;">EURRUB</span>'
                        },
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:12px;">GBPRUB</span>'
                        },
//
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:12px;">������� ����</span>'
                        },
                        {
                            xtype: 'textfield',
                            width: 60,
                            height:10,
                            name : 'rate_usd_rur'
                        },
                        {
                            xtype: 'textfield',
                            width: 60,
                            height:10,
                            name : 'rate_eur_rur'
                        },
                        {
                            xtype: 'textfield',
                            width: 60,
                            height:10,
                            name : 'rate_gbp_rur'
                        },
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:12px;">���� ��������</span>'
                        },
                        {
                            xtype: 'textfield',
                            width: 60,
                            height:10,
                            name : 'date_usd_rur'
                        },
                        {
                            xtype: 'textfield',
                            width: 60,
                            height:10,
                            name : 'date_eur_rur'
                        },
                        {
                            xtype: 'textfield',
                            width: 60,
                            height:10,
                            name : 'date_gbp_rur'
                        },
                        
                        //
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:12px;">���������� �� �����</span>'
                        },
                        {
                            xtype: 'textfield',
                            width: 60,
                            height:10,
                            name : 'spread_usd_rur'
                        },
                        {
                            xtype: 'textfield',
                            width: 60,
                            height:10,
                            name : 'spread_eur_rur'
                        },
                        {
                            xtype: 'textfield',
                            width: 60,
                            height:10,
                            name : 'spread_gbp_rur'
                        },
                        //
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:12px;">���� ���������� �� �����</span>'
                        },
                        {
                            xtype: 'textfield',
                            width: 60,
                            height:10,
                            name : 'date_spread_usd_rur'
                        },
                        {
                            xtype: 'textfield',
                            width: 60,
                            height:10,
                            name : 'date_spread_eur_rur'
                        },
                        {
                            xtype: 'textfield',
                            width: 60,
                            height:10,
                            name : 'date_spread_gbp_rur'
                        },
                        //
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:12px;">����������� ������</span>'
                        },
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:12px;">���������������� ��������</span>'
                        },
                        statusSelect,	
//                        {
//                            html: '<span style="color:#3764A0;font-weight:bold;font-size:12px;">--</span>'
//                        },
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:12px;">--</span>'
                        }
                        
                        
                ]
            }
        ],

        loadData : function(data) {
        	this.data = data;
            var inf = {};
            this.setTitle("��������� ������");
         //   inf['product_name'] = data['productInfo'][0]['product_name'];
         //   inf['oper_count'] = data['productInfo'][0]['oper_count'];
         //   inf['oper_summ'] = data['productInfo'][0]['oper_summ']; 
            
            this.getForm().setValues(inf);
        }
    });

    return container;

})();
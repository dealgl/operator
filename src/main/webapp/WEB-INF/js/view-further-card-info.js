/**
 * Further Info 
 */

(function () {

    var container;

    container = new Ext.FormPanel({
        id :'view-further-card-info-component',
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
                layout: 'table',
                title: '��������� �����  '+data['furtherInfoCard'][0]['client_name'],
                defaults: {
                    style: {
                        padding: '5px'
                    }
                },
                layoutConfig: {
                    columns : 3
                },
                items :[

                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">�������:</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'card_product'
                        },
						{
							xtype : 'button',
							text : '���������� � ��������',
							style : 'margin-left: 150px',
							width : 90,
							handler : function(self) {
                        		menu.showProductInfo(data['furtherInfoCard'][0]['contr_id']);
                        	}
						},		
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">����� �:</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'contr_number'
                        },
						{
							xtype : 'button',
							text : '������� �� �����',
							style : 'margin-left: 150px',
							width : 90,
							handler : function(self) {
                        		menu.showAbstractOfCard(data['furtherInfoCard'][0]['contr_id'],'C',null,null);
                        	}
						},
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">��� �����:</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'card_type'
                        },
                        {
                            html: ' '
                        },
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">������ :</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'status'
                        },
						{
							xtype : 'button',
							text : '�������� ������ �����',
							style : 'margin-left: 150px',
							width : 90,
							handler : function(self) {
                        		menu.showChangeStatusFormOfCard(data['furtherInfoCard'][0]['contr_id'],data['furtherInfoCard'][0]['status']);
                        	}
						},
					    {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">��������� ���� ���:</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title', 
                            name : 'rbs_number'
                        },
						{
							xtype : 'button',
							text : '������� �� �����',
							style : 'margin-left: 150px',
							width : 90,
							handler : function(self) {
								menu.showAbstractOfCardSKS(data['furtherInfoCard'][0]['contr_id'],'A',null,null);
                        	}
						},
					    {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">�������������,RUR:</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'amount_blocked'
                        },
						{
							xtype : 'button',
							text : '������ �����������',
							style : 'margin-left: 150px',
							width : 90,
							handler : function(self) {
                        	menu.showAuthList(data['furtherInfoCard'][0]['contr_id']);
                        	}
						},
					    {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">����������� ��������,RUR:</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'amount_balance'
                        },
						{
                        	html:''
						},
					    {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">��������� �����,RUR:</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'limit_info'
                        },
						{
                        	html:' '
						},
					    {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">�������� ��� ��������,RUR:</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'amount_available'
                        },
						{
                        	html:''
						},
					    {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">����������� � ������ SMS �����������:</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'sms_info'
                        },			
                        {
							xtype : 'button',
							text : '���������� SMS',
							style : 'margin-left: 150px',
							width : 90,
							handler : function(self) {
								menu.showSmsInfoExt(data['furtherInfoCard'][0]['contr_id'],data['furtherInfoCard'][0]['sms_info'],null,null,null);
                        	}
						},
					    {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">���������� ����������:</span>'
                        },
						{
                        	html:'���������� ����������'
						},			
                        {
							xtype : 'button',
							text : '���������� ����������',
							style : 'margin-left: 150px',
							width : 90,
							handler : function(self) {
								menu.showFinInfo(data['furtherInfoCard'][0]['contr_id'],null);
                        	}
						},
						{
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">���������� �� ��������� �������������:</span>'
                        },
						{
                        	html:'Collection'
						},			
                        {
							xtype : 'button',
							text : 'Collection',
							style : 'margin-left: 150px',
							width : 90,
							handler : function(self) {
 														menu.showCollectionList(data['furtherInfoCard'][0]['contr_id'],data['furtherInfoCard'][0]['rbs_number']);
                        	}
						},
						{
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">������ � ����������� ����������:</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'is_lim_blocked'
                        } ,		
                        {
							xtype : 'button',
							text : data['furtherInfoCard'][0]['is_lim_blocked'],
							style : 'margin-left: 150px',
							width : 90,
							handler : function(self) {
							 	 if (data['block_lim_change_grant_value'] == '-1' ) {
									App.ui.error('� ��� ������������ ���� ��� ������ ��������');
									 return false;
								}  
								var ws_lim_function_name;
								if (data['furtherInfoCard'][0]['is_lim_blocked'] == '������������ �����') 
									{
										ws_lim_function_name = 'blockLimClear';
									}
								else if  (data['furtherInfoCard'][0]['is_lim_blocked'] == '����� �����') 
									{
										ws_lim_function_name ='blockLimSet';
									}   
								Ext.Ajax.request({
													url : 'webservices/block-lim-change.html',
													params : {
																lim_set_ws_function_name : ws_lim_function_name,
						 										contr_id: data['furtherInfoCard'][0]['contr_id']
															 },
													timeout : 600000, 
													waitMsg : '����������� ��������� ��������� ���������� �����',
													success : function(xhr) {
																				var answer = Ext.decode(xhr.responseText);
																				if (answer.success) {
																										Ext.MessageBox.show({
																																title : '����������',
																																msg : answer['block_lim_set_xml_data'],
																																buttons : Ext.MessageBox.OK,
																																icon : Ext.MessageBox.INFO,
																																fn: function(btn) {
																																	menu.showFurtherFieldsCard(data['furtherInfoCard'][0]['contr_id']);
																																				   }
																															});
																										container.window.close();
																									} else if (answer.code == 'login') { 
																																			App.ui.sessionExpired();
																																		} else { }
																			},
													failure : function() {
																			App.ui.error('������ ����������');
																		 }
												}); 
                        					}
						} 
                ] 
            }
        ],
 
        loadData : function(data) {
        	this.data = data;
            var inf = {};
            this.setTitle("��������� ���� ����� <br/><b>" + data['furtherInfoCard'][0]['contr_number'] + "</b>");
            inf['client_name'] = data['furtherInfoCard'][0]['client_name'];
            inf['field_mnemonic'] = data['furtherInfoCard'][0]['contr_id'];
            inf['card_product'] = data['furtherInfoCard'][0]['card_product'];
            inf['contr_number'] = data['furtherInfoCard'][0]['contr_number'];
            inf['card_type'] = data['furtherInfoCard'][0]['card_type'];
            inf['status'] = data['furtherInfoCard'][0]['status'];
            inf['rbs_number'] = data['furtherInfoCard'][0]['rbs_number'];
            inf['amount_blocked'] = data['furtherInfoCard'][0]['amount_blocked'];
            inf['amount_balance'] = data['furtherInfoCard'][0]['amount_balance'];
            inf['is_lim_blocked'] = data['furtherInfoCard'][0]['is_lim_blocked'];
            inf['amount_available'] = data['furtherInfoCard'][0]['amount_available'];
            inf['sms_info'] = data['furtherInfoCard'][0]['sms_info'];
          
            this.getForm().setValues(inf);
        }
    });

    return container;

})();
/**
 * Further Info 
 */

(function () {

    var container;
    var _date = Ext.id();

    container = new Ext.FormPanel({
        id :'view-fin-info-component',
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
 		                title: 'Финансовая информация', 
						items : [
									{
										xtype : 'label',
										text :'Задолженность на дату   ',
										style : 'margin-top: 5px' 
							     	} ,
							     	{
							     		id : _date, 
							     		xtype : 'datefield',
										format : 'd.m.Y',
										fieldLabel : 'Задолженность на дату',
										name : 'inDateTo',
										allowBlank : false
									},
									{
										xtype : 'button',
										text : 'Расчет',
										style : 'margin-left: 20px',
										handler : function(self) {
											menu.showFinInfo(data['contr_id'],Ext.getCmp(_date).getRawValue());
										}
									} 
								]
					},
		            {	xtype : 'fieldset',
						border : true,
						layout : 'table',
						autoHeight : true,
		                defaults: {
		                    style: {
		                        padding: '5px'
		                    }
		                },
		                layoutConfig: {
		                    columns : 2
		                },
		                items :
		                		[
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Основная задолженность:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'loanamount'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Cумма очередного погашения без учета процентов:</span>'
									},
									{ 
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'paydueamount'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Просроченная задолженность без учета процентов:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'payimmamount'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Технический овердрафт:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'ovlamount'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Льготная задолженность:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'loangraceamount'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Нельготная задолженность:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'loannongraceamount'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Проценты на расчетную дату:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'percentamount'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Просроченные проценты:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'ovdinterestamount'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Льготные проценты на расчетную дату:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'currentinterestgraceamount'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Штрафы и пени на расчетную дату:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'penaltyamount'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Госпошлина на расчетную дату:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'statedutyamount'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Итого к погашению с учетом процентов:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'paynow'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Крайний срок погашения:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'paydate'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Срок действия льготного периода:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'gracedate'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Дата окончания действия лимита:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'cardexpiredate'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Срок погашения задолженности по основному долгу:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'loanpaydate'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Сумма для полного погашения:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'allamount'
									},
									{
									    html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">текущие проценты:</span>'
									},
									{
									    xtype: 'displayfield',
									    cls: 'z-title',
									    name : 'currentinterestamount'
									},
							        {
			                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Состояние:</span>'
			                        },
			                        {
			                            xtype: 'displayfield',
			                            cls: 'z-title',
			                            name : 'paymessage'
			                        } 
			                    ]
		            }
        ],

        loadData : function(data) {
        	this.data = data;
            var inf = {};
            this.setTitle("Финансовая информация");
           // inf['cardtype'] = data['finInfo'][0]['cardtype'];
            inf['loanpaydate'] = data['finInfo'][0]['loanpaydate'];
            inf['currentinterestamount'] = data['finInfo'][0]['currentinterestamount'];
            inf['gracedate'] = data['finInfo'][0]['gracedate'];
            inf['paynow'] = data['finInfo'][0]['paynow'];
            inf['cardexpiredate'] = data['finInfo'][0]['cardexpiredate'];
            inf['penaltyamount'] = data['finInfo'][0]['penaltyamount'];
            inf['paydate'] = data['finInfo'][0]['paydate'];
            inf['loannongraceamount'] = data['finInfo'][0]['loannongraceamount'];
            inf['ovlamount'] = data['finInfo'][0]['ovlamount'];
            inf['loangraceamount'] = data['finInfo'][0]['loangraceamount'];
            inf['statedutyamount'] = data['finInfo'][0]['statedutyamount'];
            inf['payimmamount'] = data['finInfo'][0]['payimmamount'];
            inf['loanamount'] = data['finInfo'][0]['loanamount'];
            inf['paydueamount'] = data['finInfo'][0]['paydueamount'];
            inf['ovdinterestamount'] = data['finInfo'][0]['ovdinterestamount'];
            inf['currentinterestgraceamount'] = data['finInfo'][0]['currentinterestgraceamount'];
            inf['allamount'] = data['finInfo'][0]['allamount'];
            inf['percentamount'] = data['finInfo'][0]['percentamount']; 
            inf['paymessage'] = data['finInfo'][0]['paymessage'];
            
            inf['inDateTo'] = data['inDateTo'];
            this.getForm().setValues(inf);
        }
    });

    return container;

})();
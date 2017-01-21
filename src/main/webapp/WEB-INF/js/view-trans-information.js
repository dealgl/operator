/**
 * Further Info 
 */

(function () {

    var container;

    container = new Ext.FormPanel({
        id :'view-trans-information-component',
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
                title: 'Информация об операции',
                defaults: {
                    style: {
                        padding: '5px'
                    }
                },
                layoutConfig: {
                    columns : 2
                },
                items :[

                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">ФИО клиента</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'fio'
                        },
						
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Место жительства</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'address'
                        },
						
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Номер карты</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'card_number'
                        },
						
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Срок действия карты</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'card_expired'
                        },
						
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Имя на карте</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'card_fio'
                        },
						
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Дата операции</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'trans_date'
                        },
						
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Торговая точка</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'trans_purchase'
                        },
						
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Сумма операции</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'trans_amount'
                        },
						
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Валюта операции</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'trans_curr'
                        },
						
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Устройство</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'source_number'
                        },
						
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">ID торговой точки</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'merchant_id'
                        },
						
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Тип операции</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'trans_type'
                        },
						
                        {
                            html: '<span style="color:#3764A0;font-weight:bold;font-size:11px;">Код авторизации</span>'
                        },
                        {
                            xtype: 'displayfield',
                            cls: 'z-title',
                            name : 'auth_code'
                        },
                        {
							xtype : 'button',
							text : 'Сформировать заявление на опротестование',
							style : 'margin-left: 100px',
							width : 140,
							handler :  function(self) {
                        	window.open(String.format('http://192.168.68.104:6666/xmlpserver/UPK/PUBLIC/COLLECTION/CardTransInformationBI/CardTransInformationBI.xdo?id=tech&passwd=tech1&_xmode=4&xdo_BI_XF=rtf&_xf=rtf&_xpt=1&p_doc_id='+data['transInformation'][0]['doc_id']));
                        	container.window.close();

                        	}
                        }
                ]
            }
        ],

        loadData : function(data) {
        	this.data = data;
            var inf = {};
            this.setTitle("Информация по операции");
            inf['fio'] = data['transInformation'][0]['fio'];
            inf['address'] = data['transInformation'][0]['address'];
            inf['card_number'] = data['transInformation'][0]['card_number'];
            inf['card_expired'] = data['transInformation'][0]['card_expired'];
            inf['card_fio'] = data['transInformation'][0]['card_fio'];
            inf['trans_date'] = data['transInformation'][0]['trans_date'];
            inf['trans_purchase'] = data['transInformation'][0]['trans_purchase'];
            inf['trans_amount'] = data['transInformation'][0]['trans_amount'];
            inf['trans_curr'] = data['transInformation'][0]['trans_curr'];
            inf['source_number'] = data['transInformation'][0]['source_number'];
            inf['merchant_id'] = data['transInformation'][0]['merchant_id'];
            inf['trans_type'] = data['transInformation'][0]['trans_type'];
            inf['auth_code'] = data['transInformation'][0]['auth_code'];
            
            

            
            this.getForm().setValues(inf);
        }
    });

    return container;

})();
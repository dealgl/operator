/**
 * Organization Info view
 */

(function () {

    var container;
    
    var id_sec = '';
    
    var _viewDoc = Ext.id();
    var _winFiles =  Ext.id();
    var _adr =  Ext.id();
    var _currency = Ext.id(); 
    var _koef_0 = Ext.id();
    var _koef_1 = Ext.id();
    var _bloomCode = Ext.id();
    var _period = Ext.id();
    var _group = Ext.id();

	var store = new Ext.data.Store({
		autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root: 'file',
            fields: 
           	['file','name','address']
        })

    });
    
    container = new Ext.FormPanel({
        id :'view-design-cards-form-component',
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
                id : _viewDoc,
            	xtype : 'panel',
                frame : true,
                collapsible : true,
                title: 'Дизайны',
                items :[
                        {
                           	xtype:'fieldset',
                            autoHeight: true,
                            items :[
                                    	{
                                             html:	
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<table>'+
		                               				 	'<tr>'+
		                               				   		'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k1.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa ЧИП DDA дебетовые Infinite 466081 стандарт </b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k2.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card дебетовые магнитка Gold 554538 солнце </b></td>'+
		                               				 	'</tr>'+
		                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k3.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ЧИП DDA кредитные Gold 528686 Солнце</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k4.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa ЧИП DDA кредитные Platinum 489016 Вертикальный трафик</b></td>'+
		                               				 	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k5.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ЧИП DDA дебетовые Business 5586 самолет</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k6.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card дебетовые магнитка ISIC 545421 </b></td>'+
		                               				   	'</tr>'+
		                               				   	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k7.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> description 7</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k8.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa ЧИП DDA дебетовые Gold 405845 кленовый лист</b></td>'+
		                               				   	'</tr>'+	
		                               				   	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k9.jpg"/>'+
		                            				   		'<br>'+
		                            				   		'<b> Visa ЧИП DDA дебетовые Business 4058 самолет </b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k10.jpg"/>'+
		                            				   		'<br>'+
		                            				   		'<b> Visa дебетовые магнитка Electron 405846 джинс (Jeans Effect) </b></td>'+
		                            				   	'</tr>'+
			                            				    '</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k11.jpg"/>'+
			                           				   		'<br>'+
			                           				   		'<b> Visa ЧИП DDA дебетовые Electron 405846 джинсовый эффект </b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k12.jpg"/>'+
			                           				   		'<br>'+
			                           				   		'<b> Master Card ЧИП DDA дебетовые Gold 554538 молния</b></td>'+
				                           				'</tr>'+
			                               				 	'<tr>'+
		                               				   		'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d1.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card кредитные магнитка Standard 528686 Пестик</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d2.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card дебетовые магнитка Standard 545421 пестик</b></td>'+
		                               				 	'</tr>'+
		                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d3.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card дебетовые магнитка Gold 554558 молния</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d4.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa ЧИП DDA дебетовые Classic 405844 огонь</b></td>'+
		                               				 	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d5.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Priority Pass </b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d6.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa ЧИП DDA дебетовые Classic 405844 гобелен</b></td>'+
		                               				   	'</tr>'+
		                               				   	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d7.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card дебетовые магнитка Gift 531153 подарочные</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d8.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ЧИП DDA кредитные Platinum 528686 Перо</b></td>'+
		                               				   	'</tr>'+	
		                               				   	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d9.jpg"/>'+
		                            				   		'<br>'+
		                            				   		'<b> Master Card дебетовые магнитка Standard 545421 зеленый лист</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d10.jpg"/>'+
		                            				   		'<br>'+
		                            				   		'<b> description 22</b></td>'+
		                            				   	'</tr>'+
			                            				    '</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d11.jpg"/>'+
			                           				   		'<br>'+
			                           				   		'<b> Master Card дебетовые магнитка Cirrus Maestro 676479 жидкий металлик </b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d12.jpg"/>'+
			                           				   		'<br>'+
			                           				   		'<b> Master Card ЧИП DDA дебетовые Standard 545421 зеленый лист</b></td>'+
			                           				   	'</tr>'+
			                               				 	'<tr>'+
		                               				   		'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s1.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa дебетовые магнитка  VISA Gold 405845 лапка</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s2.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card кредитные магнитка Gold 528686 Молния </b></td>'+
		                               				 	'</tr>'+
		                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s3.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card дебетовые магнитка Gold 554558 цветы</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s4.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card дебетовые магнитка Virtual 502003 стандарт </b></td>'+
		                               				 	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s5.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa дебетовые магнитка  VISA Gold 405845 солнце</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s6.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card дебетовые магнитка Business 5586 самолет </b></td>'+
		                               				   	'</tr>'+
		                               				   	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s7.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ЧИП DDA дебетовые Standard 545421 капли</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s8.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ЧИП DDA кредитные  Standard 528686 Зеленый лист </b></td>'+
		                               				   	'</tr>'+	
		                               				   	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s9.jpg"/>'+
		                            				   		'<br>'+
		                            				   		'<b> Master Card кредитные магнитка Platinum 528686 Стандарт</b></td>'+
			                               				   	'<td></td>'+
		                            				   	'</tr>'+
	                                            	'</table>'
                                        } 
                                     
                                    	
                                   ]
                         }           
                        ] 
                        
            }
        ],
        
        loadData : function(data) {
        	this.setTitle("Варианты дизайна пластиковых карт");        	
        	this.data = data;
            if (data['file'][0]){
            	store.loadData(data);
            }
        },
        setWindow : function(window) {
            this.window = window;
        }
    });

    return container;

})();
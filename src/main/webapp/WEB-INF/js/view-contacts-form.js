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
        id :'view-pickup-cards-form-component',
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
                title: 'Документы',
                items :[
                        {
                           	xtype:'fieldset',
                            autoHeight: true,
                            items :[
                                    	{
                                             html:	
                                            	 	'<b><i>  Варианты отправки заявлений:</b></i>'+
                                            	 	'<br> 1. Почтой с курьером'+
	                                            	'<br> 2. По электронной почте - отсканированные, только в формате (JPEG,JPG,TIF)'+
	                                            	'<br> 3. По факсу'+
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<b> Заявления по спорным операциям направлять по следующим адресам: </b>'+
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<hr>'+
	                                            	'<b> "Пробизнесбанк" </b> Москва, Беломорская 6А.'+
	                                            	'<hr>       Отдел безопасности и претензионной работы'+
	                                            	'<br> Черкасов Игорь /Претензионная работа, Захват карт, Регистрация ТСП, Fraud/'+
	                                            	'<br> внутренний телефон 4085'+
	                                            	'<br> почта Lotus: Igor V Cherkasov/IT/Probusiness Bank'+
	                                            	'<br> Факс: (495)7339342'+
	                                            	'<br> моб (903)6766235'+
	                                            	'<br>'+
	                                            	'<br> Чистякова Виктория /Претензионная работа/'+
	                                            	'<br> внутренний телефон ----'+
	                                            	'<br> почта Lotus: Viktoriya R Chistyakova/IT/Probusiness Bank'+
	                                            	'<br> Факс: (495)7339342'+
	                                            	'<br> моб (903)6767150'+
	                                            	'<br>'+
	                                            	'<br> Щуркова Наталья /Регистрация ТСП/'+
	                                            	'<br> внутренний телефон ----'+
	                                            	'<br> почта Lotus: Natalya V Shurkova/IT/Probusiness Bank'+
	                                            	'<br> Факс: (495)7339342'+
	                                            	'<br> моб (903)6767152'+
	                                            	'<br>'+
	                                            	'<br> Шахкиримов Максим /Захват карт, Fraud/'+
	                                            	'<br> внутренний телефон ----'+
	                                            	'<br> почта Lotus: Maksim I Shahkirimov/IT/Probusiness Bank,'+ 
	                                            	'<br> Факс: (495)7339342'+
	                                            	'<br> моб (903)------'+
	                                            	'<br>'+
	                                            	'<br> Яшин Леонид  '+
	                                            	'<br> внутренний телефон 4336'+
	                                            	'<br> почта Lotus: Leonid V Yashin/IT/Probusiness Bank'+
	                                            	'<br> Факс: (495)7339342'+
	                                            	'<br> моб (963)6440139'+
	                                            	'<br>'+
	                                            	'<hr>'+
	                                            	'<b> "ВУЗ-БАНК"</b>'+
	                                            	'<hr>       Управление банковских карт и дистанционного обслуживания'+
	                                            	'<br> Александр Ларченко'+
	                                            	'<br> внутренний телефон: 2634'+
	                                            	'<br> почта Lotus: Alexander V Larchenko/UPO/VUZ/Probusiness Bank'+
	                                            	'<br> Факс:'+ 
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<hr>'+
	                                            	'<b> "Экспресс-Волга"</b>'+
	                                            	'<hr>       Отдел учета платежных средств'+
	                                            	'<br> Шевченко Наталья'+
	                                            	'<br> внутренний телефон: 3391'+
	                                            	'<br> почта Lotus: Natalya A Shevchenko/URN/EXV/Probusiness Bank'+
	                                            	'<br> Факс:'+ 
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<hr>'+
	                                            	'<b> "ГАЗЭНЕРГОБАНК"</b>'+
		                                            '<hr>       Управление банковских карт и дистанционного обслуживания'+
	                                            	'<br> Юрий Юртин'+
	                                            	'<br> внутренний телефон: xxxx'+
	                                            	'<br> почта Lotus: Yuriy V Yurtin/RBD/GEB/Probusiness Bank'+
	                                            	'<br> Факс:'+ 
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<hr>'+
	                                            	'<b> "БАНК24.РУ"</b>'+
	                                            	'<hr>       Управление банковских карт и дистанционного обслуживания'+
	                                            	'<br> Миронова Алла Александровна'+
	                                            	'<br> внутренний телефон: (343) 2222222 вн. 9-278'+
	                                            	'<br> почта Lotus: mironova@bank24.ru'+ 
	                                            	'<br> Факс:'+ 
	                                            	'<br>'+
	                                            	'<br>'    
                                        } 
                                     
                                    	
                                   ]
                         }           
                        ] 
                        
            }
        ],
        
        loadData : function(data) {
        	this.setTitle("Возврат изъятых карт из банкоматов");        	
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
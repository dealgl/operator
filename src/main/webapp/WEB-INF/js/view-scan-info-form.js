(function() {

    var imageStore = new Ext.data.JsonStore( {
        url : 'employee/get-image.html',
        root : 'images',
        fields : [ 'name', 'url', {
            name : 'size',
            type : 'float'
        } ]
    });
    var tpl = new Ext.XTemplate('<tpl for=".">',
        '<div class="thumb-wrap" id="{name}">',
        '<div class="thumb"><img src="{url}" title="{name}"></div>',
        '<span class="x-editable">{shortName}</span></div>', '</tpl>',
        '<div class="x-clear"></div>');

    var imagePanel = new Ext.form.FieldSet( {
        id : 'images-view',
        width : 500,
        height : 250,
        title : 'Фото',
        items : new Ext.DataView( {
            store : imageStore,
            tpl : tpl,
            autoHeight : true,
            multiSelect : true,
            overClass : 'x-view-over',
            itemSelector : 'div.thumb-wrap',
            emptyText : 'No images to display'
        })
    });

    container = new Ext.FormPanel( {
        id : 'view-scan-info-form-component',
        frame : true,
        closable : true,
        header : false,
        autoScroll : true,
        labelWidth : 250,


        items : [

            {
            xtype : 'panel',
            title : 'Информация о клиенте',
            frame : true,
            bodyStyle : 'padding:5px 5px 0',
            autoScroll : true,
            items : [imagePanel
            ],
            bbar :[
                "->",
                {
                    text:'Проверено'
                },"-",
                {
                    text:'Отмена',
                    handler:function (self) {

                    }
                }
            ]

        }

        ],
        loadData : function(data) {
            this.setTitle("Проверка фото");
            this.data = data;

        }
    });
    return container;
})();
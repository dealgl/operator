
var header = new App.ui.HeaderPanel({
    id : 'header-panel',
    region: 'north',
    baseCls:'x-plain',
    height: 100,
    contentEl: 'header-table'
});

var view = new App.ui.View({
    id : 'view-panel',
    region: 'center',
    baseCls:'x-plain',
    items : {
        xtype : 'panel',
        frame : true,
        title : 'Служба поддержки',
        autoScroll : true,
        items : {
            contentEl : 'intro-panel',
            frame : true
        }
    }
});

var menu = new App.ui.MainMenu({
    id : 'action-panel',
    region:'west',
    baseCls:'x-plain',
    split:true,
    items : [
        {
            title: 'Операции',
            contentEl: 'task-ext-projects'
        },
        {
            title: 'Настройки',
            contentEl: 'task-settings'
        }
        
    ],
  
    listeners : {
        'action' : {
            fn: view.onAction,
            scope: view
        }
    },

    showSendMailForm : function() {
        this.showModal(this, 'send-mail');
    },
    
    showMakeRequestResume : function() {
    	this.submitDataRequest(this, 'view-make-request-form', 'request/prepare-request.html');
    },

    showCandidateSheets: function(date_from,date_to,vacancy,city) {
    	this.submitDataRequest(this, 'view-params-resume-form', 'resume/prepare-form-resume-list.html',{date_from:date_from,date_to:date_to,vacancy:vacancy,city:city});
    },

    showResumeInfo :function(face_id,index) {
    	this.submitDataRequest(this, 'view-resume-info', 'resume/get-resume-info.html',{face_id:face_id,index:index});
    },
    
    showExtResumeInfo :function(face_id,index) {
    	this.submitDataRequest(this, 'view-ext-resume-info', 'resume/get-ext-resume-info.html',{face_id:face_id,index:index});
    },
    
    showReportsParamsForm : function() {
        this.showModal(this, 'rep-params-form','request/prepare-request.html');
    },
    
    showChangePasswordForm: function() {
    	this.showModal(this, 'change-password');
    },

    showBlockAuth: function() {
    	App.ui.message('Данное меню находится в разработке');
    },

    showCancelMenu: function() {
    	App.ui.message('Данное меню находится в разработке');
    },
    
    showStatusSuccessForm : function(faceId) {
        this.showModal(this, 'view-success-status-form','resume/prepare-success-status-form.html',{faceId:faceId});
    },

    showStatusDeclineForm : function(faceId) {
        this.showModal(this, 'view-decline-status-form','resume/prepare-decline-status-form.html',{faceId:faceId});
    },
    
    showStatusReserveForm : function(faceId) {
        this.showModal(this, 'view-reserve-status-form','resume/prepare-reserve-status-form.html',{faceId:faceId});
    },
    
    showImportDealForm : function() {
    	this.showModal(this, 'view-deal-form');
    },
    
    showCandidateSheetsExt: function(/*date_from,date_to,vacancy,city*/) {
    	this.submitDataRequest(this, 'view-params-resume-form-ext', 'resume/prepare-form-resume-ext-list.html'/*,{date_from:date_from,date_to:date_to,vacancy:vacancy,city:city}*/);
    },
    
    showCandidateUrl : function(url) {
    	window.open(url);
    },
    
    showVuz : function() {
        this.submitDataRequest(this, 'view-vuz-files-form', 'vuz/vuz-main.html');
    },
    
    showLoadTransForm: function() {
    	this.submitDataRequest(this, 'view-vuz-prepare-load-form','vuz/vuz-load-trans.html');
    },
    
    showGEB : function() {
        this.submitDataRequest(this, 'view-geb-files-form', 'geb/geb-main.html');
    },
 
    showLoadTransFormGeb : function(){
    	this.submitDataRequest(this, 'view-geb-prepare-load-form','geb/geb-load-trans.html');    	
    },
    
    showGebPreLoadTransForm : function(){
    	this.submitDataRequest(this, 'view-geb-pre-load-form','geb/geb-pre-load-trans.html');    	
    },

    showSettlementMain : function(date_begin,date_end){
    	this.submitDataRequest(this, 'view-main-form','settlement/main-settlement.html',{date_begin:date_begin,date_end:date_end});    	
    },
    
    showImportVisa : function() {
    	this.showModal(this, 'view-import-visa');
    },
    
    setCourse: function(){
    	this.submitDataRequest(this, 'view-set-rates-form','rates/main-rates.html'/*,{date_begin:date_begin,date_end:date_end}*/);    	
    },

    getClients: function(){
        this.submitDataRequest(this, 'view-get-clients-form','clients/main-clients.html'/*,{date_begin:date_begin,date_end:date_end}*/);
    },

    getMessages: function(){
        this.submitDataRequest(this, 'view-get-messages-form','clients/main-clients.html'/*,{date_begin:date_begin,date_end:date_end}*/);
    },

    checkClients: function(){
        this.submitDataRequest(this, 'view-check-clients-form','clients/main-clients.html'/*,{date_begin:date_begin,date_end:date_end}*/);
    },

    showScan: function(client_id){
        this.submitDataRequest(this, 'view-scan-info-form','clients/main-clients.html',{client_id:client_id});
    },

    showMessages: function(client_id){
        this.submitDataRequest(this, 'view-message-list-form','clients/main-messages.html',{client_id:client_id});
    }

}); 

var searchPanel = new App.ui.SearchPanel({controller:menu});

Ext.onReady(function() {
    Ext.QuickTips.init();
    var vp = new Ext.Viewport({
        layout: 'border',
        forceLayout : true,
        items: [/*header,*/ menu, view],
        listeners : {
            afterrender : function() {
    			//menu.showUserProfile();
            }
        }
    });
    //searchPanel.render('search-div');
    
    view.addListener('add', function(container, component, index) {
        if (index == 0) vp.doLayout();
    });
    
    setTimeout(function() {
        Ext.get('loading-mask').fadeOut({remove:true});
    }, 400);

});

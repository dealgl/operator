
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
    baseCls:'x-plain'
    ,
    items : {
        xtype : 'panel',
        frame : true,
        closable : true,
        title : '',
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
            title: '¾ßÕàÐæØØ',
            contentEl: 'task-ext-projects'
        },
        {
            title: '½ÐáâàÞÙÚØ',
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
    	App.ui.message('ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½');
    },

    showCancelMenu: function() {
    	App.ui.message('ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½');
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
        this.submitDataRequest(this, 'view-reg-attempts-form','clients/main-clients.html');
    },

    getClients: function(){
        this.submitDataRequest(this, 'view-get-clients-form','clients/main-clients.html'/*,{date_begin:date_begin,date_end:date_end}*/);
    },

     getMessages: function(){
        this.submitDataRequest(this, 'view-all-messages-form','clients/all-messages.html');
     },

    checkClients: function(){
        this.submitDataRequest(this, 'view-all-not-checked-client-form','clients/all-not-check.html');
    },

/*    regAttempts: function(){
        this.submitDataRequest(this, 'view-reg-attempts-form','clients/main-clients.html');
    },
*/
    showFormCheckScan: function(snils,fio){
        this.submitDataRequest(this, 'view-check-clients-form-info','clients/find-client.html',{snils:snils,fio:fio});
    },


    showScan: function(client_id){
        this.submitDataRequest(this, 'view-scan-info-form','clients/main-scan-clients.html',{client_id:client_id});
    },

    showMessages: function(client_id,fio){
        this.submitDataRequest(this, 'view-message-list-form','clients/main-messages.html',{client_id:client_id,fio:fio});
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
    			menu.getMessages();
                //view.destroy();

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

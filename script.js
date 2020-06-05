(function(){
    angular.module('app', ['angular-screenshot'])
      .controller('AppController', [appController])
      
      
    function appController() {
       var self = this;
       self.cancel = cancel;
       self.download = download;
       self.advanceApi;
       
       function cancel() {
         if (self.advanceApi) self.advanceApi.cancel();
       }
       
       function download() {
        if (self.advanceApi) self.advanceApi.download();
       }
    }
  })()
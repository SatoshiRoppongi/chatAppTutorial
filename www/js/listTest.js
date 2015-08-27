var appkey = "YOUR APP KEY";
var clientkey = "YOUR CLIENT KEY";
var appID = "YOUR APP ID";
var commonURL = "https://mb.api.cloud.nifty.com/2013-09-01/applications/"+ appID +"/publicFiles/";
NCMB.initialize(appkey, clientkey);

ons.bootstrap().controller('chatLogic', ['$scope',  function($scope) {
    var Messages = NCMB.Object.extend("Messages");
    var query = new NCMB.Query(Messages);
    query.find({
       success: function(results) {
          var myMessages = [];
          for (var j = 0; j < results.length; j++) {
              myMessages.push({"name":results[j].get("name"),"message":results[j].get("message")});
          }
          $scope.messages = myMessages;
          $scope.$apply();
       },
       error: function(error) {
          // エラー
          alert(error);
       }
    });
}]);


function submit() {
    var Messages = NCMB.Object.extend("Messages");
    var messages = new Messages();
    messages.set("name", document.userName.textbox.value);
    messages.set("message", document.myForm.textbox.value);
    messages.save(null, {
      success: function(messages) {
          $('#messageList').append("<ons-list-item class='ng-binding ng-scope list__item ons-list-item-inner' ng-repeat='item in messages'> "
          + document.userName.textbox.value + " | "+ document.myForm.textbox.value +" </ons-list-item>");
      },
      error: function(messages, error) {
        // エラー時に実行される
        alert("Failed to create new object, with error code: " + error.message);
      }
    });
}

angular.module('task.services')
    .factory('retreiveData', function($timeout,$firebaseArray) {
        //var ref = new Firebase("https://panacloudmodule.firebaseio.com/group-tasks");
        var ref = new Firebase("https://panacloudmodule.firebaseio.com/group-tasks/" + 'panacloud' + '/' + 'panaswift');
        var grpPath;

        var path = "https://panacloudmodule.firebaseio.com/group-tasks"
        var ret = [];

        return {
            getSubGroupTask: function() {
                var keyObj = $firebaseArray(ref);

                return keyObj
            },

            getTask: function(grpName) {
                var that = this;
                var numOfNodes;

                //changes required for other createProject.
                path = "https://panacloudmodule.firebaseio.com/group-tasks/panacloud/panaswift"
                path += '/' + grpName;
                console.log(path);

                grpPath = new Firebase(path)
                console.log(grpPath);

                grpPath.once('value',function(datasnapshot){
                    numOfNodes = datasnapshot.numChildren();
                    console.log("once method" + numOfNodes);
                });

                setTimeout(function() {
                    that.numValue(numOfNodes);
                },2000);

            },

            numValue: function (numofNodes) {
                var that = this;
                var phase = [];

                console.log('numValue function ' + path);
                var dataArray = $firebaseArray(grpPath);
                console.log(numofNodes);
                dataArray.$loaded(function (data) {
                    for(var i = 0; i < numofNodes; i++) {
                        phase.push(data[i].$id);
                    }

                    that.taskInPhase(phase);

                }, function(error){
                        console.log(error)
                });
            },

            taskInPhase: function(obj) {
                var check= [];
                var phaseDataRef ;

                console.log("enter in taskPhase " + obj);
                console.log(obj)
                for(var i in obj) {
                    check.push(path + '/' + obj[i] + '/')
                    phaseDataRef = new Firebase(check[i]);

                    ret.push({
                        taskRef : $firebaseArray(phaseDataRef)
                    });
                }
              

            },

            getData: function(){
                return ret;
            }
        }

    })






/*
 ref.on("child_added", function(snapshot) {
 var newPost = snapshot.val();
 console.log(newPost);
 });*/
/*
 ref.on("value", function (snapshot) {
 $timeout(function () {
 keyObj.push(snapshot.name());

 console.log(keyObj);
 });
 })*/
/*              return keyObj;
 */






/*
 phaseData: function(obj) {
 var that = this;

 console.log(obj.length);

 fredSnapshot = obj;
 *//*
 that.taskInPhase(obj[1]);
 *//*
 },*/




/*//path += '/' + fredSnapshot + '/';
 console.log(path);
 var ret ;



 var taskPath = new Firebase(path)


 var task = $firebaseArray(taskPath);

 task.$loaded(function (data) {
 console.log(data.length)
 ret = data[1];
 // console.log(ret)
 },function(error){
 console.log(error)
 });

 setTimeout(function() {
 return ret;
 },2000);
 */

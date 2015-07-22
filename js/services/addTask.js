angular.module('task.services')

    .factory('addTask', function($firebaseArray,$timeout) {
        var groupTasksRef = "https://panacloudmodule.firebaseio.com/group-tasks";

        var path = "";
        var ref;
        var taskId;
        var projectId;
        var list
        return {
            //this method is for testing dont remove
            getProjectData: function(){
                var projectRef = groupTasksRef + '/' + 'panacloud' + '/' + 'panaswift'

                ref = new Firebase(projectRef);
                // projectId = ref.push()

                list = $firebaseArray(ref);
              return list
            },

            createProject: function (projectName) {
                console.log(projectName)
                var projectRef = groupTasksRef + '/' + 'panacloud' + '/' + 'panaswift'

                ref = new Firebase(projectRef);
                projectId = ref.push()


                //dont remove below comment
                // list = $firebaseArray(ref);
                //list.$add({
                //    title: projectName,
                //    desc: "",
                //    lists: {
                //        "To Do": "",
                //        "Doing": "",
                //        "Review": "",
                //        "Done": ""
                //    }
                //}).then(function(ref) {
                //    var id = ref.key();
                //    console.log("added record with id " + id);
                //    list.$indexFor(id); // returns location in the array
                //});


                projectId.set({
                    title: projectName,
                    desc: "",
                    lists: {
                            "To Do": "To Do",
                            "Doing": "Doing",
                            "Review": "Review",
                            "Done": "Done"
                        }
                })

                console.log(projectId)
            },

            createTask: function(listName,task) {

                path = projectId.toString();

                ref = new Firebase(path  + '/' +listName);

                ref.push({
                    title: task.taskInput
                })
            },

            addnewList: function (projectId,listName){
                var projectRef = groupTasksRef + '/' + 'panacloud' + '/' + 'panaswift' + '/' + projectId + '/' +'lists';
                listRef = new Firebase(projectRef)
                var value = listName

                //ref = $firebaseArray(listRef)
                listRef.child(value).set(1)
            },

            deleteList: function (projectId, listname) {
                var projectRef = groupTasksRef + '/' + 'panacloud' + '/' + 'panaswift' + '/' + projectId + '/' +'lists';
                var value = listname;

                listRef.child(value).set(0)
            },

            deleteOldRef: function(ref) {
                ref.remove()
            },
            renameList : function(index,oldName,newName,projectId){
               console.log('rename list')
                var projectRef = groupTasksRef + '/' + 'panacloud' + '/' + 'panaswift' + '/' + projectId + '/' +'lists';
                var that = this;

                ref = new Firebase(projectRef);

                console.log(ref)

                ref.on('value', function(dataSnapshot) {
                    // code to handle new value.

                    $timeout(function() {
                        console.log(dataSnapshot.val())
                        ref.set(newName).set(1);
/*
                        that.deleteOldRef(ref)
*/
                    },3000)

                });

              /*  for(key in change) {
                    if( change.hasOwnProperty(key) ) {
                        ref.child(key).update( change[key] );
                    }
                }  */
            }

        }
    });








/*
            taskInfo:function (task) {
                var taskRef = groupTasksRef + '/' + task.groupId + '/' + task.data + '-task';

                var newRef = new Firebase(taskRef);
                taskId = newRef.push();

                path = taskId.toString();
                ref = new Firebase(path + '/');
            },

            createTask: function (task, attachmentObj, assignedObj) {
                var that = this;
                that.taskDescription(task);

                if(attachmentObj != null) {
                    that.addAttachment(attachmentObj);

                    that.assignMembers(assignedObj)

                    that.stateHistory();
                }
                else {

                }

            },

            taskDescription: function(task) {
                taskId.set({
                    title: task.title,
                    desc: task.description
                });
            },

            addAttachment: function (attachmentObj) {
                ref.child('attachments').push({
                    title: attachmentObj.title,
                    url: attachmentObj.url
                });
            },

            assignMembers: function (assigneesArray ) {
                for (i in assigneesArray) {
                    ref.child('assigned-to').child(assigneesArray[i].name).set({
                        email: assigneesArray[i].email
                    });
                }
            },

            stateHistory: function() {
                ref.child('state-history-timestamps').update({
                    state_id : Firebase.ServerValue.TIMESTAMP
                })
            }
        }
    });*/
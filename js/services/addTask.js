angular.module('task.services')

    .factory('addTask', function($firebaseArray) {
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
                            "To Do": "",
                            "Doing": "",
                            "Review": "",
                            "Done": ""
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
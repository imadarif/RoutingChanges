angular.module('task.services')

    .factory('addTask', function() {
        var groupTasksRef = "https://panacloudmodule.firebaseio.com/group-tasks";

        var path = "";
        var ref ;
        var taskId ;


        return {

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
    });
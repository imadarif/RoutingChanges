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
                            todo: {
                                name: "To Do",
                                task: "",
                                color: "pink"
                            },
                            doing: {
                                name: "Doing",
                                task: "",
                                color: "blue"
                            },
                            review: {
                                name: "Review",
                                task: "",
                                color: "green"
                            },
                            done: {
                                name: "Done",
                                task: "",
                                color: "red"
                            }
                        }
                })
                console.log(projectId)
            },

            createTask: function(projectId,listName,listTask) {

                var projectRef = groupTasksRef + '/' + 'panacloud' + '/' + 'panaswift' + '/' + projectId + '/' +'lists'+'/' +listName + '/' + 'task';


                ref = new Firebase(projectRef);
                //var list = []
                //ref.on('value', function(snap) { list = snap.val();
                //console.log(list)
                //});


               console.log(listTask)
                ref.push({
                    task : listTask.task,
                    attachment : 0,
                })
            },

            addnewList: function (projectId,listName){
                var projectRef = groupTasksRef + '/' + 'panacloud' + '/' + 'panaswift' + '/' + projectId + '/' +'lists';
                listRef = new Firebase(projectRef)
                var value = listName.toLowerCase()
                console.log(value)

                listRef.child(value).set({
                  name : listName,
                  task : "",
                  color: "blue"
                })
            },

            deleteList: function (projectId, listname) {
                var projectRef = groupTasksRef + '/' + 'panacloud' + '/' + 'panaswift' + '/' + projectId + '/' +'lists'+ '/' +listname ;
                listRef = new Firebase(projectRef);
                var onComplete = function(error) {
                    if (error) {
                        console.log('Synchronization failed');
                    } else {
                        console.log('Synchronization succeeded');
                    }
                };
                listRef.remove(onComplete);
            },

            renameList : function(index,listName,newName,projectId){
             //  console.log('rename list')
                var projectRef = groupTasksRef + '/' + 'panacloud' + '/' + 'panaswift' + '/' + projectId + '/' +'lists' + '/' + listName + '/' + 'name';
                var that = this;

                listRef = new Firebase(projectRef);

              //  console.log(ref)

                listRef.on('value', function(dataSnapshot) {
                    // code to handle new value.

                    $timeout(function() {
                    //    console.log(dataSnapshot.val())
                        listRef.set(newName)
/*
                        that.deleteOldRef(ref)
*/
                    },3000)

                });
            },

            toolbarColor: function(projectId,color,listName){
             //   console.log('rename list')
                var projectRef = groupTasksRef + '/' + 'panacloud' + '/' + 'panaswift' + '/' + projectId + '/' +'lists' + '/' + listName + '/' + 'color';
                var that = this;

                listRef = new Firebase(projectRef);
                listRef.set(color)
              //  console.log(listRef)
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
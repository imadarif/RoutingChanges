angular.module("task.controllers")



    //.filter('cardHeadFilter', function() {
    //    return function(obj) {
    //        switch (obj) {
    //            case "A":
    //                return "To Do";
    //                break;
    //            case "B":
    //                return "Doing";
    //                break;
    //            case "C":
    //                return "Review";
    //                break;
    //            case "D":
    //                return "Done";
    //                break;
    //        }
    //    }
    //})

    .controller("CheckingController", function($mdDialog, $timeout, retreiveData, $mdSidenav, $mdUtil, $log,$q,addTask) {
        var test = {};


        var $scope = this;


        $scope.addProjectList = function(projectid,ev){
            console.log(projectid)
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'components/templates/createTask.html',
                targetEvent: ev
            }).then(function(Listname){
/*
                $scope.models.lists + '.' + Listname.toString() = []
*/              addTask.addnewList(projectid,Listname)

                //$scope.models.lists[Listname] = [];
                console.log("List name: " + Listname);
             //   addTask.createProject(projectName);
            },function(){
                console.log("reject");
            });
        }

        $scope.deleteProjectList = function(ev,projectId,listName) {
            console.log(listName)
            $mdDialog.show({
                controller: deleteDialogController,
                templateUrl: 'components/templates/deleteListDailog.html',
                targetEvent: ev
            }).then(function(){
                /*
                 $scope.models.lists + '.' + Listname.toString() = []
                 */
                addTask.deleteList(projectId,listName)

                //$scope.models.lists[Listname] = [];
                console.log("List name: " + listName);
                //  addTask.createProject(projectName);
            },function(){
                console.log("reject");
            });
        }

        $scope.models = {
            selected: null,
            lists: ""
        };
        //$scope.toolbarColor = ["md-primary","md-warn","md-raised","md-accent"];

        $scope.toolbarColor = ["pink","blue","green","red"];

        $scope.rename = function(ev,index,listName,projectId){
            console.log(projectId,index,listName)
            $mdDialog.show({
                controller: renameDialogController,
                templateUrl: 'components/templates/renameDailog.html',
                targetEvent: ev
            }).then(function(newListname){

                //$scope.models.lists[Listname] = [];
                //$scope.models.lists[index]

                console.log(index,listName,newListname)
                addTask.renameList(index,listName,newListname,projectId)
                //console.log($scope.models.lists)
               // console.log("List name: " + newListname);
                //   addTask.createProject(projectName);
            },function(){
                console.log("reject");
            });
        }



        $scope.data = []

        //var getView = function (obj) {
        //    console.log("in getview method ")
        //    //console.log(obj)
        //    console.log(obj.lists)
        //
        //    $scope.models.lists = obj.lists
        //
        //    console.log($scope.models)
        //
        //    var j = 0;
        //
        //    //for(var key in $scope.models.lists) {
        //    //    var data = obj[j++].taskRef;
        //    //    console.log(data)
        //    //
        //    //    for (var i = 0; i < data.length; i++) {
        //    //        $scope.models.lists[key].push({
        //    //            title: data[i].title,
        //    //            desc: data[i].desc
        //    //        })
        //    //    }
        //    //}
        //}

        $scope.colors = {
                        x : 10,
                        y : 10,
                        r : 10,
                        colour: ["pink", "red", "green", "yellow", "blue"]
        }


        $scope.selectedColor = function(projectId,color,index,ind,listName){

            console.log("selected color is : " + color + " index is : " + index + "list index " + ind);

            addTask.toolbarColor(projectId,color,listName)

            //var mainCartElement = angular.element( document.querySelector('#mainCart'));
            //console.log(mainCartElement);
            //
            //var md_list_element = mainCartElement.children(1);
            //console.log(md_list_element);
            //console.log(md_list_element[ind]);
            //
            //var md_card_element = md_list_element[ind].children;
            //console.log(md_card_element);
            //
            //
            //var md_toolbar_element = md_card_element[0].children;
            //console.log(md_toolbar_element);
            //
            //var md_toolbar_change = md_toolbar_element[0];
            //console.log(md_toolbar_change);
            //
            //md_toolbar_change.style.backgroundColor = color;


        }

        $scope.listTask = {}

        $scope.newTask = function(projectId,listName){
            console.log($scope.listTask.task)
            addTask.createTask(projectId,listName,$scope.listTask)
        }

        $scope.cancelTask = function(ind){

            console.log(ind)
            var mainCartElement = angular.element( document.querySelector('#mainCart'));
           // console.log(mainCartElement);

            var md_list_element = mainCartElement.children(1);


            var md_card_element = md_list_element[ind].children;
           // console.log(md_card_element);

            var md_toolbar_element = md_card_element[0].children;

            var md_toolbar_change = md_toolbar_element[2];
           // console.log(md_toolbar_change);

            var md_main_cont = md_toolbar_change.children;

           // console.log(md_main_cont)


            var md_input = md_main_cont[0].children;
           // console.log(md_input)

            md_input[0].style.display = 'block';
            md_input[1].className = "input-button-transition"

            console.log(md_input)
        }

        $scope.inputClick = function(listName,index,ind){

            console.log(ind)
            var mainCartElement = angular.element( document.querySelector('#mainCart'));
            console.log(mainCartElement);

            var md_list_element = mainCartElement.children(1);

            console.log(md_list_element)

            var md_card_element = md_list_element[ind].children;
            console.log(md_card_element);

            var md_toolbar_element = md_card_element[0].children;
            console.log(md_toolbar_element);


            //var md_content_data = md_toolbar_element[1].children;
            //console.log(md_content_data);
            //
            //var md_toolbar_input = md_content_data[1].children;
            //console.log(md_toolbar_input);





            var md_toolbar_change = md_toolbar_element[2];
            console.log(md_toolbar_change);

            var md_main_cont = md_toolbar_change.children;

            console.log(md_main_cont)

            var md_input = md_main_cont[0].children


            md_input[0].style.display = 'none';
            md_input[1].className= 'input-with-transition';

              console.log(typeof($scope.listTask.task))

            $timeout(function () {

                if ($scope.listTask.task === undefined) {
                    md_input[0].style.display = 'block';
                    md_input[1].className = 'input-button-transition';
                }

            },5000)




            /*var element = angular.element(document.querySelector('#testing-input'));
           console.log(element);
            var child1 = element.children(1);*/
/*
         /*   console.log(child1)*!/
            md_toolbar_element.style.display = 'none';
            console.log(child1[1]);
            md_toolbar_element.className = ' input-with-transition';*/



        }




        //side menu projects
        $scope.projectDetail = [
            {
                projectname : "User Experience Design",
                overdue : 0,
                duesoon : 0,
                members : 50,
                tasks :25
            },
            {
                projectname : "Android Development",
                overdue : 0,
                duesoon : 5,
                members : 50,
                tasks :25
            },
            {
                projectname : "Web App Development",
                overdue : 3,
                duesoon : 2,
                members : 50,
                tasks :25
            }
        ]


        //$scope.add = function(ev){
        //    $mdDialog.show({
        //        controller: DialogController,
        //        templateUrl: 'components/templates/createTask.html',
        //        targetEvent: ev
        //    })
        //}

        //$scope.recieveTask = function() {
        //    $scope.checkData = retreiveData.taskInPhase();
        //
        //    setTimeout(function () {
        //        console.log($scope.checkData);
        //    },2000);
        //}


        $scope.toggleRight = buildToggler('right');

        function buildToggler(navID) {
            var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            },300);
            return debounceFn;
        }


        $scope.loadUsers = function() {
            $scope.projects = [];
            return $timeout(function() {
                $scope.projects = retreiveData.getSubGroupTask();
                console.log($scope.projects)


            }, 550);

        }

        $scope.Select = function (projectId) {


       //     retreiveData.getTask(projectId);

            retreiveData.getTask(projectId);

            return $timeout(function() {
                var data  = retreiveData.getData();
                $scope.models.lists = data.lists
                console.log(data)
            }, 550);

        //    $timeout(function () {
       //         test = retreiveData.getData();
       //         //console.log(test);
        //        getView(test)
       //     },3000);/*
         //    " ".go('task')
       //      */
        }

        var self = this;

        self.simulateQuery = false;
        self.isDisabled    = false;
        self.searchText = false;
        self.repos         = loadAll();
        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;

        function loadAll() {
            var repos = [
                {
                    'name'      : 'Angular 1',
                    'url'       : 'https://github.com/angular/angular.js',
                    'watchers'  : '3,623',
                    'forks'     : '16,175'
                },
                {
                    'name'      : 'Angular 2',
                    'url'       : 'https://github.com/angular/angular',
                    'watchers'  : '469',
                    'forks'     : '760'
                },
                {
                    'name'      : 'Angular Material',
                    'url'       : 'https://github.com/angular/material',
                    'watchers'  : '727',
                    'forks'     : '1,241'
                },
                {
                    'name'      : 'Bower Material',
                    'url'       : 'https://github.com/angular/bower-material',
                    'watchers'  : '42',
                    'forks'     : '84'
                },
                {
                    'name': 'Material Start',
                    'url': 'https://github.com/angular/material-start',
                    'watchers': '81',
                    'forks': '303'
                }
            ];
            return repos.map( function (repo) {
                repo.value = repo.name.toLowerCase();
                return repo;
            });
        }
        function querySearch (query) {
            var results = query ? self.repos.filter( createFilterFor(query) ) : self.repos,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);

                return deferred.promise;
            } else {

                return results;
            }
        }
        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }
        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(item) {

                return (item.value.indexOf(lowercaseQuery) === 0);
            };
        }


        $scope.addproject = function(ev){
            $mdDialog.show({
                controller: NewProjectController,
                templateUrl: 'components/templates/newProjectDailog.html',
                targetEvent: ev
            })
                .then(function(projectName){

                    console.log("createProject name: " + projectName);
                    addTask.createProject(projectName);
                },function(){
                    console.log("reject");
                });
        };

    })

    .controller('RightCtrl', function ($scope,$timeout, $mdSidenav, $log) {

        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        }
    })

    function DialogController($scope,$mdDialog, addTask) {

       $scope.initialize = {};

        $scope.cancel = function () {
            $mdDialog.cancel();
            console.log("cancel");
        };

        $scope.save = function () {
            //addTask.taskInfo($scope.initializeGroup);
            console.log($scope.initialize.list);
            $mdDialog.hide($scope.initialize.list);
/*
            " ".go("form");
*/
        }
    }

    function NewProjectController($scope,$mdDialog) {



     //$scope.initializeGroup = {};

    $scope.cancel = function () {
        console.log("cancel");
        $mdDialog.cancel();
    };

    $scope.save = function (projectName) {
        console.log(projectName);
        $mdDialog.hide(projectName);
    }
}

    function renameDialogController($scope,$mdDialog) {

    $scope.list = {};

    $scope.cancel = function () {
        $mdDialog.cancel();
        console.log("cancel");
    };

    $scope.save = function () {
        $mdDialog.hide($scope.list.name);

    }
}

    function deleteDialogController($scope,$mdDialog) {



    $scope.cancel = function () {
        $mdDialog.cancel();
        console.log("cancel");
    };

    $scope.save = function () {
        $mdDialog.hide();
    }
}
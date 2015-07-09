angular.module("task.controllers")

    //.config(function($mdThemingProvider) {
    //    $mdThemingProvider.theme('default')
    //        .primaryPalette('pink')
    //        .accentPalette('orange');
    //}
    //)

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
        var test = "";

var index
        var $scope = this;
        $scope.models = {
            selected: null,
            lists: {"To Do": [], "Doing": [],"Review": [], "Done": []}
        };

        $scope.toolbarColor = ["pink","blue","green","red"];



        var getView = function (obj) {
            console.log(obj)
            var j = 0;

            for(var key in $scope.models.lists) {
                var data = obj[j++].taskRef;
                console.log(data)

                for (var i = 0; i < data.length; i++) {
                    $scope.models.lists[key].push({
                        title: data[i].title,
                        desc: data[i].desc
                    })
                }
            }
        }

        $scope.colors = {
                        x : 10,
                        y : 10,
                        r : 10,
                        colour: ["pink", "red", "green", "yellow", "blue"]
        }


        $scope.selectedColor = function(color,index,ind){
            console.log("selected color is : " + color + " index is : " + index + "list index " + ind);


            var mainCartElement = angular.element( document.querySelector('#mainCart'));
            console.log(mainCartElement);

            var md_list_element = mainCartElement.children(1);
            console.log(md_list_element);
            console.log(md_list_element[ind]);

            var md_card_element = md_list_element[ind].children;
            console.log(md_card_element);


            var md_toolbar_element = md_card_element[0].children;
            console.log(md_toolbar_element);

            var md_toolbar_change = md_toolbar_element[0];
            console.log(md_toolbar_change);

            md_toolbar_change.style.backgroundColor = color;


        }

        $scope.task = {}

        $scope.newTask = function(listName){
            console.log(listName)
            addTask.createTask(listName,$scope.task)
        }

        $scope.cancelTask = function(ind){


            console.log(ind)
            var mainCartElement = angular.element( document.querySelector('#mainCart'));
            console.log(mainCartElement);

            var md_list_element = mainCartElement.children(1);


            var md_card_element = md_list_element[ind].children;
            console.log(md_card_element);

            var md_toolbar_element = md_card_element[0].children;

            var md_toolbar_change = md_toolbar_element[2];
            console.log(md_toolbar_change);

            var md_main_cont = md_toolbar_change.children;

            console.log(md_main_cont)


            var md_input = md_main_cont[0].children;
            console.log(md_input)

            md_input[0].style.display = 'block';
            md_input[1].className = 'input-button-transition';
        }

        $scope.inputClick = function(listName,index,ind){
            var mainCartElement = angular.element( document.querySelector('#mainCart'));
            console.log(mainCartElement);

            var md_list_element = mainCartElement.children(1);


            var md_card_element = md_list_element[ind].children;
            console.log(md_card_element);

            var md_toolbar_element = md_card_element[0].children;

            var md_toolbar_change = md_toolbar_element[2];
            console.log(md_toolbar_change);

            var md_main_cont = md_toolbar_change.children;

            console.log(md_main_cont)


            var md_input = md_main_cont[0].children;
            console.log(md_input)

            md_input[0].style.display = 'none';
            md_input[1].className= 'input-with-transition';

            console.log(typeof($scope.task.taskInput))

            $timeout(function () {

                if ($scope.task.taskInput === undefined) {
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


        $scope.add = function(ev){
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'components/templates/createTask.html',
                targetEvent: ev
            })
        }

        $scope.recieveTask = function() {
            $scope.checkData = retreiveData.taskInPhase();

            setTimeout(function () {
                console.log($scope.checkData);
            },2000);
        }


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
                $scope.projects = retreiveData.getGroups();
                console.log($scope.projects)


            }, 550);

        }

        $scope.Select = function (obj) {

            console.log("select method call" +  obj);
            retreiveData.getTask(obj);


            $timeout(function () {
                test = retreiveData.getData();
                console.log(test);
                getView(test)
            },3000);/*
             " ".go('task')
             */
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



        var vm = this;
        vm.notificationsEnabled = true;
        vm.toggleNotifications = function() {
            vm.notificationsEnabled = !vm.notificationsEnabled;
        };
        vm.redial = function(e) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Suddenly, a redial')
                    .content('You just called someone back. They told you the most amazing story that has ever been told. Have a cookie.')
                    .ok('That was easy')
            );
        };
        vm.checkVoicemail = function() {
            // This never happens.
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

    function DialogController($mdDialog, addTask) {
        var $scope = this;
        $scope.initializeGroup = {};

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.save = function () {
            addTask.taskInfo($scope.initializeGroup);
            $mdDialog.hide();
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





















//this.Select = function (obj) {
//    console.log(obj);
//    retreiveData.getTask(obj);
//


//this.recieve = function () {
//
//    /*
//     retreiveData.numValue();
//     */
//    (function () {
//
//        this.check = retreiveData.getTask();
//        console.log(this.check)
//
//        console.log(retreiveData.getItem);
//        this.$apply();
//    },2000)
//
//
//}




//}



/*
 this.check = function () {
 (function () {

 // this.check = retreiveData.getTask();
 //console.log(this.check)


 this.$apply();
 },2000)
 };*/





//function generateData(test){
///*for (var i = 1; i <= 3; ++i) {
//    console.log(test[i])
//            this.models.lists.A.push({label: "Item B" + i});
//            this.models.lists.B.push({label: "Item B" + i});
//            this.models.lists.C.push({label: "Item C" + i});
//            this.models.lists.D.push({label: "Item D" + i});
//
//}*/
//
//    " ".go('task')
//
//}

// Generate initial model





/*console.log("hello");
 var checkingElement = angular.element( document.querySelector('#hello'));
 checkingElement.addClass('hello');




 console.log(checkingElement);*/
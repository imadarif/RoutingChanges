angular.module('task', ['ngNewRouter', 'task.controllers', 'task.services', 'dndLists', 'firebase', 'ngMaterial', 'ngMdIcons'])




    .controller('taskMainController', function($router) {
        $router.config([
            { path: '/', component: 'checking'},
            { path: '/main', component: 'checking'}
        ])
    });
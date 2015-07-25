angular.module('task', ['ngNewRouter', 'task.controllers', 'task.services', 'dndLists', 'firebase', 'ngMaterial', 'ngMdIcons'])



    .config(['$mdThemingProvider', function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('pink',{
                'default': '300', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': 'A400', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A200' // use shade A100 for the <code>md-hue-3</code> class
            })

        //$mdThemingProvider.setDefaultTheme('default');
    }
    ])

    .controller('taskMainController', function($router) {
        $router.config([
            { path: '/', component: 'checking'},
            { path: '/main', component: 'checking'}
        ])
    });
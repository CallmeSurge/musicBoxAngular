

angular.module('musicApp').directive('audioLoader', function(){
    return function (scope, element, attrs){
        console.log(scope.playState);
        scope.$watch("audioLink",  function(newValue, oldValue){ 
            if (typeof element[0].attributes[4]!=='undefined') {
                element[0].attributes[1].value=newValue;
                console.log(element[0].attributes[1].value);
                element[0].play();
            }
        }, true);
    }
});

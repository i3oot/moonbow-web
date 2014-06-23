'use strict';

angular.module('moonbowWebApp.Me', ['angular-files-model', 'moonbow.services.sprite'])
    .controller("MeCtrl", function ($scope, $modal, sprites) {
        $scope.showAddDialog = function(){
            $modal({scope: $scope, template: 'views/meAdd.html', show: true});
        };
        
        $scope.save = function () {
            sprites.saveSprite(
                $scope.thetitle,
                $scope.fileModel.selectedFiles[0].name,
                $scope.fileModel.selectedFiles[0].size,
                $scope.fileModel.selectedFiles[0].type,
                $scope.fileModel.dataUrl,
                $scope.makePublic
            );
    
            $scope.close();
        };
        
        $scope.close = function(){
            $scope.fileModel = {selectedFiles: ''};
            $scope.thetitle = ''; 
            $scope.makePublic = true;
        };

         $scope.selectedFileOk = function(){
            if($scope.fileModel.selectedFiles == '') return false;
            if($scope.fileModel.selectedFiles.length < 1) return false;
            if($scope.fileModel.selectedFiles[0].size > (1024 * 1024 * 2)) return false;
            if(!$scope.fileModel.selectedFiles[0].type.startsWith('image')) return false;
            return true;
        }
        
        $scope.close();
        $scope.$watch('fileModel.selectedFiles', function(newVal, oldVal){
            if(!$scope.selectedFileOk()){
                return;
            }
            
             var reader = new FileReader();
             reader.onload = function(e) {
                $scope.$apply(function () {
                    $scope.fileModel.dataUrl = reader.result;
                });
            }
             if(typeof $scope.fileModel.selectedFiles[0] == 'undefined'){
                 return;
             }
            reader.readAsDataURL($scope.fileModel.selectedFiles[0]); 
        }, true);


    });
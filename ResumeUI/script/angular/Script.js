/// <reference path="angular.js" />


var app = angular.module('ResumeUI', []);
app.controller('ResumeController', function ($scope, $http, $rootScope) {

    //ResumeController

    $scope.profile_decr = {};
    $scope.extraCur = {};
    $scope.education = {};
    $scope.selectedExam = {};
    $scope.skills = {};
    $scope.reference = {};
    $scope.ViewResumeID = {};
    $scope.selectedTool = {};
    selectedExpertise = {};
    $scope.MyPro = {};

   
    //post personal profile
    
    $scope.addPersonalInfo = function () {

        var data = $scope.profile_decr;
        var url = "http://localhost:59637/api/profile/POST";

        $http.post(url, data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(function (response) {
            //$scope.profile_decr = {};
           
            $scope.getID();
            $scope.redirecToEducation();
            });



       //to go to education page

        $scope.redirecToEducation = function () {
            window.location = "/Education.html";
        }
        //console.log($scope.profile_decr);
       }



    //to get the id of the current user
    $scope.getID = function () {
        $http.get("http://localhost:59637/api/profile/GET")
            .then(function (response) {
                //console.log(response);
                $scope.profile = response.data;
                //$scope.Model.Id = $scope.profile.ressume_id;
                $scope.extraCur.resume_id = $scope.profile.ressume_id;
                $scope.education.resume_id = $scope.profile.ressume_id;
                $scope.skills.resume_id = $scope.profile.ressume_id;
                $scope.reference.resume_id = $scope.profile.ressume_id;
                $scope.ViewResumeID = $scope.profile.ressume_id;
            });
    }
      
    $scope.getID();
   

    //to add extracurricular activities in db

    $scope.addExtraCurricular = function () {


        var data1 = $scope.extraCur;

        var url = "http://localhost:59637/api/extraCurricular/POST";

        $http.post(url, data1,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(function (response) {
            $scope.extraCur.activity = null;
            
        });


    }

    //to go to education page

    $scope.redirctToExtraCur = function () {
        window.location = "/Extracurricular.html";
    }
    //Problem Solved

    //dropdown for exam names

    $scope.DropdownValueofExam = function () {
        $http.get("http://localhost:59637/api/education/GET")
            .then(function (response) {

                $scope.education.exam = response.data;
                //console.log($scope.education);
            });
        
    };
    $scope.DropdownValueofExam();


    $scope.addEducationInfo = function () {
        $scope.education.exam_id = $scope.selectedExam.exam_id;
        var data = $scope.education;
        var url = "http://localhost:59637/api/education/POST";


        $http.post(url, data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(function (response) {
            $scope.education.institute_name = null;
            $scope.education.result = null;
            $scope.education.graduation_year = null;
            $scope.selectedExam = null;

        });
       

    }

    //to fo to the skills page
    $scope.redirctToSkills = function () {
        window.location = "/Skills.html";
    }

     //dropdown for skill tools names

    $scope.DropdownValueofSkillTools = function () {
        $http.get("http://localhost:59637/api/skills/skills")
            .then(function (response) {

                $scope.skills.toolsTab = response.data;
                //console.log($scope.education);
            });

    };
    $scope.DropdownValueofSkillTools();

    //dropdown for skill expertise level names

    $scope.DropdownValueofSkillExpertise = function () {
        $http.get("http://localhost:59637/api/skills/GET")
            .then(function (response) {

                $scope.skills.expertiseTab = response.data;
                //console.log($scope.education);
            });

    };
    $scope.DropdownValueofSkillExpertise();

    //post on skills table
    $scope.addSkillsinfo = function () {
        $scope.skills.s_id = $scope.selectedTool.s_id;
        $scope.skills.toolsExpertId = $scope.selectedExpertise.toolsExpertId;

        var data = $scope.skills;
        var url = "http://localhost:59637/api/skills/POST";


        $http.post(url, data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(function (response) {
            
            $scope.selectedTool = {};
            $scope.selectedExpertise = {};

        });


    }
    //to go to the reference page
    $scope.redirctToReference = function () {
        window.location = "/Reference.html";
    }

    //to add reference to db

    $scope.addReferenceInfo = function () {


        var data1 = $scope.reference;

        var url = "http://localhost:59637/api/reference/POST";

        $http.post(url, data1,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(function (response) {
            $scope.reference.teacher_name = null;
            $scope.reference.teacher_email = null;
            $scope.reference.teacher_phone = null;

        });


    }

    //to go to the viewResume page
    $scope.redirctToViewResume = function () {
        window.location = "/ViewResume.html";
    }


    //$scope.GetData = function () {
    //    $http.get("http://localhost:59637/api/profile/GET")
    //        .then(function (response) {
    //            $scope.MyPro = response.data;
    //            $scope.show();
    //        });
    //}
    //$scope.GetData();



    //$scope.show = function () {
    //    var data = $scope.MyPro.ressume_id;
    //    var url = "http://localhost:59637/api/Profile/Resume";

    //    $http.post(url, data,
    //        {
    //            headers: {
    //                'Content-Type': 'application/json'
    //            }
    //        }
    //    ).then(function (response) {
    //        $scope.ViewResume = response.data;

    //    });

    //}
    //$scope.show();

});

app.controller('ResumeViewController', function ($scope, $http) {
    
    $scope.GetData = function () {
        $http.get("http://localhost:59637/api/profile/GET")
            .then(function (response) {
                $scope.MyPro = response.data;
                $scope.show();
            });
    }
    $scope.GetData();


    $scope.show = function () {
        var data = $scope.MyPro.ressume_id;
        var url = "http://localhost:59637/api/Profile/Resume";

        $http.post(url, data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(function (response) {
            $scope.ViewResume = response.data;

        });

    }
    //$scope.show();

});




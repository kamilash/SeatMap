"use strict";
var desks = [];
var students = [];

var takeLowerGrade = function() {
    var grade = 11;
    var index = 0; 
    var student = {};
    for(var x=0; x < students.length; x++) { //students
        if(students[x].grade < grade) {
            grade = students[x].grade;
            index = x;
            student = students[x];
        }
    };
    students.splice(index, 1);
    return student;
};

var organizeByGrade = function() {
    for(var x=0; x < 3; x++) {
        desks[x] = [];
        for(var y=0; y < 3; y++) { //desks
            var student = takeLowerGrade();
            desks[x][y] = student;
        };
    };
};

var checkHeight = function (y) {
    for(var x=0; x < 3; x++) {
        if(desks[y][x].height < desks[y-1][x].height) {
            var tempStudent = desks[y-1][x];
            desks[y-1][x] = desks[y][x];
            desks[y][x] = tempStudent;
        }
    };
};

var correctByHeight = function() {
    checkHeight(2);
    checkHeight(1);
    checkHeight(2);
};

var checkIfLowerThanNeighboors = function (x,y) {
    if (y === 0) {
        var y1 = 1;
        var y2 = 2;
    }
    if (y === 1) {
        var y1 = 0;
        var y2 = 2;
    }
    if (y === 2) {
        var y1 = 0;
        var y2 = 1;
    }
    var lowerThan;
    if(desks[x][y].height < desks[x][y1].height) {
        lowerThan = "first";
    }
    if(desks[x][y].height < desks[x][y2].height) {
        if(lowerThan === "first") {
            return "both";
        }
        return "second";
    }
    return "none";
}

var correctByGrade = function(x,y) {
    if (y === 0) {
        var y1 = 1;
        var y2 = 2;
    }
    if (y === 1) {
        var y1 = 0;
        var y2 = 2;
    }
    if (y === 2) {
        var y1 = 0;
        var y2 = 1;
    }
    var isLowerThan = checkIfLowerThanNeighboors(x,y);
   
    if (isLowerThan === "none") {
        return;
    } else if (isLowerThan === "first") {
        if (desks[x][y].grade < desks[x-1][y1].grade) {
            var student = desks[x-1][y1];
            desks[x-1][y1] = desks[x][y];
            desks[x][y] = student;
        }
    } else if (isLowerThan === "second") { 
        if (desks[x][y].grade < desks[x-1][y2].grade) {
            var student = desks[x-1][y2];
            desks[x-1][y2] = desks[x][y];
            desks[x][y] = student;
        }
    } else {
        if (desks[x-1][y1].grade < desks[x-1][y2].grade) {
            if(desks[x][y].grade < desks[x-1][y2].grade) {
                var student = desks[x-1][y2];
                desks[x-1][y2] = desks[x][y];
                desks[x][y] = student;
            }
        } else {
            if(desks[x][y].grade < desks[x-1][y1].grade) {
                var student = desks[x-1][y1];
                desks[x-1][y1] = desks[x][y];
                desks[x][y] = student;
            }
        }
    }
};

module.exports.getSeatMap = function (studentsList) {
    students = studentsList;
    
    organizeByGrade();
    correctByHeight();
    correctByGrade(1,0);
    correctByGrade(1,1);
    correctByGrade(1,2);
    correctByGrade(2,0);
    correctByGrade(2,1);
    correctByGrade(2,2);

    return desks;
};


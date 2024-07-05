"use strict";
// const count = 6
// for (let index = 0; index < 20; index++) {
//     const randomIndex = Math.floor(Math.random() * (count)) + 2;
//     console.log(randomIndex);
Object.defineProperty(exports, "__esModule", { value: true });
var fakerUtils_1 = require("./utils/fakerUtils");
// }
function getCurrentDateFormatted() {
    var date = new Date();
    var month = String(date.getMonth() + 1);
    console.log(month);
    var day = String(date.getDate());
    console.log(day);
    var year = date.getFullYear();
    return "".concat(month, "/").concat(day, "/").concat(year);
}
//getCurrentDateFormatted()
for (var index = 0; index < 10; index++) {
    console.log(fakerUtils_1.FakerData.getCourseName());
}

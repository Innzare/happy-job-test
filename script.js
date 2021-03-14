// function start() {

//   let reqAnimFrame = (function() {
//     return requestAnimationFrame ||
//       mozRequestAnimationFrame ||
//       webkitRequestAnimationFrame ||
//       oRequestAnimationFrame ||
//       msRequestAnimationFrame ||
//       function(callback) {
//         setTimeout(callback, 1000 / 60);
//       }
//   })();

//   let dataCircle = document.querySelectorAll('.progressbar__thumb');

//   function setProgress(percent, selector) {
//     let circle = selector.querySelector('.progressbar__thumb');
//     let total = circle.r.baseVal.value;
//     circle.style.strokeDasharray = `${total*percent/100} `;
//     selector.querySelector('text').innerHTML = '<tspan>' + percent.toFixed(0) + '</tspan>%';
//   }

//   function circle(final, i) {
//     let number = -1;
//     i++;
//     let selector = '.progress__container:nth-child(' + i + ')';
//     let mainSelector = document.querySelector(selector);
//     let myReq = null;

//     function circleStep() {
//       myReq = reqAnimFrame(circleStep);
//       setProgress(number, mainSelector);
//       if (number >= final) {
//         cancelAnimationFrame(myReq);
//       }
//       number++;
//     }
//     circleStep();
//   }

//   for (let i = 0; i < dataCircle.length; i++) {
//     let num = dataCircle[i].getAttribute('data-circle');
//     circle(num, i);
//   }

// }

// document.addEventListener('DOMContentLoaded', () => {
//   start();
// });


function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
   var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
 
   return {
     x: centerX + (radius * Math.cos(angleInRadians)),
     y: centerY + (radius * Math.sin(angleInRadians))
   };
 }
 
 function describeArc(x, y, radius, startAngle, endAngle){
 
     var start = polarToCartesian(x, y, radius, endAngle);
     var end = polarToCartesian(x, y, radius, startAngle);
 
     var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
 
     var d = [
         "M", start.x, start.y, 
         "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
     ].join(" ");
 
     return d;       
 }
 
 window.onload = function() {
    const diag1 = 140,
          diag2 = 240;
   document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 100, 25, 335));
   document.getElementById("arc2").setAttribute("d", describeArc(150, 150, 100, 25, diag1));
   document.getElementById("arc3").setAttribute("d", describeArc(150, 150, 100, diag1, diag2));


   const path = document.querySelectorAll('#arc2');

   function getPathLength(figure){
      figure.forEach(element => {
         element.style.strokeDasharray = `${element.getTotalLength() }`;
         element.style.strokeDashoffset = `${element.getTotalLength() }`;
      });
   }

   setTimeout(() => {
      document.getElementById("arc3").style.visibility = 'visible';
   }, 700);
   
   getPathLength(path); 

};
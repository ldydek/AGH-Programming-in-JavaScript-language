"use strict"; // Nie wyłączaj trybu ścisłego    
var canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = 'xor';
ctx.fillStyle = '#4444aa';
ctx.rect(canvas.width / 4 + canvas.width / 16, canvas.height / 4 + canvas.height / 16, canvas.width / 2 / 2, canvas.height / 2 / 2);
ctx.fill();
ctx.fillStyle = '#44aa44';
ctx.beginPath();
ctx.rect(canvas.width / 4 * 2 - canvas.width / 16, canvas.height / 4 * 2 - canvas.height / 16, canvas.width / 2 / 2, canvas.height / 2 / 2);
ctx.fill();
module.exports = class Chart {
    constructor (element) {
        this.data = [];
        this.points = 700;

        this.canvas = document.querySelector(element);
        
        if ( !this.canvas ) throw new Error("[Chart] Cannot find element with selector '" + element +"'");

        // this.ctx = new CanvasRenderingContext2D();
        this.ctx = this.canvas.getContext("2d");
        this.ctx.canvas.width = this.canvas.clientWidth;
        this.ctx.canvas.height = this.canvas.clientHeight;

        this.ctx.lineJoin = "round";
        this.ctx.strokeStyle = "#c33";
    }

    push(values) {
        this.data.push(...values);
    }

    render() {
        // this.ctx.canvas.width = this.canvas.clientWidth;
        // this.ctx.canvas.height = this.canvas.clientHeight;

        this.ctx.strokeStyle = "rgb(200,40,20)";
        this.ctx.fillStyle = "rgba(200,40,20,0.2)";
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.beginPath();
        this.ctx.moveTo(100, -1);
        for (let i = 0; i < this.points; i++) {
            console.log(i);
            
            this.ctx.lineTo( (40 - (this.data[this.data.length - i] || 0)) / 40 * this.canvas.width, i * (this.canvas.height / this.points));
        }
        this.ctx.lineTo(this.canvas.width,this.canvas.height + 1);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    update(values) {
        this.push(values);
        this.render();
    }
}

// const CanvasJS = require('canvasjs');


// module.exports = class LiveChart {
//     constructor (el, data) {
//         this.data = data;
//         this.c = new CanvasJS.Chart(el, {
//             data: [{
//                 type: "line",
//                 dataPoints: this.data
//             }]
//         });
//     }

//     update(data) {
//         this.data.push(...data);
//         this.c.render();
//     }
// }
const fs = require('fs');
const $ = require('jquery');

//To be changed /!\
const simulatorPath = "/home/herrcrazi/Documents/regutherm/src/";


var ledPowerBlink; // Timeout for led blinking in indeterminate state
var ledSyncFlash; // Timeout for sync led flashes


function updateIndicators(data = ['&nbsp;', '&nbsp;', '']) {
    $("#t_ext .value").html(data[0]);
    $("#t_ext progress.bar").attr('value', data[0]);

    $("#t_int .value").html(data[1]);
    $("#t_int progress.bar").attr('value', data[1]);

    clearInterval(ledPowerBlink); // Clear any previous timer beforehand
    clearTimeout(ledSyncFlash);
    
    if (data[2] == "true") {
        $("#power-led .led-indicator").addClass('on');
    }
    else if (data[2] == "false") {
        $("#power-led .led-indicator").removeClass('on');
    } else {
        ledPowerBlink = setInterval(() => {
            $("#power-led .led-indicator").toggleClass("on");
        }, 500);
    }

    $("#sync-led .led-indicator").addClass("on");
    ledSyncFlash = setTimeout(() => {
        $("#sync-led .led-indicator").removeClass("on");        
    }, 50);
}


fs.watch(simulatorPath + "data.txt", (e, filename) => {
   
    let data = fs.readFileSync(simulatorPath + "data.txt", { encoding: "utf-8" }).split('\n');
    console.log(data);

    updateIndicators(data)
});


window.onload = () => {

    updateIndicators();
}
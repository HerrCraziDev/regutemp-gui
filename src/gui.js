const fs = require('fs');
const $ = require('jquery');
const Chart = require('./chart');

//To be changed /!\
const simulatorPath = "/home/herrcrazi/Documents/regutherm/src/";


var ledPowerBlink; // Timeout for led blinking in indeterminate state
var ledSyncFlash; // Timeout for sync led flashes
var t_ext, t_int;

function updateTemp(data = ['&nbsp;', '&nbsp;', '']) {

    t_ext = data[0] || 0;
    t_int = data[1] || 0;

    //Update temperature indicators
    $("#t_ext .value").html(t_ext || '&nbsp;');
    $("#t_ext progress.bar").attr('value', t_ext);

    $("#t_int .value").html(t_int || '&nbsp;');
    $("#t_int progress.bar").attr('value', t_int);

    clearInterval(ledPowerBlink); // Clear any previous timer beforehand
    clearTimeout(ledSyncFlash);
    
    /**
     * Control the red power led :
     * on -> heating activated
     * off -> heating off
     * blinking -> program not started, idle
     */
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

    // Make the "Sync" led flash (indicates when the values are refreshed)
    $("#sync-led .led-indicator").addClass("on");
    ledSyncFlash = setTimeout(() => {
        $("#sync-led .led-indicator").removeClass("on");
    }, 50);
}


fs.watch(simulatorPath + "data.txt", (e, filename) => {
   
    let data = fs.readFileSync(simulatorPath + "data.txt", { encoding: "utf-8" }).split('\n');
    console.log(data);

    updateTemp(data);
});

fs.watch(simulatorPath + "consigne.txt", (e, filename) => {
    $("#target-input").val(fs.readFileSync(simulatorPath + "consigne.txt", { encoding: "utf-8" }).split('\n')[0] || "14.0");
});


window.onload = () => {

    updateTemp();

    chart = new Chart("#chart-output", [0, 40, 20, 15]);
    setInterval(() => {
        chart.render();
    }, 200);

    setInterval(() => {
        chart.push([t_int]);
    }, 80);
    
    $("#target form").submit( e => {
        e.preventDefault();
        fs.writeFileSync(simulatorPath + 'consigne.txt', $("#target-input").val(), { encoding: "utf-8" });
    });
}
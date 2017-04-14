
var client = new Keen({
    projectId: "5821c49e8db53dfda8a779ee",
    readKey: "C2D53BF30E5134545F70779F7A68ED18F6DBD4C9C815AA79DCEC532A45097F28E139C1FCDEB12C01CD68F10831E4EAF71668FB2A7A242E54BEAAE067A46988CC532C4966130F8C2DAD90D3D9DFBA325115BB3AE629377A42D2B823A3DB62A45F"
});


Keen.ready(function(){


    // ----------------------------------------
    // Enviromental
    // ----------------------------------------

    // Queries ///////////////////////////////////////////////////////////


    var bmp180_temp_avg = new Keen.Query("average", {
        eventCollection: "stream",
        filters: [
            {
                "operator": "eq",
                "property_name": "sensor_id",
                "property_value": "51c8f22a-e191-11e5-914d-001dbaefa596"
            },
        ],
        interval: "hourly",
        targetProperty: "sensor_data.temp",
        timeframe: "this_5_days",
        timezone: "UTC"
    });

    var dht_temp_avg = new Keen.Query("average", {
        eventCollection: "stream",
        filters: [
            {
                "operator": "eq",
                "property_name": "sensor_id",
                "property_value": "1e693dee-e0b6-11e5-8f44-001dbaefa596"
            }
        ],
        interval: "hourly",
        targetProperty: "sensor_data.temp",
        timeframe: "this_5_days",
        timezone: "UTC"
    });


    var bmp_pres_avg = new Keen.Query("average", {
        eventCollection: "stream",
        interval: "hourly",
        targetProperty: "sensor_data.press",
        timeframe: "this_5_days",
        timezone: "UTC"
    });


    // Charts ///////////////////////////////////////////////////////////

    ///////////
    var chart_bmp_pres_avg = new Keen.Dataviz();

    chart_bmp_pres_avg
        .el(document.getElementById("chart_07"))
        .chartType("linechart")
        .title(false)
        .height(250)
        .width("auto")
        .chartOptions({
        chartArea: {
            height: "80%",
            left: "5%",
            top: "5%",
            width: "75%"
        },
        hAxis: {
            format:'d/MMM H:M',
            //            gridlines:  {count: 12}
        },

        vAxis: { 
            viewWindow: {
                min: 880,
                max: 1000
            }
        },


        isStacked: true

    })
        .prepare();

    var req_bmp_pres_avg = client.run(bmp_pres_avg, function(err, res){
        if (err) {
            chart_bmp_pres_avg.error(err.message);
        }
        else {
            chart_bmp_pres_avg
                .parseRequest(this)
                .title("New Customers per Week")
                .render();
        }
    });



    ///////////
    var chart_temp_avg = new Keen.Dataviz();

    chart_temp_avg
        .el(document.getElementById("chart_06"))
        .chartType("linechart")
        .height (250)
        .width("auto")
        .title(false)
        .chartOptions({
        chartArea: {
            height: "80%",
            left: "5%",
            top: "5%",
            width: "75%"
        },
        hAxis: {
            format:'d/MMM H:M',
            //            gridlines:  {count: 12}
        },
        vAxis: { 
            viewWindow: {
                min: 10,
                max: 45
            }
        }  
    })
    .prepare();

    var req_temp_avg = client.run(bmp180_temp_avg,function(err, response) {
        if (err) {
            // Display the API error
            chart_temp_avg.error(err.message);
            console.log(err.message);
        }
        else {
            chart_temp_avg
            .parseRequest(this)
            .render();
        }
    });    


    // ----------------------------------------
    // Energy Metering
    // ----------------------------------------

    // Queries ////////////////////////////////

    var energy_ch1_irms_line_avg = new Keen.Query("average", {
        eventCollection: "stream",
        interval: "hourly",
        targetProperty: "sensor_data.ch1.Irms",
        timeframe: "this_10_days",
        timezone: "UTC"
    });
    var energy_ch2_irms_line_avg = new Keen.Query("average", {
        eventCollection: "stream",
        interval: "hourly",
        targetProperty: "sensor_data.ch2.Irms",
        timeframe: "this_10_days",
        timezone: "UTC"
    });

    var energy_ch1_irms_gage_avg = new Keen.Query("minimum", {
        eventCollection: "stream",
        targetProperty: "sensor_data.ch1.Irms",
        timeframe: "this_30_minutes",
        timezone: "UTC"
    });
    var energy_ch2_irms_gage_avg = new Keen.Query("minimum", {
        eventCollection: "stream",
        targetProperty: "sensor_data.ch2.Irms",
        timeframe: "this_30_minutes",
        timezone: "UTC"
    });


    var energy_ch1_vrms_line_avg = new Keen.Query("average", {
        eventCollection: "stream",
        interval: "hourly",
        targetProperty: "sensor_data.ch1.Vrms",
        timeframe: "this_10_days",
        timezone: "UTC"
    });
    var energy_ch2_vrms_line_avg = new Keen.Query("average", {
        eventCollection: "stream",
        interval: "hourly",
        targetProperty: "sensor_data.ch2.Vrms",
        timeframe: "this_10_days",
        timezone: "UTC"
    });

    var energy_ch1_vrms_gage_avg = new Keen.Query("minimum", {
        eventCollection: "stream",
        targetProperty: "sensor_data.ch1.Vrms",
        timeframe: "this_30_minutes",
        timezone: "UTC"
    });
    var energy_ch2_vrms_gage_avg = new Keen.Query("minimum", {
        eventCollection: "stream",
        targetProperty: "sensor_data.ch2.Vrms",
        timeframe: "this_30_minutes",
        timezone: "UTC"
    });

    // Charts  ////////////////////////////////

    var energy_ch1_irms_gage = new JustGage({
        id: "chart_01",
        value: 0,
        min: 0,
        max: 20,
        title: "Corrente (Fase A)",
        decimals: 2,
        humanFriendlyDecimal: 2
    });
    client.run(energy_ch1_irms_gage_avg, function(err, res){
        energy_ch1_irms_gage.refresh(res.result)
    });

    var energy_ch2_irms_gage = new JustGage({
        id: "chart_02",
        value: 0,
        min: 0,
        max: 20,
        title: "Corrente (Fase B)",
        decimals: 2,
        humanFriendlyDecimal: 2
    });
    client.run(energy_ch2_irms_gage_avg, function(err, res){
        energy_ch2_irms_gage.refresh(res.result)
    });

    var energy_ch1_vrms_gage = new JustGage({
        id: "chart_04",
        value: 0,
        min: 0,
        max: 150,
        title: "Tensão (Fase A)",
        decimals: 2,
        humanFriendlyDecimal: 2
    });
    client.run(energy_ch1_vrms_gage_avg, function(err, res){
        energy_ch1_vrms_gage.refresh(res.result)
    });

    var energy_ch2_vrms_gage = new JustGage({
        id: "chart_05",
        value: 0,
        min: 0,
        max: 150,
        title: "Tensão (Fase B)",
        decimals: 2,
        humanFriendlyDecimal: 2
    });
    client.run(energy_ch2_vrms_gage_avg, function(err, res){
        energy_ch2_vrms_gage.refresh(res.result)
    });


    ///////////
    var chart_vrms_avg = new Keen.Dataviz();
    chart_vrms_avg
        .el(document.getElementById("chart_03a"))
        .chartType("linechart")
        .height (150)
        .width("auto")
        .title("Daily revenue (7 days)")
        .chartOptions({
        chartArea: {
            height: "80%",
            left: "5%",
            top: "5%",
            width: "75%"
        },
        hAxis: {
            format:'d/MMM H:M',
            //            gridlines:  {count: 12}
        },
        vAxis: { 
            viewWindow: {
                min: 0,
                max: 150
            }
        }  
    })
        .prepare();

    var req_vrms_avg = client.run([energy_ch1_vrms_line_avg,energy_ch2_vrms_line_avg],function(err, response) {
        if (err) {
            // Display the API error
            chart_temp_avg.error(err.message);
            console.log(err.message);
        }
        else {
            var result1 = response[0].result  // data from first query
            var result2 = response[1].result  // data from second query
            var data = []  // place for combined results
            var i=0

            while (i < result1.length) {

                data[i]={ // format the data so it can be charted
                    timeframe: result1[i]["timeframe"],
                    value: [
                        { category: "Tensão (A)", result: result1[i]["value"] },
                        { category: "Tensão (B)", result: result2[i]["value"] }
                    ]
                }
                if (i == result1.length-1) { // chart the data
                    chart_vrms_avg
                        .parseRawData({ result: data })
                        .render();
                }
                i++;
            }
        }
    });    

    ///////////
    var chart_irms_avg = new Keen.Dataviz();
    chart_irms_avg
        .el(document.getElementById("chart_03b"))
        .chartType("linechart")
        .height (150)
        .width("auto")
        .title(false)
        .chartOptions({
        chartArea: {
            height: "80%",
            left: "5%",
            top: "5%",
            width: "75%"
        },
        hAxis: {
            format:'d/MMM H:M',
            //            gridlines:  {count: 12}
        },
        vAxis: { 
            viewWindow: {
                min: 0,
                max: 20
            }
        }  
    })
        .prepare();

    var req_irms_avg = client.run([energy_ch1_irms_line_avg,energy_ch2_irms_line_avg],function(err, response) {
        if (err) {
            // Display the API error
            chart_temp_avg.error(err.message);
            console.log(err.message);
        }
        else {
            var result1 = response[0].result  // data from first query
            var result2 = response[1].result  // data from second query
            var data = []  // place for combined results
            var i=0

            while (i < result1.length) {

                data[i]={ // format the data so it can be charted
                    timeframe: result1[i]["timeframe"],
                    value: [
                        { category: "Corrente (A)", result: result1[i]["value"] },
                        { category: "Corrente (B)", result: result2[i]["value"] }
                    ]
                }
                if (i == result1.length-1) { // chart the data
                    chart_irms_avg
                        .parseRawData({ result: data })
                        .render();
                }
                i++;
            }
        }
    });    


    setInterval(function(){
        //chart_bmp_pres_avg.prepare(); // restart the spinner
        req_bmp_pres_avg.refresh();
        req_temp_avg.refresh();
        req_irms_avg.refresh();
        req_vrms_avg.refresh();
        client.run(energy_ch1_vrms_gage_avg, function(err, res){energy_ch1_vrms_gage.refresh(res.result)});
        client.run(energy_ch1_irms_gage_avg, function(err, res){energy_ch1_irms_gage.refresh(res.result)});
        client.run(energy_ch2_vrms_gage_avg, function(err, res){energy_ch2_vrms_gage.refresh(res.result)});
        client.run(energy_ch2_irms_gage_avg, function(err, res){energy_ch2_irms_gage.refresh(res.result)});
        console.log('refresh')
    }, 20*60*1000);

});

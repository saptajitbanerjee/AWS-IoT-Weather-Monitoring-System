require('json-to-csv-export')
let humArr = [],
    tempArr = [],
    altArr = [],
    pressArr = [],
    upArr = [],
    data_to_csv = []


var AWS = require('aws-sdk');
const { default: csvDownload } = require('json-to-csv-export');
// Set the region 
let awsConfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": "YOUR_ACCESS_KEY_ID",
    "secretAccessKey": "YOUR_SECRET_ACCESS_KEY"
};

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
//var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

function getData(data) {
    data = data.Items
        //console.log(data) // for JSON test event
        //var IoT_Payload = JSON.parse(data);
    data = data.sort((a, b) => {
        //var date1=new Date(a.date)
        //var date2=new Date(b.date)
        return new Date(a.date) - new Date(b.date);
    });
    console.log(data)
        //console.log("==>" + data[0].timestamp + " " + data[1].timestamp)
        //let arr = []
    len = Object.keys(data).length
        //var date
    data_to_csv = data
    for (let i = 0; i < len; i++) {
        var date = data[i].date
        console.log(date)
            //var date = new Date(timestamp);
            //var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ", " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
            //var time = parseInt(data[i].timestamp)
            //var date = new Date(time);
            //var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getMilliseconds() + ", " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
            //console.log(time)
        upArr.push(date);
        drawChart1(data[i].temperature)
        drawChart2(data[i].humidity)
        drawChart3(data[i].pressure)
        drawChart4(data[i].altitude)
    }
}

docClient.scan({
        TableName: "ESP32_Data"
    })
    .promise()
    .then(data => getData(data))
    .catch(console.error)

//*/
let myChart1 = Highcharts.chart('container1', {

    title: {
        text: 'Temperature'
    },

    subtitle: {
        text: 'In Centigrade (&#8451;)'
    },

    yAxis: {
        title: {
            text: "&#8451;"
        },
        //enabled: true,
        //reversed: true,
    },

    xAxis: {
        categories: upArr
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            //color: 'red'
        }
    },
    series: [{
        name: 'Temperature',
        dataSorting: {
            //enabled: true,
            //reversed: true,
            //sortKey: 'custom.value'
        }, //*/
        data: []
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});

let myChart2 = Highcharts.chart('container2', {

    title: {
        text: 'Humidity'
    },

    subtitle: {
        text: 'In Percentage (%)'
    },

    yAxis: {
        title: {
            text: '%'
        }
    },

    xAxis: {
        categories: upArr
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            }
        }
    },
    series: [{
        name: 'Humdity',
        data: []
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});

let myChart3 = Highcharts.chart('container3', {

    title: {
        text: 'Pressure'
    },

    subtitle: {
        text: 'In Hecto Pascals (hPa)'
    },

    yAxis: {
        title: {
            text: ' hPa'
        }
    },

    xAxis: {
        categories: upArr
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            }
        }
    },
    series: [{
        name: "Pressure",
        data: []
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});

let myChart4 = Highcharts.chart('container4', {

    title: {
        text: 'Altitude'
    },

    subtitle: {
        text: 'In Meters (m)'
    },

    yAxis: {
        title: {
            text: 'm'
        }
    },

    xAxis: {
        categories: upArr
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            }
        }
    },
    series: [{
        name: 'Altitude',
        data: []
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});


//const socket = new WebSocket('wss://bc8p09eijf.execute-api.ap-south-1.amazonaws.com/production') // Example: 'wss://3143544j.execute-api.us-east-1.amazonaws.com/production'
const socket = new WebSocket('wss://bc8p09eijf.execute-api.ap-south-1.amazonaws.com/production') // Example: 'wss://3143544j.execute-api.us-east-1.amazonaws.com/production'
    //function connectWebSocket() {

//const socket = new WebSocket('wss://bc8p09eijf.execute-api.ap-south-1.amazonaws.com/production') // Example: 'wss://3143544j.execute-api.us-east-1.amazonaws.com/production'
socket.addEventListener('open', event => { console.log('WebSocket is connected') })

socket.addEventListener('close', event => {
    console.log('WebSocket is closed. Reconnecting...');
    socket.addEventListener('open', event => { console.log('WebSocket is connected') }); // Reconnect
})

socket.addEventListener('error', event => {
    console.error('WebSocket error:', event);
    socket.addEventListener('open', event => { console.log('WebSocket is connected') }); // Reconnect
    // Handle any errors that occur
});

socket.addEventListener('message', event => {

    let data = event.data
    console.log('Incoming IoT Payload:') // for JSON test event
    var IoT_Payload = JSON.parse(data);
    console.log("our json object", IoT_Payload)
    let { temperature, humidity, pressure, altitude } = IoT_Payload
    //var time = new Date();
    var date = new Date(Date.now());
    var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    upArr.push(time)
    data_to_csv.push(data)
    drawChart1(temperature)
    drawChart2(humidity)
    drawChart3(pressure)
    drawChart4(altitude)
})

let drawChart1 = function(temperature) {

    tempArr.push(Number(temperature));
    //upArr.push(time);
    $(document).ready(function() {
        $("#d1").text(temperature);
    });
    myChart1.series[0].setData(tempArr, true)
}

let drawChart2 = function(humidity) {

    humArr.push(Number(humidity));
    //upArr.push(time);
    $(document).ready(function() {
        $("#d2").text(humidity);
    });

    myChart2.series[0].setData(humArr, true)
}

let drawChart3 = function(pressure) {

    pressArr.push(Number(pressure));
    //upArr.push(time);
    $(document).ready(function() {
        $("#d3").text(pressure);
    });

    myChart3.series[0].setData(pressArr, true)
}

let drawChart4 = function(altitude) {

    altArr.push(Number(altitude));
    //upArr.push(time);
    $(document).ready(function() {
        $("#d4").text(altitude);
    });

    myChart4.series[0].setData(altArr, true)
}

function download() {
    const dataToConvert = {
        data: data_to_csv,
        filename: 'ESP32 Report',
        delimiter: ',',
        headers: ['Date', "Humidity", "Pressure", "Altitude", "Temperature"]
    }
    csvDownload(dataToConvert)
}

document.getElementById('csv').addEventListener('click', download)

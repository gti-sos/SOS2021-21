<script>
      
    var BASE_API_PATH = "/api/v2";
  
    var fires=[];
    var temperatures=[];
    var emisions=[];
  
    var XAxis = [];
    var fireGraph=[];
    var temperatureGraph=[];
    var emisionGraph=[];
  

  
    async function getData() {
      const dataA = await fetch(BASE_API_PATH + "/fire-stats");
      const dataB = await fetch(BASE_API_PATH + "/temperature-stats");
      const dataC = await fetch(BASE_API_PATH + "/emision-stats");
  
  
      if (dataA.ok && dataB.ok && dataC.ok) { 
        fires = await dataA.json();
        temperatures = await dataB.json();
        emisions= await dataC.json();
  
  
        fires.forEach(e=>{
          XAxis.push(e.country+"("+parseInt(e.year)+")");
        });
  
        temperatures.forEach(e=>{
          XAxis.push(e.country+"("+parseInt(e.year)+")");
        });
  
        emisions.forEach(e=>{
          XAxis.push(e.country+"("+parseInt(e.year)+")");
        })
  
        fires.forEach(e=>{
          fireGraph.push(parseInt(e.fire_nfc));
        });

  
        temperatures.forEach(e=>{
          temperatureGraph.push(e.temperature_min);
        });

        emisions.forEach(e=>{
          emisionGraph.push(parseInt(e.carb_diox_ppm));
        });

        
      } else {
        console.log("Error!");
      }


      var chart = Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Gráfica conjunta'
        },
        subtitle: {
            text: 'Gráfica conjunta de los diferentes datos recogidos por las API de los integrantes del grupo'
        },
        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        },

        xAxis: {
            categories: XAxis,
            labels: {
                x: -10
            }
        },

        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Amount'
            }
        },

        series: [{
            name: 'Número de incendios',
            data: fireGraph
        }, {
            name: 'Temperaturas',
            data: temperatureGraph
        }, {
            name: 'Emisiones',
            data: emisionGraph
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        }
        });          
    }
  </script>
  
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={getData}></script>
  </svelte:head>
  
  <main>
    <div>
      <div id="container"></div>
    </div>

  </main>
  
  <style>
    
  </style>
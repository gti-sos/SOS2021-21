<script>
	  import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    import ApexCharts from 'apexcharts'
	async function loadGraph(){

	    let MisDatos = [];
      let countryname = [];
    
	    const temperatureData = await fetch("/api/v2/temperature-stats");
	    MisDatos = await temperatureData.json();

      let aux = []
          let valores = []
          let valores1 = []
          let valores2 = []
          
        MisDatos.forEach((x) => {
            aux = parseInt(x.temperature_min)
            valores.push(aux);
            countryname.push(x.country)
                    
            
        });
        MisDatos.forEach((x) => {
            aux = parseInt(x.temperature_max)
			      valores1.push(aux);
              
        });
        MisDatos.forEach((x) => {
            aux = parseInt(x.temperature_co2)
			      valores2.push(aux);
            
        });

        console.log(countryname)

       var options = {
          series: [{
          name: 'Temperatura mínima',
          data: valores
        }, {
          name: 'Temperature máxima',
          data: valores
        }, {
          name: 'Temperature Co2',
          data: valores
        }],
          chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: countryname
        },
    
        
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
      
      
      
}
</script>
    <svelte:head>
        <script src="https://cdn.jsdelivr.net/npm/apexcharts" on:load={loadGraph}></script>
    </svelte:head>
<main>
    <div id="chart">
        <div id="timeline-chart"></div>
    </div>
    <p>Temperatura mínima, máxima y Co2 (Realizada con apexcharts)</p>
</main>
<style>
@import url('https://fonts.googleapis.com/css?family=Poppins');

* {
  font-family: 'Poppins', sans-serif;
}

#chart {
  max-width: 760px;
  margin: 35px auto;
  opacity: 0.9;
}
</style>
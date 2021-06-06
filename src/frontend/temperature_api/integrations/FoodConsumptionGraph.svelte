<script>
    import { pop } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    import ApexCharts from "apexcharts";
    async function loadGraph() {
        
        let MisDatos = [];
        let countryname = [];

        const foodconsumption = await fetch(
            "https://sos2021-10.herokuapp.com/api/integration/foodconsumption-stats"
        );
        MisDatos = await foodconsumption.json();

        let aux = [];
        let valores = [];
        let valores1 = [];
        let valores2 = [];
        let valores3 = [];

        MisDatos.forEach((x) => {
            aux = parseInt(x.caloryperperson);
            valores.push(aux);
            countryname.push(x.country);
        });
        MisDatos.forEach((x) => {
            aux = parseInt(x.gramperperson);
            valores1.push(aux);
        });
        MisDatos.forEach((x) => {
            aux = parseInt(x.dailygram);
            valores2.push(aux);
        });
        MisDatos.forEach((x) => {
            aux = parseInt(x.dailycalory);
            valores3.push(aux);
        });

        console.log(countryname);

        var options = {
            series: [
                {
                    name: countryname,
                    data: valores
                }
            ],
            chart: {
                height: 350,
                type: "bubble",
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                opacity: 0.8,
            },
            xaxis: {
                tickAmount: 12,
                type: "category",
            },
            yaxis: {
                max: 70,
            },
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }
</script>


<script>
    import bb from 'billboard.js/dist/billboard.pkgd'

    let graphDataMen = ["Hombre"]
    let graphDataWomen = ["Mujer"]
    async function loadData(){
        const API_URL = "https://sos2021-11.herokuapp.com/api/v2/smoking_stats"
        let res = await fetch(API_URL)
        let smokingData = await res.json()
        if(res.ok){
            console.log("Se han cargado los datos correctamente")
            console.log(smokingData)
        }else{
            console.log("No se han podido cargar los datos")
        }

        smokingData.forEach((x) => {
            graphDataMen.push(x.smoking_men)
            graphDataWomen.push(x.smoking_women)
        })

        var chart = bb.generate({
            data: {
                xs: {
                setosa: "setosa_x",
                versicolor: "versicolor_x"
                },
                columns: [graphDataWomen, graphDataMen],
                type: "scatter", // for ESM specify as: scatter()
            },
            axis: {
                x: {
                    label: "Sexo",
                tick: {
                    fit: false
                }
                },
                y: {
                    label: "Fumadores"
                }
            },
            bindto: "#scatterPlot"
        });


    }
    loadData();
</script>

<svelte:head>
  <link rel="stylesheet" href="https://naver.github.io/billboard.js/release/latest/dist/theme/insight.min.css">
</svelte:head>

<main>
    <h2 style="text-align:center;">Comparación de fumadores varones y hembras</h2>
    <div id="scatterPlot"></div>
</main>
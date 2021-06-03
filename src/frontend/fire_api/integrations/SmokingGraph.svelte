<script>
    import bb from 'billboard.js/dist/billboard.pkgd'
    let graphDataYear = ["x"]
    let graphDataMen = ["Hombres"]
    let graphDataWomen = ["Mujeres"]
    async function loadData(){

        console.log("Fetching smoking stats with proxy...")
        const API_PROXY_URL = "proxy/api/v2/smoking_stats";
        let res = await fetch(API_PROXY_URL)
        let smokingData = await res.json()
        if(res.ok){
            console.log("Se han cargado los datos correctamente")
            console.log(smokingData)
        }else{
            console.log("No se han podido cargar los datos")
        }

        smokingData.forEach((x) => {
            graphDataYear.push(x.year)
            graphDataMen.push(x.smoking_men)
            graphDataWomen.push(x.smoking_women)
        });

        console.log(graphDataMen)
        console.log(graphDataWomen)
        console.log(graphDataYear)

        var chart = bb.generate({
            data: {
                x:'x',
                columns: [
                    graphDataYear, graphDataMen, graphDataWomen
                ],
                type: "area", // for ESM specify as: area()
                groups: [
                    [
                        "Hombres",
                        "Mujeres"
                    ]
                ],
                stack: {
                    normalize: true
                }
            },
            clipPath: false,
            bindto: "#dataStackNormalized"
            });
    }
    loadData();
</script>

<svelte:head>
  <link rel="stylesheet" href="https://naver.github.io/billboard.js/release/latest/dist/theme/insight.min.css">
</svelte:head>

<main>
    <h2 style="text-align:center;">Comparación de fumadores varones y hembras</h2>
    <div id="dataStackNormalized"></div>
</main>
<script>
    import bb from 'billboard.js/dist/billboard.pkgd'
    let graphDataYear = ["x"]
    let graphDataMen = ["Hombres"]
    let graphDataFire = ["Incendios"]
    
    async function loadData(){

        console.log("Fetching smoking stats with proxy...")

        const API_PROXY_URL = "proxy/api/v2/smoking_stats";
        let res = await fetch(API_PROXY_URL)
        let smokingData = await res.json()

        const API_URL_2 = "/api/v2/fire-stats"
        let res2 = await fetch(API_URL_2)
        let fireData = await res2.json()

        if(res.ok && res2.ok){
            console.log("Se han cargado los datos correctamente")
            console.log(smokingData)
            console.log(fireData)
        }else{
            console.log("No se han podido cargar los datos")
        }

        smokingData.forEach((x) => {
            graphDataYear.push(x.year)
            graphDataMen.push(x.smoking_men)
        });

        fireData.forEach((x) => {
            graphDataYear.push(x.year)
            graphDataFire.push(x.fire_nfc)
        });

        const yearSet = Array.from( new Set(graphDataYear));


        console.log(graphDataMen)
        console.log(graphDataFire)
        console.log(yearSet)

        var chart = bb.generate({
            data: {
                x:'x',
                columns: [
                    yearSet, graphDataMen, graphDataFire
                ],
                type: "area", // for ESM specify as: area()
                groups: [
                    [
                        "Hombres",
                        "Incendios"
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
    <h2 style="text-align:center;">Comparación de fumadores varones y número de incendios en los años</h2>
    <div id="dataStackNormalized"></div>
</main>
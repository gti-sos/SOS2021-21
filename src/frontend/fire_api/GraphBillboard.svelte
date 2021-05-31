<script>
import bb, {area, areaSpline} from "billboard.js/dist/billboard.pkgd";

let graphData = [];

async function loadGraph(){
  const res = await fetch("/api/v2/fire-stats")
  const fireData = await res.json()
  if(res.ok){
    console.log("[INFO] Se han cargado los datos correctamente los datos.")
    console.log(fireData)
  }else{
    console.log("[ERR] Se ha producido un error cargando los datos.")
  }

  let aux = []
  let aux_1 = ["Número de incendios"]
  let aux_2 = ["Número de especies afectas"]

  fireData.forEach((f) =>{
    aux.push(f.country+" - "+f.year)
    aux_1.push(f.fire_nfc)
    aux_2.push(f.fire_nvs)
  });
  graphData = [aux_1, aux_2]

  console.log("[INFO] Datos recogidos de: "+aux)
  console.log("[INFO] Datos cargados para la gráfica: "+graphData)

  var chart = bb.generate({
    title: {
      text: "Gráfica del número de incendios"
    },
    data: {
      columns: [],
      type:"bar"
    },
    bar: {
      width: {
        ratio: 0.5
      }
    },
    bindto: "#areaChart"
  });

  chart.load({
    columns:graphData
  })

}


    
loadGraph();

</script>

<svelte:head>
  <link rel="stylesheet" href="https://naver.github.io/billboard.js/release/latest/dist/theme/insight.min.css">
</svelte:head>

<main>
  <div id="barChart"></div>
</main>

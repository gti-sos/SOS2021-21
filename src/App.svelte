<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import NotFound from './404.svelte';
    import Info from './Info.svelte';

	import FireAPI from './frontend/fire_api/FireTable.svelte';
    import EditFire from './frontend/fire_api/EditeFire.svelte';
	import FireGraph from './frontend/fire_api/Graph.svelte';
	import FireBillboard from './frontend/fire_api/GraphBillboard.svelte'


	import EditTemperature from './frontend/temperature_api/EditTemperature.svelte';
	import TemperatureAPI from './frontend/temperature_api/TemperatureTable.svelte';
	import TemperatureGraph from './frontend/temperature_api/Graph.svelte';
	import TemperatureApexcharts from './frontend/temperature_api/GraphApexcharts.svelte';


	import EmisionAPI from './frontend/emision_api/EmisionTable.svelte';
	import EditEmision from './frontend/emision_api/EditEmision.svelte';
	import EmisionGraph from './frontend/emision_api/Graph.svelte';
	import CommonGraph from './frontend/CommonGraph.svelte';

	//Integraciones: Youssef Lakouifat
	import AirPollutionGraph from './frontend/fire_api/integrations/AirPollutionGraph.svelte';
	import InternationalTourismsGraph from './frontend/fire_api/integrations/InternationalTourismsGraph.svelte';
	import LifeStatsGraph from './frontend/fire_api/integrations/LifeStatsGraph.svelte';
	import SmokingGraph from './frontend/fire_api/integrations/SmokingGraph.svelte';

	const routes = {
		"/":Home,
		"/fire": FireAPI,
        "/fire-stats/:country/:year": EditFire,
		"/fire/graph": FireGraph,
		"/fire/billboard": FireBillboard,
		"/temperature-stats/:country/:year": EditTemperature,
		"/temperature": TemperatureAPI,
		"/temperature/graph": TemperatureGraph,
		"/temperature/apex": TemperatureApexcharts,
		"/emision": EmisionAPI,
		"/emision-stats/:country/:year": EditEmision,
		"/emision/graph": EmisionGraph,
		"/info": Info,
		"/graph": CommonGraph,
		"/integrations/airpollution":AirPollutionGraph,
		"/integrations/internationaltourisms":InternationalTourismsGraph,
		"/integrations/lifestats": LifeStatsGraph,
		"/integrations/smoking":SmokingGraph,
		"*":NotFound,
    };
</script>

<main>
	<Router {routes} />
</main>

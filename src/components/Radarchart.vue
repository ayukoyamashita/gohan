<template>
	<div class="radar">
		<radar-chart :chart-data="datacollection" :options="options" />
	</div>
</template>
<script>
import RadarChart from "./Radar";

export default {
	components: {
		RadarChart,
	},
	props: ["score"],
	data() {
		return {
			options: {
				legend: {
					display: false,
				},
				scale: {
					ticks: {
						min: 0,
						max: 10,
						stepSize: 1,
					},
				},
			},
		};
	},
	computed: {
		datacollection() {
			return {
				labels: ["油っぽさ", "熱さ", "塩味", "甘味", "固体"],
				datasets: [
					{
						data: this.score,
					},
				],
			};
		},
	},
	mounted() {},
};
</script>

<style scoped>
.radar {
	width: 400px;
}
</style>

<template>
	<div id="app">
		<h1>おすすめごはん</h1>
		<p v-if="status === STATUS.loading">loading</p>
		<div v-if="status !== STATUS.loading">
			<div v-for="(question, i) in questions" :key="question.id">
				<p>{{ question.label }}</p>
				<label v-for="option in question.options" :key="option.id">
					<input
						type="radio"
						:name="'q' + question.id"
						:value="option.id"
						v-model="answers[i]"
					/>{{ option.label }}</label
				>
			</div>

			<button @click="osusumeGohan">おすすめ計算</button>
		</div>
		<div v-if="status === STATUS.result">
			<radarchart
				:score="[
					myScore.oily,
					myScore.heat,
					myScore.salty,
					myScore.sweetness,
					myScore.solid,
				]"
			/>

			<ul>
				<li v-for="osusume in osusumeList" :key="osusume.id">
					{{ osusume.name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import "reset-css";
import Question from "./js/Question";
import Gohan from "./js/Gohan";
import axios from "axios";
import Radarchart from "./components/Radarchart";

const STATUS = { loading: 1, start: 2, result: 3 };
let gohan;

export default {
	name: "App",
	components: {
		radarchart: Radarchart,
	},
	data() {
		return {
			status: STATUS.loading,
			questions: Question.data,
			menuList: [],
			myScore: {},
			osusumeList: [],
			answers: [],
		};
	},
	computed: {
		STATUS() {
			return STATUS;
		},
	},
	mounted() {
		gohan = new Gohan();
		this.init();
	},
	methods: {
		init() {
			axios
				.get(
					"https://script.google.com/a/macros/s-online.co.jp/s/AKfycbwvrRsYMUM52D3RCpa_OwobeAxDLtigaXcPWOucIn1rrgqTLFWsJrbofXBhGNrmnzicdQ/exec"
				)
				.then((response) => {
					// handle success
					this.menuList = response.data;
					this.status = STATUS.start;
					gohan.setMenuList(this.menuList);
				})
				.catch(function(error) {
					// handle error
					console.log(error);
				})
				.then(function() {
					// always executed
				});
		},
		osusumeGohan() {
			gohan.setAnswer(this.answers);
			this.myScore = gohan.answerScore();
			this.osusumeList = gohan.osusume();
			this.status = STATUS.result;
		},
	},
};
</script>

<style scoped>
#app {
	width: 100%;
	max-width: 500px;
	margin: auto;
}
</style>

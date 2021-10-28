<template>
  <div id="app">
    <p>{{status}}</p>
    <div v-for="(question, i) in questions" :key="question.id">
      <p>{{question.label}}</p>
      <label v-for="option in question.options" :key="option.id">
        <input type="radio" :name="'q' + question.id" :value="option.id" v-model="answers[i]">{{option.label}}</label>
    </div>
    <button @click="osusumeGohan">おすすめごはん</button>
    <p>oily:{{myScore.oily}}</p>
    <p>heat:{{myScore.heat}}</p>
    <p>salty:{{myScore.salty}}</p>
    <p>sweetness:{{myScore.sweetness}}</p>
    <p>solid:{{myScore.solid}}</p>
    <ul>
      <li v-for="osusume in osusumeList" :key="osusume.id">{{osusume.name}}</li>
    </ul>
  </div>
</template>

<script>
import Question from './Question'
import Gohan from './Gohan'
import axios from "axios";

let q = new Question();
console.log(Question.data);
console.log(q.createCombination());

let gohan;

export default {
  name: 'App',
  data() {
    return {
    status: 'ロード中',
    questions: Question.data,
    menuList: [],
    myScore: {oily: 0, heat: 0, salty: 0, sweetness: 0, solid: 0},
    osusumeList: [],
    answers: [],
    }
  },
  mounted() {
    gohan = new Gohan();
    this.init();
  },
  methods: {
    init() {
      axios.get("https://script.google.com/a/macros/s-online.co.jp/s/AKfycbwvrRsYMUM52D3RCpa_OwobeAxDLtigaXcPWOucIn1rrgqTLFWsJrbofXBhGNrmnzicdQ/exec"
			).then((response) => {
				// handle success
				this.menuList = response.data;
        this.status = 'ロード完了';
        gohan.setMenuList(this.menuList);
			}).catch(function(error) {
				// handle error
				console.log(error);
			}).then(function() {
				// always executed
			});
    },
    osusumeGohan() {
      gohan.setAnswer(this.answers);
      this.myScore = gohan.answerScore();
      this.osusumeList = gohan.osusume();
    }
  }
}
</script>

<style>
#app {
  
}
</style>

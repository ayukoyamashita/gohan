class Gohan {
	static score = [
		// あたたかい
		{ oily: 0, heat: 3, salty: 0, sweetness: 0, solid: 0 },
		// つめたい
		{ oily: 0, heat: -3, salty: 0, sweetness: 0, solid: 0 },
		// こってり
		{ oily: 3, heat: 0, salty: 0, sweetness: 0, solid: 1 },
		// さっぱり
		{ oily: -3, heat: 0, salty: 0, sweetness: 0, solid: -1 },
		// ガッツをください
		{ oily: 2, heat: 1, salty: 3, sweetness: -1, solid: 2 },
		// 優しさをください
		{ oily: -2, heat: -1, salty: -1, sweetness: 3, solid: -2 },
		// もりもり
		{ oily: 2, heat: 1, salty: 2, sweetness: 2, solid: 3 },
		// しなしな
		{ oily: -2, heat: -1, salty: -2, sweetness: -1, solid: -3 },
	];

	constructor() {}

	setMenuList(menuList) {
		this.menuList = menuList;
	}

	setAnswer(answer) {
		this.answer = answer;
	}

	scoringMenu() {}

	answerScore() {
		let myScore = { oily: 5, heat: 5, salty: 5, sweetness: 5, solid: 5 };
		for (let i = 0; i < this.answer.length; i++) {
			let choice = Gohan.score[this.answer[i] - 1];
			myScore.oily += choice.oily;
			myScore.heat += choice.heat;
			myScore.salty += choice.salty;
			myScore.sweetness += choice.sweetness;
			myScore.solid += choice.solid;
		}

		if (myScore.oily < 0) {
			myScore.oily = 0;
		}
		if (myScore.heat < 0) {
			myScore.heat = 0;
		}
		if (myScore.salty < 0) {
			myScore.salty = 0;
		}
		if (myScore.sweetness < 0) {
			myScore.sweetness = 0;
		}
		if (myScore.solid < 0) {
			myScore.solid = 0;
		}
		return myScore;
	}

	osusume() {
		const myScore = this.answerScore();
		let menuScore = [];
		for (let i = 0; i < this.menuList.length; i++) {
			let menu = this.menuList[i];
			let score =
				(menu.oily - myScore.oily) ** 2 +
				(menu.heat - myScore.heat) ** 2 +
				(menu.salty - myScore.salty) ** 2 +
				(menu.sweetness - myScore.sweetness) ** 2 +
				(menu.solid - myScore.solid) ** 2;
			score = Math.sqrt(score);
			score = 1 / (1 + score);
			menuScore.push({ id: i, score: score });
		}
		menuScore.sort((a, b) => {
			return b.score - a.score;
		});
		let osusume = [];
		for (let ms of menuScore.slice(0, 5)) {
			osusume.push(this.menuList[ms.id]);
		}
		return osusume;
	}
}

export default Gohan;

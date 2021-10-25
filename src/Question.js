class Question {
	static data = [
		{
			id: 1,
			label: "どっちの気分？",
			options: [
				{ id: 1, label: "あたたかい" },
				{ id: 2, label: "つめたい" },
			],
		},
		{
			id: 2,
			label: "どっちの気分？",
			options: [
				{ id: 3, label: "こってり" },
				{ id: 4, label: "さっぱり" },
			],
		},
		{
			id: 3,
			label: "どっちの気分？",
			options: [
				{ id: 5, label: "ガッツをください" },
				{ id: 6, label: "優しさをください" },
			],
		},
		{
			id: 4,
			label: "気分は？",
			options: [
				{ id: 7, label: "もりもり" },
				{ id: 8, label: "しなしな" },
			],
		},
	];

	static score = [
		// あたたかい
		{ oily: 0, heat: 2, salty: 0, sweetness: 0, solid: 0 },
		// つめたい
		{ oily: 0, heat: -2, salty: 0, sweetness: 0, solid: 0 },
		// こってり
		{ oily: 2, heat: 0, salty: 0, sweetness: 0, solid: 1 },
		// さっぱり
		{ oily: -2, heat: 0, salty: 0, sweetness: 0, solid: -1 },
		// ガッツをください
		{ oily: 2, heat: 1, salty: 3, sweetness: -1, solid: 2 },
		// 優しさをください
		{ oily: -2, heat: -1, salty: -1, sweetness: 3, solid: -2 },
		// もりもり
		{ oily: 2, heat: 1, salty: 2, sweetness: 2, solid: 2 },
		// しなしな
		{ oily: -2, heat: -1, salty: -2, sweetness: -1, solid: -2 },
	];

	constructor() {}

	createCombination() {
		const combination = (combiData, question) => {
			let result = [];
			for (let o of question.options) {
				if (combiData.length <= 0) {
					result.push([o.id]);
				}
				for (let c of combiData) {
					let copy = c.concat();
					copy.push(o.id);
					result.push(copy);
				}
			}
			return result;
		};

		let combiData = [];
		for (let q of Question.data) {
			combiData = combination(combiData, q);
		}
		return combiData;
	}
}
export default Question;

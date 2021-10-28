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
			label: "元気は？",
			options: [
				{ id: 7, label: "もりもり" },
				{ id: 8, label: "しなしな" },
			],
		},
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

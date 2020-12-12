const continents = [
	{ _id: 1, name: "Asia" },
	{ _id: 2, name: "Europe" },
	{ _id: 3, name: "Africa" },
	{ _id: 4, name: "North America" },
	{ _id: 5, name: "South America" },
	{ _id: 6, name: "Australia" },
	{ _id: 7, name: "Antarctica" },
]

const price = [
	{ _id: 0, name: "Any", array: [] },
	{ _id: 1, name: "$0 to $199", array: [0, 199] },
	{ _id: 2, name: "$200 to $249", array: [200, 249] },
	{ _id: 3, name: "$250 to $299", array: [250, 299] },
	{ _id: 4, name: "More than $300", array: [300, 350000] },
]

export { continents, price }

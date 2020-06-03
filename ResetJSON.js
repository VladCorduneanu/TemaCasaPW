const fs = require('fs');


var listaFilme = [
	{
		titlu: 'A fost odata la Hollywood',
		img: 'aFostOdataLaHollywood.jpg',
		durata: 130,
		descriere:"Doi actori batrani vor sa isi retraiasca tineretea",
		data:"20 Mai 2020 18.45",
		locuri: [
			{ randul : 1,
				 locuri : [
					 {numar:1,rand:1,ocupat:false,nume:""},
					 {numar:2,rand:1,ocupat:false,nume:""},
					 {numar:3,rand:1,ocupat:false,nume:""},
					 {numar:4,rand:1,ocupat:false,nume:""},
					]
			},
			{ randul : 2,
				locuri : [
					{numar:1,rand:2,ocupat:false,nume:""},
					{numar:2,rand:2,ocupat:false,nume:""},
					{numar:3,rand:2,ocupat:false,nume:""},
					{numar:4,rand:2,ocupat:false,nume:""},
				   ]
		   },
		   { randul : 3,
			locuri : [
				{numar:1,rand:3,ocupat:false,nume:""},
				{numar:2,rand:3,ocupat:false,nume:""},
				{numar:3,rand:3,ocupat:false,nume:""},
				{numar:4,rand:3,ocupat:false,nume:""},
			   ]
	   		}
		]
	},
{
		titlu: 'Aladdin',
		img: 'aladdin.jpg',
		descriere:"Un baiat sarac gaseste un duh si salveaza printesa cu un covor",
		durata: 140,
		data:"20 Mai 2020 20.45",
		locuri: [
			{ randul : 1,
				 locuri : [
					 {numar:1,rand:1,ocupat:false,nume:""},
					 {numar:2,rand:1,ocupat:false,nume:""},
					 {numar:3,rand:1,ocupat:false,nume:""},
					 {numar:4,rand:1,ocupat:false,nume:""},
					]
			},
			{ randul : 2,
				locuri : [
					{numar:1,rand:2,ocupat:false,nume:""},
					{numar:2,rand:2,ocupat:false,nume:""},
					{numar:3,rand:2,ocupat:false,nume:""},
					{numar:4,rand:2,ocupat:false,nume:""},
				   ]
		   },
		   { randul : 3,
			locuri : [
				{numar:1,rand:3,ocupat:false,nume:""},
				{numar:2,rand:3,ocupat:false,nume:""},
				{numar:3,rand:3,ocupat:true,nume:""},
				{numar:4,rand:3,ocupat:false,nume:""},
			   ]
	   		}
		]
	},
];

let data = JSON.stringify(listaFilme);
fs.writeFileSync('filme.json', data);
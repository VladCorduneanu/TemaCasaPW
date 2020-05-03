const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const port = 6789;

// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'))
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));

// la accesarea din browser adresei http://localhost:6789/ se va returna textul 'Hello World'
// proprietățile obiectului Request - req - https://expressjs.com/en/api.html#req
// proprietățile obiectului Response - res - https://expressjs.com/en/api.html#res


listaFilme = [
	{
		titlu: 'Filmul 1',
		durata: 130,
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
				{numar:2,rand:3,ocupat:true,nume:"Ionescu"},
				{numar:3,rand:3,ocupat:true,nume:"Popescu"},
				{numar:4,rand:3,ocupat:true,nume:"Gigescu"},
			   ]
	   		}
		]
	},
{
		titlu: 'Filmul 2',
		durata: 140,
		data:"20 Mai 2020 20.45",
		locuri: [
			{ randul : 1,
				 locuri : [
					 {numar:1,rand:1,ocupat:true,nume:""},
					 {numar:2,rand:1,ocupat:false,nume:""},
					 {numar:3,rand:1,ocupat:false,nume:""},
					 {numar:4,rand:1,ocupat:false,nume:""},
					]
			},
			{ randul : 2,
				locuri : [
					{numar:1,rand:2,ocupat:false,nume:""},
					{numar:2,rand:2,ocupat:true,nume:"Salam"},
					{numar:3,rand:2,ocupat:false,nume:""},
					{numar:4,rand:2,ocupat:false,nume:""},
				   ]
		   },
		   { randul : 3,
			locuri : [
				{numar:1,rand:3,ocupat:false,nume:""},
				{numar:2,rand:3,ocupat:false,nume:""},
				{numar:3,rand:3,ocupat:true,nume:"Bubico"},
				{numar:4,rand:3,ocupat:false,nume:""},
			   ]
	   		}
		]
	},
];

app.get('/', (req, res) => {
	mainText = "Hello World"
	res.render('layout',{maine: mainText});
})

app.get('/acasa.html', (req, res) => {
	res.render('acasa');
  })

app.get('/filme.html', (req, res) => {	
	res.render('filme',{lista: listaFilme});
})
app.post('/filme.html', (req, res) => {
	//vad ce film a ales si ii fac pagina de rezervare pt ala
	var Film = {};
	for(var i = 0;i<listaFilme.length;++i)
	{
		if(req.body.Filme == listaFilme[i].titlu)
		{
			Film = listaFilme[i];
			break;
		}
	}
	console.log(req.body.Filme);	
	res.render('rezervare',{film: Film});
})

app.post('/rezervare.html', (req, res) => {
	//vad ce locuri s-au ales la ce film si le rezerv,dupa afisez un bilet
	var Film ={};
	var i =0;

	for(i = 0;i<listaFilme.length;++i)
	{
		if(req.body.film == listaFilme[i].titlu)
		{
			Film = listaFilme[i];
			break;
		}
	}
	var coorrdonateLoc = {};
	var loc = {};
	var Locuri = [];
	for(i=0;i<req.body.locuri.length;++i)
	{
		coorrdonateLoc = req.body.locuri[i].split(" ");
		loc = Film.locuri[coorrdonateLoc[0]].locuri[coorrdonateLoc[1]];
		loc.ocupat = true;
		loc.nume = req.body.nume;
		Locuri.push(loc);
	}
	
	console.log(req.body);
	var today = new Date();
	var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;

	res.render('confirmare',{film: Film,locuri:Locuri,ora:dateTime});
})

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));
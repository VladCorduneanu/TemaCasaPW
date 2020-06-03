const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const port = 6789;

const fs = require('fs');

// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'))
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));


listaFilme =[];

app.get('/ScriereJSON', (req, res) => {
	eval(fs.readFileSync('ScriereJSON.js')+'');
	res.redirect('/');
})

app.get('/ResetJSON', (req, res) => {
	eval(fs.readFileSync('ResetJSON.js')+'');
	res.redirect('/');
})

app.get('/', (req, res) => {
	mainText = "Hello World"
	res.render('layout',{maine: mainText});
})

app.get('/acasa.html', (req, res) => {
	res.render('acasa');
  })

app.get('/filme.html', (req, res) => {	
	

	fs.readFile('filme.json', (err, data) => {
		if (err) throw err;
		listaFilme = JSON.parse(data);
		res.render('filme',{lista: listaFilme});
	});
	
})
app.post('/filme.html', (req, res) => {
	//vad ce film a ales si ii fac pagina de rezervare pt ala
	var Film = {};

	fs.readFile('filme.json', (err, data) => {
		if (err) throw err;
		listaFilme = JSON.parse(data);
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
	});
	
})

app.post('/rezervare.html', (req, res) => {
	//vad ce locuri s-au ales la ce film si le rezerv,dupa afisez un bilet
	var Film ={};
	var i =0;

	fs.readFile('filme.json', (err, data) => {
		if (err) throw err;
		listaFilme = JSON.parse(data);
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
	try{
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


	let listaNoua = JSON.stringify(listaFilme);
	fs.writeFileSync('filme.json', listaNoua);

	res.render('confirmare',{film: Film,locuri:Locuri,ora:dateTime});
	}
	catch{
		res.redirect('/');
	}
	});

	
})

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));
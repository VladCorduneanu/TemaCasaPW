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
		locuri: [{ randul : 1, numar : 1, ocupat : false}]
},
{
		titlu: 'Filmul 2',
		durata: 140,
		locuri: [{ randul : 1, numar : 1, ocupat : false}]
	},
];

app.get('/', (req, res) => {
	mainText = "Hello World"
	res.render('layout',{maine: mainText});
})

app.get('/acasa.html', (req, res) => {
	res.sendFile(__dirname + '/views/acasa.html');
  })

app.get('/filme.html', (req, res) => {	
	res.sendFile(__dirname + '/views/filme.html');
})
app.get('/rezervare.html', (req, res) => {	
	res.render('rezervare',{lista: listaFilme});
})

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));
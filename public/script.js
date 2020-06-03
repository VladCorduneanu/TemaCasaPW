function schimbaContinut(resursa,jsFisier = false,jsFunctie = false)
{
  var xmlhttp;
  if(window.XMLHttpRequest)
  {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange =
    function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        document.getElementById("continut").innerHTML = xmlhttp.responseText;
        if (jsFisier) {
            var elementScript = document.createElement('script');
            elementScript.onload = function () {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            };
            elementScript.src = jsFisier;
            document.head.appendChild(elementScript);
        } else {
            if (jsFunctie) {
                window[jsFunctie]();
            }
        }
      }
    }
  }
  xmlhttp.open("GET",resursa + '.html', true);
  xmlhttp.send();
}

function submitFormFilm(numeFilm)
{
    document.getElementById('filme').value = numeFilm;
    document.getElementById("FilmeForm").submit();
}

function submitFormRezervare()
{
    document.getElementById("RezervareForm").submit();
}

function buttonClicked(i,j)
{
    var buton = document.getElementById(i + ' ' + j)
    
    console.log(buton.id);
    console.log(buton.value);
}

function myFunction()
{
    console.log("am facut click")
}
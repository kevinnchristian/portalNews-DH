const BASE_URL = "https://newsapi.org/v2";
const API_KEY = "e80acb2d6bae4a149e73246951c6f39e";

let listaDeNoticias = document.getElementById('listaDeNoticias');
let btnUltimateNotice = document.getElementById('ultimas');
let btnTechNotice = document.getElementById('tec');
let buttonRefresh = document.getElementById('atualizar');
let buttonSearch = document.getElementById('buttonPesq');
let inputSearch = document.getElementById('pesquisa');

// fetch(`${BASE_URL}/top-headlines?country=br&apiKey=${API_KEY}`)
//     .then(response => response.json())
//     .then(dados => console.log(dados))

// função com async que faz a mesma coisa que o .then,
// se caso externalizar oq tem dentro desta função vamos ter que usar .then de qualquer forma,
// é interessante quando usar async desenvolver o code dentro da função para renderizar!

// função para buscar as ultimas notícias da API.
async function getNotices() {
  let resposta = await fetch(`${BASE_URL}/top-headlines?country=br&apiKey=${API_KEY}`)
  let dados = await resposta.json();
  // console.log(dados);

  // lista primeira vez as ultimas notícias
  for (let i = 0; i < dados.articles.length; i++) {
      listaDeNoticias.innerHTML +=  `
                                    <div class="col-4">
                                      <div class="card cardS">
                                        <img class="card-img-top" src="${dados.articles[i].urlToImage}">
                                        <div class="card-body">
                                          <h5 class="card-title">${dados.articles[i].title}</h5>
                                          <p class="card-text">${dados.articles[i].description}</p>
                                          <a class="btn btn-info" href="${dados.articles[i].url}">Ir para noticia</a>
                                        </div>
                                      </div>
                                    </div>
                                    `
  };
};

// função para trazer notícias da categoria technologia
async function getNoticesTech() {
  let resposta = await fetch(`${BASE_URL}/top-headlines?country=br&category=technology&apiKey=${API_KEY}`)
  let dadosTech = await resposta.json();

  dadosTech.articles.forEach((noticeTech) => {
    listaDeNoticias.innerHTML +=  `
                                  <div class="col-4">
                                    <div class="card cardS">
                                      <img class="card-img-top" src="${noticeTech.urlToImage}">
                                      <div class="card-body">
                                        <h5 class="card-title">${noticeTech.title}</h5>
                                        <p class="card-text">${noticeTech.description}</p>
                                        <a class="btn btn-info" href="${noticeTech.url}">Ir para noticia</a>
                                      </div>
                                    </div>
                                  </div>
                                  `
      });
};

// função para fazer pesquisa usando ?q= igual está no site da API.
async function searchNotice(textPesq) {
  let resposta = await fetch(`${BASE_URL}/top-headlines?q=${textPesq}&country=br&apiKey=${API_KEY}`);
  let dadosPesquisa = await resposta.json();

  listaDeNoticias.innerHTML = "";
  for (let i = 0; i < dadosPesquisa.articles.length; i++){
    listaDeNoticias.innerHTML += `
                                  <div class="col-4">
                                    <div class="card cardS">
                                      <img class="card-img-top" src="${dadosPesquisa.articles[i].urlToImage}">
                                      <div class="card-body">
                                        <h5 class="card-title">${dadosPesquisa.articles[i].title}</h5>
                                        <p class="card-text">${dadosPesquisa.articles[i].description}</p>
                                        <a class="btn btn-info" href="${dadosPesquisa.articles[i].url}">Ir para noticia</a>
                                      </div>
                                    </div>
                                  </div>
                                  `
  }; 
};

// evento que ao clicar na opção Ultimas Notícias trás as mesmas caso esteja em outra página
btnUltimateNotice.addEventListener('click', function () {
  btnTechNotice.classList.remove('active');
  btnUltimateNotice.classList.add('active');
  listaDeNoticias.innerHTML = "";
  getNotices();
});

// evento que ao clicar na opção Notícias de Tecnologia trás as mesmas.
btnTechNotice.addEventListener('click', function () {
  btnUltimateNotice.classList.remove('active');
  btnTechNotice.classList.add('active');
  listaDeNoticias.innerHTML = "";
  getNoticesTech();
});

// evento para pesquisar notícias.
buttonSearch.addEventListener('click', function () {
  let text = inputSearch.value;
  searchNotice(text);
});

// evento de atualizar noticia, conforme em qual tipo de noticia está.
buttonRefresh.addEventListener('click', function () {
  listaDeNoticias.innerHTML = "";
  if (btnUltimateNotice.classList.contains('active')) {
      getNotices();
  };
  if (btnTechNotice.classList.contains('active')) {
      getNoticesTech();
  };
});

getNotices();


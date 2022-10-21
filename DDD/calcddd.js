document.querySelector("#ddd").addEventListener("change", procuraApi);
cidades = new Array();
function procuraApi(acao){
	fetch(`https://brasilapi.com.br/api/ddd/v1/${acao.target.value}`)
	.then(res => res.json())
	.then(dados => {
		cidades = dados.cities;
		listcities();
	});
}
function listcities(){
	list = document.querySelector('ul');
	list.textContent = '';
	cidades.forEach(cidade =>{
		item = document.createElement('li');
		item.textContent = cidade;
		list.append(item);
	});
}
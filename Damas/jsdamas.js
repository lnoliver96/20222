const tamCel = 40
let pecaId = 0
let posicaoNow = 80
let posicaoFutura = 81
let divisao =''
let placeCap = ''
let play = 0
document.body.append(geraTabuleiro())

function geraTabuleiro() {
    const tam = 8
    let tabela = document.createElement('table')

    tabela.style.borderStyle = 'solid'
    tabela.style.borderSpacing = 0
    tabela.style.margin = 'auto'

    for (let i = 0; i < tam; i++) {
        let linha = document.createElement('tr')
        tabela.append(linha)
        for (let j = 0; j < tam; j++) {
            let celula = document.createElement('td')
			celula.setAttribute('id',`${j}` + '-' + `${i}`)
            linha.append(celula);
            celula.style.width = `${tamCel}px`
            celula.style.height = `${tamCel}px`
			pecaId += 1
	
            if (i % 2 == j % 2) {
                celula.style.backgroundColor = 'black'
				celula.setAttribute("class","droptarget")
                if (i * 8 + j <= 24) {
                    celula.append(criaPeca('black',pecaId))
                } else if (i * 8 + j >= 40) {
                    celula.append(criaPeca('red',pecaId))
                }
            } else {
                celula.style.backgroundColor = 'white'
            }
        }
    };
	
    return tabela
}

function criaPeca(cor,ide) {
		let imagem = document.createElement('img')
		imagem.setAttribute('src', `img/${cor}.png`)
		imagem.setAttribute('width', `${tamCel-4}px`)
		imagem.setAttribute('height', `${tamCel-4}px`)
		imagem.setAttribute('draggable','true')
		imagem.setAttribute('id', ide)
		imagem.setAttribute('class', cor)
		
    return imagem;
}

function dragstart(){
	document.addEventListener("dragstart", function(event) {
	  event.dataTransfer.setData("Text", event.target.id)
	  posicaoNow = event.path[1].id.toString()
	  divisao = event.path[0].className
	});
}

function dragend() {
	document.addEventListener("dragend", function(event) {
	})
}

function dragover() {
	document.addEventListener("dragover", function(event) {
	  event.preventDefault()
	})
}

function drop(){
	document.addEventListener("drop", function(event) {
	event.preventDefault()
	if ( event.target.className == "droptarget") {
		const data = event.dataTransfer.getData("Text")
		let c = event.path[0]
		let t = c.childElementCount
		posicaoFutura = event.target.id.toString()
		let xa = posicaoNow.substring(0,1)
		let ya = posicaoNow.substring(2,3)
		let xf = posicaoFutura.substring(0,1)
		let yf = posicaoFutura.substring(2,3)
		
		if(divisao == 'black' && xf < xa) {
			placeCap = (parseInt(xa) - 1).toString() + "-" + (parseInt(ya) + 1).toString()
		} else if(divisao == 'black' && xf > xa) {
			placeCap = (parseInt(xa) + 1).toString() + "-" + (parseInt(ya) + 1).toString()
		} else if(divisao == 'red' && xf > xa){
			placeCap = (parseInt(xa) + 1).toString() + "-" + (parseInt(ya) - 1).toString()
		} else if(divisao == 'red' && xf < xa){
			placeCap = (parseInt(xa) - 1).toString() + "-" + (parseInt(ya) - 1).toString()
		}
		captura = document.getElementById(placeCap)
		if(captura.childElementCount == '1'){
			divisaoCapturada = captura.firstElementChild.className
			pecaCapturada = captura.firstElementChild
		}
		if (t == '0' && ya != yf){
			if (divisao == 'red' && ya > yf && ya - yf == 1 && play % 2 == 0 || ya - yf == 2 && divisaoCapturada == "black" && play % 2 == 0 || divisao == 'black' && ya < yf && ya - yf == -1 && play % 2 == 1 || ya - yf == -2 && divisaoCapturada == "red" && play % 2 == 1) {
				event.target.appendChild(document.getElementById(data));
				if (divisao == 'red' && yf == '0' || divisao == 'black' && yf == '7'){
					Dama(divisao,yf,xf)
				}
				play += 1;
				if(ya - yf == 2 || ya - yf == -2) {
					pecaCapturada.remove()
					pecaCapturada = ''
					lasseCapturada = ''
				}
			}
		}
		
	}
	});
}
function Dama(divisao, yf, xf){
	local = xf + '-' + yf;
	sub = document.getElementById(local)
	pe = sub.firstElementChild
	addId = pe.id
	addClass = pe.className
	let imagem = document.createElement('img')
	if (divisao == "red") {
		imagem.setAttribute('src', 'img/redKing.jpeg')
	} else {
		imagem.setAttribute('src', 'img/blackKing.jpeg')
	}
	imagem.setAttribute('width', `${tamCel-4}px`)
	imagem.setAttribute('height', `${tamCel-4}px`)
	imagem.setAttribute('draggable','true');
	imagem.setAttribute('id', addId);
	imagem.setAttribute('class', `${addClass}King`)
	pe.remove()
	sub.append(imagem)
}
dragstart()
dragend()
dragover()
drop()

let tamanho = 2
let titulo
for (i = 1; i < 7; i++) {
    titulo = document.querySelector(`h${i}`)
    if (titulo != null) {
        criaBotaoTamanhos()
        break
    }
}

function criaBotaoTamanhos() {
    const btnAumenta = document.createElement(null)
    btnAumenta.innerHTML = `<button id="btnAumenta"> Aumenta Título</button>`
    btnAumenta.style.borderRadius = '30px'
    btnAumenta.style.width = '70px'

    const btnDiminui = document.createElement(null)
    btnDiminui.innerHTML = `<button id="btnDiminui"> Diminui Título</button>`
    btnDiminui.style.borderRadius = '30px'
    btnDiminui.style.width = '70px'
    btnDiminui.style.marginLeft = '20px'

    const br = document.createElement('br')

    titulo.parentNode.insertBefore(br, titulo.nextSibling)
    titulo.parentNode.insertBefore(btnDiminui, titulo.nextSibling)
    titulo.parentNode.insertBefore(btnAumenta, titulo.nextSibling)

    btnAumenta.addEventListener('click', function(){
        if (tamanho < 6) {
            tamanho += 0.5
        }
        titulo.style.fontSize = `${tamanho}em`
    })
    btnDiminui.addEventListener('click', function(){
        if (tamanho > 1) {
            tamanho -= 0.5
        }
        titulo.style.fontSize = `${tamanho}em`
    })
}
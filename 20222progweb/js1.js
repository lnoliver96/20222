document.addEventListener('DOMContentLoaded', f_load)

function f_load() {

    const listaMae = document.createElement('ol')
    document.body.prepend(listaMae)
    const contH2 = document.querySelectorAll('h2')

    for (let i = 0; i < contH2.length; i++) {

        const elementos = f_criarLista(`#h2${i + 1}`, contH2[i].textContent)
        listaMae.appendChild(elementos)
        mudarH2(contH2[i], i + 1)

    }
}

function f_criarLista(ref, texto) {

    const li = document.createElement('li')
    const criarLink = f_criarLink(ref, texto)
    li.appendChild(criarLink)

    return li
}

function f_criarLink(href, texto) {

    const criarLink = document.createElement('a')
    criarLink.setAttribute('href', href)
    criarLink.textContent = texto

    return criarLink
}

function mudarH2(elemento, num) {
    elemento.textContent = `${num}. ${elemento.textContent}`
    elemento.id = `h2${num}`
    const voltar = f_criarLink('#', 'Voltar')
    f_inserirDepois(elemento, voltar)
}

function f_inserirDepois(elemento, ref) {
    const nextElement = elemento.nextElementSibling
    elemento.parentElement.insertBefore(ref, nextElement)
}
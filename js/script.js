var elementoListaTarefas = document.getElementById('tarefas_lista')
var elementoListaTarefasFeitas = document.getElementById('tarefas_feitas_lista')
var itensArmazenados = JSON.parse(localStorage.getItem('armazenamentoItens'))  || Array()

// Armazenamento 
function adicionarItemArmazenamento (item) {
    itensArmazenados.push(item)
    localStorage.setItem('armazenamentoItens', JSON.stringify(itensArmazenados))
}

function alternarItemFeitoArmazenamento (item) {
    var itensArmazenadosAtual = JSON.parse(localStorage.getItem('armazenamentoItens'))
    itensArmazenadosAtual.find((itemAtual) => itemAtual.nome === item.nome).jaFoiFeito = item.jaFoiFeito
    localStorage.setItem('armazenamentoItens', JSON.stringify(itensArmazenadosAtual))
}

// DADOS HTML
function alternarItemFeito (item, itemNode) {
    if (item.jaFoiFeito === true) {
        item.jaFoiFeito = false;
        elementoListaTarefasFeitas.removeChild(itemNode)
        elementoListaTarefas.appendChild(itemNode)
    } else {
        item.jaFoiFeito = true;
        elementoListaTarefas.removeChild(itemNode)
        elementoListaTarefasFeitas.appendChild(itemNode)
    }

    alternarItemFeitoArmazenamento(item)
}

function inserirItemHtml (item) {
    var itemNode = document.createElement('li')
    var labelNode = document.createElement('label')
    var checkboxNode = document.createElement('input')
    var spanNode = document.createElement('span')

    spanNode.innerText = item.nome
    checkboxNode.type = 'checkbox'
    checkboxNode.checked = item.jaFoiFeito
    labelNode.appendChild(checkboxNode)
    labelNode.appendChild(spanNode)
    itemNode.appendChild(labelNode)

    checkboxNode.addEventListener("change", alternarItemFeito.bind(null, item, itemNode))
    
    if (item.jaFoiFeito === true) {
        elementoListatarefasFeitas.appendChild(itemNode)
    } else {
        elementoListaTarefas.appendChild(itemNode)
    }
}

function inserirItensArmazenadosNoHtml () {
    itensArmazenados.forEach(function(itemAtual) {
        inserirItemHtml(itemAtual)
    })
}


// FORMULARIO
var form = document.getElementById("formulario_informacoes")

function EnviarFormulario(evento) {
    evento.preventDefault()

    var nome = document.getElementById('cabecalho_campo_texto').value

    var itemDoFormulario = {
        nome: nome,
        jaFoiFeito: false
    }

    adicionarItemArmazenamento(itemDoFormulario)
    inserirItemHtml(itemDoFormulario)

    document.getElementById('cabecalho_campo_texto').value = ''
}

form.addEventListener("submit", EnviarFormulario)

inserirItensArmazenadosNoHtml()
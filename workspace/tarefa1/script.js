let botao = document.createElement('button') 
botao.textContent = 'Calcular Média' 
document.body.appendChild(botao) 

let resultado = document.createElement('section') 
resultado.innerHTML = '<p>O resultado aparecerá aqui...</p>' 
document.body.appendChild(resultado) 

botao.onclick = function () {
  let nome = prompt('Qual é o nome do aluno?')
  let nota1 = Number(prompt(`Qual foi a primeira nota de ${nome}?`))
  let nota2 = Number(prompt(`Qual foi a segunda nota de ${nome}?`))

  let media = (nota1 + nota2) / 2

  resultado.innerHTML = `
    <p>Aluno: <strong>${nome}</strong></p>
    <p>Notas: ${nota1} e ${nota2}</p>
    <p>Média: <mark>${media.toFixed(2)}</mark></p>
  `
}

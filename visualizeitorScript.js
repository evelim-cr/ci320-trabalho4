//variaveis globais
fileXml = "aluno.xml";
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET",fileXml,true);
var aluno = null;	


/***********************************************************************/
function buscaGRR(){
	var grr=document.getElementById("GRRAluno");
	//var grr = document.getElementsByName('grr');
	if (grr.value == "" || grr.value==null || grr == null) { 
		alert("Digite o GRR do Aluno para consulta!");
	}	
	else{
		carregaGrade(grr);
		cod = aluno.discCursadas[0].codigo
		alert("cod");
		grade = document.getElementById("tabN");
		grade.style.visibility="visible";
		disc = document.getElementById("CI055"); 
		disc.style.backgroundColor = "green";
	}	
	
}	
	
function carregaGrade(grr)	{

	var regsAlu = carregaInfoGRR(grr);
	carregaAluno(regsAlu);
	xmlhttp.send();



}

function carregaInfoGRR(grr){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",fileXml,true);
	var regsAlu = [];

	var alunos = xmlhttp.responseXML.documentElement.getElementsByTagName("ALUNO");
	for (var i = 0; i < alunos.length; i++) {
		if (alunos[i].getElementsByTagName("MATR_ALUNO")[0].firstChild.nodeValue == grr) {
						var reg = new Object();
						reg.nomeAluno  = alunos[i].getElementsByTagName("NOME_ALUNO")[0].firstChild.nodeValue;
						reg.numVersao  = alunos[i].getElementsByTagName("NUM_VERSAO")[0].firstChild.nodeValue;
						reg.nomeDisc   = alunos[i].getElementsByTagName("NOME_ATIV_CURRIC")[0].firstChild.nodeValue;
						reg.codDisc    = alunos[i].getElementsByTagName("COD_ATIV_CURRIC")[0].firstChild.nodeValue;
						reg.ano        = alunos[i].getElementsByTagName("ANO")[0].firstChild.nodeValue;
						reg.periodo    = alunos[i].getElementsByTagName("PERIODO")[0].firstChild.nodeValue;
						reg.nota       = alunos[i].getElementsByTagName("MEDIA_FINAL")[0].firstChild.nodeValue;
						reg.frequencia = alunos[i].getElementsByTagName("FREQUENCIA")[0].firstChild.nodeValue;
						reg.situacao   = alunos[i].getElementsByTagName("SIGLA")[0].firstChild.nodeValue;
						
						
						regsAlu.push(reg);
		}
	}
	return regsAlu;
}

function carregaAluno(regsAlu){

	if (regsAlu.length == 0) {
			aluno = null;
	}		
	else{
		aluno = new Object();
		aluno.nome = regsAlu[0].nomeAluno;
		aluno.versaoCurso = regsAlu[0].numVersao;
		aluno.discCursadas = [];
		for (var i=0; i<regsAlu.length; i++) {
			var reg = regsAlu[i];
			var disc = encontraDisciplina(reg.codDisc);
			if (disc == null) {
				disc = new Object();
				disc.codigo = reg.codDisc;
				disc.nome = reg.nomeDisc;
				disc.hist = [];
				aluno.discCursadas.push(disc);
			}
			var matricula = new Object();
			matricula.ano = reg.ano;
			matricula.periodo = reg.periodo;
			matricula.nota = reg.nota;
			matricula.frequencia = reg.frequencia;
			matricula.situacao = reg.situacao;	
			disc.hist.push(matricula);
			disc.hist = ordenaHistorico(disc.hist);
		}			
	
	}
}	

function encontraDisciplina(codDisc){
		var disciplinas = aluno.discCursadas;
		for (var i=0; i<disciplinas.length; i++) {
			if (disciplinas[i].codigo == codDisc) {
				return disciplinas[i];
			}
		}
		return null;
	}
	
function ordenarHistorico(historico){
	var histOrdenado = [];
	var histNaoOrdenado = copiaVetor(historico);
	var aux = [];
	if (historico.length == '1'){
		return historico;
	}	
	for (var i=0;i<historico.length;i++){
		var matrMaisRecente = recenteMatricula(matrNaoOrdenadas);
		histOrdenado.push(matrMaisRecente);
			for (var i=0;i<histNaoOrdenado.length;i++) { //nao sei se funciona
				if(matrMaisRecente != histNaoOrdenado[i]){
					auxNaoOrdenado.push(histNaoOrdenado[i]);
				}
			}
			histNaoOrdenado = auxNaoOrdenado;
	}	
	return histOrdenado;
}		
function recenteMatricula(historico){
	var recente = historico[0];
	for (var i=1;i<historico.length;i++) {
		var matrComparar = historico[i];
			recente = compara(matrComparar,recente);
	}
	return recente;
}

function removeMatricula(matrMaisRecente, matrNaoOrdenadas){
		var novoVetor = [];
		for (var i=0;i<matrNaoOrdenadas.length;i++) {
			var matrComparar = matrNaoOrdenadas[i];
			if (valorComparacao(matrComparar) != valorComparacao(matrMaisRecente)) {
				novoVetor.push(matrComparar);
			}
		}
		return novoVetor;	
}	

function compara(matr1,matr2){
	if(matr1.ano > matr2.ano)
		return matr1;
	else if(matr1.ano == matr2.ano){
		if (identifica(matr1) > identifica(matr1))
			return matr1;
		else
			return matr2;
	}
	else
		return matr2;
}

function indentifica(matr){
	if (matr.periodo == "1o. Semestre")
		return 1;
	else
		return 2;
}
	
function copiaVetor(v){
		var aux = [];
		for (var i=0;i<v.length;i++) {
			aux.push(v[i]);
		}
		return aux;
}


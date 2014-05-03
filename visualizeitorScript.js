//variaveis globais
//URL = "aluno.xml";
var aluno = null;	


/***********************************************************************/
function buscaGRR(){
	var grr=document.getElementById("GRRAluno");
	if (grr.value == "" || grr.value==null || grr == null) { 
		alert("Digite o GRR do Aluno para consulta!");
	}	
	else{
		carregaGrade(grr);
		grade = document.getElementById("tabN");
		grade.style.visibility="visible";
		disc = document.getElementById("CI055"); 
		disc.style.backgroundColor = "green";
	}	
	
}	
	
function carregaGrade(grr)	{
	var regsAlu = carregaInfoGRR(grr.value);
	//alert(regsAlu[0].numVersao);
	carregaAluno(regsAlu);
	disc = "CI211"
	//mostrarUltimaMatricula(disc);
	mostrarHistDic(disc);
	
}

function xmlMicoxLoader(url){
	if(window.XMLHttpRequest){
		var Loader = new XMLHttpRequest();
		Loader.open("GET", url ,false);
		Loader.send(null);
		return Loader.responseXML;
	}else if(window.ActiveXObject){
		var Loader = new ActiveXObject("Msxml2.DOMDocument.3.0");
		Loader.async = false;
		Loader.load(url);
		return Loader;
	}
}
function carregaInfoGRR(grr){

	xml=xmlMicoxLoader("alunos.xml");
	var regsAlu = [];
	var alunos=xml.getElementsByTagName("ALUNO");
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
			reg.tipo	   = alunos[i].getElementsByTagName("DESCR_ESTRUTURA")[0].firstChild.nodeValue;
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
			matricula.tipo = reg.tipo;
			disc.hist.push(matricula);	
			disc.hist = ordenaHistorico(disc.hist);
			msg="Disciplina: "+disc.nome+"\n Código: "+disc.codigo;
			var hist = disc.hist;
			for (var j=0;j<hist.length;j++){
				msg+="\n Período: "+hist[j].periodo+"\nAno: "+hist[j].ano+"\nNota: "+hist[j].nota+"\nFrequência: "+hist[j].frequencia+"\nSituação:"+hist[j].situacao+"\nTipo: "+hist[j].tipo+"\n\n";
			}
			alert(msg);
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
	
function ordenaHistorico(historico){
	var histOrdenado = [];
	var histNaoOrdenado = copiaVetor(historico);
	var vetorNaoOrdenado = [];
	for (var i=0;i<historico.length;i++){
		var matrMaisRecente = recenteMatricula(histNaoOrdenado);
		histOrdenado.push(matrMaisRecente);
		vetorNaoOrdenado = [];
			for (var j=0;j<histNaoOrdenado.length;j++){ 
				matrComp = histNaoOrdenado[j];
				if(!comparaMatr(matrMaisRecente,matrComp))//erro está aqui
					vetorNaoOrdenado.push(matrComp);
			}
		histNaoOrdenado = vetorNaoOrdenado;	
	}
	return histOrdenado;
}	

function comparaMatr(matr1,matr2){
	if (matr1.ano == matr2.ano){
		if (matr1.periodo == matr2.periodo)
			return 1;
	}	
			return 0;
}	

function recenteMatricula(historico){
	var recente = historico[0];
	for (var i=1;i<historico.length;i++) {
		var matrComparar = historico[i];
		recente = compara(matrComparar,recente);
	}	
	return recente;
}
	
//compara a materia mais recente
function compara(matr1,matr2){
	if(matr1.ano > matr2.ano)
		return matr1;
	else if(matr1.ano == matr2.ano){
		if (identifica(matr1) > identifica(matr2))
			return matr1;
		else
			return matr2;
	}
	else
		return matr2;
}

function identifica(matr){
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

function showPopup(html,width,height){
		var popup = window.open("","Popup","width="+width+",height="+height);
		popup.document.write('<link rel="stylesheet" type="text/css" href="estilo.css">' + html);
	}

function mostrarUltimaMatricula(codDisc){
		var disc = encontraDisciplina(codDisc);
		if (disc == null) {
			alert("Disciplina não cursada!");
		} else {
			var matrMaisRecente = disc.hist[0];
			msg="Disciplina: "+disc.nome+"\nPeríodo: "+matrMaisRecente.periodo+"\nAno: "+matrMaisRecente.ano+"\nNota: "+matrMaisRecente.nota+"\nFrequência: "+matrMaisRecente.frequencia+"\nSituação:"+matrMaisRecente.situacao;
			alert(msg);
		}
}	

function mostrarHistDic(codDisc){
var disc = encontraDisciplina(codDisc);
		if (disc == null) {
			alert("Disciplina não cursada!");
		} else {
			msg="Disciplina: "+disc.nome+"\n Código: "+disc.codigo;
			var hist = disc.hist; 
			for (var i=0;i<hist.length;i++){
				msg+="\n Período: "+hist[i].periodo+"\nAno: "+hist[i].ano+"\nNota: "+hist[i].nota+"\nFrequência: "+hist[i].frequencia+"\nSituação:"+hist[i].situacao;
			}
			alert(msg);
		}	
}
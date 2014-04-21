function buscaGRR(){
	var grr=document.getElementById("GRRAluno");
	//var grr = document.getElementsByName('grr');
	if (grr.value == "" || grr.value==null || grr == null) { 
		alert("Digite o GRR do Aluno para consulta!");
	}	
	else{
		document.getElementById("tab").style.visibility="visible";
	}
	//} else {
	//	carrega(grr);
	//	document.getElementById("teste").style.visibility="visible";	
	//}	
}	
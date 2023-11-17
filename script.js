//REGISTRA O SERVICE WORKER DO WEBAPP
if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('sw.js')
		.then(function () { console.log("Service Worker Registrado"); });
}

//PEGA NUMERO ARABICO E CONVERTE
$('#arabico').keyup(function () {
	$("#romano").prop("disabled", true);
	$("#tipo").text('Romano');
	
	if($(this).val() > 0 && $(this).val() < 4000){
		
		$(this).removeClass('is-invalid');

		arabico = $(this).val();
		romano = ArabicoParaRomano(arabico)
		$('#resultado').text(romano);

	}else{

		if($(this).val() == ""){
			$("#romano").prop("disabled", false);
			$("#tipo").text('...');
			$('#resultado').text('...');
			$(this).removeClass('is-invalid');
		}else{
			$(this).addClass('is-invalid');
			$('#resultado').text('...');
		}
	}
});

//PEGA NUMERO ROMANO E CONVERTE
$('#romano').keyup(function () {

	$("#arabico").prop("disabled", true);
	$("#tipo").text('Arábico');

	$(this).val($(this).val().toUpperCase());
	
	romano = $(this).val();
	arabico = RomanoParaArabico(romano)

	if(!Number.isNaN(arabico) && !arabico == 0){

		$(this).removeClass('is-invalid');
		$('#resultado').text(arabico);
	}else{

		if($(this).val() == ""){
			$("#arabico").prop("disabled", false);
			$("#tipo").text('...');
			$('#resultado').text('...');
			$(this).removeClass('is-invalid');
		}else{
			$(this).addClass('is-invalid');
			$('#resultado').text('...');
		}
	}


});

//VERIFICA QUANTIDADE DE NUMEROS DIGITADOS
$("#arabico").on('keydown', function(e) {
	if ($(this).val().length >= 4 && e.keyCode != 8 && e.keyCode != 9) {
	  return false;
	}
});

//VERIFICA QUANTIDADE DE NUMEROS DIGITADOS
$("#romano").on('keydown', function(e) {
	if ($(this).val().length >= 15 && e.keyCode != 8 && e.keyCode != 9) {
	  return false;
	}
});

//COMPARTILHA RESULTADO NO WHATSAPP
$('#compartilhar').click(function() {
	html2canvas(document.body).then(function(canvas) {
		document.body.appendChild(canvas);
	});
});

//LIMPA O RESULTADO E DADOS
$('#limpa').click(function() {
	$("#tipo").text('...');
	$('#resultado').text('...');
	$('#arabico').val('');
	$('#arabico').removeClass('is-invalid');
	$('#romano').val('');
	$('#romano').removeClass('is-invalid');
});

//GERA FRASE PARA WHATSAPP
$('#whatsapp').click(function() {
	var el = document.createElement('textarea');
	el.value = resultado;
	el.setAttribute('readonly', '');
	el.style = {position: 'absolute', left: '-9999px'};
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
	texto = 'Entrada: *'+$("#tipo").text()+'* -> Saída: *' + $('#resultado').text() + '*';
	window.open('whatsapp://send?text='+texto);
   
});

//CONVERTE ARABICO PARA ROMANO
function ArabicoParaRomano(arabico) {
    var listaArabico = [
		{ num: 1000, letra: 'M' },
        { num: 900, letra: 'CM' },
        { num: 500, letra: 'D' },
        { num: 400, letra: 'CD' },
        { num: 100, letra: 'C' },
        { num: 90, letra: 'XC' },
        { num: 50, letra: 'L' },
        { num: 40, letra: 'XL' },
        { num: 10, letra: 'X' },
        { num: 9, letra: 'IX' },
        { num: 5, letra: 'V' },
        { num: 4, letra: 'IV' },
        { num: 1, letra: 'I' }
    ];

    var romano = '';

    for (var i = 0; i < listaArabico.length; i++) {
		console.log(i);
        while (arabico >= listaArabico[i].num) {
            romano += listaArabico[i].letra;
			console.log(romano);
            arabico -= listaArabico[i].num;
			console.log(romano);
        }
    }

    return romano;
}

//CONVERTE ROMANO PARA ARABICO
function RomanoParaArabico(romano) {
    var listaRomano = {I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000};
    var arabico = 0;

    for (var i = 0; i < romano.length; i++) {
        if (i > 0 && listaRomano[romano[i]] > listaRomano[romano[i - 1]]) {
            arabico += listaRomano[romano[i]] - 2 * listaRomano[romano[i - 1]];
        } else {
            arabico += listaRomano[romano[i]];
        }
    }

    return arabico;
}
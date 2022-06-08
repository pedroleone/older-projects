var classes = ['Bárbaro','Bardo','Clérigo','Druida','Guerreiro','Ladrão','Mago','Paladino','Ranger'];
var CaracteristicasClasses = {
    "Bárbaro": {
        "nomes": ["Gorm", "Si-Yi", "Priscilla", "Sen", "Xia", "Anneira", "Haepha", "Lur", "Shar", 
                  "Doria", "Nkosi", "Fafnir", "Qua", "Sacer", "Vercin’geto", "Barbozar", "Clovis", 
                  "Frael", "Thra-raxes", "Sillius", "Sha-Sheena", "Khamisi"],
        "titulos": ["o Glorioso", "o Faminto", "o Irascível", "o Invencível", "o Glutão", "o Esmagador", 
                    "o Quebrador de Ossos", "o Jubiloso", "o Melancólico", "o Todo Poderoso", "o Gigantesco", "o Triunfante"],
        "olhos": ["olhos atormentados", "olhos assombrados", "olhos selvagens", "olhos sombrios"],
        "corpo": ["músculos poderosos", "canelas longas", "corpo magricela", "corpo maleável"],
        "apetrechos": ["tatuagens estranhas", "joias incomuns", "totalmente desprovido de ornamentos"],
        "vestimenta" :["farrapos", "sedas", "roupa de catador", "roupas totalmente inapropriadas para o clima"],
        "alinhamento": ["caótico","neutro"],
        "mov_alinhamento": {
            "caótico": "Se afastar de uma convenção do mundo civilizado",
            "neutro": "Ensinar a alguém os modos do seu povo"
        },
        "raça": ["forasteiro"],
        "mov_raça": [
            "Você pode ser um elfo, anão, halfling ou humano, mas seu povo não é dessas redondezas. No início de cada sessão, o MJ lhe perguntará algo a respeito de sua terra natal, por que você foi embora ou o que deixou para trás. Se responder, marque XP."
        ]


    }
}

function getRandomElementFromArray(items) {
    return items[Math.floor(Math.random()*items.length)];
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomD100() {
  return Math.floor(Math.random() * (100 - 1)) + 1;
}

function generateElementFromJSON(item) {
    var commonValue = 70;
    var uncommonValue = 25;
    var rareValue = 5;
    var generatedValue = getRandomD100();
    
    if(Array.isArray(item)) {
        return getRandomElementFromArray(item);
    } else if (!item.hasOwnProperty("common")) {
        return "ERROR / JSON INVALIDO - deve ser um Array ou possuir pelo menos propriedade  common";
    } 
    if (!item.hasOwnProperty("uncommon")) {
        commonValue += uncommonValue;
        uncommonValue = 0;
    }
    if (!item.hasOwnProperty("rare")) {
        commonValue += rareValue;
        rareValue = 0;
    }

    if (generatedValue <= commonValue) {
        return getRandomElementFromArray(item.common);
    } else if (generatedValue <= commonValue + uncommonValue) {
        return getRandomElementFromArray(item.uncommon);
    } else if (generatedValue <= commonValue + uncommonValue + rareValue) {
        return getRandomElementFromArray(item.rare);
    }
}

var atributos_iniciais = [16,15,13,12,9,8];
var lista_atributos = ["Força","Destreza","Constituição","Inteligência","Sabedoria","Carisma"];

function gerarAtributos(atr_inicias) {
    // atr_inicias é um array dos atributos principais da classe, em ordem
    var atrAGerar = atributos_iniciais.slice(); // copiar array
    var listaAtrAGerar = lista_atributos.slice(); 
    var AtributosGerados = {
        "Força": 0,
        "Destreza": 0,
        "Constituição": 0,
        "Inteligência": 0,
        "Sabedoria": 0,
        "Carisma": 0,
    }
    
    for (var i = 0; i < atr_inicias.length; i++) {

        var valorAtributo = atrAGerar.splice(0,1)[0];
        var nomeAtributo = atr_inicias[i];

        AtributosGerados[nomeAtributo] = valorAtributo;
        listaAtrAGerar.splice(listaAtrAGerar.indexOf(nomeAtributo),1);
        
    }

    atrAGerar = shuffle(atrAGerar);
    for (var i = 0; i < listaAtrAGerar.length; i++) {
        AtributosGerados[listaAtrAGerar[i]] = atrAGerar.splice(0,1); 
    }
    return AtributosGerados;

}

function generateBarbarian(arrayOption) {
    var outPC = "";

    var dados_classe = CaracteristicasClasses["Bárbaro"];
    outPC = "<em>Nome: </em>" + generateElementFromJSON(dados_classe["nomes"]) +", "+ 
                generateElementFromJSON(dados_classe["titulos"]) + "<br>";
    outPC += "<em>Classe: </em>Bárbaro<br>";
    outPC += "<em>Aparência: </em>" + generateElementFromJSON(dados_classe["olhos"]) +
    ', ' + generateElementFromJSON(dados_classe["corpo"]) +
    ', ' + generateElementFromJSON(dados_classe["apetrechos"]) + 
    ', ' + generateElementFromJSON(dados_classe["vestimenta"]) +
    ".<br>";
    var atributos = gerarAtributos(["Força","Constituição"]);
    var pvTotal = atributos["Constituição"] + 8;
    var dano = 'd10';
    outPC += "<em>Atributos:</em> "+"Força " + atributos["Força"] + ", "  +
                                    "Destreza " + atributos["Destreza"] + ", " +
                                    "Constituição " + atributos["Constituição"] + ", " +
                                    "Inteligência " + atributos["Inteligência"] + ", " +
                                    "Sabedoria " + atributos["Sabedoria"] + ", " +
                                    "Carisma " + atributos["Carisma"] + "<br> "
                                    ; 
                                


    return outPC;
}

function generatePC() {
 

    var classe_a_gerar = $("#sel-classe").val();
    if (classe_a_gerar === 'Qualquer') {
        classe_a_gerar = getRandomElementFromArray(classes);
    }  
    var pcGerado = "";
    if (classe_a_gerar === 'Bárbaro') {
        pcGerado = generateBarbarian();

    } else {
        pcGerado = "Não implementado ainda!";
    }
    
    return pcGerado;
}

$(document).ready(function(){


    $.each(classes, function(i, item) {
        $('#sel-classe').append('<option>'+item+'</option>');
    });

    $('#teste').click(function(){
        console.log('teste');
    });

    $('#pc').html("<p>" + generatePC() + "</p>");

    $('#gerar').click(function(){
        $('#pc').html("<p>" + generatePC() + "</p>");
    });




});
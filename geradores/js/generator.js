function getRandomElementFromArray(items) {
    return items[Math.floor(Math.random()*items.length)];
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


function generateNPC() {
    var sexo_gerado = "M";
    if (getRandomD100() > 50) {
        sexo_gerado = "F"
    }
    var raca_gerada = generateElementFromJSON(Racas);
    var nome_gerado = "";
    if (raca_gerada === "drow") {
        nome_gerado =  generateElementFromJSON(Nomes.getArrayNomes("elfo",sexo_gerado));
    } else if (raca_gerada === "genasi") {
        var raca_criacao = generateElementFromJSON(Racas);
        if (raca_criacao === "genasi") {
            raca_criacao = "humano";
        }
        nome_gerado =  generateElementFromJSON(Nomes.getArrayNomes(raca_criacao,sexo_gerado));
        raca_gerada = GenderedWord.getWord(raca_gerada,sexo_gerado) + " criado por " + raca_criacao +"s";
    } else if (raca_gerada === "meio-elfo") {
        var raca_criacao = "";
        if (getRandomD100() > 50) {
            raca_criacao = "humano";
        } else {
            raca_criacao = "elfo";
        }
        nome_gerado =  generateElementFromJSON(Nomes.getArrayNomes(raca_criacao,sexo_gerado));
        raca_gerada = "meio-elfo criado por " + raca_criacao +"s";        
    }
    else {
        nome_gerado =  generateElementFromJSON(Nomes.getArrayNomes(raca_gerada,sexo_gerado));
    }
    var subraca_gerado = "";
    if (Subracas.hasOwnProperty(raca_gerada)) {
        subraca_gerado = " " + generateElementFromJSON(Subracas[raca_gerada]);
    }
    var aparencia_gerada = generateElementFromJSON(Caracteristicas["aparencia"]);
    var talento_gerado = generateElementFromJSON(Caracteristicas["talento"]);
    var maneirismo_gerado = generateElementFromJSON(Caracteristicas["maneirismo"]);
    var idade_gerada = generateElementFromJSON(Caracteristicas["idade"]);
    var tendencia_gerada = generateElementFromJSON(Tendencias);

    var defeito_gerado = generateElementFromJSON(Caracteristicas["defeito"]);
    var vinculo_gerado = generateElementFromJSON(Caracteristicas["vinculo"]);
    var interacao_gerada = generateElementFromJSON(Caracteristicas["interacao"]);

    var npc_final = "<span class=\"nome\">"+nome_gerado+"</span>" + " é " + GenderedWord.getWord("um",sexo_gerado) + " " + 
                        GenderedWord.getWord(raca_gerada,sexo_gerado) + subraca_gerado + " " + 
                        GenderedWord.getWord(idade_gerada,sexo_gerado) + " " + 
                        GenderedWord.getWord(tendencia_gerada,sexo_gerado) +". "; 
    npc_final += capitalizeFirstLetter(GenderedWord.getWord("ele",sexo_gerado)) + " " + GenderedWord.getWord(aparencia_gerada,sexo_gerado);
    npc_final += ", " +  GenderedWord.getWord(talento_gerado,sexo_gerado);
    npc_final += " e " +  GenderedWord.getWord(maneirismo_gerado,sexo_gerado) + ".";
    npc_final += " " + nome_gerado + " " + GenderedWord.getWord(vinculo_gerado,sexo_gerado) + " e seu defeito " + GenderedWord.getWord(defeito_gerado,sexo_gerado);

    return npc_final;
}

$(document).ready(function(){
    $('#npc').html("<p>" + generateNPC() + "</p>");

    $('#gerar').click(function(){
        $('#npc').html("<p>" + generateNPC() + "</p>");
    });

    $('#gerar-20').click(function(){
        $('#npc').html("<p>" + generateNPC() + "</p>");
        for (var i =0; i <=20; i++) {
             $('#npc').append("<p>" + generateNPC() + "</p>");
        }
    });


});
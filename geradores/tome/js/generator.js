function getRandomElementFromArray(items) {
    return items[Math.floor(Math.random()*items.length)];
}

function generateResult(table) {

    if (!Array.isArray(table)) {
        return "Erro";
    }

    if (!Array.isArray(table[0])) {
        return getRandomElementFromArray(table);
    } else {
        var result = '';
        for (var i=0; i < table.length; i++) {
            
            elem = getRandomElementFromArray(table[i]);
            if (result.length > 0) {
                if (result.charAt(result.length-1) !== '-') {
                    result = result + ' ';
                }
                result = result + elem;

            } else {
                result = elem;
            }
        }
        return result;
        
    }
}

function generateResultFromButton(buttonId) {
    $('#table1-1').text(generateResult(table1_1));
}


$(document).ready(function(){
    
    var divContent = '';
    for (var i=0; i < tableList.length; i++) {
        var title = tableList[i]['title']
        var content = generateResult(tableList[i]['table'])
        divContent = divContent + '<div class=col-md-12><h3>'+title+'</h3><p>'
        divContent = divContent + '<button class="btn btn-default" id="generate-'+i+'">'
        divContent = divContent + '<i class="fa fa-refresh" aria-hidden="true"></i></button> <span id="content-'+i+'">'+content+'</span></p></div>'
    }
    $('#content').html(divContent);

    $('#content button').click(function(){
        var index = $(this).attr('id').split('-')[1];
        var content = generateResult(tableList[index]['table']);
        $('#content-'+index).html(content);
    })





});
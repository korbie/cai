var utilities = '../utilities/utilities.php',
	gotTemplate = false,
	gotData = false,
	galleryData,
	collectionName,
	i;

function getUrlParameter (sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function drawTemplate(data){
	jQuery.get("../templates/galleryTemplate.mustache", null, function(ajaxData) {
		template = ajaxData;
		processTemplate(data);
	});
}

function removeSpaces(data){
	var output = '',
		arr = data.split('');
		
	arr.forEach(function(a){
		if(a === '#'){
			output += ' ';
		}
		else{
			output += a;
		}
	});
	
	return output;
}

function priceFormat(number){

	return ('$' + number + '-');
	
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function reviseMeasurements(data){
	
	var inches = [],
		cms = [],
		inch = 0,
		output = '',
		measurements = data.split('@'),
		i,
		cmString = '',
		inString = ' (';
		
	if (isNaN(measurements[0])){
		return data;
	}
	
	measurements.forEach(function(a){
		cms.push(parseFloat(a));
		inches.push(parseFloat(a) / 2.54);
	});
	
	for (i = 0; i < inches.length; i++){
		cmString += (round(cms[i], 1) + 'cm ');
		if (i !== (inches.length - 1)){
			cmString += 'x ';
		}
		
		inString += (round(inches[i], 1) + 'in ');
		if (i !== (inches.length - 1)){
			inString += 'x ';
		}
		
		if (i === (inches.length - 1)){
			inString = (inString.substring(0, inString.length-1) + ')');
		}
		
	}
	return (cmString + inString);
	
}

function processTemplate(data) {
  
  html = Mustache.render(template, data);
  jQuery('.gallery').html(html);
  
  jQuery('.thumbnail').click(function(){
		
		var title = '',
			description = '',
			material = '',
			technique = '',
			color = '',
			size = '',
			price = '';
		
		jQuery('#photoHolder').empty();
		jQuery('.text-description-text').empty();
		jQuery('.text-material-text').empty();
		jQuery('.text-technique-text').empty();
		jQuery('.text-color-text').empty();
		jQuery('.text-size-text').empty();
		jQuery('.text-price-text').empty();
		
		title = jQuery(this).parent('a').attr('title');
		description = removeSpaces(jQuery(this).parent('a').attr('description'));
		material = removeSpaces(jQuery(this).parent('a').attr('material'));
		technique = removeSpaces(jQuery(this).parent('a').attr('technique'));
		color = removeSpaces(jQuery(this).parent('a').attr('color'));
		size = reviseMeasurements(removeSpaces(jQuery(this).parent('a').attr('size')));
		price = priceFormat(removeSpaces(jQuery(this).parent('a').attr('price')));
		
		jQuery('.modal-title').html('Product Number: ' + title);
		jQuery('#photoHolder').html(jQuery(this).parents('div').html());
		jQuery('.text-description-text').html(description);
		jQuery('.text-material-text').html(material);
		jQuery('.text-technique-text').html(technique);
		jQuery('.text-color-text').html(color);
		jQuery('.text-size-text').html(size);
		jQuery('.text-price-text').html(price);
			
		
		jQuery('#detailsModal').modal({show:true});
	});
	
}

collectionName = getUrlParameter('collection');
//changed this from $.ajax to jQuery.ajax({
jQuery.ajax({
        url: utilities,
        type: 'POST',
        dataType: 'JSON',
        data: {collection: collectionName},
        success: function (result) {
			galleryData = result;
			drawTemplate(galleryData);
        },
        error: function (result) {
        }
});
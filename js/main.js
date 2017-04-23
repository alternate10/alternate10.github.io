/*

Desc: The main script file for Alternate;
Version: 1.0
Author: Ivan Lozitsky

*/


/* --- FUNCTIONS --- */

/* function removealter(alter) {
	alter.closest(".alter-item").remove();
	var html_ex_alt = $('.alterntives-wr #exist-alter-wr').html();
	alters_saved = html_ex_alt;
	localStorage.setItem('alters_saved', alters_saved);
}
*/

function saveItems(type){
	if (type == "criteria") {
		if ($('.criteria-wr #exist-crit-wr .item-class').length == 0) $('.criteria-wr #exist-crit-wr').append("<span class='no-objects'>Критерии не добавлены</span>");
		var html_ex_crit = $('.criteria-wr #exist-crit-wr').html();
		localStorage.setItem('crit_saved', html_ex_crit); 
	} else if (type == "alternative") {
		if ($('.alterntives-wr #exist-alter-wr .item-class').length == 0) $('.alterntives-wr #exist-alter-wr').append("<span class='no-objects'>Альтернативы не добавлены</span>");
		var html_ex_alt = $('.alterntives-wr #exist-alter-wr').html();
		localStorage.setItem('alters_saved', html_ex_alt); 
	}
}

function getItems(type){
	if (type == "criteria") {
		if(localStorage.getItem('crit_saved')) {
			var crit_saved = localStorage.getItem('crit_saved');
			$('.criteria-wr #exist-crit-wr').html(crit_saved); 
		} else {
			var crit_saved = "";  
		}; 
	} else if (type == "alternative") {
		if(localStorage.getItem('alters_saved')) {
			var alters_saved = localStorage.getItem('alters_saved');
			$('.alterntives-wr #exist-alter-wr').html(alters_saved); 
		} else {
			var alters_saved = ""; 
		};
	}
}



function getCol(matrix, col){
   var column = [];
   for(var i=0; i<matrix.length; i++){
      column.push(matrix[i][col]);
   }
   return column;
}

function logScale(x, mu){
	return 2/(1 + Math.exp(-mu*x));
} 

function matrScale(matr, mu){
	var matr_scale = new Array();
	var dim = matr.length;
  	for (var i=0; i<dim; i++){
	    matr_scale[i] = new Array();
	    for (var j=0; j<dim; j++){
	    	matr_scale[i][j] = logScale(matr[i][j], mu);
	    }

	}
	return matr_scale;
}

/* ----------------- */
 

$(document).ready(function() {


/* --- changing the goal --- */

if(localStorage.getItem('the_goal_title')) {
	var the_goal_title = localStorage.getItem('the_goal_title');
	$('.add-goal-wr .the-goal').html(the_goal_title);
} else {
	var the_goal_title = ""; 
};

$('.add-goal-wr .change-goal').on('click', function(){
	$('.add-goal-wr .change-goal, .add-goal-wr .the-goal').hide();
	$('.add-goal-wr').append(
		"<input class='goal-input' type='text' placeholder='Введите цель'></input>"+
		"<i class='fa fa-floppy-o goal-ok' aria-hidden='true'></i>"+
		"<i class='fa fa-ban goal-cancel' aria-hidden='true'></i>");
});

$('body').on('click', '.add-goal-wr .goal-ok', function(){
	the_goal_title = $('.add-goal-wr .goal-input').val();
	if (the_goal_title.length > 0) {
		$('.add-goal-wr .the-goal').html(the_goal_title);
		localStorage.setItem('the_goal_title', the_goal_title); 
		$('.add-goal-wr .change-goal, .add-goal-wr .the-goal').show();
		$('.add-goal-wr .goal-input, .add-goal-wr .goal-ok, .add-goal-wr .goal-cancel').remove();
	} else {
		alert('Введите название цели');
	}
});

$('body').on('click', '.add-goal-wr .goal-cancel', function(){
	$('.add-goal-wr .goal-input, .add-goal-wr .goal-ok, .add-goal-wr .goal-cancel').remove();
	$('.add-goal-wr .change-goal, .add-goal-wr .the-goal').show();
	$(this).hide();
});






/* --------------------------------- CRITERIA AND ALTERNATIVES --------------------------------- */


getItems("criteria");
getItems("alternative");

/* --- Add new item --- */

$('.add-item').on('click', function(){ 

	var cur_item = $(this);
	if (cur_item.closest('.items-wrapper').hasClass("criteria-wr")) {var type_item = "criteria"; var type_item_rus = "Критерий";};
	if (cur_item.closest('.items-wrapper').hasClass("alterntives-wr")) {var type_item = "alternative"; var type_item_rus = "Альтернатива";};

	cur_item.siblings('.exist-items-wr').find('.no-objects').remove();

	var count_ex_items = cur_item.siblings(".exist-items-wr").find(".item-class").length + 1;

	if (count_ex_items > 1) {
		cur_item.closest('.items-wrapper').find(".item-class").each(function(){
			$(this).removeClass($(this).attr('class').split(' ')[2]);
			var item_child_num = cur_item.closest('.items-wrapper').find(".item-class").index($(this)) + 1; 
			$(this).addClass("m-item-"+item_child_num);
		});
	};

	var html_new_item = "<div class='item-class item-"+type_item+" m-item-"+count_ex_items+"'>"+
		"<span class='item-title'>"+type_item_rus+" "+count_ex_items+"</span>"+
		"<i class='fa fa-pencil-square-o item-change' aria-hidden='true'></i>"+
		"<input class='item-title-input hiddened' type='text' placeholder='"+type_item_rus+" "+count_ex_items+"'></input>"+
		"<i class='fa fa-times item-remove hiddened' aria-hidden='true'></i>"+
		"<i class='fa fa-floppy-o item-ok hiddened' aria-hidden='true'></i>"+ 
		"<i class='fa fa-ban item-close hiddened' aria-hidden='true'></i>"+
		"</div>";

	$(this).siblings(".exist-items-wr").append(html_new_item);


	if (type_item == "criteria") saveItems("criteria");
	if (type_item ==  "alternative") saveItems("alternative");
	

});

/* --- open and close changing of item --- */

$('body').on('click', '.item-change', function(){
	$(this).siblings(".item-title-input, .item-ok, .item-remove, .item-close").removeClass('hiddened'); 
	$(this).addClass('hiddened');
});


/* --- remove item --- */

$('body').on('click', '.item-remove', function(){
	$(this).closest(".item-class").remove(); 

	var count_ex_items = $(this).siblings(".exist-items-wr").find(".item-class").length + 1;

	if (count_ex_items > 1) {
		$(this).closest('.items-wrapper').find(".item-class").each(function(){
			$(this).removeClass($(this).attr('class').split(' ')[2]);
			var item_child_num = cur_item.closest('.items-wrapper').find(".item-class").index($(this)) + 1; 
			$(this).addClass("m-item-"+item_child_num);
		});
	};

	saveItems("criteria");
	saveItems("alternative"); 
});  
	
/* --- to change a name of item --- */	

$('body').on('click', '.item-ok', function(){

	var cur_item = $(this);
	if (cur_item.closest('.items-wrapper').hasClass("criteria-wr")) {var type_item = "criteria"; var type_item_rus = "Критерий";};
	if (cur_item.closest('.items-wrapper').hasClass("alterntives-wr")) {var type_item = "alternative"; var type_item_rus = "Альтернатива";};

	var input_item_name = cur_item.siblings('.item-title-input').val();

	if (input_item_name.length > 0) {
		cur_item.siblings('.item-title').text(input_item_name);
		cur_item.siblings('.item-title-input').attr('placeholder', input_item_name);
	} else {
		alert('Введите название критерия');
	}

	cur_item.siblings(".item-title-input, .item-remove, .item-close").addClass('hiddened');
	cur_item.addClass('hiddened');
	cur_item.siblings('.item-change').removeClass('hiddened'); 

	if (type_item == "criteria") saveItems("criteria");
	if (type_item ==  "alternative") saveItems("alternative");

}); 

/* --- cancel of changing a name of item --- */	

$('body').on('click', '.item-close', function(){

	var cur_item = $(this);
	if (cur_item.closest('.items-wrapper').hasClass("criteria-wr")) {var type_item = "criteria"; var type_item_rus = "Критерий";};
	if (cur_item.closest('.items-wrapper').hasClass("alterntives-wr")) {var type_item = "alternative"; var type_item_rus = "Альтернатива";};

	var old_item_name = cur_item.siblings('.item-title').text();

	cur_item.siblings('.item-title-input').val(old_item_name); 
	cur_item.siblings('.item-title-input').attr('placeholder', old_item_name);

	cur_item.siblings(".item-title-input, .item-ok, .item-remove").addClass('hiddened');
	cur_item.siblings('.item-change').removeClass('hiddened'); 
	cur_item.addClass('hiddened');

	if (type_item == "criteria") saveItems("criteria");
	if (type_item ==  "alternative") saveItems("alternative");

}); 


/* --- remove all items --- */

$(".remove-all-items").on('click', function(){
	var cur_item = $(this);
	if (cur_item.closest('.items-wrapper').hasClass("criteria-wr")) {var type_item = "criteria"; var type_item_rus = "Критерий";};
	if (cur_item.closest('.items-wrapper').hasClass("alterntives-wr")) {var type_item = "alternative"; var type_item_rus = "Альтернатива";};

	cur_item.siblings(".exist-items-wr").html('');
	if (type_item == "criteria") saveItems("criteria");
	if (type_item ==  "alternative") saveItems("alternative");
});
 



/* ------------------------------------------ */
	/* --- pairwise comparisons --- */


//Generate pairwise comparisons;
//type - criteria or altern
//numberCrit - for which criteria , 0 - for all criteria
//divOutput - div what should be filled with generated code
function genPair(type, numberCrit, divOutput) {

	if (type == "criteria") {
		var count_items = $(".criteria-wr .exist-items-wr>.item-class").length;
		var items = $(".criteria-wr .exist-items-wr");

		if (count_items == 1) {
			var out_compare_html = "<div class='criteria-copm-title'>Вы выбрали один критерий - <b>"+$(".criteria-wr .exist-items-wr .item-title").text()+"</b>. Относительно него следует сравнить альтернативы.</div>";
			$(divOutput).html(out_compare_html); 
			return;
		} else {
			var out_compare_html = "<div class='criteria-copm-title'>Вы выбрали следующие критерии:"; 
			$('.criteria-wr .exist-items-wr .item-class').each(function(){
				out_compare_html += "<p>- <b>"+$(this).find('.item-title').text()+"</b></p>";
			}); 
			out_compare_html += "<div><p>Сравните критерии друг с другом с точки зрения предпочтительности выбора: </p></div></div>"; 
		}
		
	} else if (type == "alternative") {
		var count_items = $(".alterntives-wr .exist-items-wr>.item-class").length;
		var items = $(".alterntives-wr .exist-items-wr");
		var compcrit = $(".criteria-wr .exist-items-wr>.item-class:eq("+(numberCrit-1)+")"); 
		var out_compare_html = "<div class='comp-alter-it-title'>Сравнените альтернативы относительно критерия <b>"+compcrit.find('.item-title').text()+"</b></div>";	 
	}

	var count_compar = 0;
	for (var i = 1; i < count_items; i++) {
		count_compar += i;
	} 

	out_compare_html += "<div class='compares-wr'>";
	
	for (var i = 1; i < count_items+1; i++) { // row
	   for (var j = 1; j < count_items+1; j++) { //col
	   		if (j > i) {
	   			var item1 = items.find('.m-item-'+i+' .item-title').html();
	   			var item2 = items.find('.m-item-'+j+' .item-title').html();

	   			out_compare_html += '<div class="compare-item comit-'+i+'-'+j+'"><p>Выберете, насколько <b>'+item1+'</b> лучше или хуже, по сравнению с <b>'+item2+'</b></p>'+
	   			'<div><span class="compare-item-rate-title">Хуже</span>'+ 
	   			'<input type="range" style="width: 200px;" min="-10" max="10" step="0.05" list="rangeList">'+
	   			'<span class="compare-item-rate-title">Лучше</span></div></div>';
	   		}
		}
	}

	out_compare_html += "</div>";

	$(divOutput).html(out_compare_html); 
}


$('body').on('click', '.gotopaircrit', function(){
	if ($(".criteria-wr .exist-items-wr>.item-class").length < 1) {
		alert("Задайте минимум один критерий");
	} else {
		genPair("criteria", 0, ".comp-pair-crit");

		$(".nav .mnav-items").removeClass('selected');
		$(".nav .mnav-item-3").addClass('selected');

		$(".main-actionarea .block-nav-items").removeClass('selected');
		$(".main-actionarea .block-nav-item-3").addClass('selected'); 
	}

});

$('body').on('click', '.gotopairalter', function(){

	count_criteria = $(".criteria-wr .exist-items-wr>.item-class").length;
	count_alter = $(".alterntives-wr .exist-items-wr>.item-class").length;

	if (count_alter < 2) {
		alert("Задайте минимум 2 альтернативы");
		$(".nav .mnav-items").removeClass('selected');
		$(".nav .mnav-item-2").addClass('selected');

		$(".main-actionarea .block-nav-items").removeClass('selected');
		$(".main-actionarea .block-nav-item-2").addClass('selected'); 

	} 
	else {
		$(".comp-pair-alter-wr").html('');  
		for (var i = 1; i < count_criteria + 1; i++) {
			$(".comp-pair-alter-wr").append("<div class='comp-pair-alter-item comp-pair-alter-"+i+"'></div>"); 
			genPair("alternative", i, ".comp-pair-alter-"+i);
		}

		$(".nav .mnav-items").removeClass('selected');
		$(".nav .mnav-item-4").addClass('selected');

		$(".main-actionarea .block-nav-items").removeClass('selected');
		$(".main-actionarea .block-nav-item-4").addClass('selected'); 

	}

	

});

	

function GetCompValArray(ClassComp){
	var count_compar = 0;
	var count_crit = $(".criteria-wr .exist-items-wr>.item-class").length;
	var count_alter = $(".alterntives-wr .exist-items-wr>.item-class").length; 

	var CompArray = new Array();
	$(ClassComp).find(".compare-item").each(function(){
		var sec_num = $(this).attr('class').split(' ')[1].split('comit-').pop(); 
		CompArray[sec_num] =  $(this).find('input[type=range]').val();
	});

	return CompArray;

}; 

function GetCompMatrFA(CompArray, count_t) {

	//var count_alter = $(".alterntives-wr .exist-items-wr>.item-class").length;
	var count_alter = count_t; 
	var matr_comp = new Array();

	for (var i=0; i<count_alter; i++){
    matr_comp[i] = new Array();
	    for (var j=0; j<count_alter; j++){
	    	if (i==j) matr_comp[i][j] = logScale(0, 1);
	    	else if (j>i) {
		    	var i_val = i+1;
	    		var j_val = j+1;
	    		var comp_val = CompArray[i_val+'-'+j_val];
	    		matr_comp[i][j] = logScale(parseFloat(comp_val), 1);
	    	} else {
	    		var comp_val = CompArray[i_val+'-'+j_val];
	    		matr_comp[i][j] = logScale(-parseFloat(comp_val), 1);
	    	};
	    }
	}

	return matr_comp;

}

function EigenVec(matrix){
	console.log(numeric.eig(matrix));
	return numeric.abs(getCol(numeric.eig(matrix).E.x, 0));
}

function compareElem(elem1, elem2) {
  return elem2.value - elem1.value;
}

function GetPriorVec(it_arr){
	var vector = [];
	for(var i = 0; i < it_arr.length; i++) { 
		var j = i+1;
		var item = {alter: $(".alterntives-wr .exist-items-wr>.item-class:eq("+(j-1)+") .item-title").text() , value: it_arr[i]};
		vector[i] = item;
	}	

	vector.sort(compareElem);

	var vector2 = [];
	for (key in vector){
		vector2.push(vector[key].alter);
	}

	return vector2;
}

function roundPlus(x, n) {
  if(isNaN(x) || isNaN(n)) return false;
  var m = Math.pow(10,n);
  return Math.round(x*m)/m;
}


function GetItog(){

	var count_crit = $(".criteria-wr .exist-items-wr>.item-class").length;
  	var count_alter = $(".alterntives-wr .exist-items-wr>.item-class").length;
  	
  	var itog = numeric.rep([count_alter], 0);

  	if (count_crit == 1){
  		var vec_prior_krit = numeric.rep([count_alter], 1);
  	} else {
		var massc = GetCompValArray(".comp-pair-crit"); 
		//console.log(massc);
		var nmatr = GetCompMatrFA(massc, count_crit);  
		//console.table(nmatr); 
		var vec_prior_krit = EigenVec(nmatr); 
  	}

	$('.gotomatrix').html('<br/>');
	$('.gotomatrix').append("Vec: " + vec_prior_krit.join(' , '));   
	$('.gotomatrix').append('<br/>'); 


  	for(var k = 0; k < count_crit; k++) { 

  		var k_val = k+1; 
  		var massc = GetCompValArray(".comp-pair-alter-item.comp-pair-alter-"+k_val);
		var nmatr = GetCompMatrFA(massc, count_alter);   
		console.table(nmatr); 
		var vec_prior = EigenVec(nmatr);

		$('.gotomatrix').append("alter"+k_val+" : "+vec_prior.join(' , ')+" - ");  
  		$('.gotomatrix').append('<br/>');

		var weight = numeric.rep([vec_prior.length], vec_prior_krit[k]);

		var vec_prior2 = numeric.mul(weight,vec_prior);

		$('.gotomatrix').append("Weight*vec : "+ vec_prior2.join(' , '));  
  		$('.gotomatrix').append('<br/>');

  		itog = numeric.add(itog, vec_prior2);

  	}

  	$('.gotomatrix').append('<br/>');
  	$('.gotomatrix').append("itog : "+ itog.join(' , '));   
  	$('.gotomatrix').append('<br/>');

  	var norma = numeric.norm2(itog);
  	sum = numeric.mapreduce('accum += xi','0'); 
  	norma2 = sum(itog);
  	itog2 = numeric.div(itog,norma2);

  	$('.gotomatrix').append('<br/>');
  	$('.gotomatrix').append("itog normir: "+ itog2.join(' , '));    
  	$('.gotomatrix').append('<br/>');


	$('.gotomatrix').append('<br/>');
  	$('.gotomatrix').append("prioritet: "+ GetPriorVec(itog2).join(' , '));    
  	$('.gotomatrix').append('<br/>'); 
  	
  	$('.itog-fixed-window').html("Приоритеты альтернатив: "+ GetPriorVec(itog2).join(' , '));  
}

$("body").on('change', '.compare-item input[type="range"]', function(){
	GetItog();
});

$('body').on('click', '.gotomatr-inp', function(){ 

	/*if(localStorage.getItem('compair_saved')) {
	var compair_saved = localStorage.getItem('compair_saved');
	$('.').html(compair_saved);
	} else {
		var compair_saved = ""; 
	};*/     

  	GetItog(); 


  	/*

  	var prior = GetPriorVec(EigenVec(nmatr));

  	for(var i = 0; i < prior.length; i++) {
		$('.gotomatrix').append(prior[i].alter+" : "+prior[i].value);  
		$('.gotomatrix').append('<br/>');
	}

	/*

	var count_compar = 0;
	var count_alter = $(".alterntives-wr #exist-alter-wr>.alter-item").length;

	for (var i = 1; i < count_alter; i++) {
		count_compar += i;
	} 

	for (var i = 1; i < count_compar+1; i++) { 
		var comp_val = $('.comp-pair .compare-item').eq(i-1).find('input[type=range]').val();
	} 

	var matr_comp = new Array();
  	for (var i=0; i<count_alter; i++){
	    matr_comp[i] = new Array();
	    for (var j=0; j<count_alter; j++){
	    	if (i==j) matr_comp[i][j] = 0;
	    	else if (j>i) {
		    	var i_val = i+1;
	    		var j_val = j+1;
	    		var comp_val = $('.comp-pair .comit-'+i_val+'-'+j_val).find('input[type=range]').val();
	    		matr_comp[i][j] = comp_val;
	    	} else {
	    		matr_comp[i][j] = -1*matr_comp[j][i];
	    	};
	    }
  	}

  	$('.gotomatrix').html('<br/>');
  	for (var i=0; i<count_alter; i++){
  		for (var j=0; j<count_alter; j++){
  			$('.gotomatrix').append(matr_comp[i][j]+' ');
  		}
  		$('.gotomatrix').append('<br/>');
  	}

  	localStorage.setItem('matr_comp', matr_comp);
  	var str = getCol(numeric.eig(matr_comp).E.x, 0); 
 
  	console.log(matrScale(matr_comp, 2));

  	var nmatr = matrScale(matr_comp, 2);

  	$('.gotomatrix').html('<br/>');
  	for (var i=0; i<nmatr.length; i++){
  		for (var j=0; j<nmatr.length; j++){
  			$('.gotomatrix').append(nmatr[i][j]+' ');
  		}
  		$('.gotomatrix').append('<br/>');
  	}

  	$('.gotomatrix').append(str); 


  	*/
}); 















/* ------------------ Managing function ---------------- */

$(".nav .mnav-items").on('click', function(){

	if (!$(this).hasClass('selected')) {
		$(".nav .mnav-items").removeClass('selected');
		$(this).addClass('selected');
		var num = $(this).attr('class').split(' ')[1].split('mnav-item-').pop();

		$(".main-actionarea .block-nav-items").removeClass('selected');
		$(".main-actionarea .block-nav-item-"+num).addClass('selected'); 
	}
	
});

/* -- Navigation -- */

$('.gotomainpage').on('click', function(){
	$(".nav .mnav-items").removeClass('selected');
	$(".nav .mnav-item-1").addClass('selected');

	$(".main-actionarea .block-nav-items").removeClass('selected');
	$(".main-actionarea .block-nav-item-1").addClass('selected'); 

})

$('.gotoparampage').on('click', function(){
	$(".nav .mnav-items").removeClass('selected');
	$(".nav .mnav-item-2").addClass('selected');

	$(".main-actionarea .block-nav-items").removeClass('selected');
	$(".main-actionarea .block-nav-item-2").addClass('selected'); 

})

$('.gotocritpage').on('click', function(){
	$(".nav .mnav-items").removeClass('selected');
	$(".nav .mnav-item-3").addClass('selected');

	$(".main-actionarea .block-nav-items").removeClass('selected');
	$(".main-actionarea .block-nav-item-3").addClass('selected'); 

})


	

});




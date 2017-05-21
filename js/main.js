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
'use strict';

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

function Normalized(vector){
	var sum = numeric.mapreduce('accum += xi','0'); 
  	var norma2 = sum(vector);
  	var itog = numeric.div(vector,norma2);
  	return itog;
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
 

//if ($(".mnav-item-6 #myonoffswitch").checked)  $(".itog-fixed-window").removeClass("hiddened"); 

$(".mnav-item-6 #myonoffswitch").on("change", function(){
	
	if ($(this).prop('checked')) {$(".itog-fixed-window").removeClass("hiddened");} else {$(".itog-fixed-window").addClass("hiddened");}
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
			out_compare_html += "<div><p>Сравните критерии друг с другом <span style='font-size: 18px'>с точки зрения предпочтительности их выбора</span>: </p></div></div>"; 
		}
		
	} else if (type == "alternative") {
		var count_items = $(".alterntives-wr .exist-items-wr>.item-class").length;
		var items = $(".alterntives-wr .exist-items-wr");
		var compcrit = $(".criteria-wr .exist-items-wr>.item-class:eq("+(numberCrit-1)+")"); 
		var out_compare_html = "<div class='comp-alter-it-title'>Сравните альтернативы относительно критерия <b>"+compcrit.find('.item-title').text()+"</b><br/><p>с точки зрения предпочтительности их выбора</p></div>";	 
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
	   			'<div><span class="compare-item-rate-title">Намного хуже</span><span class="compare-item-rate-title">Хуже</span>'+ 
	   			'<span class="compare-item-rate-title">Равнозначно</span><input type="range" style="width: 200px;" min="-10" max="10" step="0.05" list="rangeList">'+
	   			'<span class="compare-item-rate-title">Лучше</span><span class="compare-item-rate-title">Намного лучше</span></div></div>';
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

	var count_criteria = $(".criteria-wr .exist-items-wr>.item-class").length; 
	var count_alter = $(".alterntives-wr .exist-items-wr>.item-class").length;

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


/* --- functions to calculate itogs --- */
	
//get results of comparisons
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

//get results of comparisons with range of low and high bounds
function GetCompValArrayPlus(ClassComp){
	var count_compar = 0;
	var count_crit = $(".criteria-wr .exist-items-wr>.item-class").length;
	var count_alter = $(".alterntives-wr .exist-items-wr>.item-class").length; 

	var CompArray = new Array();
	$(ClassComp).find(".compare-item").each(function(){
		var sec_num = $(this).attr('class').split(' ')[1].split('comit-').pop(); 
		var mass = {};
		mass["value"] = parseFloat($(this).find('input[type=range]').val());
		var val1 = (mass["value"] < -9)?(-10):parseFloat(mass["value"] - 1);
		var val2 = (mass["value"] > 9)?10:parseFloat(mass["value"] + 1);
		mass["range"] = [val1, val2];
		CompArray[sec_num] =  mass;
	});

	return CompArray;

}; 

//get matrix of comparisons
function GetCompMatrFA(CompArray, count_t) {

	var count_items = count_t; 
	var matr_comp = new Array();

	for (var i=0; i<count_items; i++){
    matr_comp[i] = new Array();
	    for (var j=0; j<count_items; j++){
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

//get the main eigen vector of matrix 
function EigenVec(matrix){
	return numeric.abs(getCol(numeric.eig(matrix).E.x, 0));
}

//get vector of priorities from vector of comparisons (not sorted)
function GetItogFromVector(vector, count){
		var nmatr = GetCompMatrFA(vector, count);  
		return Normalized(EigenVec(nmatr));
}

//get vector of priorities with names of items (sorted)
function GetPriorVec(it_arr){

	function compareElem(elem1, elem2) {
	  return elem2.value - elem1.value;
	}

	var vector = [];
	for(var i = 0; i < it_arr.length; i++) { 
		var j = i+1;
		var item = {alter: $(".alterntives-wr .exist-items-wr>.item-class:eq("+(j-1)+") .item-title").text() , value: it_arr[i]};
		vector[i] = item;
	}	

	vector.sort(compareElem);

	var vector2 = [];
	for (var key in vector){
		vector2.push(vector[key].alter); 
	}

	return vector2;
}


function GetAllVariants(type, classw, range){

	if (type == "criteria"){
		var count_items = $(".criteria-wr .exist-items-wr>.item-class").length;
		
	} else if (type == "alternate"){
		var count_items = $(".alterntives-wr .exist-items-wr>.item-class").length; 
	}

	var comp_data = GetCompValArray(classw); 

	var h_step = range/9;

	var data_low = {};
	for (var key in comp_data){
		data_low[key] = comp_data[key] - (range/2); 
	};


	var count_compar = $(classw).find(".compare-item").length;

	//number with count of zeros equal count of comarisons  
	var g_count_c = 1;
	for(var k = 0; k < count_compar; k++) { 
		g_count_c += '0';
	}

	//add additional zeros up to len
	function ntozero(number, len){
		while (number.toString().length < len) number = '0'+ number;
		return number.toString();
	}

	//get array from low bound + step*k
	function getNmas(k, count_compar, data_low, step){
		var mas = ntozero(k, count_compar).split('');
		var newmas = {};
		var countt = 0;
		for (var key in data_low){
			newmas[key] = parseFloat(data_low[key]) + parseFloat(ntozero(k, count_compar).split('')[countt])*step; 
			countt++;
		};
		return newmas;
	}

	//all variants
	var mass_itog = new Array();

	var etalon_data = comp_data;
	mass_itog.push(etalon_data);

	
	function getalldif(k, count_compar, data_low, h_step, count_items){

		var mass_itogs = new Array();
		var nmatr = GetCompMatrFA(getNmas(k, count_compar, data_low, h_step), count_items);
		var itog = Normalized(EigenVec(nmatr));

		return itog; 
	}

	function getalldiffmass(g_count_c, count_compar, data_low, h_step, count_items, mass_itog){
		for (var s = 0; s < g_count_c; s++) {  
			mass_itog.push(getNmas(s, count_compar, data_low, h_step));
		}
		return mass_itog;
	}

	var itog_obj = [];
	itog_obj['etalon'] = etalon_data;
	itog_obj['mass'] = getalldiffmass(g_count_c, count_compar, data_low, h_step, count_items, mass_itog);

	return itog_obj;
}

//if results are different return TRUE
function getRaz(etal, addmas){
	var cnt = false;
	for (var k in etal){
		if (etal[k] != addmas[k]) { 
			cnt = true; return true; 
		}
	}
	if (cnt == false) return false;
}

//if newarr NOT into array of results return TRUE 
function addmassraz(mass_itog, newarr){
	var tmp = true;

	for(var k = 0; k < mass_itog.length; k++) { 
		if (!getRaz(mass_itog[k], newarr)) {
			tmp = false; 
			return tmp;
		};
	}
	if (tmp == true) {return tmp};
}

//get massive of new itogs from random selected variations of changed items. Counts means counts of iterations for criteria and alternatives  
function GenNewItog(count_iter_crit, count_iter_alt){

	var datacrit = GetAllVariants("criteria", ".comp-pair-crit", 1); 
	var dataalter = new Array();
	var count_crit = $(".criteria-wr .exist-items-wr>.item-class").length;
	var count_alter = $(".alterntives-wr .exist-items-wr>.item-class").length;
	for(var i = 1; i < count_crit+1; i++) { 
		dataalter.push(GetAllVariants("alternate", ".comp-pair-alter-item.comp-pair-alter-"+i, 1));
	}

  	var rand_crit = 0; 
  	var rand_alt = 0;
  	var criteria = new Array(); 
  	var alternatives = {};
  	var weight = new Array(); 
  	var vec_prior = numeric.rep([count_alter], 0); 
  	var criteria_itog = {};
  	var alter_itog = {};
  	var tmp_itog = new Array();
  	var globalmassitog = new Array(); 

	for(var i = 0; i < count_iter_crit; i++) { 

		vec_prior = numeric.rep([count_alter], 0);  

		rand_crit  = Math.floor(Math.random() * datacrit['mass'].length); 
		criteria = datacrit['mass'][rand_crit];
		criteria_itog = GetItogFromVector(criteria, count_crit);

		for(var k = 0; k < count_iter_alt; k++) { 

			vec_prior = numeric.rep([count_alter], 0); 
			for(var j = 0; j < count_crit; j++) { 
				rand_alt  = Math.floor(Math.random() * dataalter[j]['mass'].length);
				alternatives = dataalter[j]['mass'][rand_alt];

				alter_itog = GetItogFromVector(alternatives, count_alter);
				weight = numeric.rep([alter_itog.length], criteria_itog[j]);
				tmp_itog = numeric.mul(weight, alter_itog);
				vec_prior = numeric.add(tmp_itog, vec_prior); 
			}

			//add to global array of results;
			globalmassitog.push(vec_prior);

		}

	}

	return globalmassitog;
}

//get massive of possible itogs with counts of each
function GetAdditionalItog(newitog){
	var globalmassitog = newitog; 
  	var globalmassitogpr = new Array();
  	var global_tmp = new Array();

  	var obj_tmp = {};
  	obj_tmp['count'] = 1;
  	obj_tmp['mass'] = GetPriorVec(globalmassitog[0]);

  	globalmassitogpr.push(obj_tmp);
  	global_tmp.push(GetPriorVec(globalmassitog[0]).join(''));

  	var tmp_mass = new Array();
  	var tmp_index = 0;

  	for (var i = 1; i < globalmassitog.length; i++) {
  		obj_tmp = {};

  		tmp_mass = GetPriorVec(globalmassitog[i]);

  		if (addmassraz(global_tmp, tmp_mass.join(''))) {
  			obj_tmp['count'] = 1;
  			obj_tmp['mass'] = tmp_mass;
  			globalmassitogpr.push(obj_tmp);
  			global_tmp.push(tmp_mass.join(''));
  		} else {
  			tmp_index = global_tmp.indexOf(tmp_mass.join(''));
  			globalmassitogpr[tmp_index]['count']++;
  		}
  	}

  	return globalmassitogpr;
}

//get the main vector of priorities
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
		//console.table(nmatr); 
		var vec_prior = EigenVec(nmatr);

		//$('.gotomatrix').append("alter"+k_val+" : "+vec_prior.join(' , ')+" - ");  
  		//$('.gotomatrix').append('<br/>');

		var weight = numeric.rep([vec_prior.length], vec_prior_krit[k]);

		var vec_prior2 = numeric.mul(weight,vec_prior);

		//$('.gotomatrix').append("Weight*vec : "+ vec_prior2.join(' , '));  
  		//$('.gotomatrix').append('<br/>');

  		itog = numeric.add(itog, vec_prior2);

  	}

  	var norma = numeric.norm2(itog);
  	var sum = numeric.mapreduce('accum += xi','0'); 
  	var norma2 = sum(itog);
  	var itog2 = numeric.div(itog,norma2);

  	var itog_text = "<div class='itog_text_wr' >"+
  	"<div style='margin-bottom: 10px;'> Ваша цель: <b>"+$('.add-goal-wr .the-goal').text()+"</b></div>"+
  	"<div> Вы произвели сравнения альтернатив: </div><div>";
  		$('.alterntives-wr .exist-items-wr .item-class').each(function(){
			itog_text += " <b>"+$(this).find('.item-title').text()+"</b>, ";
		}); 
	itog_text += "</div>";	

	itog_text += "<div> относительно следующих критериев: </div><div>";
  		$('.criteria-wr .exist-items-wr .item-class').each(function(){
			itog_text += " <b>"+$(this).find('.item-title').text()+"</b>, ";
		}); 
	itog_text += "</div>";		
 	
 	itog_text += "<div style='font-size: 18px'>Итоговое упорядочивание альтернатив с точки зрения предпочтительности выбора:</div>"+
 	"<p><b>"+GetPriorVec(itog2).join('</b></p><p><b> ')+"</b></p>"; 

 	itog_text += "<div>Если вы хотите получить расширенные дополнительные рекомендации: </div>"

  	$('.gotomatrix').html(itog_text);
  	$('.itog-fixed-window').html("Приоритеты альтернатив: "+ GetPriorVec(itog2).join(' , '));  

}

function GetDataForCharts(data){
	var Names = new Array();
	var Values = new Array();
	var global_count = 0;

	for(var k = 0; k < data.length; k++) { 
		Names.push(data[k]["mass"].join(",<br/>")); 
		global_count += data[k]["count"];
		Values.push(data[k]["count"]);
	};

	for(var k = 0; k < Values.length; k++) { 
		Values[k] = parseFloat(parseFloat(parseInt(Values[k])/global_count*100).toFixed(2));
	}

	return [Names, Values];
}


function InsertDataCharts(data_value, data_names, containerdiv){
	Highcharts.chart( containerdiv, {
	    chart: {
	    	backgroundColor: '#FCFFC5',
	        type: 'column',
	        backgroundColor: null, 
	        options3d: {
	            enabled: true,
	            alpha: 10,
	            beta: 25,
	            depth: 70
	        }
	    },
	    title: {
	        text: 'Дополнительные рекомендации в выборе альтернатив'
	    },
	    subtitle: {
	        text: 'На графике показаны возможно подходящие упорядочивания в процентном соотношении с точки зрения предпочтительности'
	    },
	    plotOptions: {
	        column: {
	            depth: 25
	        }
	    },
	    xAxis: {
	        categories: data_names
	    },
	    yAxis: {
	        title: {
	            text: 'Вероятная возможность выбора, %'
	        }
	    },
	    series: [{
	        name: 'Возможность выбора',
	        data: data_value
	    }]
	});
};

$(".on-add-recomend").on('click', function(){

	PushNotification("Подождите ... (окно закроется автоматически)", 0, "on");  

	setTimeout(function () {
		var itog_data = GenNewItog(200,400);  
		var itog = GetAdditionalItog(itog_data);
		var data_alter = GetDataForCharts(itog);
		InsertDataCharts(data_alter[1], data_alter[0], "recomendations-charts"); 
		PushNotification("", 0, "off"); 
	}, 1000);
  	
});

$("body").on('change', '.compare-item input[type="range"]', function(){
	if ($(".gotomatr-inp").hasClass("selected-itog")) GetItog();
});

$('body').on('click', '.gotomatr-inp', function(){ 

	$(this).addClass("selected-itog");
  	GetItog(); 
  	
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

$(".main-button-mp").on('click', function(){
	$(".nav .mnav-items").removeClass('selected');
	$(".nav .mnav-item-2").addClass('selected');

	$(".main-actionarea .block-nav-items").removeClass('selected');
	$(".main-actionarea .block-nav-item-2").addClass('selected'); 
});

$('.gotomatr-inp').on('click', function(){
	$(".nav .mnav-items").removeClass('selected');
	$(".nav .mnav-item-5").addClass('selected');

	$(".on-add-recomend").removeClass("hiddened");
	$(".main-actionarea .block-nav-items").removeClass('selected');
	$(".main-actionarea .block-nav-item-5").addClass('selected'); 

})


/* -- notification -- */

$(".notific-main-wr .close").on('click', function(){
	$(this).closest(".background-wr").hide("slow");
});

function PushNotification(text, delay, type){

	if (type == "on") {
		$(".background-wr .notific-main-wr>div").text(text);
		$(".background-wr").show("slow");

		if (delay > 0) {
			setTimeout(function() { $(".background-wr").hide("slow"); }, delay);
		}
	} else if (type == "off") {
		$(".background-wr").hide("slow"); 
	};

	
}
 

});



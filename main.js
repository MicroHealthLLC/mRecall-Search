function search(){
	var keyword = $("#search-text").val();
	keyword=keyword.replace(/ /g,"+");
	var startDate = $("#start-date").val();
	var endDate = $("#end-date").val();
	//var site = "http://api.usa.gov/recalls/search.json?query="+encodeURIComponent(keyword)+"&start_date="+encodeURIComponent(startDate)+"&end_date="+encodeURIComponent(endDate);
	//var site = "http://api.usa.gov/recalls/search.json?upc=042666601627"
	//$("#busy-holder").show()
	// var yql = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + site + '"') + '&format=json&callback=?';
	// $.getJSON(yql, callback);
	// $.ajax({"url":"http://api.usa.gov/recalls/search.json?upc=042666601627","type":"GET"}).done(function(res){callback(res)}).fail(function(a,b,c){alert('fail');console.log(a,b,c);});
}

function callback(res){
	$("#busy-holder").hide()
	console.log(res);
	/*var respData = res['results'][0];
	var conData = $.parseXML(respData);
	$test = $(conData);
  	var $data = $(conData).find("document");
  	var resStr="";
  	$data.each(function(){
  		resStr+="<li><h5><div class='open_box' tabindex='-1'></div>";
		resStr+="<a href='"+$(this).attr('url')+"' target='_blank'>"+$(this).find("content[name=title]").text()+"("+$(this).find("content[name=organizationName]").text()+")</a>";
		resStr+="</h5><div class='contentBlog' style='display:none'>";
		resStr+=$(this).find("content[name=FullSummary]").text();
		resStr+="</div></li>"
  	})
  	if($data.length==0){
		resStr="<li><p> No Matching Result(s) </p></li>";
	}
	$("#main-result").html(resStr);

	$('#results').pajinate({
		items_per_page : 10,
		nav_label_first : '<<',
		nav_label_last : '>>',
		nav_label_prev : '<',
		nav_label_next : '>'	
	});

	$("#results").show().find(".ellipse").hide();
	$("#search-text").focus();*/

}

var $test;

$( document ).ready(function() {
	$("#find").on("click",function(){
		search();
	});

	$("#results").on("click",".open_box",function(){
		var thisObj = $(this);
        var contentBlog = thisObj.parent().next(".contentBlog");
        if(contentBlog.is(":visible")){
          thisObj.parent().removeClass('opened');
        	contentBlog.slideUp('slow');
        }else{
          thisObj.parent().addClass('opened')
          contentBlog.slideDown('slow');
        }
	})

	$("#search-text").on("keyup",function(e){
		var keycode = e.keyCode;
		if(keycode==13)
			search();
	})

	var date = new Date();
	var currYear = date.getFullYear();
	var newDate = new Date();
	newDate.setFullYear(parseInt(currYear)+1)

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'-'+mm+'-'+yyyy;
	var newDate =  dd+'-'+mm+'-'+(parseInt(yyyy)+1);

	$("#start-date").datepicker({
		 changeMonth: true,
		 changeYear: true,
		 dateFormat:"dd-mm-yy",
		  onClose: function( selectedDate ) {
			$( "#end-date" ).datepicker( "option", "minDate", selectedDate );
		  }
	}).val(today)

	$("#end-date").datepicker({
		 changeMonth: true,
		 changeYear: true,
		 dateFormat:"dd-mm-yy",
		  onClose: function( selectedDate ) {
			$( "#start-date" ).datepicker( "option", "maxDate", selectedDate );
		  }
	}).val(newDate)
	
	
	/*$('#start-date').Zebra_DatePicker({
	    direction: true,
	    pair: $('#end-date'),
	    format: 'd/m/Y'
	}).val(date.toLocaleDateString())
	 
	$('#end-date').Zebra_DatePicker({
	    direction: 1,
	    format: 'd/m/Y'
	}).val(newDate.toLocaleDateString())*/

});
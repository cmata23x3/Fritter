//This is the file to use jquery

/**
* 
*
*/
$(".editButton").click(function(){
	console.log("clicked on edit!");
	var parent = $(this).parent();
	$(this).toggle();
	parent.find($(".deleteForm")).toggle();
	parent.find($(".editForm") ).toggle();
});

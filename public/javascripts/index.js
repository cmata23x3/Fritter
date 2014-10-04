//This is the file to use jquery

/**
* 
*
*/
$(".editButton").click(function(){
	var parent = $(this).parent();
	$(this).html(toggleLabel($(this).text()));
	//gotta find the text & set it to the input field
	var text = parent.find($(".tweetText"));
	parent.find($(".editTweetText")).val(text.text());
	text.toggle();
	//Now toggle form on & button off
	parent.find($(".deleteForm")).toggle();
	parent.find($(".editForm")).toggle();
});

function toggleLabel(current){
	if(current === "Edit"){
		return "Back";
	}
	else{
		return "Edit";
	}
}
//This is the file to use jquery

/*
* Method handles the click functionalitu of the edit button found
* on each of the tweets in the tweet feed. This method uses jQuery 
* to change the view to show the edit form and hide the delete form. 
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

/*
* Method is called when to change the label of the 
* edit/back button. Here the method checks the current label name
* and returns the opposite string. Private method
*
* @method toggleLabel
* @param {String} current String of the current label on the button.
* @return {String} Returns String of the new button label value. 
*/
function toggleLabel(current){
	if(current === "Edit"){
		return "Back";
	}
	else{
		return "Edit";
	}
}
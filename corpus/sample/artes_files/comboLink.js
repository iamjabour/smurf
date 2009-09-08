/**
 * Redirects a page based on an option selected.
 */
var combolink = function(select){
	var option = select.options[select.selectedIndex];
	window.location = option.value;
}
/*
 * Simple function to toogle an element visibility
 */
var toogle = function(objId){
	var obj = document.getElementById(objId);
	if(obj.style.display == "none")
		obj.style.display = "block";
	else
		obj.style.display = "none";
}

/*
 * Simple function to toogle an list item class from "list" to "selected"
 */
 var selectList = function(objId){
	var obj = document.getElementById(objId);
	if(obj.className == "selected")
		obj.className = "list";
	else
		obj.className= "selected";
} 
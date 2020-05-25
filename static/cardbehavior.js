function closetab(eventhandler, event)
{
	event.stopPropagation();
	console.log(eventhandler.parentElement);
	
	newscard = eventhandler.parentElement;
	childnodes = newscard.children;
	newscontainer = childnodes[1].children;

	newscontainer[1].style.display = "block";
	newscontainer[2].style.display = "none";
	newscontainer[3].style.display = "none";
	newscontainer[4].style.display = "none";
	newscontainer[5].style.display = "none";
	newscontainer[6].style.display = "none";

	eventhandler.style.display = "none";
	//document.getElementsByClassName("cross")[0].style.display = "none";
	//document.getElementsByClassName("description")[0].innerHTML = "USC";
}

function opentab(eventhandler)
{
	console.log(eventhandler);

	childnodes = eventhandler.children;
	newscontainer = childnodes[1].children;

	newscontainer[1].style.display = "none";
	newscontainer[2].style.display = "block";
	newscontainer[3].style.display = "block";
	newscontainer[4].style.display = "block";
	newscontainer[5].style.display = "block";
	newscontainer[6].style.display = "block";

	childnodes[2].style.display = "block";
	//document.getElementsByClassName("cross")[0].style.display = "block";
	//document.getElementsByClassName("description")[0].innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";	
}
function switchtabs(button)
{
	buttons = document.getElementsByClassName("buttoncontainer")[0].children;
	console.log(buttons);
	if(button == "button1")
	{
		buttons[0].classList.add("selectedbutton");
		buttons[0].classList.remove("unselectedbutton");
		buttons[1].classList.add("unselectedbutton");
		buttons[1].classList.remove("selectedbutton");
		
		document.getElementsByClassName("search")[0].style.display="none";
		document.getElementsByClassName("news")[0].style.display="flex";
	}
	else 
	{	
		buttons[1].classList.add("selectedbutton");
		buttons[1].classList.remove("unselectedbutton");	
		buttons[0].classList.add("unselectedbutton");
		buttons[0].classList.remove("selectedbutton");	

		document.getElementsByClassName("search")[0].style.display="flex";
		document.getElementsByClassName("news")[0].style.display="none";
	}
	
}

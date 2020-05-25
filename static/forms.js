function defaults()
{
	console.log("Default called");
	var to_date = new Date();
	var from_date = new Date();

	var past_date = to_date.getDate() - 7;
	from_date.setDate(past_date); 
	//var str_date = current_date.getFullYear() + "-" + current_date.getMonth() + "-" + current_date.getDate();
	console.log(from_date.toISOString());
	console.log(to_date.toISOString());
	document.getElementsByName('from')[0].value = from_date.toISOString().substring(0,10);
	document.getElementsByName('to')[0].value = to_date.toISOString().substring(0,10);
	// Call loadsources() here
	loadsources();
}

function submitform()
{
	console.log("Form Submitted");
	var keyword = document.getElementsByName("keyword")[0].value;
	var from = document.getElementsByName("from")[0].value;
	var to = document.getElementsByName("to")[0].value;
	var category = document.getElementsByName("Category")[0].value;
	var source = document.getElementsByName("Sources")[0].value;

	from_date = Date.parse(from);
	to_date = Date.parse(to)

	if(from_date >= to_date)
	{
		alert("Incorrect Time");
		return false;
	}

	var query = "keyword="+keyword+"&from="+from+"&to="+to+"&source="+source;
	makerequest_post('geteverything', query, parseverything);
	return false;

}

function loadsources()
{
	var category = document.getElementsByName("Category")[0].value;
	console.log("Load Sources from Backend");
	makerequest_post('getsources', "category="+category, parsesources);
}

function parsesources(data) 
{
	console.log("Data Pinged Back");
	//console.log(data);
	sources = data.sources;
	//console.log("Sources are : ")
	html = '<option value = \"all\">' + 'all' + '</option>';
	for(var i = 0; i < sources.length; i++)
	{
		//console.log(sources[i].name);
		html += '<option value = \"' + sources[i].name + '\">' + sources[i].name + '</option>'
	}
	document.getElementsByName("Sources")[0].innerHTML = html;
}

function parseverything(data) 
{

	console.log("Data Pinged Back");
	console.log(data);

	if(data.status == 'error')
	{
		alert(data.message);
		return;
	}

	articles = data.articles;

	shownews();

	if(articles.length < 1)
	{
		document.getElementById("morebutton").style.display="none";
		document.getElementById("cardscontainer1").innerHTML = "<p>No Results</p>";
		return;
	}

	html = "";
	for(var i = 0; i < articles.length && i < 5; i++)
	{ 
		html += '<div class="newscard" onclick="opentab(this)">';
		html += '<img src=\"' + articles[i].urlToImage + '\">';
		
		html += '<div class="newscontainer">';
		html += '<h4>' + articles[i].title + '</h4>';
		var description = onelinedescription(articles[i].description);
		html += '<p>' + description + '</p>';
		html += '<p style="display:none"><b>Author: </b>' + articles[i].author + "</p>";
		html += '<p style="display:none"><b>Source: </b>' + articles[i].source.name + "</p>";
		var date = new Date(articles[i].publishedAt);
		html += '<p style="display:none"><b>Date: </b>' + date.toLocaleDateString() + "</p>";
		html += '<p style="display:none">'+articles[i].description+'</p>';
		html += '<a style="display:none" href=\"' + articles[i].url + '\" target=\"blank\">See Original Post</a>'; 
		html += '</div>';

		html += '<div style="display:none" class=\"cross\" onclick="closetab(this, event)"><img src=\"cross.svg\"></div>';

		html += '</div>';
	}
	document.getElementById("cardscontainer1").innerHTML = html;

	if(articles.length < 5)
	{
		document.getElementById("morebutton").style.display="none";
	}

	html = "";
	for(var i = 5; i < articles.length && i < 15; i++)
	{ 
		html += '<div class="newscard" onclick="opentab(this)">';
		html += '<img src=\"' + articles[i].urlToImage + '\">';
		
		html += '<div class="newscontainer">';
		html += '<h4>' + articles[i].title + '</h4>';
		var description = onelinedescription(articles[i].description);
		html += '<p>' + description + '</p>';
		html += '<p style="display:none"><b>Author: </b>' + articles[i].author + "</p>";
		html += '<p style="display:none"><b>Source: </b>' + articles[i].source.name + "</p>";
		var date = new Date(articles[i].publishedAt);
		html += '<p style="display:none"><b>Date: </b>' + date.toLocaleDateString() + "</p>";
		html += '<p style="display:none">'+articles[i].description+'</p>';
		html += '<a style="display:none" href=\"' + articles[i].url + '\" target=\"blank\">See Original Post</a>'; 
		html += '</div>';

		html += '<div style="display:none" class=\"cross\" onclick="closetab(this, event)"><img src=\"cross.svg\"></div>';

		html += '</div>';
	}

	document.getElementById("cardscontainer2").innerHTML = html;

}

function clearform()
{
	console.log("Clear Form Called");
	document.getElementsByName("keyword")[0].value = "";
	document.getElementsByName("from")[0].value = "";
	document.getElementsByName("to")[0].value = "";
	document.getElementsByName("Category")[0].value = "all";
	document.getElementsByName("Sources")[0].value = "all";

	clearnews();
	defaults();
}

function shownews()
{
	//document.getElementById("searchnewscards").style.display = "flex";

	document.getElementById("cardscontainer1").classList.remove("hidden");
	document.getElementById("cardscontainer1").classList.add("cardscontainer");
	document.getElementById("cardscontainer2").classList.add("hidden");
	document.getElementById("cardscontainer2").classList.remove("cardscontainer");
	document.getElementById("morebutton").style.display="block";
	document.getElementById("lessbutton").style.display="none";
}

function showmore()
{
	document.getElementById("cardscontainer2").classList.remove("hidden");
	document.getElementById("cardscontainer2").classList.add("cardscontainer");
	document.getElementById("morebutton").style.display = "none";
	document.getElementById("lessbutton").style.display="block";	
}

function showless()
{
	document.getElementById("cardscontainer2").classList.add("hidden");
	document.getElementById("cardscontainer2").classList.remove("cardscontainer");
	document.getElementById("morebutton").style.display = "block";
	document.getElementById("lessbutton").style.display="none";	
}

function clearnews()
{
	document.getElementById("cardscontainer1").classList.remove("cardscontainer");
	document.getElementById("cardscontainer1").classList.add("hidden");
	document.getElementById("cardscontainer2").classList.remove("cardscontainer");
	document.getElementById("cardscontainer2").classList.add("hidden");
	document.getElementById("lessbutton").style.display = "none";
	document.getElementById("morebutton").style.display = "none";
	
	//document.getElementById("searchnewscards").style.display ="none";
	
}

function onelinedescription(str)
{
	var max_length = 60;
	var words = str.split(" ");
	var curr_str = "";

	for(var i = 0; i < words.length; i++)
	{
		if(curr_str.length + words[i].length <= max_length)
		{	
			curr_str = curr_str + " " + words[i];
		}
		else
		{
			curr_str = curr_str + "...";
			break;
		}	
	}
	return curr_str;
}
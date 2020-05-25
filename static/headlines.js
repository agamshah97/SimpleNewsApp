function topheadlines(data)
{
	console.log("Top Headlines Received Successfully");
	//console.log(data);

	articles = data.articles;

	//<div class="mySlides fade">
    //<div class="numbertext">1 / 3</div>
    //<img src="img1.jpg" style="width:100%">
    //<div class="text">Caption Text</div>
  	//	</div>''

	var html = "";
	for(var i = 0; i < articles.length; i++)
	{
		html += '<div class="article" onclick = window.open(\''+ articles[i].url + '\')>';
		html += '<img src=\"' + articles[i].urlToImage + '\" style=\"width:100%;\">';
		html += '<div class = \'text\'>';
		html += '<p style="margin-bottom:5px;"><b>' + articles[i].title + "</b></p>";
		//html += '<br>'
		html += '<p style="margin-bottom:5px;">' + articles[i].description + "</p>";
		html += '</div></div>';
	}

	document.getElementsByClassName('carousel')[0].innerHTML = html;
	showSlides();
}

function cnnheadlines(data)
{
	console.log("CNN Headlines Received Successfully");
	//console.log(data);

	articles = data.articles;

	var html = "";	
	for(var i = 0; i < articles.length; i++)
	{
		html += '<div class="headlinescard" onclick = window.open(\''+ articles[i].url + '\')>';
		html += '<img src=\"' + articles[i].urlToImage + '\" width=100%>';
		html += '<p><b>' + articles[i].title + "</b></p>";
		//html += '<br>'
		html += '<p>' + articles[i].description + "</p>";
		html += '</div>';
	}

	//console.log(html);
	document.getElementsByClassName('cnnnewspane')[0].innerHTML = html;
}

function foxheadlines(data)
{
	console.log("Fox Headlines Received Successfully");
	//console.log(data);

	articles = data.articles;

	var html = "";	
	for(var i = 0; i < articles.length; i++)
	{
		html += '<div class="headlinescard" onclick = window.open(\''+ articles[i].url + '\')>';
		html += '<img src=\"' + articles[i].urlToImage + '\" width=100%>';
		html += '<p><b>' + articles[i].title + "</b></p>";
		//html += '<br>'
		html += '<p>' + articles[i].description + "</p>";
		html += '</div>';
	}

	//console.log(html);
	document.getElementsByClassName('foxnewspane')[0].innerHTML = html;
}

var slideIndex = 0;
function showSlides() 
{
  	var i;
  	var slides = document.getElementsByClassName("article");
  	for (i = 0; i < slides.length; i++) 
  	{
    	slides[i].style.display = "none";  
  	}
  	slideIndex++;
  	if (slideIndex > slides.length) 
  	{
  		slideIndex = 1;
  	}    
  	
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


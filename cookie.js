function setCookies(cname,value,exdays){
	var d = new Date();
	var encodeValue=encodeURI(value)
  	d.setTime(d.getTime()+(exdays*86400000));
	var expires = "expires="+d.toGMTString();
	if(exdays){
		document.cookie = cname + "=" + encodeValue+ "; " + expires;
	}else{
		document.cookie = cname + "=" + encodeValue ;
	}
}
function getCookies(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) 
	{
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return decodeURI(c.substring(name.length,c.length));
	}
	return null;
}
function cleanCookies(cname){
	if(!cname)return
	var d = new Date();
	d.setTime(d.getTime()-86400000);
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + 0+ "; " + expires;
}
(function() {
	// console.log(window.location.href)
	// var img_tag_groups=document.getElementsByTagName('img');


	chrome.extension.onMessage.addListener(function(request, sender, sendMessage) {
		if (request.greeting == "hello") {
			var img_tag_groups = document.getElementsByTagName('img');
			var img_src_groups = [];
			for(var imgItem of img_tag_groups){
				if(imgItem.src.replace(/\s/g,'').length>0)img_src_groups.push(imgItem.src)
			}
			// var img_src_groups = img_tag_groups.map(function(imgItem) {
			// 	return imgItem.src
			// })
			sendMessage(img_src_groups);
		} else {
			sendMessage("FUCK OFF"); // snub them.
		}
	});
})()

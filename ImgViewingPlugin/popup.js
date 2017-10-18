(function() {

	var img_group=[];
	var active_idx=0;
	var tabId=null;
	chrome.tabs.getSelected(null, function (tab) {　　// 先获取当前页面的tabID
		tabId=tab.id;
	    chrome.tabs.sendMessage(tabId, {greeting: "hello"}, function(resSrc) {
	    	// console.log(resSrc)
	    	var img_box=document.getElementById('img_box');
	    	var imgGroups='';
	    	if(!resSrc)return
	    	img_group=resSrc;
	    	resSrc.map(function(srcItem){
	    		imgGroups+='<div class="img-item"><img src="'+srcItem+'" /></div>'
	    	})

	    	changeShowingIndex()
	    	img_box.innerHTML=imgGroups;
	    	img_box.style.width=resSrc.length*500+'px';
	    });
	});

	document.getElementById('left_btn').onclick=function(){
		changeActiveIdx(1);
	}

	document.getElementById('right_btn').onclick=function(){
		changeActiveIdx(0);
	}

	function changeActiveIdx(isLeft){
		
		if(!isLeft){
			if(active_idx>=img_group.length-1)return
			active_idx++;
		}else{
			if(active_idx<=0)return
			active_idx--;
		}
		changeShowingIndex();
		document.getElementById('img_box').style.left=-active_idx*500+'px';
	}

	function changeShowingIndex(){
		document.getElementById('showing_index').innerHTML=(active_idx+1)+'/'+img_group.length;
	}
})()
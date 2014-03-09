var btnSave = document.querySelector('.btn-save'),
	btnRetrieve = document.querySelector('.btn-retrieve'),
	display = document.querySelector('div'),
	pinnedTabs;



btnSave.addEventListener('click', function(event){
	pinnedTabs = []; // Reset the array //
	chrome.tabs.query({'pinned': true}, function(tabs) {
		for (var i = 0; i < tabs.length; i++) {
			pinnedTabs.push(tabs[i].url);
		}

		chrome.storage.sync.set({'pinnedTabs': pinnedTabs}, function(){
			display.textContent = "Saving...";
		});
	});
});

btnRetrieve.addEventListener('click', function(event){
	chrome.storage.sync.get('pinnedTabs', function(result){
		chrome.notifications.clear('1', function(){});

		display.textContent = "Retrieving...";

		for (var i = 0; i < result.pinnedTabs.length;i++) {
			chrome.tabs.create({ url: result.pinnedTabs[i], pinned: true });
		}
	});
});
console.log('Content script is running on band.us');

function updateButtonsWithNickname(nicknames) {
    var buttons = document.querySelectorAll('button.author');
    buttons.forEach(function(button) {
        var originalUsername = button.textContent.trim();
        var customNickname = nicknames[originalUsername];
        if (customNickname) {
            button.textContent = customNickname;
        }
    });

    var buttons2 = document.querySelectorAll('button.nameWrap > .name');
    buttons2.forEach(function(button) {
        var originalUsername = button.textContent.trim();
        var customNickname = nicknames[originalUsername];
        if (customNickname) {
            button.textContent = customNickname;
        }
    });
	
	var buttons3 = document.querySelectorAll('span.ellipsis > .text');
    buttons3.forEach(function(button) {
        var originalUsername = button.textContent.trim();
        var customNickname = nicknames[originalUsername];
        if (customNickname) {
            button.textContent = customNickname;
        }
    });
}

function updateButtonsPeriodically() {
    chrome.storage.local.get({ 'nicknames': {} }, function(result) {
        var nicknames = result.nicknames;
        updateButtonsWithNickname(nicknames);
    });
}

// Run the function immediately and then every 5 seconds
updateButtonsPeriodically();
setInterval(updateButtonsPeriodically, 5000);


    console.log('Content script is running on band.us');

    var nicknames = {
        'Clipz': 'Assclipz'
        // Add more original usernames and custom nicknames as needed
    };

    function updateButtonsWithNickname() {
        var buttons = document.querySelectorAll('button.author');
        buttons.forEach(function(button) {
            var originalUsername = button.textContent.trim();
            var customNickname = nicknames[originalUsername];
            if (customNickname) {
                button.textContent = customNickname;
            }
        });
		
		var buttons2 = document.querySelectorAll('button.nameWrap >.name');
        buttons2.forEach(function(button) {
            var originalUsername = button.textContent.trim();
            var customNickname = nicknames[originalUsername];
            if (customNickname) {
                button.textContent = customNickname;
            }
        });
    }

    updateButtonsWithNickname();
	setInterval(updateButtonsWithNickname, 10000);


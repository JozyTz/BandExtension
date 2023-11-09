document.addEventListener('DOMContentLoaded', function() {
    var nicknameList = document.getElementById('nicknameList');
    var originalUsernameInput = document.getElementById('originalUsername');
    var customNicknameInput = document.getElementById('customNickname');
    var addNicknameButton = document.getElementById('addNicknameButton');

    // Load nicknames from storage and display them in the GUI
    chrome.storage.local.get({ 'nicknames': {} }, function(result) {
        var nicknames = result.nicknames;
        updateNicknameList(nicknames);
    });

    // Add a new nickname to storage and update the list
    addNicknameButton.addEventListener('click', function() {
        var originalUsername = originalUsernameInput.value;
        var customNickname = customNicknameInput.value;

        chrome.storage.local.get({ 'nicknames': {} }, function(result) {
            var nicknames = result.nicknames;
            nicknames[originalUsername] = customNickname;

            chrome.storage.local.set({ 'nicknames': nicknames }, function() {
                console.log('Nickname added:', originalUsername, '->', customNickname);
                updateNicknameList(nicknames);
            });
        });
    });

    // Update the nickname list in the GUI
    function updateNicknameList(nicknames) {
        nicknameList.innerHTML = '';
        for (var username in nicknames) {
            var listItem = document.createElement('li');
            listItem.textContent = username + ' -> ' + nicknames[username];

            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'x';
            deleteButton.className = 'deleteButton';

            // Attach a click event listener to the "x" button
            deleteButton.addEventListener('click', function(event) {
                var usernameToRemove = event.target.parentNode.textContent.split(' -> ')[0];
                chrome.storage.local.get({ 'nicknames': {} }, function(result) {
                    var nicknames = result.nicknames;
                    delete nicknames[usernameToRemove];
                    chrome.storage.local.set({ 'nicknames': nicknames }, function() {
                        console.log('Nickname deleted:', usernameToRemove);
                        updateNicknameList(nicknames);
                    });
                });
            });

            listItem.appendChild(deleteButton);
            nicknameList.appendChild(listItem);
        }
    }
});

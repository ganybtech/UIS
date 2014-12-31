"use strict";

/*
Validates the loginform and returns true
if username is greater than 7 chracters and
password is greater than 5 characters
*/
function checkform() {

    var isValid = true;
    if (document.getElementById('username').value.length < 8) {
        alert("UserName should be of minimum 8 characters");
        isValid = false;
    } else if (document.getElementById('password').value.length < 6) {
        alert("Password should be of minimum 6 characters");
        isValid = false;
    }
    if (isValid) {
        document.getElementById('loginform').action = 'myProfile.html';
    }
}

/*
Validates the name,age,mobilenumber and e-mail fields
*/

function validate() {
    if (!(document.getElementById('name').value.match(/^[a-zA-Z ]*$/))) {
        alert("Name field should contain only Alphabets");
    }
    var age = document.getElementById('age').value;

    if (!(age.match(/^\d+$/) && age > 0 && age <= 100 && age % 1 === 0)) {
        alert("Enter valid Age");
    }
    var phonenumber = document.getElementById('mobilenumber').value;
    if (!(phonenumber.match(/^\d+$/) && phonenumber > 0 && phonenumber.length > 6)) {
        alert("Enter valid phone number");
    }
    if (!(document.getElementById('email').value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/))) {
        alert("Enter valid mail id");
    }
    
}

/*
Shows and hides the necessray fields based on user action
*/
function showFeed() {
    document.getElementById('feedId').style.display = "block";
    document.getElementById('profileId').style.display = "none";

}

/*
Shows and hides the necessray fields based on user action
*/
function showProfile() {

    document.getElementById('feedId').style.display = "none";
    document.getElementById('profileId').style.display = "block";

}

/*
Function which will enable the Save button 
only when the user specified other necessary fields in the page
*/
function formValidation(oEvent) {
    oEvent = oEvent || window.event;
    var txtField = oEvent.target || oEvent.srcElement;
    var isAvailable = false;
    (document.getElementById("name").value.length > 0 ? isAvailable = true : isAvailable = false);

    (document.getElementById("age").value.length > 0 ? isAvailable = true : isAvailable = false);

    (document.getElementById("mobilenumber").value.length > 0 ? isAvailable = true : isAvailable = false);

    (document.getElementById("email").value.length > 0 ? isAvailable = true : isAvailable = false);

    (document.getElementById("address").value.length > 0 ? isAvailable = true : isAvailable = false);

    document.getElementById("image").value = document.getElementById("profileimage").value
    if (isAvailable) {
        document.getElementById("save").disabled = false;
    } else {
        document.getElementById("save").disabled = true;
    }
}

/*
Calls the formValidation() function based on various user action
*/
window.onload = function() {
    var isAvailable = false;
    document.getElementById("save").disabled = true;

    document.getElementById("name").onkeyup = formValidation;
    document.getElementById("age").onkeyup = formValidation;
    document.getElementById("mobilenumber").onkeyup = formValidation;
    document.getElementById("email").onkeyup = formValidation;
    document.getElementById("address").onkeyup = formValidation;
    document.getElementById("profileimage").onselect = formValidation;
}

var feeds = [];
var count = 0;

function abstractFeed() {
    this.id;
    this.type;
    this.date;

};
abstractFeed.prototype.getId = function() {
    return this.id;
};
abstractFeed.prototype.getType = function() {
    return this.type;
};
abstractFeed.prototype.getDatetime = function() {
    return this.date;
};

urlFeed.prototype = new abstractFeed();
urlFeed.prototype.constructor = urlFeed;

function urlFeed(name, id, date, value) {
    this.type = name;
    this.id = id;
    this.date = date;
    this.value = value;
}

textFeed.prototype = new abstractFeed();
textFeed.prototype.constructor = textFeed;

function textFeed(name, id, date, value) {
    this.type = name;
    this.id = id;
    this.date = date;
    this.value = value;
}

urlFeed.prototype.getValue = function() {
    return this.value;
};
textFeed.prototype.getValue = function() {
    return this.value;
};

/*
Formats the date in the dd/mm/yyy hh:mm am/pm format.
*/
function formatMeridian(now) {
    var date = now.getDate();
    var month = now.getMonth();
    var year = now.getFullYear();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var meridian = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var finalDate = date + '/' + month + '/' + year + ' '+ hours + ':' + minutes + ' ' + meridian;
    return finalDate;
}


function createFeed() {
    var now = new Date();
    var date = formatMeridian(now);
    count = count + 1;
    var feedData = document.getElementById('urlfeed');
    if (feedData.value != '') {
        if (/:\/\//.test(feedData.value)) {
            var feed = new urlFeed('URL', count, date, feedData.value);
        } else {
            var feed = new textFeed('TEXT', count, date, feedData.value);
        }
        feedData.value = '';
        feeds.push(feed);
        updateList();
    }
    feedData.focus();
}

function deleteFeed(feedId) {
    var i;
    for (i in feeds) {
        if (feeds[i].id == feedId) {
            feeds.splice(i, 1);
            updateList();
            return;
        }
    }
}

function updateList() {
    var feedList = '';
    var f;
    var feedContainer = document.getElementById('feedContainer');

    if (!feeds.length) {
        feedContainer.innerHTML = '';
        return;
    }
    for (f in feeds) {
        feedList = feedList + '<li><div class="feeds">';
        if (feeds[f].getType() == 'URL') {
            feedList = feedList + '<div class="url"><img src="actor.jpg" alt="Smiley face" height="80" width="80"><a href="' + feeds[f].getValue() + '" target="_blank">' + feeds[f].getValue() + '</a> <span class="del" onclick="deleteFeed(' + feeds[f].getId() + ')">[X]</span></p></div>';
        } else {
            feedList = feedList + '<div class="txt"><img src="actor.jpg" alt="Smiley face" height="80" width="80">' + feeds[f].getValue() + '<span class="del" onclick="deleteFeed(' + feeds[f].getId() + ')">[X]</span></div>';
        }
        feedList = feedList + '<div class="time">' + feeds[f].getDatetime() + '</div>';
        feedList = feedList + '</div>';
        feedList = feedList + '</li>';
        feedContainer.innerHTML = feedList;
    }
}
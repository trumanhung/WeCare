let userSetting;

$(document).ready(async function () {
    // Print localStorage data
    console.log("Local storage data:\n================================================");
    const dataKeys = Object.keys(localStorage);
    for (i in dataKeys) {
        console.log(`${dataKeys[i]}: ${localStorage.getItem(dataKeys[i])}`);
    }
    console.log("================================================");

    /* Change DOM content */
    // First name
    document.querySelectorAll('#profile-first-name').forEach(first_name => {
        first_name.innerText = localStorage.getItem("first_name");
    });


    let user_setting = await get_user_setting(localStorage.getItem("email"));


    /* Listeners */
    var settingItem = $("select.custom-select.custom-select-sm.d-table.float-right")
        .map(function () {
            // Preload the setting
            preloadSetting.call(this, user_setting);

            // Update any setting once there is a change.
            $(this).change(function () {
                updateSetting(this);
            });
        });

    // Home Page
    document
        .querySelector('#decline-request')
        .addEventListener('click', a => {
            declineRequest(a.target.offsetParent);
        });

    document.querySelector('#chat-request').addEventListener('click', a => {
        chat(a.target.offsetParent);
    });
});

/* Functions */

function declineRequest(profile) {
    profile.remove();
    console.log('TODO: send declineRequest to server');
}

function chat(profile) {
    console.log('TODO: chat with profile user');
}

function updateSetting(selectObj) {
    const key = selectObj.name;
    const returnObj = {};
    returnObj["email"] = localStorage.getItem("email");

    // Currently we only allow update a pair of key
    returnObj[key] = $(selectObj).val();

    console.log(`Updating ${key} to ${returnObj[key]}`);


    return $.ajax({
        type: 'POST',
        url: '/user/settings',

        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(returnObj),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: data => {
            console.log(`Update setting: ${data.update_settings_success}`);
        },
        failure: function (errMsg) {
            console.log(`Update setting failed: ${errMsg}`);
        },
    });
}

function selectAllOptions(obj, bool) {
    let selectObj = obj.closest(".form-group").children[2];
    console.log(selectObj);

    // Front-end side
    if (bool) {
        for (let i = 0; i < selectObj.options.length; i++) {
            selectObj.options[i].selected = true;
        }
    } else {
        for (let i = 0; i < selectObj.options.length; i++) {
            selectObj.options[i].selected = false;
        }
    }

    // Back-end side
    updateSetting(selectObj);
}

// Retrieve User Profile
function get_user_setting(email) {
    return new Promise((resolve, reject) => {
        $.get(`/user/settings/${email}`, function (
            data,
            status
        ) {
            console.log(`Retrieve user profile: ${status}`);
            resolve(JSON.parse(data));
        });
    })
}

function preloadSetting(user_setting) {
    for (let i = 0; i < this.options.length; i++) {
        if (user_setting[this.name].includes(this.options[i].value)) {
            this.options[i].selected = true;
        }
    }
}


function makeNewRequest() {
    let title = document.querySelector("[name=title]").value;
    let location = document.querySelector("[name=location]").value;
    let datetime = document.querySelector("[type=datetime-local]").value;
    let requestType = document.querySelector("#request-type").value;
    let message = document.querySelector("[name=message]").value;


}
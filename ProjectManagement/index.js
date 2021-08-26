let buttons = document.querySelector('.buttons'); // select the form buttons container
let tabs = document.querySelectorAll('.tabs'); // select all form partitions

// function [ Application Defaults ]
applicationDefaults = () => {

    // select & remove the list element from view
    let list = document.querySelector('.list');
    list.style.display = 'none';

    // select & remove the preview element from view
    let preview = document.querySelector('.preview');
    preview.style.display = 'none';

    // select & display the application form element
    let form = document.querySelector('.form');
    form.style.display = 'flex';

    console.log('Application Defaults : Active.'); // test route
    
}
// init function [ applicationDefaults ]
applicationDefaults();

let currentTab = 0; // current tab is set to first tab [ partition 01 ]

// function [ Show Tab ]
showTab = (n) => {

    buttons.style.display = 'flex'; // display the form buttons container

    // select all tab elements
    var x = document.getElementsByClassName('tabs');
    x[n].style.display = 'flex'; // display the current tab

    // validate if current tab position is first [ zero ]
    if (n == 0) {
        prev.style.display = 'none'; // remove the previous button
    }
    else {
        prev.style.display = 'flex'; // display the previous button
    }

    // validate if current tab is last [ tab length - 1 ]
    if (n == (x.length - 1)) {
        next.innerHTML = 'submit'; // display the submit button
    }
    else {
        next.innerHTML = 'next'; // display the next button
    }

    fixStepIndicator(n); // init a function that display the correct tab indicator
}

// select the form application buttons
let prev = document.querySelector('#prev')
let next = document.querySelector('#next')
// let submit = document.querySelector('#submit')

next.addEventListener('click', (e)=> {

    // prevent form submit
    e.preventDefault();

});
prev.addEventListener('click', (e)=> {

    // prevent form submit
    e.preventDefault();

});

// init function [ showTab ]
showTab(currentTab);

// function [ Next Prev ]
function nextPrev(n) {

    var x = document.getElementsByClassName('tabs');

    if (n == 1 && !validateForm()) return false; // exit the function if any field in the current tab is invalid

    x[currentTab].style.display = 'none'; // remove the current tab

    currentTab = currentTab + n; // increase or decrease the current tab by 1

    // validate if user has reached the end of the form
    if (currentTab >= x.length) {

        // test form submission
        console.log('form submitted');

        // submit the form to a backend database
        // document.getElementById('form').submit();

        evaluateData(); // init function to evaluate and display the user data
        
        return false;
    }

    showTab(currentTab); // otherwise, display the correct tab
}

// function [ validateForm ]
function validateForm() {

    var x, y, i, valid = true;

    // select all the [ tabs ] elements
    x = document.getElementsByClassName('tabs');

    // selects the input elements displayed by the current tab
    y = x[currentTab].getElementsByTagName('input');

    // loop through input elements in current tab
    for(i = 0; i < y.length; i++) {

        // validate if input value is empty, null or invalid
        if (y[i].value == '') {

            y[i].className += ' invalid'; // add an invalid class to the field

            valid = false; // set the current valid status to false
        }
    }

    // validate if valid status is true, then mark the current tabs step/part as finished and valid
    if (valid) {
        document.getElementsByClassName('steps')[currentTab].className += ' finish';
    }
    return valid; // return the valid status
}

// function [ Fix Step Indicator ]
function fixStepIndicator(n) {

    // declare a loop variable & select all steps elements
    var i, x = document.getElementsByClassName('steps');

    // loop through all steps elements
    for(i = 0; i < x.length; i++) {

        x[i].className = x[i].className.replace(' active', ''); // and remove the class of active
    }
    // add the class of active to the current step
    x[n].className += ' active';
}

// function [ evaluateData ]
evaluateData = () => {

    // select the form input elements
    let name = document.querySelector('#name');
    let desc = document.querySelector('#desc');
    let activeYes = document.querySelector('#yes');
    let activeNo = document.querySelector('#no');
    let dateStart = document.querySelector('#dateStart');
    let dateEnd = document.querySelector('#dataEnd');

    // test the form input elements
    console.log('name as : ' + name.value); // get value of name
    console.log('desc as : ' + desc.value); // get value of description
    console.log('yes as : ' + activeYes.checked); // get checked value for boolean [ yes ]
    console.log('no as : ' + activeNo.checked); // get checked value for boolean [ no ]
    console.log('dateStart as : ' + dateStart.value); // get value of start date
    console.log('dateEnd as : ' + dateEnd.value); // get value of end date

    // init function [ previewFormData ] : pass the values to preview form data
    previewFormData(name, desc, activeYes, activeNo, dateStart, dateEnd);
}

// function [ previewFormData ]
function previewFormData(name, desc, activeYes, activeNo, dateStart, dateEnd) {

    let preview = document.querySelector('.preview');
    preview.style.display = 'flex';
    // preview.innerHTML = 'preview module';

    // declare the list preview info elements
    let previewName, previewDesc, previewActive, previewStart, previewEnd;

    // select the specific elements
    previewName = document.querySelector('#preview-name');
    previewDesc = document.querySelector('#preview-desc');
    previewActive = document.querySelector('#preview-active');
    previewStart = document.querySelector('#preview-startdate');
    previewEnd = document.querySelector('#preview-enddate');
    
    // set the preview name & description data values
    previewName.innerHTML = name.value;
    previewDesc.innerHTML = desc.value;

    // validate the boolean question
    if (activeYes.checked == true) {
        previewActive.innerHTML = 'Yes'; // answer is yes
    }
    else {
        previewActive.innerHTML = 'No'; // answer is no
    }

    // set the preview for start & end date data values
    previewStart.innerHTML = dateStart.value;
    previewEnd.innerHTML = dateEnd.value;

    // select the preview confirmation button
    let previewConfirmationButton = document.querySelector('#accept');

    // click event [ previewConfirmationButton ]
    previewConfirmationButton.addEventListener('click', (e)=> {

        // prevent default form submit
        e.preventDefault();

        // init function [ displayList ] : with preview data confirmation elements
        displayList(previewName, previewDesc, previewActive, previewStart, previewEnd);

        // test event
        console.log('Preview Confirmation Button : clicked');
    
    });
}

// function [ displayList ]
function displayList(previewName, previewDesc, previewActive, previewStart, previewEnd) {

    // select & display the application list element
    let list = document.querySelector('.list');
    list.style.display = 'flex';

    let items = document.createElement('li');
    items.classList = 'items'; // set items element class to ' items '
    let name = document.createElement('span'),
        desc = document.createElement('span'),
        active = document.createElement('span'),
        startdate = document.createElement('span'),
        enddate = document.createElement('span');

    // assign confirmation preview data to item data values
    name.innerHTML = previewName.innerHTML;
    desc.innerHTML = previewDesc.innerHTML;
    active.innerHTML = previewActive.innerHTML;
    startdate.innerHTML = previewStart.innerHTML;
    enddate.innerHTML = previewEnd.innerHTML;

    // append the confirmation preview data to the items element
    items.appendChild(name); 
    items.appendChild(desc); 
    items.appendChild(active);
    items.appendChild(startdate);
    items.appendChild(enddate);

    list.appendChild(items); // append the items element to the list
    
    /*
        create the active circle and default values || set the styles via css and class names
        createCircle => className => [ boolean answer ]
    */

    // remove the form from view
    form.style.display = 'none';

}

// function [ removePreFilledList ] : developer controls
function removePreFilledList() {
    let list = document.querySelector('.list'); // select the currect created list

    list.style.display = 'none'; // remove the list from view

    // test function
    console.log('DEV : list removal');
}
removePreFilledList();
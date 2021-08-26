let buttons = document.querySelector('.buttons'); // select the form buttons container
let tabs = document.querySelectorAll('.tabs'); // select all form partitions

// Declare the Form buttons
let prev = document.querySelector('#prev'); // select the form [ previous ] action button
let next = document.querySelector('#next'); // select the form [ next ] action button
let confirmation = document.querySelector('#accept'); // select the preview [ confirmation ] button

// Declare the List Buttons
let resetForm = document.querySelector('#resetForm'); // select the list [ Reset Form ] button
// update variable to [ Edit List ] button
let controlPanel = document.querySelector('#controlPanel'); // select the list [ Edit List ] button

// function [ Application Defaults ]
applicationDefaults = () => {

    // select & remove the list element from view
    let list = document.querySelector('.list');
    list.style.display = 'none';
    // list.style.display = 'flex';

    // select & remove the preview element from view
    let preview = document.querySelector('.preview');
    preview.style.display = 'none';

    // select & display the application form element
    let form = document.querySelector('.form');
    form.style.display = 'flex';
    // form.style.display = 'none';

    // formButtonState(); // init specific buttons for the form element

    console.log('Application Defaults : Active.'); // test route
    
};
// init function [ applicationDefaults ]
applicationDefaults();

// function [ formButtonState ]
formButtonState = () => {

    // display the buttons [ Next Button & Previous Button ] : Form
    next.style.display = 'inline-block';
    prev.style.display = 'inline-block';

    // remove the buttons [ Reset Form + Settings Control Panel ] : List
    resetForm.style.display = 'none';
    controlPanel.style.display = 'none';

    // remove the buttons [ Preview Confirmation ] : Preview
    confirmation.style.display = 'none';
}

// function [ List Button State ]
listButtonState = () => {

    // display the buttons [ Reset Form + Settings Control Panel ] : List
    resetForm.style.display = 'inline-block';
    controlPanel.style.display = 'inline-block';

    // remove the buttons [ Next Button & Previous Button ] : Form
    next.style.display = 'none';
    prev.style.display = 'none';

    // remove the button [ Preview Confirmation ] : Preview
    confirmation.style.display = 'none';

}

// function [ Data Confirmation State ]
dataConfirmationState = () => {

    confirmation.style.display = 'inline-block'; // display the button [ Preview Confirmation Button ] : Preview

    // remove the buttons [ Next Button & Previous Button ] : Form
    next.style.display = 'none';
    prev.style.display = 'none';

}
// function [ Application State ]
applicationState = () => {
    // validate state view via display property attribute
    if (form.style.display === 'flex') {
        formButtonState(); // init function that displays specific buttons [ Form State ]
        form.appendChild(buttons); // append buttons container to the form element
        console.log('Application State : Form'); // test state
    }
    else if (list.style.display === 'flex') {
        list.appendChild(buttons); // append buttons container to list element
        listButtonState(); // init function that displays specific buttons [ List State ]
        console.log('Application State : List'); // test state

        let items = document.querySelectorAll('.items');
        if (items.length > 1) {

            console.log('Application State : Overflow Scroll on List Element');
            list.style.overflow = 'scroll';
        }
    }

};

// init function [ Application State ]
applicationState();

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

            y[i].className += ' input-error'; // add an inputError class to the field

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

function resetStepIndicator(n) {
    var i, x = document.getElementsByClassName('steps');

    // loop through all steps elements
    for (i = 0; i < x.length; i++) {

        x[i].className = x[i].classList.remove(' active', ''); // remove the active class name on form reset
    }
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
    (activeYes.checked ? previewActive.innerHTML = 'Yes' : previewActive.innerHTML = 'No');
    
    // set the preview for start & end date data values
    previewStart.innerHTML = dateStart.value;
    previewEnd.innerHTML = dateEnd.value;

    // init function [ Application State ]
    applicationState();

    // init function [ Data Confirmation State ]
    dataConfirmationState();

    // click event [ Preview Confirmation Button ]
    confirmation.addEventListener('click', (e)=> {

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

    let items = document.createElement('li'); // create a [ li ] HTML element
    items.classList = 'items'; // set items element class to ' items '

    // delare items data variables & create a span element for data input
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

    // init function [ Application State ]
    applicationState();

    // click event [ Reset Form ]
    resetForm.addEventListener('click', (e)=> {
        
        console.log('New Form Button : Clicked.'); // test event
        
        // Declare a loop iteration variable, select all [ Radio ] buttons inside the form
        let i, radio = document.querySelectorAll('.control .radio');
        // select all tabs [ Input ] elements
        let inputErrors = document.querySelectorAll('.tabs .input');

        // forEach [ Input Errors ]
        inputErrors.forEach(element => {
            element.classList.remove('input-error'); // remove the [ Input Error ] class from all elements inside the form
        });

        // loop through input elements
        for(i = 0; i < inputErrors.length; i++) { 
            console.log('Reset Form Input Loop : ' + inputErrors[i].className); // test the class name of the input elements on reset
            inputErrors[i].value = ''; // restore input elements to default properties
        }
        
        // forEach [ Radio Buttons ]
        radio.forEach(element => {
            // click event [ Radio Buttons ]
            element.addEventListener('click', ()=> {

                // validate if element is checked or un-checked
                if (element.checked ? element.checked = true : element.checked = false);
            });
        });
        
        // loop through radio buttons
        for(i = 0; i < radio.length; i++) {
            console.log('New Form Button Loop : Radio = false');// test loop
            radio[i].checked = false; // set all checked elements to false [ un-checked ]
        }
        console.log('New Form Button : ' +  radio); // test radio elements

        e.preventDefault(); // prevent default form submit

        applicationDefaults(); // init function [ application Defaults ] : resets the application state to default parameters
        applicationState(); // init function [ Application State ] : checks the application state

        formButtonState(); // init function [ Form Button State ] : displays the buttons corresponding with the form element
        
        currentTab = 0; // reset the current tab back to the start [ zero ]
        showTab(currentTab); // init function [ Show Tab ] : set tab elements to zero
        
        /*
            === Under Development ===

            Function Reset Step Indicator

        */
        // resetStepIndicator(); // init function [ ResetStepIndicator ] : resets the form progress meter / visual
    });

}

// function [ removePreFilledList ] : developer controls
removePreFilledList = () => {
    let list = document.querySelector('.list'); // select the currect created list
    list.style.display = 'none'; // remove the list from view
    console.log('DEV : list removal'); // test function

    let form = document.querySelector('.form'); //select the current form element
    // form.style.display = 'none'; // remove the form from view

    // let tabs = document.querySelectorAll('.form .tabs');

    // remove the form [ Tabs ] from view
    // tabs.forEach(element => {
    //     element.style.display = 'none';
    // });
    
    // select & display the [ Preview ] component
    let preview = document.querySelector('.preview');
    // preview.style.display = 'flex';
    
}
// init function [ removePreFilledList ]
removePreFilledList();
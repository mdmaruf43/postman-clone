console.log('Assalamualicum');

// Utility functions
// 1. Utility function to get DOM element from string 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initialize no of parameters 
let adddedParamCount = 0;

// Hide the parametersBox initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

// If the user clicks on + button, add more parameters 
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${adddedParamCount + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterKey${adddedParamCount + 2}" placeholder="Enter Parameter ${adddedParamCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterValue${adddedParamCount + 2}" placeholder="Enter Parameter ${adddedParamCount + 2} Value">
                        </div>
                        <button class="btn btn-primary deleteParam">-</button>
                </div>`

    // Convert the eleent string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    adddedParamCount++;
})

// Show please wait in the response box to request patience from the user 
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responsePrism').innerHTML  = "Please wait ... Fetching response..."
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    // if user has used params option instead of json, collect all the parameters in an object
    if (contentType === 'params') {
        data = {};
        for (i = 0; i < adddedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
            data = JSON.stringify(data);
        }
    } else {
        data = document.getElementById('requestJsonText').value;
    }
    console.log('URL is', url);
    console.log('request type', requestType);
    console.log('content Type', contentType);
    console.log('data is', data);

    // if the request type is get, invoke feth api to create a post request
    if (requestType === 'GET') {
        fetch(url, {
                method: 'GET',
            })
            .then(res => res.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    } else {
        fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
})
window.onload = function() {
    loadHistory();
};

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    var display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    var display = document.getElementById('display');
    try {
        console.log('Evaluating:', display.value); 
        var result = eval(display.value);
        addToHistory(display.value + ' = ' + result);
        display.value = result;
    } catch (e) {
        console.error('Error:', e); 
        display.value = 'Error';
    }
}


function addToHistory(entry) {
    var history = getHistory();
    history.push(entry);
    localStorage.setItem('Historial', JSON.stringify(history));
    loadHistory();
}

function getHistory() {
    var history = localStorage.getItem('Historial');
    return history ? JSON.parse(history) : [];
}

function loadHistory() {
    var history = getHistory();
    var historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach(function(entry) {
        var li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem('Historial');
    loadHistory();
}



function openFloatingWindow() {
    var floatingWindow = document.getElementById('floatingWindow');
    var floatingHistoryList = document.getElementById('historyList');
    var history = getHistory();
    floatingHistoryList.innerHTML = '';
    history.forEach(function(entry) {
        var li = document.createElement('li');
        li.textContent = entry;
        floatingHistoryList.appendChild(li);
    });
    floatingWindow.style.display = 'block';
}

function closeFloatingWindow() {
    document.getElementById('floatingWindow').style.display = 'none';
}

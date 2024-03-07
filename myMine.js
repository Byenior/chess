let slots = document.querySelectorAll('td');
slots.forEach(slot => {
if (slot.style.backgroundColor == 'white') {
}

});


function allowDrop(ev) {
    // console.log(ev)
    // if (ev.target.style.backgroundColor === 'white') {
        ev.preventDefault();
    // }
}

function drag(ev) {
    // Set the data being dragged to the image itself
    ev.dataTransfer.setData("text/plain", ev.target.outerHTML);
    // Add a class to the source td
    ev.target.parentElement.classList.add('dragging');
}


function drop(ev) {
    ev.preventDefault();
    // Get the data from the drag event
    var data = ev.dataTransfer.getData("text/plain");
    // Clear the inner HTML of the target td
    ev.target.innerHTML = '';
    // Append the dragged image to the target td
    ev.target.innerHTML = data;
    // Clear the inner HTML of the source td
    var sourceTd = document.querySelector('.dragging');
    if (sourceTd) {
        sourceTd.innerHTML = '';
    }
}

var width = 100 * scale + "px"; // Calculate the scaled width

document.getElementById("table-body").style.width = width;

const tableBody = document.getElementById("table-body");
// Create scale rows
for (let i = 0; i < scale; i++) {
  const row = document.createElement("tr");
  // Create scale cells in the row
  for (let j = 0; j < scale; j++) {
    const cell = document.createElement("td");
    cell.id = i * scale + j + 1;
    row.appendChild(cell);
  }
  tableBody.appendChild(row);
}

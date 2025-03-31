// Ejercicio 1: Mostrar posición del mouse
document.addEventListener('mousemove', (e) => {
    const mousePosition = document.getElementById('mousePosition');
    mousePosition.textContent = `Posición del mouse: (${e.clientX}, ${e.clientY})`;
});

// Ejercicio 2: Agregar nombre completo
document.getElementById('form1-submit').addEventListener('click', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('form-fname').value;
    const lastName = document.getElementById('form-lname').value;
    const fullName = document.createElement('p');
    fullName.textContent = `Nombre completo: ${firstName} ${lastName}`;
    document.getElementById('form1').after(fullName);
});

// Ejercicio 3: Insertar fila/columna
document.getElementById('btn-insert-r').addEventListener('click', () => {
    const table = document.getElementById('sampleTable');
    const newRow = table.insertRow();
    newRow.innerHTML = `<td>Row ${table.rows.length} column 1</td><td>Row ${table.rows.length} column 2</td>`;
});

document.getElementById('btn-insert-c').addEventListener('click', () => {
    const rows = document.querySelectorAll('#sampleTable tr');
    rows.forEach(row => {
        const newCell = row.insertCell();
        newCell.textContent = `Row ${row.rowIndex + 1} column ${row.cells.length}`;
    });
});

// Ejercicio 4: Modificar celda específica
document.getElementById('btn-change').addEventListener('click', () => {
    const rowIndex = parseInt(document.getElementById('rowIndex').value) - 1;
    const colIndex = parseInt(document.getElementById('colIndex').value) - 1;
    const newValue = document.getElementById('newValue').value;
    const table = document.getElementById('myTable');
    
    if (table.rows[rowIndex] && table.rows[rowIndex].cells[colIndex]) {
        table.rows[rowIndex].cells[colIndex].textContent = newValue;
    } else {
        alert('¡Posición inválida!');
    }
});

// Ejercicio 5: Añadir/eliminar colores
const colors = ['Blue', 'Yellow', 'Purple', 'Orange'];
document.getElementById('btn-add-color').addEventListener('click', () => {
    const select = document.getElementById('colorSelect');
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const option = document.createElement('option');
    option.textContent = newColor;
    select.appendChild(option);
});

document.getElementById('btn-rmv-color').addEventListener('click', () => {
    const select = document.getElementById('colorSelect');
    if (select.options.length > 0) {
        select.remove(select.selectedIndex);
    }
});

// Ejercicio 6: Cambiar tamaño de imagen al pasar el mouse
// Ejercicio 6: Cambiar tamaño de imagen al pasar el mouse
document.getElementById('imagenGato').addEventListener('mouseenter', () => {
    const width = Math.floor(Math.random() * 301) + 300; // 300-600
    const height = Math.floor(Math.random() * 301) + 300;
    const img = document.getElementById('imagenGato');
    img.src = `https://media.tenor.com/duGh7BkKc3gAAAAM/bumble-bee-sus.gif?width=${width}&height=${height}`;
});
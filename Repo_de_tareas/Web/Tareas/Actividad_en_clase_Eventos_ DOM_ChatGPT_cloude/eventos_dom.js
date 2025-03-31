// Archivo JavaScript para la actividad de Eventos y DOM

// El código principal se ejecutará cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Ejercicio 1: Mostrar la posición del mouse
    const mousePositionElement = document.getElementById('mousePosition');
    
    if (mousePositionElement) {
        document.addEventListener('mousemove', function(event) {
            mousePositionElement.textContent = `Posición del mouse: X: ${event.clientX}, Y: ${event.clientY}`;
        });
    }

    // Ejercicio 2: Obtener nombre y apellido del formulario
    const form1 = document.getElementById('form1');
    
    if (form1) {
        form1.addEventListener('submit', function(event) {
            // Prevenir el comportamiento por defecto del formulario
            event.preventDefault();
            
            // Obtener los valores de los campos de texto
            const firstName = document.getElementById('form-fname').value;
            const lastName = document.getElementById('form-lname').value;
            
            // Verificar si ya existe un elemento con el nombre completo
            const existingFullName = document.getElementById('fullName');
            if (existingFullName) {
                existingFullName.remove();
            }
            
            // Crear un nuevo elemento para mostrar el nombre completo
            const fullNameElement = document.createElement('p');
            fullNameElement.id = 'fullName';
            fullNameElement.textContent = `Nombre completo: ${firstName} ${lastName}`;
            
            // Agregar el elemento después del botón de enviar
            const form1Submit = document.getElementById('form1-submit');
            if (form1Submit) {
                form1Submit.insertAdjacentElement('afterend', fullNameElement);
            } else {
                // Si no se encuentra el botón, agregar al final del formulario
                form1.appendChild(fullNameElement);
            }
        });
    }

    // Ejercicio 3: Agregar filas o columnas a una tabla
    const sampleTable = document.getElementById('sampleTable');
    const btnInsertRow = document.getElementById('btn-insert-r');
    const btnInsertColumn = document.getElementById('btn-insert-c');
    
    if (sampleTable && btnInsertRow) {
        btnInsertRow.addEventListener('click', function() {
            // Obtener el número de filas y columnas actuales
            const rowCount = sampleTable.rows.length;
            const columnCount = sampleTable.rows[0].cells.length;
            
            // Crear una nueva fila
            const newRow = sampleTable.insertRow();
            
            // Agregar celdas a la nueva fila
            for (let i = 0; i < columnCount; i++) {
                const newCell = newRow.insertCell();
                newCell.textContent = `Row ${rowCount + 1} column ${i + 1}`;
            }
        });
    }
    
    if (sampleTable && btnInsertColumn) {
        btnInsertColumn.addEventListener('click', function() {
            // Obtener el número de filas
            const rowCount = sampleTable.rows.length;
            
            // Para cada fila, agregar una nueva celda
            for (let i = 0; i < rowCount; i++) {
                const newCell = sampleTable.rows[i].insertCell();
                const columnCount = sampleTable.rows[i].cells.length;
                newCell.textContent = `Row ${i + 1} column ${columnCount}`;
            }
        });
    }

    // Ejercicio 4: Actualizar el contenido de una celda en una tabla
    const myTable = document.getElementById('myTable');
    const rowIndexInput = document.getElementById('rowIndex');
    const colIndexInput = document.getElementById('colIndex');
    const newValueInput = document.getElementById('newValue');
    const btnChange = document.getElementById('btn-change');
    
    if (myTable && btnChange && rowIndexInput && colIndexInput && newValueInput) {
        // Prevenir comportamiento por defecto en el formulario que contiene los inputs
        const formContainer = btnChange.closest('form');
        if (formContainer) {
            formContainer.addEventListener('submit', function(e) {
                e.preventDefault();
            });
        }
        
        btnChange.addEventListener('click', function() {
            // Obtener los valores de los inputs y eliminar espacios
            const rowIndexValue = rowIndexInput.value.trim();
            const colIndexValue = colIndexInput.value.trim();
            const newValue = newValueInput.value;
            
            // Validar que los campos no estén vacíos
            if (rowIndexValue === '' || colIndexValue === '') {
                alert('Por favor, complete los campos de índice de fila y columna');
                return;
            }
            
            // Convertir a números
            const rowIndex = parseInt(rowIndexValue);
            const colIndex = parseInt(colIndexValue);
            
            // Validar que sean números
            if (isNaN(rowIndex) || isNaN(colIndex)) {
                alert('Por favor, ingrese índices numéricos válidos');
                return;
            }
            
            // Validar los índices (asegurarnos de que están dentro de los límites de la tabla)
            if (rowIndex < 0 || rowIndex >= myTable.rows.length) {
                alert(`Índice de fila inválido. Debe estar entre 0 y ${myTable.rows.length - 1}`);
                return;
            }
            
            if (colIndex < 0 || colIndex >= myTable.rows[0].cells.length) {
                alert(`Índice de columna inválido. Debe estar entre 0 y ${myTable.rows[0].cells.length - 1}`);
                return;
            }
            
            // Actualizar el contenido de la celda
            myTable.rows[rowIndex].cells[colIndex].textContent = newValue;
            
            // Mostrar mensaje de éxito
            alert(`Celda (${rowIndex}, ${colIndex}) actualizada correctamente.`);
            
            // Limpiar los inputs
            rowIndexInput.value = '';
            colIndexInput.value = '';
            newValueInput.value = '';
        });
        
        // Agregar pista de ayuda en la interfaz para aclarar que los índices comienzan en 0
        const helpText = document.createElement('p');
        helpText.textContent = 'Nota: Los índices comienzan en 0. La primera fila es 0, la segunda es 1, etc.';
        helpText.style.fontSize = '12px';
        helpText.style.color = '#666';
        btnChange.insertAdjacentElement('afterend', helpText);
    }

    // Ejercicio 5: Agregar o quitar colores de una lista - VERSIÓN SIMPLIFICADA
    const colorSelect = document.getElementById('colorSelect');
    const btnAddColor = document.getElementById('btn-add-color');
    const btnRmvColor = document.getElementById('btn-rmv-color');
    
    // Array de colores posibles para agregar aleatoriamente
    const possibleColors = [
        'Blue', 'Yellow', 'Purple', 'Orange', 'Pink', 
        'Brown', 'Gray', 'Cyan', 'Magenta', 'Lime',
        'Teal', 'Indigo', 'Violet', 'Aqua', 'Maroon'
    ];
    
    if (colorSelect && btnAddColor) {
        // Función simplificada para agregar un color aleatorio
        btnAddColor.addEventListener('click', function() {
            // Seleccionar un color aleatorio de la lista
            const randomIndex = Math.floor(Math.random() * possibleColors.length);
            const randomColor = possibleColors[randomIndex];
            
            // Crear la nueva opción de forma directa
            const newOption = new Option(randomColor, randomColor);
            
            // Añadir al select
            colorSelect.options.add(newOption);
            
            // Seleccionar el último color añadido
            colorSelect.selectedIndex = colorSelect.options.length - 1;
        });
    }
    
    if (colorSelect && btnRmvColor) {
        // Función simplificada para eliminar el color seleccionado
        btnRmvColor.addEventListener('click', function() {
            // Verificar si hay opciones para eliminar
            if (colorSelect.options.length > 0) {
                // Eliminar la opción seleccionada actualmente
                colorSelect.remove(colorSelect.selectedIndex);
            }
        });
    }

// Ejercicio 6: Cambiar imagen y tamaño al pasar el mouse
const imagenGato = document.getElementById('imagenGato');

if (imagenGato) {
    console.log('Elemento imagenGato encontrado');
    
    // Guardamos la URL original para restaurarla cuando el mouse salga
    const urlOriginal = imagenGato.src;
    const urlNueva = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGR2d3pmd2NkdmhpNGd3YjFiNmE5Nnd2dGgweWJ6bjlyZGQ2eGcwOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VZVK5WCg0A0H37s8ND/giphy.gif';
    
    // Guardamos el ancho y alto originales
    const anchoOriginal = imagenGato.width || 200;
    const altoOriginal = imagenGato.height || 300;
    
    // Función para cambiar a la imagen nueva con tamaño aleatorio
    function cambiarImagen() {
        console.log('Evento mouseenter detectado - cambiando imagen y tamaño');
        
        // Generamos dimensiones aleatorias entre 300 y 600
        const randomWidth = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
        const randomHeight = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
        
        console.log(`Nuevas dimensiones: ${randomWidth}x${randomHeight}`);
        
        // Cambiar la URL y dimensiones de la imagen
        imagenGato.src = urlNueva;
        imagenGato.width = randomWidth;
        imagenGato.height = randomHeight;
    }
    
    // Función para restaurar la imagen original con tamaño original
    function restaurarImagen() {
        console.log('Evento mouseleave detectado - restaurando imagen y tamaño originales');
        imagenGato.src = urlOriginal;
        imagenGato.width = anchoOriginal;
        imagenGato.height = altoOriginal;
    }
    
    // Añadir manejador de error para la carga de la imagen
    imagenGato.onerror = function() {
        console.error('Error al cargar la nueva imagen');
        imagenGato.src = urlOriginal;
        imagenGato.width = anchoOriginal;
        imagenGato.height = altoOriginal;
    };
    
    // Usar el evento mouseenter para detectar cuando el mouse entra en la imagen
    imagenGato.addEventListener('mouseenter', cambiarImagen);
    
    // Restaurar la imagen original cuando el mouse sale
    imagenGato.addEventListener('mouseleave', restaurarImagen);
    
} else {
    console.error('No se encontró el elemento con id "imagenGato"');
}
});
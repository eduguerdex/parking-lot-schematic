let cars = document.querySelectorAll('.car');
let carsContainer = document.querySelector('#cars-container');
    let currentCar = null;

    cars.forEach(car => {
        car.addEventListener('mousedown', function(e) {
            currentCar = car;
            car.style.zIndex = 1000;
        });
    });

    document.addEventListener('mousemove', function(e) {
    if (currentCar) {
        let prevX = currentCar.offsetLeft;
        let prevY = currentCar.offsetTop;

        currentCar.style.left = e.pageX - currentCar.offsetWidth / 2 + 'px';
        currentCar.style.top = e.pageY - currentCar.offsetHeight / 2 + 'px';

        // Obtener la lista de todos los bloques .car
        let cars = document.querySelectorAll('.car');

        for (let car of cars) {
            if (currentCar === car) continue;

            let currentRect = currentCar.getBoundingClientRect();
            let rect = car.getBoundingClientRect();

            if (rect.left < currentRect.right && rect.right > currentRect.left &&
                rect.top < currentRect.bottom && rect.bottom > currentRect.top) {

                // Collision detected!
                // Move the block back to its previous position
                currentCar.style.left = prevX + 'px';
                currentCar.style.top = prevY + 'px';
                break;
            }
        }
    }
});

document.addEventListener('mouseup', function(e) {
    if (currentCar) {
        currentCar.style.zIndex = '';
        currentCar = null;
    }
});

let carText = document.querySelector('#car-text');

function addCar(color, size, lon,carText,left,top,orientacion) {
    let car = document.createElement('div');
    car.classList.add('car');
    const carName = document.createElement('h2');
    carName.classList.add('car-name');
    car.style.backgroundColor = color;
    car.style.width = size/115 + 'px';
    car.style.height = lon/90 + 'px';
    car.style.left = left; // agregar esta línea
    car.style.top = top; // agregar esta línea
    car.style.transform=orientacion;
    car.textContent = carText.split('-')[0];
    const factor = 0.5; // Ajustar este valor para cambiar el tamaño del texto
    const fontSize = car.offsetWidth / car.textContent.length * factor;
    carName.style.fontSize = fontSize + 'px'; // Aplicar el tamaño de texto calculado
    carName.textContent = carText.split('-')[0];
    car.appendChild(carName);
    carsContainer.appendChild(car)

    // Agregar controlador del evento mousedown al nuevo bloque .car
    car.addEventListener('mousedown', function(e) {
        currentCar = car;
        car.style.zIndex = 1000;
    });
  car.addEventListener('dblclick', event => {
    const rotation = getRotationDegrees(car);
    // Crear el menú
    const menu = document.createElement('div');
    menu.classList.add('car-menu');
    menu.style.transform = `rotate(-${rotation}deg)`; // Establecer la propiedad transform
    menu.innerHTML = `
       <ul>
    <li><i class="fas fa-edit"></i> Cambiar nombre</li>
    <li><i class="fas fa-trash"></i> Eliminar</li>
    <li><i class="fas fa-user-cog"></i> Asignar técnico</li>
    <li><i class="fas fa-undo"></i> Rotar </li>
    <li><i class="fas fa-share"></i> Trasladar </li>
  </ul>
    `;
// Función para obtener el ángulo de rotación de un elemento
function getRotationDegrees(element) {
  const matrix = window.getComputedStyle(element).getPropertyValue('transform');
  if (matrix === 'none') {
    return 0;
  }
  const values = matrix.split('(')[1].split(')')[0].split(',');
  const a = values[0];
  const b = values[1];
  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  return angle >= 0 ? angle : 360 + angle;
}
car.appendChild(carName);
car.appendChild(menu);
document.body.appendChild(car);

menu.addEventListener('click', (event) => {
  const buttonClicked = event.target.closest('li');
  if (!buttonClicked) return;

  switch (buttonClicked.textContent.trim()) {
    case 'Cambiar nombre':
      const nuevoNombre = prompt('Ingrese el nuevo nombre:');
      if (nuevoNombre) {
       car.textContent = nuevoNombre;
      }
      break;
    case 'Eliminar':
      car.remove();
      break;
    case 'Asignar técnico':
      const asignarTecnico = prompt('A quien deseas asignar?');
      if (asignarTecnico) {
        const asignacion = document.createElement('div');
       asignacion.classList.add('asignacion-tecnico');
        asignacion.textContent = `Asignado a: ${asignarTecnico}`;
        car.appendChild(asignacion);
  
      }
      break;      
    case 'Rotar':
      // Crear el menú de rotación
      const menuRotacion = document.createElement('div');
      menuRotacion.classList.add('car-menu-rotacion');
      menuRotacion.innerHTML = `
      <ul class="car-menu-horizontal">
      <li class="menu-item-blanco" data-angulo="0"><i class="fas fa-angle-right"></i>0°</li>
      <li class="menu-item-naranja" data-angulo="270"><i class="fas fa-angle-down"></i>270°</li>
      <li class="menu-item-blanco" data-angulo="-45"><i class="fas fa-redo-alt"></i>-45°</li>
      <li class="menu-item-naranja" data-angulo="180"><i class="fas fa-angle-left"></i>180°</li>
      <li class="menu-item-blanco" data-angulo="45"><i class="fas fa-undo-alt"></i>45°</li>
      <li class="menu-item-naranja" data-angulo="90"><i class="fas fa-angle-up"></i>90°</li>
    </ul>
      `;
      // Definir el radio del menú
      const radio = 70;

      // Establecer el estilo del menú de rotación
      const menuRotacionStyles = `
        position: relative;
        height: 200px;
        width: 200px;
        top: ${car.offsetTop -1900}px;
        left: ${car.offsetLeft -106}px;
        color: white;
        padding: 10px;
        z-index: 999;
        border-radius: 50%;
      `;
      menuRotacion.style.cssText = menuRotacionStyles;

      // Ajustar el tamaño y la posición de los elementos del menú
      const menuItemStyles = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 12px;
      `;
      const menuItems = menuRotacion.querySelectorAll('li');
      menuItems.forEach((item, index) => {
        item.style.cssText = menuItemStyles;
      });
      const totalItems = menuItems.length;
      // Calcular el ángulo entre cada elemento en radianes
      const slice = (2 * Math.PI) / totalItems;
      // Recorrer cada elemento y calcular su posición
      menuItems.forEach((item, index) => {
        // Calcular el ángulo del elemento actual
        const angle = slice * index;
        // Calcular la posición del elemento en función del ángulo y el radio
        const x = Math.round(radio * Math.cos(angle));
        const y = Math.round(radio * Math.sin(angle));
        // Establecer la posición del elemento
        item.style.transform = `translate(${x}px, ${y}px)`;
      });
      
      // Agregar el menú de rotación al cuerpo del documento
      document.body.appendChild(menuRotacion);
      menu.remove();

      // Agregar evento de clic a las opciones del menú de rotación
      menuRotacion.querySelectorAll('li').forEach((opcion) => {
        opcion.addEventListener('click', (event) => {
          const angulo = parseInt(event.target.getAttribute('data-angulo'));
          car.style.transform = `rotate(${angulo}deg)`;
        });
      });
  break;  
  }
});
   // Event listener para cerrar el menú al hacer clic fuera de él
  carsContainer.addEventListener('mousedown', event => {
    if (!menu.contains(event.target)) {
      menu.remove();
    }
  });
  document.addEventListener('mousedown', (event) => {
    // Verificar si el clic fue fuera del menú de rotación
    const menuRotacion = document.querySelector('.car-menu-rotacion');
    if (menuRotacion && !menuRotacion.contains(event.target)) {
      menuRotacion.remove();
    }
  });
    });
}

let sizeSelect = document.getElementById("size-select");
addCarButton.addEventListener('click', function() {
  let selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
  if (!selectedOption) {
    console.log('Por favor seleccione un equipo');
    return;
  }
  let carText = selectedOption.textContent;
  let size = sizeSelect.options[sizeSelect.selectedIndex].getAttribute('size');
  let lon = sizeSelect.options[sizeSelect.selectedIndex].getAttribute('lon');
  let color = sizeSelect.options[sizeSelect.selectedIndex].getAttribute('data-color');
  let left=sizeSelect.options[sizeSelect.selectedIndex].getAttribute('LEFT')
  let top=sizeSelect.options[sizeSelect.selectedIndex].getAttribute('TOP')
  let orientacion=0;
  addCar(color, size, lon, carText,left,top,orientacion);
});

var xhr = new XMLHttpRequest();
xhr.open("GET", "fuentes/Data_Equipos.csv", true);

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var lines = xhr.responseText.split("\n");
    var select = document.getElementById("size-select");
    for (var i = 0; i < lines.length; i++) {
      var parts = lines[i].split(";");
      if (parts.length >= 1) {
        var option = document.createElement("option");
        option.value = parts[0];
        option.textContent = parts[0]; // solo muestra el texto antes del guión
        option.setAttribute("size", parts[1]);
        option.setAttribute("lon", parts[2]);
        option.setAttribute("data-color", parts[3]);
        option.setAttribute("LEFT", parts[4]);
        option.setAttribute("TOP", parts[5]);
        select.appendChild(option);
      }
    }

    var filterInput = document.getElementById("filter-input");
    filterInput.addEventListener("input", function() {
      var filterValue = this.value.toLowerCase(); // convierte el texto en minúsculas
      var options = select.getElementsByTagName("option");
      for (var i = 0; i < options.length; i++) {
        var text = options[i].textContent.toLowerCase(); // convierte el texto en minúsculas
        if (text.startsWith(filterValue)) {
          options[i].style.display = ""; // muestra el elemento
        } else {
          options[i].style.display = "none"; // oculta el elemento
        }
      }
    });
  }
};
xhr.send();

window.addEventListener('DOMContentLoaded', () => {
  // Verifica si el archivo de Excel se ha cargado
  if (typeof xhr !== 'undefined') {
    console.log('El archivo de Excel se ha cargado exitosamente.');
    console.log(xhr)
  } else {
    console.log('El archivo de Excel no se ha cargado.');
  }
});

function convertirFecha(fecha) {
  const partes = fecha.split('-');
  const dia = partes[2];
  let mes = partes[1];
  if (mes.startsWith('0')) {
    mes = mes.substring(1);
  }
  const anio = partes[0];
  const fechaConvertida = `${dia}/${mes}/${anio}`;
  return fechaConvertida;
}

const ShID = '1Cf2y_StfLyOHigTZF02R3OVyHEPFNNFt00PS6HD5A_k';

function ObtenerFecha() {
  // Mostrar cuadro de entrada de fecha
  var bloqueFecha = document.getElementById("select-fecha");
  var inputFecha = document.getElementById("fecha");
  // Mostrar el calendario de fecha
  bloqueFecha.style.visibility = 'visible';
  inputFecha.style.visibility = 'visible';

  // Verificar si se ingresó una fecha válida
  inputFecha.addEventListener("change", function() {
    // Obtener la fecha seleccionada
    var fecha = inputFecha.value;
    // Verificar si se seleccionó una fecha válida
    if (fecha !== "") {
      // Llamar a la función CargarEquipos() con la fecha seleccionada
      bloqueFecha.style.visibility = 'hidden';
      inputFecha.style.visibility = 'hidden';
      var cars = document.querySelectorAll('.car');
      cars.forEach(function(car) {
        car.remove();
      });
      ObtenerEquipos(fecha);
    }
  });
}
async function ObtenerEquipos(fecha) {
  // Obtener la fecha seleccionada
  const fechaSeleccionada = fecha;
  var bloqueFecha = document.getElementById("select-fecha");
  const fechaFormateada = convertirFecha(fechaSeleccionada);
  console.log(fechaFormateada);
  let response;
  try {
    // Obtener los datos del rango completo
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: ShID,
      range: 'Ubicaciones!A:I',
    });
  } catch (err) {
    console.error(err);
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    console.warn("No values found");
    return;
  }
  // Filtrar los equipos por fecha
  const equiposFiltrados = range.values.filter(row => {
    // La fecha está en la primera columna (índice 0)
    const fechaEquipo = row[0]; // Ajustar el índice si es necesario
    const fechaHora = fechaEquipo.split(',')[0].trim();
    console.log(fechaFormateada)
    console.log(fechaHora === fechaFormateada)
    return fechaHora === fechaFormateada;
  });

  // Mostrar los equipos filtrados en el elemento con id 'content'
  const contentElement = document.getElementById('content');
  contentElement.innerText = '';

  equiposFiltrados.forEach(row => {
    const equipo = row[2]; // Ajustar el índice si es necesario
    let carText = row[2];
    let size = row[3];
    let lon = row[4];
    let color = row[5];
    let left = row[6];
    let top = row[7];
    let orientation = row[8];
    addCar(color, size, lon, carText,left,top,orientation);
    contentElement.innerText += equipo + '\n';
  });
}
function guardarEnGoogleSheets() {
  // Obtener la fecha y hora actual
  const fechaHora = new Date();
  const fechaActual = fechaHora.toLocaleDateString('es-ES');
  const horaActual = fechaHora.toLocaleTimeString('es-ES');
  // Obtener los datos de los elementos .car
  const elementos = document.getElementsByClassName('car');
  const datos = [];

  for (let i = 0; i < elementos.length; i++) {
    const elemento = elementos[i];
    const equipoElemento = elemento.querySelector('h2.car-name');
    const equipo = equipoElemento.textContent.trim();
    const size = parseFloat(elemento.style.width)*115;
    const lon = parseFloat(elemento.style.height)*90;
    const color = elemento.style.backgroundColor;
    const left = elemento.style.left;
    const top = elemento.style.top;
    const transform = elemento.style.transform;
    const orientacion = transform !== 'none' ? transform : 'rotate(0deg)';
    // Agregar los datos a la lista
    datos.push([fechaActual,horaActual, equipo, size, lon, color, left, top, orientacion]);
  }
    console.log(datos)
    enviarDatosAGoogleSheets(datos);
}

function enviarDatosAGoogleSheets(datos) {
  const fechaHoraActual = new Date();
  const fechaActual = fechaHoraActual.toLocaleDateString('es-ES');
  const horaActual = fechaHoraActual.toLocaleTimeString('es-ES');
  const range = 'Ubicaciones!A:I';
  const request = {
    spreadsheetId: ShID,
    range: range,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: datos
    }
  };
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: ShID,
    range: range
  }).then(function(response) {
    const range = response.result;
    if (!range || !range.values || range.values.length === 0) {
      // No hay filas, agregar una nueva
      gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: ShID,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [datos],
        },
      });
    } else {
      let filasActualizar = [];
      for (let i = 0; i < range.values.length; i++) {
        const fila = range.values[i];
        const fechaFila = fila[0];
        if (fechaFila === fechaActual) {
          filasActualizar.push(i);
        }
      }

      if (filasActualizar.length > 0) {
        // Construir la solicitud de eliminación de filas
        const deleteRequest = {
          spreadsheetId: ShID,
          resource: {
            requests: [
              {
                deleteRange: {
                  range: {
                    sheetId: 0, // Identificador de la hoja de cálculo, puede variar
                    startRowIndex: filasActualizar[0], // Índice de la primera fila a eliminar
                    endRowIndex: filasActualizar[filasActualizar.length - 1] + 1 // Índice de la última fila a eliminar + 1
                  },
                  shiftDimension: 'ROWS'
                }
              }
            ]
          }
        };
      // Realizar la solicitud de eliminación de filas
      gapi.client.sheets.spreadsheets.batchUpdate(deleteRequest)
      .then(function(response) {
        // Agregar una nueva fila al final
        range.values.push(datos[0]);

        // Actualizar los datos en Google Sheets
        gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId: ShID,
          range: range,
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: range.values,
          },
        }).then(function(response) {
          console.log('Datos actualizados en Google Sheets:', response);
        }).catch(function(error) {
          console.error('Error al actualizar los datos en Google Sheets:', error);
        });
      })
      .catch(function(error) {
        console.error('Error al eliminar las filas en Google Sheets:', error);
      });
      // Actualizar los datos en Google Sheets
      gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: ShID,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: range.values,
        },
      });
    }}
  }).catch(function(error) {
    console.error('Error al obtener los datos de Google Sheets:', error);
  });

  gapi.client.sheets.spreadsheets.values.append(request)
    .then(function(response) {
      console.log('Datos agregados a Google Sheets:', response);
    }).catch(function(error) {
      console.error('Error al agregar los datos a Google Sheets:', error);
    });
}









const icaroSection = "AV. ICARO 154 URB. LA CAMPIÑA - CHORRILLOS - LIMA";
const lurinSection = "CAR. EXPLOSIVOS UC..10886 EX FUNDO HUARANGAL - LURIN - LIMA";
const chinchaSection = "CARR PANAMERICANA SUR NRO 204 EL CARMEN-CHINCHA BAJA-ICA";
const arequipaSection = "MZA. G LT 10 SEC. PARQUE INDUSTRIAL RIO SECO I ETAPA-CERRO COLORADO-AREQUIPA"
let cars = document.querySelectorAll('.car');
let carsContainer = document.querySelector('#cars-container');
let currentCar = null;

cars.forEach(car => {
  car.addEventListener('mousedown', function (e) {
    currentCar = car;
    car.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', function (e) {
  if (currentCar) {
    let prevX = currentCar.offsetLeft;
    let prevY = currentCar.offsetTop;

    currentCar.style.left = e.pageX - currentCar.offsetWidth / 2 + 'px';
    currentCar.style.top = e.pageY - currentCar.offsetHeight / 2 + 'px';

    // Obtener la lista de todos los bloques .car
    let cars = document.querySelectorAll('.car');
    let newX = e.pageX - currentCar.offsetWidth / 2;
    let newY = e.pageY - currentCar.offsetHeight / 2;

    let section1 = document.getElementById('ICARO');
    let section2 = document.getElementById('LURIN');
    let section3 = document.getElementById('CHINCHA');
    let section4 = document.getElementById('AREQUIPA');
    let section5 = document.getElementById('ALQUILER');
    let section1Rect = section1.getBoundingClientRect();
    let section2Rect = section2.getBoundingClientRect();
    let section3Rect = section3.getBoundingClientRect();
    let section4Rect = section4.getBoundingClientRect();
    let section5Rect = section5.getBoundingClientRect();

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
      else {
        // Ajustar los límites de las secciones considerando el desplazamiento vertical
        const section1Top = section1Rect.top + window.pageYOffset;
        const section1Bottom = section1Rect.bottom + window.pageYOffset;
        const section2Top = section2Rect.top + window.pageYOffset;
        const section2Bottom = section2Rect.bottom + window.pageYOffset;
        const section3Top = section3Rect.top + window.pageYOffset;
        const section3Bottom = section3Rect.bottom + window.pageYOffset;
        const section4Top = section4Rect.top + window.pageYOffset;
        const section4Bottom = section4Rect.bottom + window.pageYOffset;
        const section5Top = section5Rect.top + window.pageYOffset;
        const section5Bottom = section5Rect.bottom + window.pageYOffset;

        if (
          newX >= section1Rect.left &&
          newX + currentCar.offsetWidth <= section1Rect.right &&
          newY >= section1Top &&
          newY + currentCar.offsetHeight <= section1Bottom
        ) {
          currentCar.style.left = newX + 'px';
          currentCar.style.top = newY + 'px';
        } else if (
          newX >= section2Rect.left &&
          newX + currentCar.offsetWidth <= section2Rect.right &&
          newY >= section2Top &&
          newY + currentCar.offsetHeight <= section2Bottom
        ) {
          currentCar.style.left = newX + 'px';
          currentCar.style.top = newY + 'px';
        } else if (
          newX >= section3Rect.left &&
          newX + currentCar.offsetWidth <= section3Rect.right &&
          newY >= section3Top &&
          newY + currentCar.offsetHeight <= section3Bottom
        ) {
          currentCar.style.left = newX + 'px';
          currentCar.style.top = newY + 'px';
        } 
        else if (
          newX >= section4Rect.left &&
          newX + currentCar.offsetWidth <= section4Rect.right &&
          newY >= section4Top &&
          newY + currentCar.offsetHeight <= section4Bottom
        ) {
          currentCar.style.left = newX + 'px';
          currentCar.style.top = newY + 'px';
        }
        else if (
          newX >= section5Rect.left &&
          newX + currentCar.offsetWidth <= section5Rect.right &&
          newY >= section5Top &&
          newY + currentCar.offsetHeight <= section5Bottom
        ) {
          currentCar.style.left = newX + 'px';
          currentCar.style.top = newY + 'px';
        }else {
          // El coche está fuera de las secciones, no se permitirá el movimiento
          currentCar.style.left = prevX + 'px';
          currentCar.style.top = prevY + 'px';
        }

      }
    }
  }
});

document.addEventListener('mouseup', function (e) {
  if (currentCar) {
    currentCar.style.zIndex = '';
    currentCar = null;
  }
});

let carText = document.querySelector('#car-text');

function addCar(color, size, lon, carText, left, top, orientacion,costo) {
  let car = document.createElement('div');
  car.classList.add('car');
  const carName = document.createElement('h2');
  carName.classList.add('car-name');
  car.style.backgroundColor = color;
  car.style.width = size/115 + 'px';
  car.style.height = lon/90 + 'px';
  car.style.left = left; // agregar esta línea
  car.style.top = top; // agregar esta línea
  car.style.transform = orientacion;
  car.dataset.costo = costo;
  car.textContent = carText.split('-')[0];
  const factor = 0.5; // Ajustar este valor para cambiar el tamaño del texto
  const fontSize = car.offsetWidth / car.textContent.length * factor;
  carName.style.fontSize = fontSize + 'px'; // Aplicar el tamaño de texto calculado
  carName.textContent = carText.split('-')[0];
  car.appendChild(carName);
  carsContainer.appendChild(car)
  // Agregar controlador del evento mousedown al nuevo bloque .car
  car.addEventListener('mousedown', function (e) {
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
    <li><i class="fas fa-info-circle"></i> Info </li>
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
        case 'Info':
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
          top: ${car.offsetTop - 1815}px;
          left: ${car.offsetLeft - 110}px;
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
        case 'Trasladar':
          // Crear el menú de traslación
          const menuTraslacion = document.createElement('div');
          menuTraslacion.classList.add('car-menu-traslacion');
          menuTraslacion.innerHTML = `
          <ul class="car-menu-horizontal">
            <li class="menu-item-blanco" data-coordenadas="200, 200" value="AV. ICARO 154 URB. LA CAMPIÑA - CHORRILLOS - LIMA">ICARO</li>
            <li class="menu-item-naranja" data-coordenadas="600, 200" value="CAR. EXPLOSIVOS UC..10886 EX FUNDO HUARANGAL - LURIN - LIMA">LURIN</li>
            <li class="menu-item-blanco" data-coordenadas="700, 800" value="CARR PANAMERICANA SUR NRO 204 EL CARMEN-CHINCHA BAJA-ICA">CHINCHA</li>
            <li class="menu-item-naranja" data-coordenadas="800, 1670" value="MZA. G LT 10 SEC. PARQUE INDUSTRIAL RIO SECO I ETAPA-CERRO COLORADO-AREQUIPA">AREQUIPA</li>
            <li class="menu-item-blanco" data-coordenadas="200, 1670">ALQUILER</li>
          </ul>
        `;
          // Establecer el estilo del menú de traslación
          const menuTraslacionStyles = `
          position: relative;
          top: ${car.offsetTop - 1700}px;
          left: ${car.offsetLeft - 200}px;
          color: white;
          padding: 10px;
          z-index: 999;
        `;
          menuTraslacion.style.cssText = menuTraslacionStyles;
          // Ajustar el tamaño y la posición de los elementos del menú
          const menuItemStylesT = `
            font-size: 12px;
          `;
          const menuItemsT = menuTraslacion.querySelectorAll('li');
          menuItemsT.forEach((item) => {
            item.style.cssText = menuItemStylesT;
          });
          // Agregar el menú de traslación al cuerpo del documento
          document.body.appendChild(menuTraslacion);
          menu.remove();
          // Agregar evento de clic a las opciones del menú de traslación
          menuTraslacion.querySelectorAll('li').forEach((opcion) => {
            opcion.addEventListener('click', (event) => {
              const coordenadas = event.target.getAttribute('data-coordenadas').split(', ');
              // Mostrar cuadro de diálogo
              // Obtener la sección actual del coche
              const section = getSection(car);
              if (section === opcion.textContent) {
                alert("No se puede trasladar al mismo sitio, por favor verificar otras opciones")
              }
              else {
                const confirmDialog = confirm('¿Deseas conocer el precio del traslado?');
                if (confirmDialog) {
                  // Crear modal box
                  const modalBox = document.createElement('div');
                  modalBox.classList.add('modal-content');
                  modalBox.innerHTML = `
                  <div class="modal-content">
                    <h2 class="modal-header">Precio del traslado</h2>
                    <div class="modal-body">
                      <label id="ruta"></label><br><br>
                      <label for="vehicle">Vehículo: </label>
                      <select id="vehicle">
                        <option value="BAE-886">BAE-886</option>
                        <option value="BPT-794">BPT-794</option>
                        <option value="D6V-848">D6V-848</option>
                        <option value="F4C-892">F4C-892</option>
                      </select><br><br>
                      <label for="drivers">Cantidad de choferes: </label>
                      <select id="drivers">
                        <option value="1">1 chofer</option>
                        <option value="2">2 choferes</option>
                        <option value="3">3 choferes</option>
                      </select><br><br>
                      <label for="kilometers">Kilómetros: </label>
                      <input id="kilometers" type="text" readonly><br><br>
                      <label for="driverName">Nombre del conductor:</label>
                      <select id="driverName">
                        <option value="Fidel Mondoñedo">Fidel Mondoñedo</option>
                        <option value="Willian De la Cruz">Willian De la Cruz</option>
                        <option value="Pedro Madrid">Pedro Madrid</option>
                      </select><br><br>
                      <label for="store">Almacén: </label>
                      <select id="store">
                        <option value="101">01-LIM EQUIPOS DISPONIBLE EP</option>
                        <option value="102">01-LIM EQUIPOS MANTENIMIENTO EP</option>
                        <option value="131">01-LURIN EQUIPOS DISPONIBLE EP</option>
                        <option value="132">01-LURIN EQUIPOS MANTENI EP</option>
                        <option value="141">01-CHINCHA EQUIPOS DISPONIBLE EP</option>
                        <option value="142">01-CHINCHA EQUIPOS MANTENI EP</option>
                      </select><br><br>
                      <label for="date">Fecha: </label>
                      <input id="date" type="date"><br><br>
                      <label for="equipment">Insumos: </label>
                      <input id="equipment" type="text"><br><br>
                      <label for="Precio">Precio aprox en S/:</label>
                      <input id="Precio" type="text" readonly><br><br>
                      
                    </div>
                    <div class="modal-footer">
                      <button id="sendEmailButton">Enviar por correo</button>
                      <button id="saveButton">Guardar</button>
                    </div>
                  </div>
                  `;
                  // Obtener el input de kilómetros y el input de precio
                  const kilometersInput = modalBox.querySelector('#kilometers');
                  const precioInput = modalBox.querySelector('#Precio');

                  // Calcular la distancia aproximada en función de la sección actual y la opción seleccionada
                  if (section === 'ICARO') {
                    if (opcion.textContent === 'CHINCHA') {
                      kilometersInput.value = '189 Km';
                      precioInput.value = 1000;
                    } else if (opcion.textContent === 'LURIN') {
                      kilometersInput.value = '22.7 Km';
                      precioInput.value = 119;
                    } else if (opcion.textContent === 'AREQUIPA') {
                      kilometersInput.value = '988 Km';
                      precioInput.value = 1500;
                    } else {
                      // Si la opción no coincide con ninguna de las disponibles para ICARO, se deja vacío el input de kilómetros y el input de precio
                      kilometersInput.value = prompt("Ingrese la cantidad de kilometros:");
                      precioInput.value = '';
                    }
                  } else if (section === 'LURIN') {
                    if (opcion.textContent === 'CHINCHA') {
                      kilometersInput.value = '171 Km';
                      precioInput.value = 1000;
                    } else if (opcion.textContent === 'ICARO') {
                      kilometersInput.value = '22.7 Km';
                      precioInput.value = 119;
                    } else if (opcion.textContent === 'AREQUIPA') {
                      kilometersInput.value = '971 Km';
                      precioInput.value = 1500;
                    } else {
                      // Si la opción no coincide con ninguna de las disponibles para LURIN, se deja vacío el input de kilómetros y el input de precio
                      kilometersInput.value = prompt("Ingrese la cantidad de kilometros:");
                      precioInput.value = '';
                    }
                  } else if (section === 'CHINCHA') {
                    if (opcion.textContent === 'ICARO') {
                      kilometersInput.value = '189 Km';
                      precioInput.value = 1000;
                    } else if (opcion.textContent === 'LURIN') {
                      kilometersInput.value = '171 Km';
                      precioInput.value = 119;
                    } else if (opcion.textContent === 'AREQUIPA') {
                      kilometersInput.value = '809 Km';
                      precioInput.value = 1500;
                    } else {
                      // Si la opción no coincide con ninguna de las disponibles para CHINCHA, se deja vacío el input de kilómetros y el input de precio
                      kilometersInput.value = prompt("Ingrese la cantidad de kilometros:");
                      precioInput.value = '';
                    }
                  } else if (section === 'AREQUIPA') {
                    if (opcion.textContent === 'ICARO') {
                      kilometersInput.value = '988 Km';
                      precioInput.value = 1000;
                    } else if (opcion.textContent === 'LURIN') {
                      kilometersInput.value = '971 Km';
                      precioInput.value = 119;
                    } else if (opcion.textContent === 'CHINCHA') {
                      kilometersInput.value = '809 Km';
                      precioInput.value = 1500;
                    } else {
                      // Si la opción no coincide con ninguna de las disponibles para AREQUIPA, se deja vacío el input de kilómetros y el input de precio
                      kilometersInput.value = prompt("Ingrese la cantidad de kilometros:");
                      precioInput.value = '';
                    }
                  } else {
                    // Si la sección no coincide con ninguna de las disponibles, se deja vacío el input de kilómetros y el input de precio
                    kilometersInput.value = prompt("Ingrese la cantidad de kilometros:");
                    precioInput.value = '';
                  }
                  // Actualizar el texto del elemento <label id="ruta"></label>
                  const rutaLabel = modalBox.querySelector('#ruta');
                  if (rutaLabel) {
                    rutaLabel.textContent = `Traslado del ${carName.textContent} de ${section} - ${opcion.textContent}`;
                  }
                  // Obtener el botón de guardar y el botón de enviar por correo
                  const saveButton = modalBox.querySelector('#saveButton');
                  const sendEmailButton = modalBox.querySelector('#sendEmailButton');
                  // Evento de clic en el botón de guardar
                  saveButton.addEventListener('click', () => {
                    // Obtener los valores de los inputs
                    const sectionsArray = ["ICARO", "LURIN", "CHINCHA", "AREQUIPA","ALQUILER"];
                    const DireccionesArray = [icaroSection, lurinSection, chinchaSection, arequipaSection];
                    const sectionIndex = sectionsArray.indexOf(section);
                    const opcionIndex = sectionsArray.indexOf(opcion.textContent);
                    let INICIO = DireccionesArray[sectionIndex];
                    let DESTINO = DireccionesArray[opcionIndex];
                    if (typeof INICIO === "undefined") {
                      // Abrir recuadro para agregar dirección y kilometraje manualmente
                      INICIO = prompt("Ingrese la dirección de inicio:");
                    }
                    if (typeof DESTINO === "undefined") {
                      // Abrir recuadro para agregar dirección y kilometraje manualmente
                      DESTINO = prompt("Ingrese la dirección de destino:");
                    }
                    obtenerUltimaFila(carName.textContent)
                    const costo = precioInput.value;
                    const vehicle = modalBox.querySelector('#vehicle').value;
                    const drivers = modalBox.querySelector('#drivers').value;
                    const driverName = modalBox.querySelector('#driverName').value;
                    const store = modalBox.querySelector('#store').value;
                    const date = modalBox.querySelector('#date').value;
                    const equipment = carName.textContent + " " + modalBox.querySelector('#equipment').value;
                    agregarPropiedades(carName.textContent, costo, section,opcion.textContent);
                    guardarEnGoogleSheets()
                    modalBox.remove();
                  });
                  // Evento de clic en el botón de enviar por correo
                  sendEmailButton.addEventListener('click', () => {
                    obtenerUltimaFila(carName.textContent)
                    // Obtener los valores de los inputs
                    const sectionsArray = ["ICARO", "LURIN", "CHINCHA", "AREQUIPA","ALQUILER"];
                    const DireccionesArray = [icaroSection, lurinSection, chinchaSection, arequipaSection];
                    const sectionIndex = sectionsArray.indexOf(section);
                    const opcionIndex = sectionsArray.indexOf(opcion.textContent);
                    let INICIO = DireccionesArray[sectionIndex];
                    let DESTINO = DireccionesArray[opcionIndex];
                    if (typeof INICIO === "undefined") {
                      // Abrir recuadro para agregar dirección y kilometraje manualmente
                      INICIO = prompt("Ingrese la dirección de inicio:");
                    }
                    if (typeof DESTINO === "undefined") {
                      // Abrir recuadro para agregar dirección y kilometraje manualmente
                      DESTINO = prompt("Ingrese la dirección de destino:");
                    }
                    const costo = precioInput.value;
                    const vehicle = modalBox.querySelector('#vehicle').value;
                    const drivers = modalBox.querySelector('#drivers').value;
                    const driverName = modalBox.querySelector('#driverName').value;
                    const store = modalBox.querySelector('#store').value;
                    const date = modalBox.querySelector('#date').value;
                    const equipment = carName.textContent + " " + modalBox.querySelector('#equipment').value;
                    // Generar el cuerpo del correo electrónico
                    const subject = "Información del traslado";
                    const body = `Saludos, a continuación se envía los detalles del traslado del equipo:
                    Inicio:${INICIO}
                    Destino:${DESTINO}
                    Vehículo: ${vehicle}
                    Cantidad de choferes: ${drivers}
                    Nombre del conductor: ${driverName}
                    Almacén: ${store}
                    Fecha: ${date}
                    Equipos: ${equipment}`;
                    // Generar la URL del correo electrónico con los datos
                    const mailtoUrl = `mailto:eguerrero@energiaperuana.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    // Abrir el enlace de correo electrónico en una nueva pestaña
                    agregarPropiedades(carName.textContent, costo, section,opcion.textContent);
                    guardarEnGoogleSheets()
                    window.open(mailtoUrl, '_blank');
                    // guardar el modal box
                    modalBox.remove();
                  });

                  // Agregar el modal box al cuerpo del documento
                  document.body.appendChild(modalBox);
                }
                const left = parseInt(coordenadas[0]);
                const top = parseInt(coordenadas[1]);
                car.style.left = left + 'px';
                car.style.top = top + 'px'
              }
            });
          });
          break;
      }
    });
    // Event listener para guardar el menú al hacer clic fuera de él
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
    document.addEventListener('mousedown', (event) => {
      // Verificar si el clic fue fuera del menú de rotación
      const menuTraslacion = document.querySelector('.car-menu-traslacion');
      if (menuTraslacion && !menuTraslacion.contains(event.target)) {
        menuTraslacion.remove();
      }
    });
  });
}

let sizeSelect = document.getElementById("size-select");
addCarButton.addEventListener('click', function () {
  let selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
  if (!selectedOption) {
    console.log('Por favor seleccione un equipo');
    return;
  }
  let carText = selectedOption.textContent;
  let size = sizeSelect.options[sizeSelect.selectedIndex].getAttribute('size');
  let lon = sizeSelect.options[sizeSelect.selectedIndex].getAttribute('lon');
  let color = sizeSelect.options[sizeSelect.selectedIndex].getAttribute('data-color');
  let left = sizeSelect.options[sizeSelect.selectedIndex].getAttribute('LEFT')
  let top = sizeSelect.options[sizeSelect.selectedIndex].getAttribute('TOP')
  let orientacion = 0;
  let costo=0;
  addCar(color, size, lon, carText, left, top, orientacion,costo);
});

var xhr = new XMLHttpRequest();
xhr.open("GET", "fuentes/Data_Equipos.csv", true);

xhr.onreadystatechange = function () {
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
    filterInput.addEventListener("input", function () {
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
  const fechaString = fecha.toString(); // Convertir a cadena de texto
  const partes = fechaString.split('-');
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
function Obtenerequiposconfecha() {
  // Mostrar cuadro de entrada de fecha
  var bloqueFecha = document.getElementById("select-fecha");
  var inputFecha = document.getElementById("fecha");
  // Obtener la fecha seleccionada
  var fecha = inputFecha.value;
  verificarFechaExistente(fecha)
    .then((fechaExistente) => {
        if (fecha !== "" && fechaExistente) {
          // Llamar a la función CargarEquipos() con la fecha seleccionada
          bloqueFecha.style.visibility = 'hidden';
          inputFecha.style.visibility = 'hidden';
          var cars = document.querySelectorAll('.car');
          cars.forEach(function (car) {
            car.remove();
          });
          ObtenerEquipos(fecha);
          console.log("Se ha obtenido los equipos de la fecha "+fecha)
          alert("Se ha obtenido los equipos de la fecha "+fecha)
        } else {
          alert("Fecha elegida no disponible, por favor selecciona otra");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error al verificar la fecha");
      });
}
function ObtenerFecha() {
  // Mostrar cuadro de entrada de fecha
  var bloqueFecha = document.getElementById("select-fecha");
  var inputFecha = document.getElementById("fecha");
  // Mostrar el calendario de fecha
  bloqueFecha.style.visibility = 'visible';
  inputFecha.style.visibility = 'visible';
}

async function ObtenerEquipos(fecha) {
  // Obtener la fecha seleccionada
  const fechaSeleccionada = fecha;
  var bloqueFecha = document.getElementById("select-fecha");
  const fechaFormateada = convertirFecha(fechaSeleccionada);
  let response;
  try {
    // Obtener los datos del rango completo
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: ShID,
      range: 'Ubicaciones!A:L',
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
    let costo = row[11];
    addCar(color, size, lon, carText, left, top, orientation,costo);
    // contentElement.innerText += equipo + '\n';
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
    const section = getSection(elemento);
    const equipoElemento = elemento.querySelector('h2.car-name');
    const equipo = equipoElemento.textContent.trim();
    const size = parseFloat(elemento.style.width) * 115;
    const lon = parseFloat(elemento.style.height) * 90;
    const color = elemento.style.backgroundColor;
    const left = elemento.style.left;
    const top = elemento.style.top;
    const transform = elemento.style.transform;
    const orientacion = transform !== 'none' ? transform : 'rotate(0deg)';
    const anterior = elemento.dataset.ubicacionAnterior;
    const costo = elemento.dataset.costo;
    // Agregar los datos a la lista
    datos.push([fechaActual, horaActual, equipo, size, lon, color, left, top, orientacion,anterior,section,costo,]);
  }
  enviarDatosAGoogleSheets(datos);
}

function enviarDatosAGoogleSheets(datos) {
  const fechaHoraActual = new Date();
  const fechaActual = fechaHoraActual.toLocaleDateString('es-ES');
  const horaActual = fechaHoraActual.toLocaleTimeString('es-ES');
  const range = 'Ubicaciones!A:L';
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
  }).then(function (response) {
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
          .then(function (response) {
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
            }).then(function (response) {
              console.log('Datos actualizados en Google Sheets:', response);
            }).catch(function (error) {
              console.error('Error al actualizar los datos en Google Sheets:', error);
            });
          })
          .catch(function (error) {
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
      }
    }
  }).catch(function (error) {
    console.error('Error al obtener los datos de Google Sheets:', error);
  });

  gapi.client.sheets.spreadsheets.values.append(request)
    .then(function (response) {
      console.log('Datos agregados a Google Sheets:', response);
    }).catch(function (error) {
      console.error('Error al agregar los datos a Google Sheets:', error);
    });
}

function getSection(car) {
  const sections = document.getElementsByClassName('section');
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const rect = section.getBoundingClientRect();
    const carRect = car.getBoundingClientRect();
    if (
      carRect.left >= rect.left &&
      carRect.right <= rect.right &&
      carRect.top >= rect.top &&
      carRect.bottom <= rect.bottom
    ) {
      return section.id;
    }
  }
  return null;
}

async function ObtenerUltimaFechaLlenada() {
  let response;
  try {
    // Obtener los datos del rango completo
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: ShID,
      range: 'Ubicaciones!A:I',
      majorDimension: 'ROWS',
      valueRenderOption: 'FORMATTED_VALUE',
      dateTimeRenderOption: 'FORMATTED_STRING'
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

  // El último registro contiene la última fecha
  const ultimaFila = range.values[range.values.length - 1];
  const ultimaFecha = ultimaFila[0];
  console.log("Última fecha llenada:", ultimaFecha);

  return ultimaFecha;
}

function agregarPropiedades(equipoNombre, costo, ubicacionAnterior, ubicacionActual) {
  const elementos = document.getElementsByClassName('car');

  for (let i = 0; i < elementos.length; i++) {
    const elemento = elementos[i];
    const equipoElemento = elemento.querySelector('h2.car-name');
    const carName = equipoElemento.textContent.trim();

    if (carName === equipoNombre) {
      elemento.dataset.costo = costo;
      elemento.dataset.ubicacionAnterior = ubicacionAnterior;
      elemento.dataset.ubicacionActual = ubicacionActual;
      console.log(`Se agregaron propiedades al elemento "${carName}":`);
      console.log('- Costo:', costo);
      console.log('- Ubicación anterior:', ubicacionAnterior);
      console.log('- Ubicación actual:', ubicacionActual);
    }
  }
}

function ObtenerSumatoriaCostoDiario() {
  const elementos = document.getElementsByClassName('car');
  const alurin = 2397.28;
  const aicaro = 948.28;
  const achincha = 7405.79;
  let sumatoriaCosto = 0;
  let areasPorSector = {};
  let equiposPorSeccion = {};

  for (let i = 0; i < elementos.length; i++) {
    const elemento = elementos[i];
    const equipoElemento = elemento.querySelector('h2.car-name');
    const carName = equipoElemento.textContent.trim();
    const costo = parseFloat(elemento.dataset.costo);
    const sector = getSection(elemento);

    if (!isNaN(costo)) {
      sumatoriaCosto += costo;
    }

    const width = (parseFloat(elemento.style.width) * 115) / 1000;
    console.log("width: " + width);
    const height = (parseFloat(elemento.style.height) * 90) / 1000;
    console.log("height: " + height);
    const area = width * height;
    console.log("area: " + area);

    if (!areasPorSector[sector]) {
      areasPorSector[sector] = area;
    } else {
      areasPorSector[sector] += area;
    }

    if (!equiposPorSeccion[sector]) {
      equiposPorSeccion[sector] = [carName];
    } else {
      equiposPorSeccion[sector].push(carName);
    }
  }

  console.log('Sumatoria del costo diario:', sumatoriaCosto);
  console.log('Áreas por sector:', areasPorSector);
  console.log('Equipos por sección:', equiposPorSeccion);
  generarModalBox(sumatoriaCosto, areasPorSector, equiposPorSeccion);
}


function generarModalBox(sumatoriaCosto, areasPorSector, equiposPorSeccion) {
  const areasTotales = {
    LURIN: 2397.28,
    ICARO: 948.28,
    CHINCHA: 7405.79,
    AREQUIPA: 2079,
    ALQUILER: 10000
  };

  // Calcular y mostrar el porcentaje ocupado por sector
  const porcentajesOcupados = {};
  Object.entries(areasPorSector).forEach(([sector, area]) => {
    const areaTotal = areasTotales[sector];
    const porcentajeOcupado = (area / areaTotal) * 100;
    porcentajesOcupados[sector] = porcentajeOcupado.toFixed(2);
  });

  // Crear el elemento modalBox
  const modalBox = document.createElement('div');
  modalBox.classList.add('modal-content');
  modalBox.innerHTML = `
    <div class="modal-content">
      <h2 class="modal-header">Resumen de Costos Diarios</h2>
      <div class="modal-body">
        <p>Sumatoria del costo diario: ${sumatoriaCosto}</p>
        <p>Áreas por sector:</p>
        <ul>
          ${Object.entries(porcentajesOcupados)
            .map(([sector, porcentaje]) => `<li>${sector}: ${porcentaje}%</li>`)
            .join('')}
        </ul>
          <p>Selecciona un sector:</p>
          <select id="sectorSelect">
            ${Object.keys(equiposPorSeccion)
              .map(sector => `<option value="${sector}">${sector}</option>`)
              .join('')}
          </select>
          <p>Equipos por sector:</p>
          <ul id="equiposList"></ul>
      </div>
      <div class="modal-footer">
        <button class="close">Cerrar</button>
      </div>
    </div>
  `;

  // Agregar el elemento modalBox al documento
  document.body.appendChild(modalBox);

  // Obtener el botón de cierre
  const closeButton = modalBox.querySelector('.close');
  const equiposList = document.getElementById('equiposList');
  const sectorSelect = document.getElementById('sectorSelect');

  sectorSelect.addEventListener('change', function() {
    const selectedSector = this.value;
    const equipos = equiposPorSeccion[selectedSector];

    equiposList.innerHTML = equipos.map(equipo => `<li>${equipo}</li>`).join('');
  });

  // Agregar el evento de clic al botón de cierre para cerrar el modal box
  closeButton.addEventListener('click', function() {
    modalBox.remove();
  });
}


function verificarFechaExistente(fecha) {
  const convFecha=convertirFecha(fecha);
  return new Promise((resolve, reject) => {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: ShID,
      range: 'Ubicaciones!A:A',
      majorDimension: 'COLUMNS',
      valueRenderOption: 'FORMATTED_VALUE',
      dateTimeRenderOption: 'FORMATTED_STRING'
    }).then((response) => {
      const column = response.result;
      if (!column || !column.values || column.values.length === 0) {
        console.warn("No values found");
        resolve(false);
        return;
      }

      const fechas = column.values[0];
      console.log("comparar "+convFecha)
      console.log(fechas)
      const fechaExistente = fechas.includes(convFecha);
      resolve(fechaExistente);
    }).catch((err) => {
      console.error(err);
      reject(err);
    });
  });
}

async function obtenerUltimaFila(nombreEquipo) {
  try {
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: ShID,
      range: 'Ubicaciones!A:I',
      valueRenderOption: 'UNFORMATTED_VALUE',
      majorDimension: 'COLUMNS'
    });

    const values = response.result.values;
    if (!values || values.length === 0) {
      console.log('No se encontraron valores en la hoja de cálculo.');
      return;
    }

    const columnData = values[2];
    for (let i = columnData.length - 1; i >= 0; i--) {
      if (columnData[i] === nombreEquipo) {
        const ultimaFila = i + 1;
        console.log(`La última fila para el equipo "${nombreEquipo}" es: ${ultimaFila}`);
        return ultimaFila;
      }
    }

    console.log(`No se encontró el equipo "${nombreEquipo}" en la hoja de cálculo.`);
  } catch (error) {
    console.error('Error al obtener la última fila:', error);
  }
}
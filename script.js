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

function addCar(color, size, lon) {
    let car = document.createElement('div');
    car.classList.add('car');
    const carName = document.createElement('h2');
    carName.classList.add('car-name');
    carName.textContent = ' ';
    car.style.backgroundColor = color;
    car.style.width = lon + 'px';
    car.style.height = size + 'px';
    car.textContent = carText.value; // Agregar el texto ingresado en el campo de texto
    carsContainer.appendChild(car);

    // Agregar controlador del evento mousedown al nuevo bloque .car
    car.addEventListener('mousedown', function(e) {
        currentCar = car;
        car.style.zIndex = 1000;
    });
  car.addEventListener('dblclick', event => {
    // Mostrar el menú
    const menu = document.createElement('div');
    menu.classList.add('car-menu'); 
    menu.innerHTML = `
       <ul>
    <li><i class="fas fa-edit"></i> Cambiar nombre</li>
    <li><i class="fas fa-trash"></i> Eliminar</li>
    <li><i class="fas fa-user-cog"></i> Asignar técnico</li>
  </ul>
    `;

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
  }
});
   // Event listener para cerrar el menú al hacer clic fuera de él
  carsContainer.addEventListener('click', event => {
    if (!menu.contains(event.target)) {
      menu.remove();
    }
  });
  });
}

let sizeSelect = document.querySelector('#size-select');

addCarButton.addEventListener('click', function() {
    let size = sizeSelect.value;
    let lon = sizeSelect.options[sizeSelect.selectedIndex].getAttribute('lon');;
    let color = sizeSelect.options[sizeSelect.selectedIndex].getAttribute('data-color');
    addCar(color, size,lon);
});

import axios from 'axios';
import Swal from 'sweetalert2';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
	tareas.addEventListener('click', (e) => {
		if (e.target.classList.contains('fa-check-circle')) {
			const icono = e.target;
			const idTarea = icono.parentElement.parentElement.dataset.tarea;

			// request hacia /tareas/:id
			const url = `${location.origin}/tareas/${idTarea}`;

			axios.patch(url, { idTarea }).then((respuesta) => {
				if (respuesta.status === 200) {
					icono.classList.toggle('completo');
				}
			});
		}

		if (e.target.classList.contains('fa-trash')) {
			const tareaHTML = e.target.parentElement.parentElement,
				idTarea = tareaHTML.dataset.tarea;
			Swal.fire({
				title: 'Deseas borrar esta tarea?',
				text: 'Una tarea eliminada no se puede recuperar!',
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, Borrar!',
				cancelButtonText: 'No, Cancelar'
			}).then((result) => {
				if (result.value) {
					const url = `${location.origin}/tareas/${idTarea}`;
					// enviar el delete por medio de axios
					axios.delete(url, { params: { idTarea } }).then((respuesta) => {
						console.log(respuesta);
					});
				}
			});
		}
	});
}

export default tareas;

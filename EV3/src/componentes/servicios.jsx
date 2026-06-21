/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types'

export const servicios = [
	{
		id: 'corte-premium',
		nombre: 'Corte premium',
		duracion: 35,
		precio: '18 €',
		descripcion: 'Degradado limpio con acabado de precision.',
	},
	{
		id: 'barba-classic',
		nombre: 'Barba clasica',
		duracion: 20,
		precio: '12 €',
		descripcion: 'Perfilado, recorte y definicion de contornos.',
	},
	{
		id: 'fade-diseno',
		nombre: 'Fade y diseño',
		duracion: 45,
		precio: '22 €',
		descripcion: 'Transiciones suaves con detalles personalizados.',
	},
	{
		id: 'combo-barba',
		nombre: 'Combo completo',
		duracion: 60,
		precio: '30 €',
		descripcion: 'Servicio completo para corte y barba en una sola cita.',
	},
]

export default function Servicios({
	servicios: listaServicios,
	servicioSeleccionadoId,
	onSeleccionar,
	...sectionProps
}) {
	return (
		<section className="panel panel-span-2" {...sectionProps}>
			<div className="panel-head">
				<div>
					<p className="panel-kicker">Servicios</p>
					<h2>Elige el servicio que definira la cita</h2>
				</div>
				<span className="panel-badge">{listaServicios.length} opciones</span>
			</div>

			<div className="card-grid">
				{listaServicios.map((servicio) => {
					const activo = servicioSeleccionadoId === servicio.id

					return (
						<button
							key={servicio.id}
							type="button"
							className={`choice-card ${activo ? 'is-active' : ''}`}
							onClick={() => onSeleccionar(servicio.id)}
						>
							<div className="choice-card-top">
								<strong>{servicio.nombre}</strong>
								<span>{servicio.precio}</span>
							</div>
							<p>{servicio.descripcion}</p>
							<div className="choice-card-meta">
								<span>{servicio.duracion} min</span>
								<span>{activo ? 'Seleccionado' : 'Disponible'}</span>
							</div>
						</button>
					)
				})}
			</div>
		</section>
	)
}

Servicios.propTypes = {
	servicios: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			nombre: PropTypes.string.isRequired,
			duracion: PropTypes.number.isRequired,
			precio: PropTypes.string.isRequired,
			descripcion: PropTypes.string.isRequired,
		})
	).isRequired,
	servicioSeleccionadoId: PropTypes.string.isRequired,
	onSeleccionar: PropTypes.func.isRequired,
}

/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types'

export const barberos = [
	{
		id: 'diego-torres',
		nombre: 'Diego Torres',
		especialidad: 'Fade y acabados',
		horario: '09:00 - 18:00',
	},
	{
		id: 'marco-leon',
		nombre: 'Marco Leon',
		especialidad: 'Barba y perfilado',
		horario: '10:00 - 19:00',
	},
	{
		id: 'alan-ruiz',
		nombre: 'Alan Ruiz',
		especialidad: 'Diseño y estilo',
		horario: '11:00 - 20:00',
	},
]

export default function Barberos({
	barberos: listaBarberos,
	barberoSeleccionadoId,
	onSeleccionar,
}) {
	return (
		<section className="panel">
			<div className="panel-head">
				<div>
					<p className="panel-kicker">Barberos</p>
					<h2>Asigna el profesional que atendera la reserva</h2>
				</div>
				<span className="panel-badge">Equipo activo</span>
			</div>

			<div className="card-grid card-grid-compact">
				{listaBarberos.map((barbero) => {
					const activo = barberoSeleccionadoId === barbero.id

					return (
						<button
							key={barbero.id}
							type="button"
							className={`choice-card choice-card-portrait ${activo ? 'is-active' : ''}`}
							onClick={() => onSeleccionar(barbero.id)}
						>
							<div className="avatar">{barbero.nombre.slice(0, 1)}</div>
							<strong>{barbero.nombre}</strong>
							<p>{barbero.especialidad}</p>
							<div className="choice-card-meta">
								<span>{barbero.horario}</span>
								<span>{activo ? 'Asignado' : 'Elegir'}</span>
							</div>
						</button>
					)
				})}
			</div>
		</section>
	)
}

Barberos.propTypes = {
	barberos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			nombre: PropTypes.string.isRequired,
			especialidad: PropTypes.string.isRequired,
			horario: PropTypes.string.isRequired,
		})
	).isRequired,
	barberoSeleccionadoId: PropTypes.string.isRequired,
	onSeleccionar: PropTypes.func.isRequired,
}

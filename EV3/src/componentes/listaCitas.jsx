import { barberos } from './barberos.jsx'
import { servicios } from './servicios.jsx'

const formatearFecha = (fecha) =>
	new Intl.DateTimeFormat('es-ES', {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
	}).format(new Date(`${fecha}T00:00:00`))

const obtenerNombreServicio = (servicioId) =>
	servicios.find((servicio) => servicio.id === servicioId)?.nombre ?? 'Servicio'

const obtenerNombreBarbero = (barberoId) =>
	barberos.find((barbero) => barbero.id === barberoId)?.nombre ?? 'Barbero'

export default function ListaCitas({ citas, onCancelar }) {
	return (
		<section className="panel panel-span-2 panel-list">
			<div className="panel-head">
				<div>
					<p className="panel-kicker">Agenda</p>
					<h2>Citas programadas</h2>
				</div>
				<span className="panel-badge">{citas.length} reservas</span>
			</div>

			{citas.length === 0 ? (
				<div className="empty-state">
					<h3>No hay citas registradas</h3>
					<p>Las reservas nuevas apareceran aqui con fecha, servicio y barbero asignado.</p>
				</div>
			) : (
				<div className="appointments-list">
					{citas.map((cita) => (
						<article key={cita.id} className="appointment-card">
							<div className="appointment-card-top">
								<div>
									<p className="appointment-date">{formatearFecha(cita.fecha)}</p>
									<h3>{cita.cliente}</h3>
								</div>
								<span className="status-pill">{cita.estado}</span>
							</div>

							<div className="appointment-details">
								<div>
									<span>Servicio</span>
									<strong>{obtenerNombreServicio(cita.servicioId)}</strong>
								</div>
								<div>
									<span>Barbero</span>
									<strong>{obtenerNombreBarbero(cita.barberoId)}</strong>
								</div>
								<div>
									<span>Hora</span>
									<strong>{cita.hora}</strong>
								</div>
							</div>

							<p className="appointment-notes">{cita.notas || 'Sin notas adicionales.'}</p>

							<button type="button" className="ghost-button" onClick={() => onCancelar(cita.id)}>
								Cancelar cita
							</button>
						</article>
					))}
				</div>
			)}
		</section>
	)
}

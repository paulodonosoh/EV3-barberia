import PropTypes from 'prop-types'

export default function FormularioCita({
	formulario,
	onChange,
	onSubmit,
	servicios,
	barberos,
}) {
	return (
		<section className="panel panel-form">
			<div className="panel-head">
				<div>
					<p className="panel-kicker">Nueva cita</p>
					<h2>Registra el turno en pocos pasos</h2>
				</div>
				<span className="panel-badge">Formulario</span>
			</div>

			<form className="appointment-form" onSubmit={onSubmit}>
				<label>
					<span>Cliente</span>
					<input
						type="text"
						name="cliente"
						value={formulario.cliente}
						onChange={(evento) => onChange('cliente', evento.target.value)}
						placeholder="Nombre del cliente"
					/>
				</label>

				<label>
					<span>Teléfono</span>
					<input
						type="tel"
						name="telefono"
						value={formulario.telefono}
						onChange={(evento) => onChange('telefono', evento.target.value)}
						placeholder="+569XXXXXXXX o +5629XXXXXXX"
					/>
				</label>

				<label>
					<span>Servicio</span>
					<select
						name="servicioId"
						value={formulario.servicioId}
						onChange={(evento) => onChange('servicioId', evento.target.value)}
					>
						{servicios.map((servicio) => (
							<option key={servicio.id} value={servicio.id}>
								{servicio.nombre}
							</option>
						))}
					</select>
				</label>

				<label>
					<span>Barbero</span>
					<select
						name="barberoId"
						value={formulario.barberoId}
						onChange={(evento) => onChange('barberoId', evento.target.value)}
					>
						{barberos.map((barbero) => (
							<option key={barbero.id} value={barbero.id}>
								{barbero.nombre}
							</option>
						))}
					</select>
				</label>

				<div className="form-row">
					<label>
						<span>Fecha</span>
						<input
							type="date"
							name="fecha"
							value={formulario.fecha}
							onChange={(evento) => onChange('fecha', evento.target.value)}
						/>
					</label>

					<label>
						<span>Hora</span>
						<input
							type="time"
							name="hora"
							value={formulario.hora}
							onChange={(evento) => onChange('hora', evento.target.value)}
						/>
					</label>
				</div>

				<label>
					<span>Notas</span>
					<textarea
						name="notas"
						rows="4"
						value={formulario.notas}
						onChange={(evento) => onChange('notas', evento.target.value)}
						placeholder="Preferencias del cliente, estilo deseado, observaciones..."
					/>
				</label>

				<button type="submit" className="primary-button">
					Agendar cita
				</button>
			</form>
		</section>
	)
}
FormularioCita.propTypes = {
	formulario: PropTypes.shape({
		cliente: PropTypes.string.isRequired,
		telefono: PropTypes.string.isRequired,
		servicioId: PropTypes.string.isRequired,
		barberoId: PropTypes.string.isRequired,
		fecha: PropTypes.string.isRequired,
		hora: PropTypes.string.isRequired,
		notas: PropTypes.string.isRequired,
	}).isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	servicios: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			nombre: PropTypes.string.isRequired,
		})
	).isRequired,
	barberos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			nombre: PropTypes.string.isRequired,
		})
	).isRequired,
}
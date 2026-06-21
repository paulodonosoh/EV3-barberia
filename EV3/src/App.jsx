import { useEffect, useState } from 'react'
import './App.css'
import Barberos, { barberos as barberosData } from './componentes/barberos.jsx'
import FormularioCita from './componentes/formularioCita.jsx'
import ListaCitas from './componentes/listaCitas.jsx'
import Servicios, { servicios as serviciosData } from './componentes/servicios.jsx'

const STORAGE_KEY = 'ev3-barberia-citas'

const crearCitaInicial = () => ({
  cliente: '',
  telefono: '',
  servicioId: serviciosData[0]?.id ?? '',
  barberoId: barberosData[0]?.id ?? '',
  fecha: '',
  hora: '',
  notas: '',
})

const citasIniciales = [
  {
    id: 1,
    cliente: 'Carlos M.',
    servicioId: 'corte-premium',
    barberoId: 'diego-torres',
    fecha: '2026-06-22',
    hora: '10:30',
    notas: 'Ajuste de degradado y acabado limpio',
    estado: 'Confirmada',
  },
  {
    id: 2,
    cliente: 'Andres L.',
    servicioId: 'combo-barba',
    barberoId: 'marco-leon',
    fecha: '2026-06-22',
    hora: '12:00',
    notas: 'Perfilado clasico y barba corta',
    estado: 'Pendiente',
  },
]

const seccionesNavegacion = [
  { id: 'inicio', etiqueta: 'Inicio' },
  { id: 'servicios', etiqueta: 'Servicios' },
  { id: 'barberos', etiqueta: 'Barberos' },
  { id: 'reserva', etiqueta: 'Reserva' },
  { id: 'citas', etiqueta: 'Citas' },
]

const convertirHoraAMinutos = (hora) => {
  const [horas, minutos] = hora.split(':').map(Number)
  return horas * 60 + minutos
}

const horaEstaDentroDelHorario = (hora, horarioInicio, horarioFin) => {
  const minutosHora = convertirHoraAMinutos(hora)
  return minutosHora >= convertirHoraAMinutos(horarioInicio) && minutosHora <= convertirHoraAMinutos(horarioFin)
}

const cargarCitasGuardadas = () => {
  if (globalThis.localStorage === undefined) {
    return citasIniciales
  }

  try {
    const citasGuardadas = globalThis.localStorage.getItem(STORAGE_KEY)

    if (!citasGuardadas) {
      return citasIniciales
    }

    const citasParseadas = JSON.parse(citasGuardadas)

    return Array.isArray(citasParseadas) ? citasParseadas : citasIniciales
  } catch {
    return citasIniciales
  }
}

function App() {
  const [formulario, setFormulario] = useState(crearCitaInicial)
  const [citas, setCitas] = useState(cargarCitasGuardadas)
  const [mensaje, setMensaje] = useState('Selecciona el servicio y registra una nueva cita.')

  useEffect(() => {
    try {
      globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(citas))
    } catch {
      // Ignorar errores de almacenamiento y seguir con el estado en memoria.
    }
  }, [citas])

  const servicioSeleccionado = serviciosData.find(
    (servicio) => servicio.id === formulario.servicioId,
  )
  const barberoSeleccionado = barberosData.find(
    (barbero) => barbero.id === formulario.barberoId,
  )

  const actualizarCampo = (campo, valor) => {
    setFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      [campo]: valor,
    }))
  }

  const manejarSeleccionServicio = (servicioId) => {
    actualizarCampo('servicioId', servicioId)
  }

  const manejarSeleccionBarbero = (barberoId) => {
    actualizarCampo('barberoId', barberoId)
  }

  const manejarSubmit = (evento) => {
    evento.preventDefault()

    if (!formulario.cliente || !formulario.fecha || !formulario.hora || !formulario.telefono) {
      setMensaje('Completa nombre, teléfono, fecha y hora para agendar la cita.')
      return
    }

    const regexTelefonoChileno = /^\+56\s?9?\d{8,9}$/

    if (!regexTelefonoChileno.test(formulario.telefono.replace(/\s/g, ''))) {
      setMensaje('El teléfono debe cumplir con el formato chileno (+569XXXXXXXX o +5629XXXXXXX).')
      return
    }

    if (
      barberoSeleccionado &&
      !horaEstaDentroDelHorario(
        formulario.hora,
        barberoSeleccionado.horarioInicio,
        barberoSeleccionado.horarioFin,
      )
    ) {
      setMensaje(
        `La hora debe estar dentro del horario de ${barberoSeleccionado.nombre} (${barberoSeleccionado.horarioInicio} - ${barberoSeleccionado.horarioFin}).`,
      )
      return
    }

    const nuevaCita = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
      ...formulario,
      estado: 'Confirmada',
    }

    setCitas((estadoAnterior) => [nuevaCita, ...estadoAnterior])
    setMensaje(`Cita agendada para ${formulario.cliente} el ${formulario.fecha} a las ${formulario.hora}.`)
    setFormulario(crearCitaInicial())
  }

  const cancelarCita = (citaId) => {
    setCitas((estadoAnterior) => estadoAnterior.filter((cita) => cita.id !== citaId))
  }

  return (
    <main className="app-shell">
      <nav className="topbar" aria-label="Navegacion principal">
        <a className="brand-mark" href="#inicio">
          Barberia EV3
        </a>

        <div className="topbar-links">
          {seccionesNavegacion.map((seccion) => (
            <a key={seccion.id} href={`#${seccion.id}`}>
              {seccion.etiqueta}
            </a>
          ))}
        </div>
      </nav>

      <section className="hero-panel" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Barberia EV3</p>
          <h1>Agenda de citas simple, clara y lista para crecer.</h1>
          <p className="hero-text">
            Organiza servicios, barberos y reservas en un solo panel. Esta base ya
            deja conectados los bloques principales de la aplicacion.
          </p>

          <div className="hero-stats">
            <article>
              <strong>{citas.length}</strong>
              <span>Citas registradas</span>
            </article>
            <article>
              <strong>{serviciosData.length}</strong>
              <span>Servicios disponibles</span>
            </article>
            <article>
              <strong>{barberosData.length}</strong>
              <span>Barberos activos</span>
            </article>
          </div>
        </div>

        <aside className="hero-summary">
          <p className="summary-label">Resumen actual</p>
          <h2>{mensaje}</h2>
          <div className="summary-grid">
            <div>
              <span>Servicio</span>
              <strong>{servicioSeleccionado?.nombre ?? 'Sin definir'}</strong>
            </div>
            <div>
              <span>Barbero</span>
              <strong>{barberoSeleccionado?.nombre ?? 'Sin definir'}</strong>
            </div>
            <div>
              <span>Duracion</span>
              <strong>{servicioSeleccionado?.duracion ?? '--'} min</strong>
            </div>
            <div>
              <span>Precio</span>
              <strong>{servicioSeleccionado?.precio ?? '--'}</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="content-grid">
        <Servicios
          id="servicios"
          servicios={serviciosData}
          servicioSeleccionadoId={formulario.servicioId}
          onSeleccionar={manejarSeleccionServicio}
        />

        <Barberos
          id="barberos"
          barberos={barberosData}
          barberoSeleccionadoId={formulario.barberoId}
          onSeleccionar={manejarSeleccionBarbero}
        />

        <FormularioCita
          id="reserva"
          formulario={formulario}
          onChange={actualizarCampo}
          onSubmit={manejarSubmit}
          servicios={serviciosData}
          barberos={barberosData}
        />

        <ListaCitas citas={citas} onCancelar={cancelarCita} />
      </section>
    </main>
  )
}

export default App

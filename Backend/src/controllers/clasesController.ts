  import { Request, Response } from 'express';
  import Clase from '../models/Clases';
  import Alumno from '../models/alumno';
  import Circuito from '../models/circuito';
  import { IAlumno } from '../models/alumno';
  import { ICircuito } from '../models/circuito'; 
  import { IClase } from '../models/Clases';
  import { IProfesor } from './../models/profesor';




  export const crearClase = async (req:Request, res: Response) => {
    try {

      // Extraer datos del cuerpo de la solicitud

      const { fecha, hora, alumno, estado, circuito, profesor } = req.body;
      console.log("Creando clase con datos:", { fecha, hora, alumno, estado, circuito, profesor });
       // Validar existencia del alumno

      const alumnoExiste = await Alumno.findById(alumno);
      if (!alumnoExiste) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }

      // Validar solapamiento (opcional)
      const claseExistente = await Clase.findOne({ fecha, hora });

      if (claseExistente) {
        return res.status(400).json({ error: 'Ya existe una clase ese día, en ese horario' });
      } 

      const nuevaClase = new Clase({ fecha, hora, alumno, estado, circuito, profesor });
      await nuevaClase.save();

      res.status(201).json(nuevaClase);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la clase' });
    }
  };

  export const getClases = async (req: Request, res: Response) => {
    try {
      const clases = await Clase.find()
        .populate('profesor')
        .populate('circuito')
        .populate('alumno');
      res.status(200).json(clases);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las clases', error });
    }
  };

  type ClasePoblada = IClase & {
  alumno: IAlumno;
  circuito?: ICircuito;
  profesor?: IProfesor;
};

  export const getClasesPorSemana = async (req: Request, res: Response) => {
    try {
      const { desde, hasta } = req.query;

      console.log("📅 Parámetros recibidos:", { desde, hasta });


      if (!desde || !hasta) {
        return res.status(400).json({ error: 'Faltan parámetros desde y hasta' });
      }

      const clasesPorSemana = await Clase.find({
  fecha: { $gte: desde, $lte: hasta }
})
  .populate({ path: 'alumno', select: 'nombre apellido' })
  .populate({ path: 'circuito', select: 'nombre' })
  .populate({ path: 'profesor', select: 'nombre' }) as ClasePoblada[];

    console.log("📅 Clases encontradas:", clasesPorSemana);

      const dias = [];

      const desdeDate = new Date(desde as string);
      const hastaDate = new Date(hasta as string);

      for (
        let d = new Date(desdeDate);
        d <= hastaDate;
        d.setDate(d.getDate() + 1)
      ) {
        const fechaStr = d.toISOString().slice(0, 10);
        console.log("📅 Procesando fecha:", fechaStr);

        const clasesDelDia = clasesPorSemana.filter(
          (clase) => clase.fecha === fechaStr
        );

        //El objeto día tiene dos propiedades: la fecha y una array con las clases.
        dias.push({
          date: new Date(fechaStr),
          classes: clasesDelDia.map((c) => ({
             id: c._id,
           time: c.hora,
          fecha: c.fecha,
       alumnoId: c.alumno?._id,
       alumnoName: c.alumno?.nombre || null,
     circuitoId: c.circuito?._id || null, //aca pedía _id pero lo cambié.
        circuit: typeof c.circuito === 'object' ? c.circuito.nombre : 'Sin circuito',
        student: c.alumno ? `${c.alumno.nombre}` : 'Sin alumno',
        estado: c.estado,
        profesor: c.profesor?.nombre || "sin nombre",
        profesorId: c.profesor?._id,
       
     }))        
        });
      }

      res.json({
        rango: { desde, hasta },
        dias
      });
    } catch (error) {
      console.error('Error al obtener clases por semana:', error);
      res.status(500).json({ error: 'Error al obtener clases por semana' });
    }
  };  

  export const editarClase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fecha, hora, alumno,  estado } = req.body;

    // Validar existencia de la clase
    const claseExistente = await Clase.findById(id);
    if (!claseExistente) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    // Validar existencia del alumno
    const alumnoExiste = await Alumno.findById(alumno);
    if (!alumnoExiste) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    //Validar existencia del circuito (si se envía)
    /*if (circuito) {
      const circuitoExiste = await Circuito.findById(circuito);
      if (!circuitoExiste) {
        return res.status(404).json({ error: 'Circuito no encontrado' });
      }
    }*/

    // Actualizar la clase
    claseExistente.fecha = fecha || claseExistente.fecha;
    claseExistente.hora = hora || claseExistente.hora;
    claseExistente.alumno = alumno || claseExistente.alumno;
   // claseExistente.circuito = circuito || claseExistente.circuito;
    claseExistente.estado = estado || claseExistente.estado;

    const claseActualizada = await claseExistente.save();

    // Poblamos para devolver datos completos
    const clasePoblada = await Clase.findById(claseActualizada._id)
      .populate({ path: 'alumno', select: 'nombre apellido' })
      .populate({ path: 'circuito', select: 'nombre' }) as ClasePoblada;

    res.status(200).json(clasePoblada);
  } catch (error) {
    console.error('Error al editar clase:', error);
    res.status(500).json({ error: 'Error al editar la clase' });
  }
};

  export const eliminarClase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validar existencia de la clase
    const claseExistente = await Clase.findById(id);
    if (!claseExistente) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    // Eliminar la clase
    await Clase.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar clase:', error);
    res.status(500).json({ error: 'Error al eliminar la clase' });
  }
};

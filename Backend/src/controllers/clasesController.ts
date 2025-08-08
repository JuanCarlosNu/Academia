  import { Request, Response } from 'express';
  import Clase from '../models/Clases';
  import Alumno from '../models/alumno';
  import Circuito from '../models/circuito';
  import { IAlumno } from '../models/alumno';
  import { ICircuito } from '../models/circuito'; 
  import { IClase } from '../models/Clases';
  import { IProfesor } from '../models/profesor';


  export const crearClase = async (req:Request, res: Response) => {
    try {
      const { fecha, hora, alumno, estado } = req.body;

      // Validar existencia del alumno

      const alumnoExiste = await Alumno.findById(alumno);
      if (!alumnoExiste) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }

      // Validar solapamiento (opcional)
      const claseExistente = await Clase.findOne({ fecha, hora, alumno });
      if (claseExistente) {
        return res.status(400).json({ error: 'Ya existe una clase para ese alumno en ese horario' });
      }

      const nuevaClase = new Clase({ fecha, hora, alumno, estado });
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
};

  export const getClasesPorSemana = async (req: Request, res: Response) => {
    try {
      const { desde, hasta } = req.query;

      if (!desde || !hasta) {
        return res.status(400).json({ error: 'Faltan parámetros desde y hasta' });
      }

      const clasesPorSemana = await Clase.find({
  fecha: { $gte: desde, $lte: hasta }
})
  .populate({ path: 'alumno', select: 'nombre apellido' })
  .populate({ path: 'circuito', select: 'nombre' }) as ClasePoblada[];



      const dias = [];

      const desdeDate = new Date(desde as string);
      const hastaDate = new Date(hasta as string);

      for (
        let d = new Date(desdeDate);
        d <= hastaDate;
        d.setDate(d.getDate() + 1)
      ) {
        const fechaStr = d.toISOString().slice(0, 10);

        const clasesDelDia = clasesPorSemana.filter(
          (clase) => clase.fecha === fechaStr
        );

        dias.push({
          date: new Date(fechaStr),
          classes: clasesDelDia.map((c) => ({
            id: c._id,
            time: c.hora,
            circuit: c.circuito?.nombre || 'Sin circuito',
            student: `${c.alumno?.nombre} ${c.alumno?.apellido}` || 'Sin alumno',
            estado: c.estado
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


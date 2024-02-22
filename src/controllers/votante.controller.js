import Votante from "../models/Votante.js";

export const createPVOtante = async (req, res) => {
  const { nombre, domicilio, sexo, fechaNacimiento, claveElector, Registro, curp, estado, localidad, municipio, seccion, emision, vigencia, preguntaUno, preguntaDos, PreguntaTres, voto } = req.body;

  try {
    const newVotante = new Votante({
      nombre, domicilio, sexo, fechaNacimiento, claveElector, Registro, curp, estado, localidad, municipio, seccion, emision, vigencia, preguntaUno, preguntaDos, PreguntaTres, voto
    });

    const VotanteSaved = await newVotante.save();

    res.status(201).json(VotanteSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getVotanteById = async (req, res) => {
  const { VotanteId } = req.params;

  const Votante = await Votante.findById(VotanteId);
  res.status(200).json(Votante);
};

export const getVotantes = async (req, res) => {
  const Votantes = await Votante.find();
  return res.json(Votantes);
};

export const updateVotanteById = async (req, res) => {
  const updatedVotante = await Votante.findByIdAndUpdate(
    req.params.VotanteId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedVotante);
};

export const deleteVotanteById = async (req, res) => {
  const { VotanteId } = req.params;

  await Votante.findByIdAndDelete(VotanteId);

  // code 200 is ok too
  res.status(204).json();
};

import Cliente from "../models/cliente.js";

export const buscarClientes = async (req, res) => {
    try {
        const q = req.query.q || "";
        
        const clientes = await Cliente.find({
            $or: [
                { nombre: { $regex: q, $options: "i" }},
                { cc: { $regex: q, $options: "i" }},
                { email: { $regex: q, $options: "i" }},
                { telefono: { $regex: q, $options: "i" }},
            ]
        }).limit(20);

        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar clientes"});
    }
};

export const crearCliente = async (req, res) => {
    try {
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: "Error al crear cliente"});
    }
};

export const obtenerCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        res.json(cliente);
    } catch (error) {
        res.status(500).json( {error: "Cliente no encontrado"});
    }
};
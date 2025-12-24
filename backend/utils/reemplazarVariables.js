export default function reemplazarVariables(texto, cliente) {
  if (!cliente) return texto;

  return texto
    .replace(/{{nombre}}/g, cliente.nombre)
    .replace(/{{cc}}/g, cliente.cc)
    .replace(/{{telefono}}/g, cliente.telefono || "")
    .replace(/{{direccion}}/g, cliente.direccion || "")
    .replace(/{{email}}/g, cliente.email || "");
}

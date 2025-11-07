import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } from './env.js';

export async function obtenerProductos() {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
    });

    const data = await response.json();
    console.log("Respuesta Airtable:", data);
    
    return data.records.map(record => {
      const f = record.fields;
      return {
        id: record.id,
        nombre: f['Nombre-producto'] || 'Sin nombre',
        descripcion: f['Descripcion'] || 'Sin descripción',
        imagen: f.imagen?.[0]?.url || 'https://via.placeholder.com/300x300.png?text=Sin+Imagen',
        precio: f['Precio'] || 0,
      };

    });

  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

// api.js
const AIRTABLE_API_KEY = "pat4gX2qoL4gmFOVq.def11c80ce07fae5085477047e1bce2c1c181a9adf4cebf84232146287d1f0fc";
const AIRTABLE_BASE_ID = "appMU7tXjFzWPHHmN";
const AIRTABLE_TABLE_NAME = "productos";

const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

export async function obtenerProductos() {
    try {
        const response = await fetch(airtableUrl, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error de la API: ${response.statusText}`);
        }

        const data = await response.json();

        return data.records.map(record => {
            const fields = record.fields;
            return {
                id: record.id,
                nombre: fields['Nombre-producto'] || 'Sin nombre',
                precio: fields.Precio || 0,
                imagen: fields.imagen && fields.imagen.length > 0
                    ? fields.imagen[0].url
                    : 'https://via.placeholder.com/300x300.png?text=Sin+Imagen'
            };
        });
    } catch (error) {
        console.error("No se pudieron cargar los productos:", error);
        return [];
    }
}

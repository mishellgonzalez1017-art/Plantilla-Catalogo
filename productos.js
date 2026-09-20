import comida from './productos/comida.js';
import ropa from './productos/Ropa.js';
import accesorios from './productos/accesorios.js';

export const catalogo = [...comida, ...ropa, ...accesorios];

// Mantiene los nombres que usa la interfaz para no acoplarla a la estructura de datos.
export const products = catalogo.map(producto => ({
  ...producto,
  name: producto.nombre,
  price: producto.precio,
  image: producto.imagen,
  brand: producto.categoria
}));

export default products;

// ============================================================
// CATÁLOGO DE DEMOSTRACIÓN — "lo que ofrezco"
// Cada tarjeta es un plan o un ejemplo de catálogo por rubro.
// Edita este archivo para cambiar precios, textos o imágenes.
// ============================================================
export const catalogos = [
  // ---------------- PLANES ----------------
  {
    id: '#P01',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    titulo: 'Plan Básico',
    precio: 'Desde Q450',
    cat: 'Planes',
    tag: '',
    resumen: 'Catálogo digital simple, listo para vender por WhatsApp.',
    features: [
      'Hasta 20 productos con foto, precio y código',
      'Buscador y filtros por categoría',
      'Botón de pedido directo a WhatsApp',
      'Diseño responsive (celular, tablet, PC)',
      'Entrega en 3 días hábiles'
    ]
  },
  {
    id: '#P02',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    titulo: 'Plan Plus',
    precio: 'Desde Q750',
    cat: 'Planes',
    tag: 'Más pedido',
    resumen: 'Todo lo del Básico + experiencia visual interactiva.',
    features: [
      'Hasta 60 productos, sin límite de categorías',
      'Tarjetas con efecto 3D y animaciones al navegar',
      'Música ambiental de fondo (opcional)',
      'Carrito de selección con pedido armado a WhatsApp',
      'Conexión con tu dominio propio',
      'Entrega en 5 días hábiles + 2 rondas de cambios'
    ]
  },
  {
    id: '#P03',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    titulo: 'Plan Premium',
    precio: 'Desde Q1,200',
    cat: 'Planes',
    tag: 'Todo incluido',
    resumen: 'La experiencia completa: intro cinematográfica y a tu medida.',
    features: [
      'Productos ilimitados y categorías ilimitadas',
      'Intro 3D animada con tu marca (como esta página)',
      'Identidad visual, colores y tipografía a tu medida',
      'SEO básico para aparecer en Google',
      'Soporte y ajustes durante 30 días después de la entrega'
    ]
  },

  // ---------------- PORTAFOLIO POR RUBRO ----------------
  {
    id: '#R01',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    titulo: 'Boutique de Moda',
    precio: 'Ejemplo de rubro',
    cat: 'Moda',
    tag: '',
    resumen: 'Catálogos para tiendas de ropa y accesorios.',
    features: [
      'Fichas con talla, color y disponibilidad',
      'Filtros por tipo de prenda',
      'Ideal para ventas por Instagram y WhatsApp',
      'Fotos con encuadre uniforme automático'
    ]
  },
  {
    id: '#R02',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    titulo: 'Restaurantes y Cafés',
    precio: 'Ejemplo de rubro',
    cat: 'Comida',
    tag: '',
    resumen: 'Menús digitales que se ven y se piden como catálogo.',
    features: [
      'Menú organizado por secciones (entradas, fuertes, bebidas)',
      'Precios y promociones del día siempre actualizados',
      'Pedido directo a WhatsApp con el detalle completo',
      'Código QR para poner en tus mesas'
    ]
  },
  {
    id: '#R03',
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    titulo: 'Belleza y Estética',
    precio: 'Ejemplo de rubro',
    cat: 'Belleza',
    tag: '',
    resumen: 'Vitrina de servicios y productos para tu salón o spa.',
    features: [
      'Catálogo de servicios con precio y duración',
      'Botón para agendar cita por WhatsApp',
      'Sección de productos para llevar a casa',
      'Diseño elegante que transmite confianza'
    ]
  },
  {
    id: '#R04',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    titulo: 'Servicios Locales',
    precio: 'Ejemplo de rubro',
    cat: 'Servicios',
    tag: '',
    resumen: 'Para plomeros, electricistas, talleres y freelancers.',
    features: [
      'Lista de servicios con precio estimado',
      'Formulario de contacto y reserva de citas',
      'Galería de trabajos anteriores',
      'Testimonios de clientes'
    ]
  },
  {
    id: '#R05',
    img: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    titulo: 'Artesanías y Regalos',
    precio: 'Ejemplo de rubro',
    cat: 'Artesanías',
    tag: '',
    resumen: 'Resalta piezas hechas a mano y su historia.',
    features: [
      'Espacio para contar el origen de cada pieza',
      'Piezas únicas marcadas como "Solo queda 1"',
      'Coordinación de envíos por WhatsApp',
      'Ideal para ferias y temporada de regalos'
    ]
  }
];

export default catalogos;

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
    precio: 'Q450 pago único + Q100/mes',
    pagoInicial: 450,
    mensualidad: 100,
    limiteActualizaciones: 15,
    costoExtraActualizacion: 5,
    cat: 'Planes',
    tag: '',
    resumen: 'Catálogo digital simple, listo para vender por WhatsApp. El pago inicial es único. Después solo se cobra la mensualidad de mantenimiento del catálogo.',
    notaPrecio: 'El pago inicial es único. Después solo se cobra la mensualidad de mantenimiento del catálogo.',
    features: [
      'Creación y personalización del catálogo con su propio dominio',
      'Hasta 50 productos con foto, precio y código ID',
      'Buscador y filtro por categoría',
      'Botón de pedido directo a WhatsApp',
      'Diseño responsive (celular, tablet y PC)',
      '15 actualizaciones al mes (producto nuevo, foto, precio o eliminar producto)',
      'Cualquier actualización que pase de las 15 al mes tiene un costo extra de Q5 c/u'
    ]
  },
  {
    id: '#P02',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    titulo: 'Plan Plus',
    precio: 'Q750 pago único + Q150/mes',
    pagoInicial: 750,
    mensualidad: 150,
    limiteActualizaciones: 50,
    costoExtraActualizacion: 5,
    cat: 'Planes',
    tag: 'Más pedido',
    resumen: 'Todo lo del Básico + experiencia visual interactiva. El pago inicial es único. Después solo se cobra la mensualidad de mantenimiento del catálogo.',
    notaPrecio: 'El pago inicial es único. Después solo se cobra la mensualidad de mantenimiento del catálogo.',
    features: [
      'Creación y personalización del catálogo con su propio dominio',
      'Intro 3D con experiencia visual interactiva',
      'Hasta 125 productos con foto, precio y código ID',
      'Íconos que redirigen a sus plataformas (TikTok, Facebook, Instagram)',
      'Buscador y filtro por categoría',
      'Botón de pedido directo a WhatsApp',
      'Diseño responsive (celular, tablet y PC)',
      '50 actualizaciones al mes (producto nuevo, foto, precio o eliminar producto)',
      'Cualquier actualización que pase de las 50 al mes tiene un costo extra de Q5 c/u'
    ]
  },
  {
    id: '#P03',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    titulo: 'Plan Premium',
    precio: 'Q1,000 pago único + Q200/mes',
    pagoInicial: 1000,
    mensualidad: 200,
    limiteActualizaciones: 200,
    costoExtraActualizacion: 5,
    cat: 'Planes',
    tag: 'Todo incluido',
    resumen: 'La experiencia completa: intro cinematográfica y a tu medida. El pago inicial es único. Después solo se cobra la mensualidad de mantenimiento del catálogo.',
    notaPrecio: 'El pago inicial es único. Después solo se cobra la mensualidad de mantenimiento del catálogo.',
    features: [
      'Creación y personalización del catálogo con su propio dominio',
      'Intro 3D con experiencia visual interactiva',
      'Hasta 200 productos con foto, precio y código ID',
      'Íconos que redirigen a sus plataformas (TikTok, Facebook, Instagram)',
      'Bio link interactivo propio para sus diferentes plataformas',
      'Buscador y filtro por categoría',
      'Botón de pedido directo a WhatsApp',
      'Diseño responsive (celular, tablet y PC)',
      '200 actualizaciones al mes (producto nuevo, foto, precio o eliminar producto)',
      'Cualquier actualización que pase de las 200 al mes tiene un costo extra de Q5 c/u'
    ]
  },

  // ---------------- PORTAFOLIO POR RUBRO ----------------
  {
    id: '#R01',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    titulo: 'Boutique de Moda',
    precio: 'Ejemplo de rubro',
    pagoInicial: 0,
    mensualidad: 0,
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
    pagoInicial: 0,
    mensualidad: 0,
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
    pagoInicial: 0,
    mensualidad: 0,
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
    pagoInicial: 0,
    mensualidad: 0,
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
    pagoInicial: 0,
    mensualidad: 0,
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

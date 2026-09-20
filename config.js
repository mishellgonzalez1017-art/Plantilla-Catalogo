// ============================================================
// CONFIGURACIÓN DEL NEGOCIO
// Este es el ÚNICO archivo que hay que tocar para personalizar
// la plantilla para un cliente nuevo: nombre, WhatsApp y redes.
// ============================================================
export const config = {
  businessName: 'Catálogo Guatemala',

  // Número en formato internacional sin "+" ni espacios (502 = Guatemala)
  whatsappNumber: '50240283552',

  // Mensajes que se envían por WhatsApp según dónde haga clic el visitante
  whatsappMessages: {
    general: '¡Hola! Me interesa obtener información sobre las plantillas para catálogos web para mi negocio.',
    header: '¡Hola! Deseo información sobre las plantillas para catálogos web',
    hero: '¡Hola! Me interesa adquirir una plantilla de catálogo web para mi negocio.',
    closing: '¡Hola! Deseo cotizar la plantilla del catálogo web para mi negocio en Guatemala.',
    floating: '¡Hola! Vi la plantilla del catálogo y me interesa adaptar una similar para mi negocio en Guatemala.'
  },

  // Redes sociales del negocio. Deja '' en cualquiera para ocultar ese botón.
  social: {
    facebook: 'https://facebook.com/tunegocio',
    instagram: 'https://instagram.com/tunegocio',
    tiktok: 'https://tiktok.com/@tunegocio'
  }
};

export default config;

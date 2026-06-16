import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// 1. Conectamos con Supabase usando la clave de Superusuario
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// 2. FUNCIÓN SIMULADA: Imagina que esto es lo que recolectamos raspando webs de tendencias
function obtenerDatosSuciosDeInternet() {
  return `
    REPORTE DE HOY TIKTOK / INSTAGRAM:
    - Se está escuchando muchísimo un audio llamado 'Synthwave Midnight' del creador @retro_vibes, subió un 400% en las últimas horas en el nicho de tecnología y setup gaming, es un fuego total.
    - Hay un reto de cocina dando vueltas: 'El plato misterioso', la competencia es baja porque requiere edición. Consiste en cocinar con los ojos vendados y la guía es mostrar primero el desastre divertido y luego cómo quedó.
    - Tip de enganche para creadores de emprendimiento: Usar la frase inicial 'Esta herramienta de IA se siente ilegal saberla...' para retener audiencias interesadas en conceptos de productividad.
  `;
}

// 3. FUNCIÓN CEREBRO: Le pide a la IA que estructure el desastre de texto en JSON limpio
async function procesarDatosConIA(textoBruto) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("❌ Falta la GEMINI_API_KEY en el archivo .env");
    return null;
  }

  console.log("🤖 Enviando datos brutos a Gemini (Gratis)...");

  const prompt = `
    Analiza el siguiente texto bruto de tendencias y clasifícalo estrictamente en un objeto JSON con tres arreglos: 'audios', 'retos' y 'hooks'.
    Debes responder ÚNICAMENTE el objeto JSON puro, sin textos extras ni formato markdown (sin \`\`\`json).
    
    Campos:
    - Para audios: title, artist, platform, category, growth, isHot (boolean)
    - Para retos: title, competition (Bajo/Medio/Alto), platform, category, guide
    - Para hooks: text, concept, platform, category

    Texto: ${textoBruto}
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    // 🔍 LÍNEA DE ESPIONAJE: Si la respuesta no es la esperada, imprimimos el porqué
    if (data.error) {
      console.log("❌ Error oficial de Google Gemini:");
      console.dir(data.error, { depth: null });
      return null;
    }

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      console.log("❌ Respuesta extraña de la IA (sin candidatos):", JSON.stringify(data, null, 2));
      return null;
    }

    const textoJson = data.candidates[0].content.parts[0].text;
    return JSON.parse(textoJson);
  } catch (error) {
    console.error("❌ Error al procesar el flujo de la IA:", error);
    return null;
  }
}

// 4. FUNCIÓN DESTINO: Sube todo ordenado a Supabase
async function ejecutarPipeline() {
  console.log("🚀 Iniciando Pipeline Automatizado...");
  
  // Paso A: Recolectar datos
  const datosSucios = obtenerDatosSuciosDeInternet();
  
  // Paso B: Procesar con IA
  const datosLimpios = await procesarDatosConIA(datosSucios);
  
  if (!datosLimpios) return;

  console.log("✨ IA ha estructurado los datos perfectamente:", JSON.stringify(datosLimpios, null, 2));

  // Paso C: Inyectar en Supabase
  console.log("💾 Guardando en la base de datos de Supabase...");
  
  if (datosLimpios.audios?.length > 0) {
    await supabase.from('audios').insert(datosLimpios.audios);
  }
  if (datosLimpios.retos?.length > 0) {
    await supabase.from('retos').insert(datosLimpios.retos);
  }
  if (datosLimpios.hooks?.length > 0) {
    await supabase.from('hooks').insert(datosLimpios.hooks);
  }

  console.log("🎉 ¡Base de datos actualizada con éxito mediante IA!");
}

// Ejecutamos el proceso completo
ejecutarPipeline();
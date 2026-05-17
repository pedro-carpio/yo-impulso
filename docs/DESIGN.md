# Ecoimpulso — Style Reference
> Rumbo a una Llajta sostenible — un lienzo orgánico y comunitario estructurado sobre bloques de formas fluidas, trazos de carácter artesanal y una paleta botánica, donde la tipografía humanista y los acentos de la biodiversidad local guían la experiencia.

**Theme:** light

Ecoimpulso opera sobre un lienzo verde de tono musgo pastel muy claro con curvas pronunciadas —tarjetas de 36px y contenedores en forma de pastilla dominan cada superficie, creando una tensión suave y cercana frente a los rellenos muy oscuros `#11221a` utilizados para las acciones primarias. La escala de neutros es de matiz botánico y terroso (humus a blanco), pero solo aparecen 3-4 pasos en una sola vista, manteniendo el contraste alto sin complejidad. El ecosistema se define a través de su tipografía: Fredoka en peso Light (300) se encarga de dar fluidez y legibilidad a los textos normales y descripciones, mientras que su variante Medium (500) jerarquiza todos los encabezados del sistema. Para los elementos y textos de máxima importancia, la fuente Pulang introduce un carácter artesanal y asertivo único. El color de acento está casi ausente de la capa de la UI: el vibrante naranja picaflor (`#ff6b35`) aflora solo en etiquetas de la campaña de impacto, y el terracota vasija (`#d97706`) es un lavado decorativo único en tarjetas —la moderación del sistema hace que estos momentos resalten con más fuerza.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Humus | `#11221a` | `--color-humus` | Fondos de botones primarios compactos, texto de títulos en superficies claras —el tono oscuro de anclaje del sistema, un verde-negro orgánico |
| Bosque Profundo | `#1a3528` | `--color-bosque` | Texto de cuerpo, texto de navegación, texto de insignias en superficies claras —un tono más claro que Humus, usado para lectura fluida |
| Verde Monte | `#2a6f54` | `--color-verde-monte` | Bordes de botones, fondos de insignias (variante oscura), trazos de contorno en componentes —el tono de borde dominante de la UI |
| Turquesa Eco | `#2ba891` | `--color-turquesa-eco` | Fondos de tarjetas medianas en secciones oscuras, rellenos sutiles de iconos ecológicos |
| Azul Cerámica | `#3d5a71` | `--color-azul-ceramica` | Copia de cuerpo silenciada, etiquetas de texto auxiliar como subtítulos de estadísticas institucionales |
| Musgo Suave | `#a3c6b4` | `--color-musgo-suave` | Variantes de títulos atenuados, texto de marcador de posición, trazos de reglas decorativas |
| Hoja Seca | `#c2d1c6` | `--color-hoja-seca` | Divisores de línea delgada, fondos de enlaces inactivos, borde visible más claro en tarjetas blancas |
| Brote | `#e2ede7` | `--color-brote` | Fondos de tarjetas (variante media), bordes de insignias, divisores de sección —el segundo paso de superficie sobre el lienzo |
| Brisa | `#f2f7f4` | `--color-brisa` | Canvas de la página, fondos de tarjetas claras, superficie de hover para etiquetas —el tono de fondo dominante |
| Blanco Puro | `#ffffff` | `--color-blanco` | Superficies de tarjetas blancas, fondos de inputs, relleno de botones para la variante con contorno —la superficie más brillante |
| Naranja Picaflor | `#ff6b35` | `--color-naranja-picaflor` | Fondos de insignias de la campaña de impacto —el naranja vibrante señala hitos de concientización circular, aparece solo en etiquetas pequeñas |
| Terracota Vasija | `#d97706` | `--color-terracota-vasija` | Acento decorativo de lavado de tarjeta —un solo uso de terracota en un fondo de tarjeta grande para puntuar la cuadrícula de soluciones |

## Tokens — Typography

### Fredoka — La fuente principal para la lectura y la estructura general del sitio, aportando un tono amigable y accesible sin perder claridad técnica. · `--font-fredoka`
- **Substitute:** Quicksand, Comfortaa
- **Weights:** 300 (Light), 500 (Medium)
- **Sizes:** 10px, 12px, 13px, 14px, 16px, 18px, 20px, 32px, 40px
- **Line height:** 1.25–1.8 (más ajustada en encabezados medianos, más holgada en bloques de lectura normales)
- **Letter spacing:** normal en todos los tamaños
- **Role:** Controla toda la experiencia de lectura regular y los niveles de títulos intermedios. Su peso Light (300) se aplica rigurosamente en textos normales, párrafos de cuerpo, pies de foto e inputs. Su peso Medium (500) se utiliza de manera exclusiva para todos los encabezados, subtítulos de secciones y etiquetas de navegación estructuradas.

### Pulang — Reservada estrictamente para textos importantes, llamados de alto impacto y grandes contenedores de identidad visual. · `--font-pulang`
- **Substitute:** Local Display Font, Uncial Antiqua
- **Weights:** 400 (Regular / Display)
- **Sizes:** 56px, 64px
- **Line height:** 1.0–1.12
- **Letter spacing:** normal o sutilmente compacto para propósitos de visualización
- **Role:** Actúa como el anclaje expresivo y artesanal del sistema. Se aplica únicamente en textos importantes de gran escala, como los grandes titulares de pantalla (display) en el Hero, números de estadísticas críticas de impacto y mensajes destacados del manifiesto institucional que requieran la máxima jerarquía visual.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Font Family & Weight | Token |
|------|------|-------------|----------------|----------------------|-------|
| caption | 10px | 1.8 | — | Fredoka Light (300) | `--text-caption` |
| body | 14px | 1.56 | — | Fredoka Light (300) | `--text-body` |
| body-lg | 16px | 1.5 | — | Fredoka Light (300) | `--text-body-lg` |
| subheading | 18px | 1.45 | — | Fredoka Medium (500) | `--text-subheading` |
| heading-sm | 20px | 1.35 | — | Fredoka Medium (500) | `--text-heading-sm` |
| heading | 32px | 1.28 | — | Fredoka Medium (500) | `--text-heading` |
| heading-lg | 40px | 1.25 | — | Fredoka Medium (500) | `--text-heading-lg` |
| display-sm | 56px | 1.12 | — | Pulang Regular (400) | `--text-display-sm` |
| display | 64px | 1 | — | Pulang Regular (400) | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** balanced

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 28 | 28px | `--spacing-28` |
| 32 | 32px | `--spacing-32` |
| 36 | 36px | `--spacing-36` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 68 | 68px | `--spacing-68` |
| 80 | 80px | `--spacing-80` |
| 120 | 120px | `--spacing-120` |

### Border Radius

| Element | Value |
|---------|-------|
| hero | 48px |
| pill | 10000px |
| cards | 36px (primario) o 28px (compacto) |
| icons | 40px |
| badges | 12px |
| inputs | 14px |
| buttons | 36px (pastilla) o 14-16px (rectángulo redondeado) |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| subtle | `rgba(255, 255, 255, 0.6) 0px 0.5px 0px 0px inset, rgba(163...` | `--shadow-subtle` |
| subtle-2 | `rgb(226, 237, 231) 0px 1px 0px 0px inset` | `--shadow-subtle-2` |
| subtle-3 | `rgb(255, 255, 255) 0px 0.5px 0px 0px inset` | `--shadow-subtle-3` |
| subtle-4 | `rgb(255, 255, 255) 0px -0.5px 0px 0px` | `--shadow-subtle-4` |
| subtle-5 | `rgb(226, 237, 231) 0px -1px 0px 0px` | `--shadow-subtle-5` |
| md | `rgba(17, 34, 26, 0.03) 0px 4px 12px 0px` | `--shadow-md` |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 80px
- **Card padding:** 24-28px
- **Element gap:** 8px

## Components

### Primary Pill Button
**Role:** CTA principal de la página — Iniciar diagnóstico, Descargar guía, Ver emprendimientos

Fondo #11221a, texto blanco, Fredoka 14–16px peso 500 (Medium) para un marcado de control legible, border-radius 36px, padding 12px 16px, anillo de 1.5px en rgb(42,54,48) con un resaltado interior aplicado en capas y una suave sombra paralela. La sombra multicapa le otorga a la pastilla oscura una cualidad orgánica troquelada y táctil, única de este manual artesanal.

### Outlined White Button
**Role:** Acciones secundarias, controles adyacentes a la navegación

Fondo #ffffff, texto #2a6f54, borde 1px sólido #2a6f54, border-radius 36px, padding 20px. Misma silueta de pastilla que el primario pero con fuente Fredoka Medium (500) —el relleno blanco contra el borde orgánico se lee como un elemento limpio sobre fondos claros.

### Rounded Dark Button
**Role:** Acciones integradas en el contexto dentro de paneles de tarjetas oscuras

Fondo #11221a, texto blanco, borde 1px sólido rgba(255,255,255,0.2), border-radius 14–16px, padding 12–14px 16–18px con Fredoka Medium (500). El radio más suave (no en pastilla) distingue las acciones incrustadas en los paneles de los CTA principales a nivel de página.

### Light Surface Card
**Role:** Bloques de herramientas, secciones de características, casos de éxito en el lienzo claro

Fondo #ffffff, border-radius 36px, padding de 28px horizontal y vertical, sin sombra paralela (plano). El contenido normal interior se distribuye usando Fredoka Light (300). El radio extremo de 36px hace que los rectángulos blancos se perciban como contenedores fluidos y amigables similares a nubes informativas.

### Muted Surface Card
**Role:** Bloques de contenido secundario y filas de marcos metodológicos de las 10R

Fondo #e2ede7, border-radius 28px, padding de 24px en todos los lados, sin sombra. Textos complementarios estructurados limpiamente con Fredoka Light (300). Un radio ligeramente más pequeño y un relleno botánico más oscuro que las tarjetas blancas crean un paso silencioso de profundidad sin elevación artificial.

### Dark Problem Panel
**Role:** Sección de contraste que detalla los puntos críticos del ecosistema (ej. Sección "Fronteras planetarias")

Fondo #11221a o #1a3528, border-radius 28–36px, texto blanco y #a3c6b4. Las frases e ideas de máxima relevancia e importancia dentro del panel adoptan la fuente Pulang, mientras que las explicaciones introductorias o secundarias se asientan sobre Fredoka Light (300).

### Portfolio Tile Card
**Role:** Cuadrícula de vitrina de soluciones —imagen a sangre completa con insignias de categoría superpuestas

El fondo es la imagen del emprendimiento verde o un relleno de acento vibrante (`#d97706` para mosaicos decorativos). El radio de borde de 36px recorta la imagen. Las etiquetas flotan sobre la imagen abajo a la izquierda; los títulos destacados del proyecto adoptan Fredoka Medium (500) para integrarse visualmente.

### Dark Overlay Badge
**Role:** Etiquetas de categoría/habilidad sobre fondos oscuros o de imágenes de proyectos

Fondo transparente, texto #ffffff, borde 1px sólido rgba(255,255,255,0.3–0.5), border-radius 12px, padding 4px 8px, Fredoka Medium (500) a 12px para mantener nítido el texto en dimensiones compactas.

### Dark Filled Badge
**Role:** Etiquetas de técnicas/insumos en fondos claros de actividades

Fondo #2a6f54, text #ffffff, border-radius 12px, padding 4px 8px, Fredoka Medium (500) a 12px.

### Ember Badge (YC Marker)
**Role:** Identificador de la campaña corporativa "Toma Impulso" en tarjetas y sellos verdes

Fondo #ff6b35, texto #ffffff, border-radius 12px, padding 4px 8px. Al denotar un estatus de alta relevancia, utiliza la tipografía Pulang a 12px para acentuar el carácter de texto importante. Su uso es exclusivo para marcas de la campaña institucional —nunca se reutiliza para estados genéricos.

### Email Input + CTA Row
**Role:** Captura de correo en la sección de apertura (Hero)

Input: fondo #ffffff, texto #1a3528, borde transparente, border-radius 14px, padding 12px 12px 12px 16px, utilizando Fredoka Light (300) a 14px, texto de marcador de posición en #a3c6b4. Emparejado en línea con un Botón EcoImpulso Primario en una fila flex.

### Announcement Banner
**Role:** Franja de notificación de ancho completo sobre la navegación para alertas ambientales

Fondo #1a3528 o verde-negro cercano, forma de pastilla rectangular redondeada con radio de borde de 48px, texto blanco estructurado en Fredoka Medium (500) a 14px, con un enlace CTA fantasma en línea a la derecha. Utiliza un filtro de desenfoque de fondo para un tratamiento oscuro y limpio.

### Stat Number Block
**Role:** Destacados numéricos cuantitativos de enverdecimiento (ej. 65% agua, 0 Residuos)

Al tratarse de textos de máxima importancia cuantitativa, el número grande a 40–56px se despliega con la tipografía Pulang en tono #11221a o #1a3528. La etiqueta descriptiva situada debajo se compone a 12–14px en Fredoka Light (300) color #3d5a71. Sin borde de tarjeta —se asienta directamente sobre el fondo de la sección para un énfasis tipográfico limpio.

## Do's and Don'ts

### Do
- Usa la fuente Fredoka en su peso Light (300) de manera estricta para todos los textos normales, párrafos y bloques extensos de lectura para conservar el carácter cercano y limpio de la UI.
- Aplica Fredoka en peso Medium (500) para todos los encabezados intermedios, títulos de tarjetas y elementos de navegación, garantizando un salto estructural claro.
- Reserva la tipografía Pulang exclusivamente para textos importantes de gran escala: títulos display de apertura, números de impacto y mensajes clave del manifiesto.
- Usa un radio de borde de 36px para todas las tarjetas principales y vitrinas de proyectos —este redondeado extremo es el rasgo estructural más reconocible de la interfaz natural.
- Aplica la sombra de botón multicapa (rgba(255,255,255,0.6) inset + anillo de 1.5px + sombra suave) solo en el botón primario pastilla `#11221a` —define la calidez y cercanía de la acción.
- Reserva el Naranja Picaflor (`#ff6b35`) exclusivamente para insignias de la campaña de impacto y el Terracota Vasija (`#d97706`) exclusivamente para lavados decorativos de tarjetas —estos acentos derivan su poder de su escasez.

### Don't
- No utilices la fuente Pulang en textos de cuerpo, descripciones largas o campos de entrada; su naturaleza está restringida únicamente a acentos y textos importantes de exhibición.
- No alteres los pesos tipográficos de Fredoka: evita usar variantes pesadas (bold) para textos normales, ya que el peso Light (300) es el estándar de lectura del sistema.
- No mezcles Fredoka y Pulang dentro de la misma palabra o etiqueta compacta; la separación jerárquica entre texto normal, encabezado y texto importante debe ser absoluta.
- No uses ningún color que no sea `#11221a` o `#1a3528` para fondos de botones llenos —el sistema no tiene un botón de acción cromático brillante; el relleno oscuro + texto blanco es el único patrón de acción primaria.
- No reduzcas el radio de borde de las tarjetas por debajo de 28px —los radios más pequeños rompen el lenguaje fluido y orgánico y hacen que las superficies se lean como rectángulos corporativos rígidos.
- No apliques sombras paralelas difusas o tecnológicas a las tarjetas —la profundidad se expresa a través de los pasos de color de fondo (`#ffffff` frente a `#e2ede7` frente a `#11221a`), no mediante sombras artificiales.
- No coloques bloques de texto directamente sobre el fondo decorativo Terracota Vasija (`#d97706`) en tamaño de cuerpo —es un lavado ornamental; cualquier texto superpuesto debe usar pesos de pantalla en blanco puro.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 1 | Canvas | `#f2f7f4` | Fondo de la página y relleno de sección predeterminado (Brisa) |
| 2 | Bloque Blanco | `#ffffff` | Superficie de tarjeta primaria en el lienzo claro para dinámicas |
| 3 | Bloque Brote | `#e2ede7` | Superficie de tarjeta secundaria o de etiquetas, sensación sutil de capa botánica |
| 4 | Panel Humus | `#11221a` | Secciones oscuras de diagnóstico, botones primarios y manifiestos de impacto |

## Elevation

- **Primary Action Button:** `rgba(255,255,255,0.6) 0px 0.5px 0px 0px inset, rgba(163,198,180,0.2) 0px 9px 14px -5px inset, rgb(42,54,48) 0px 0px 0px 1.5px, rgba(17,34,26,0.05) 0px 4px 6px 0px`
- **Card (inset bottom border):** `rgb(226,237,231) 0px 1px 0px 0px inset`
- **Card (subtle drop shadow):** `rgba(17,34,26,0.03) 0px 4px 12px 0px`

## Imagery

Ecoimpulso utiliza imágenes genuinas y recortadas de productos sustentables locales, procesos circulares y texturas naturales (papel reciclado, fibras botánicas, cerámica artesanal) como rellenos de los mosaicos de proyectos —el trabajo real y tangible es el protagonista visual, descartando fotos de stock corporativas o modelos artificiales. Las tarjetas recortan las imágenes con un radio de 36px, otorgando a las capturas de procesos locales un acabado integrado y curado dentro del lienzo. Los mosaicos informativos alternativos emplean ilustraciones vectoriales limpias de trazos definidos inspiradas en la biodiversidad de la región (como picaflores y vasijas de barro tradicionales). Los iconos del sistema son lineales, monócromos, de un solo trazo en `#11221a` a ~20px, integrándose orgánicamente en el texto sin adornar de más. La composición global es tipográficamente dominante en secciones informativas y de lienzos interactivos —aproximadamente 60% texto, 40% imágenes y gráficos.

## Layout

Ancho máximo de aproximadamente 1200px, centrado en el canvas Brisa (`#f2f7f4`). El Hero Section se plantea en dos columnas: un gran titular de texto importante a la izquierda utilizando la tipografía Pulang (56–64px) en color `#11221a` para marcar un impacto contundente, acompañado de conceptos clave en color `Verde Monte`. La columna derecha compacta integra el texto normal introductorio estructurado con Fredoka Light (300), un input de registro limpio y el botón primario. Debajo del Hero, una franja de logotipos locales se desplaza de forma continua a sangre completa. Las secciones subsiguientes alternan ritmos visuales: maquetaciones claras con tarjetas blancas para actividades prácticas, seguidas de un panel Humus de ancho completo (`#11221a`) para los datos de impacto ambiental y concientización, volviendo a un fondo claro para las métricas cuantitativas y bloques de herramientas. Las características se organizan en cuadrículas de 2 o 3 columnas utilizando tarjetas blancas de radio de 36px sobre el canvas Brisa. Las separaciones verticales entre secciones son de 80px; el padding interno de las tarjetas es de 24–28px. La barra de navegación superior permanece fija a ~40px de altura con un fondo traslúcido y enlaces resueltos en Fredoka Medium (500), rematando con el botón pastilla oscuro a la derecha.

## Agent Prompt Guide

**Quick Color Reference**
- text (primary): #11221a / #1a3528
- text (muted): #3d5a71
- background (canvas): #f2f7f4
- card surface: #ffffff
- border / divider: #e2ede7 / #2a6f54
- accent (badge only): #ff6b35 (Campaña Impacto), #d97706 (Lavado decorativo)
- primary action: #11221a (Acción oscura con contorno)

**Example Component Prompts**

1. **Hero Headline Section**: Fondo claro Brisa (#f2f7f4). Columna izquierda: titular display de texto importante a 56px usando la tipografía Pulang, color #11221a, tracking normal, line-height 1.12. Un concepto clave del titular se despliega en #2a6f54 al mismo tamaño para acentuar el enfoque ecológico. Columna derecha: texto normal de cuerpo a 16px en Fredoka Light (300), color #1a3528; campo de entrada de correo (fondo #ffffff, borde transparente, radio 14px, padding 12px 16px, utilizando Fredoka Light con marcador de posición #a3c6b4) emparejado con un botón pastilla (fondo #11221a, texto #ffffff, radio 36px, padding 12px 16px, Fredoka Medium 14px).

2. **Portfolio Tile**: Contenedor con radio de borde de 36px que enmarca la fotografía real de un proceso sustentable local. Superposición abajo a la izquierda: título del proyecto en Fredoka Medium (500) a 20px color blanco; etiquetas de insumos abajo (fondo transparente, texto blanco, borde rgba(255,255,255,0.3), radio 12px, padding 4px 8px, Fredoka Medium 12px). Un mosaico de la cuadrícula puede usar un fondo sólido en #d97706 como transición decorativa.

3. **Dark Problem Panel**: Fondo oscuro #11221a, radio de borde de 36px, padding de 28px. Filas informativas dispuestas en flex con tipografía de encabezado e importancia: frases introductorias ("Mitigación de...") en Fredoka Light (300) a 18px en tono #a3c6b4, seguidas de la acción ambiental resuelta en tipografía Pulang destacada a 18px color #ffffff para denotar la máxima importancia. Cada fila va precedida de un icono circular monócromo en #2a6f54.

4. **Stat Block Row**: Sobre fondo claro Brisa (#f2f7f4), sin borde de tarjeta rígido. Número de métrica de impacto importante destacado a 40px con la tipografía Pulang, color #11221a. Etiqueta descriptiva normal debajo a 13px en Fredoka Light (300), color #3d5a71, line-height 1.56, dispuesta directamente bajo el número con una separación de 4px.

5. **Skill/Service Badge (dark variant)**: Fondo #2a6f54, texto #ffffff, radio de borde de 12px, padding de 4px 8px, Fredoka Medium (500) a 12px. Para marcas exclusivas de la campaña institucional "Toma Impulso", sustituir por fondo #ff6b35, texto #ffffff empleando Pulang a 12px.

## Motion Philosophy

Ecoimpulso utiliza la animación de manera pausada, orgánica y con un claro propósito de acompañamiento educativo. Tres bucles de desplazamiento continuo e infinito (`reverseloop`, `scroll-text`, `scroll-text-cta`) guían de forma fluida el carrusel horizontal de logotipos locales y las franjas de vitrinas a una velocidad lineal muy lenta (duración de 8–50s) —este movimiento suave emula los ciclos constantes de la naturaleza y una producción comunitaria siempre activa. Las microinteracciones de la interfaz (estados de hover, despliegue de guías metodológicas) emplean transiciones suaves de 0.2–0.35s suavizadas únicamente en propiedades de transformación y opacidad. Las aceleraciones bruscas o dinámicas tecnológicas quedan descartadas; la fluidez imita el ritmo orgánico y pausado de los procesos artesanales, evitando animar cambios drásticos de color cromático para no fatigar la lectura.

## Similar Brands

- **Patagonia** — Sistema fundamentado en la responsabilidad ambiental, paletas de matiz orgánico e historias de impacto real en comunidad
- **B Corporation (Sistema B)** — Enfoque de triple impacto con estructuras claras de diagnóstico, tipografías humanistas y acentos de validación limpia
- **Ecosia** — Canvas claros de tinte botánico con un uso sumamente escaso y estratégico de acentos vibrantes orientados a la regeneración forestal
- **Lush** — Estética tipográfica contundente sobre fondos planos contrastantes, eliminando gradientes tecnológicos para priorizar lo artesanal y natural
- **Slow Factory** — Enfoque educativo y de manual abierto con grandes esquinas redondeadas en tarjetas y maquetaciones tipográficas limpias para la acción climática

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-humus: #11221a;
  --color-bosque: #1a3528;
  --color-verde-monte: #2a6f54;
  --color-turquesa-eco: #2ba891;
  --color-azul-ceramica: #3d5a71;
  --color-musgo-suave: #a3c6b4;
  --color-hoja-seca: #c2d1c6;
  --color-brote: #e2ede7;
  --color-brisa: #f2f7f4;
  --color-blanco: #ffffff;
  --color-naranja-picaflor: #ff6b35;
  --color-terracota-vasija: #d97706;

  /* Typography — Font Families */
  --font-fredoka: 'Fredoka', ui-sans-serif, system-ui, sans-serif;
  --font-pulang: 'Pulang', 'Display Font', Georgia, serif;

  /* Typography — Scale */
  --text-caption: 10px;
  --leading-caption: 1.8;
  --text-body: 14px;
  --leading-body: 1.56;
  --text-body-lg: 16px;
  --leading-body-lg: 1.5;
  --text-subheading: 18px;
  --leading-subheading: 1.45;
  --text-heading-sm: 20px;
  --leading-heading-sm: 1.35;
  --text-heading: 32px;
  --leading-heading: 1.28;
  --text-heading-lg: 40px;
  --leading-heading-lg: 1.25;
  --text-display-sm: 56px;
  --leading-display-sm: 1.12;
  --text-display: 64px;
  --leading-display: 1;

  /* Typography — Weights */
  --font-weight-light: 300;     /* Para textos normales en Fredoka */
  --font-weight-medium: 500;    /* Para encabezados en Fredoka */
  --font-weight-regular: 400;   /* Peso base para Pulang */

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-68: 68px;
  --spacing-80: 80px;
  --spacing-120: 120px;

  /* Layout */
  --page-max-width: 1200px;
  --section-gap: 80px;
  --card-padding: 24-28px;
  --element-gap: 8px;

  /* Border Radius */
  --radius-md: 6px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-2xl-2: 20px;
  --radius-3xl: 24px;
  --radius-3xl-2: 28px;
  --radius-3xl-3: 36px;
  --radius-3xl-4: 40px;
  --radius-full: 48px;
  --radius-full-2: 56px;
  --radius-full-3: 64px;
  --radius-full-4: 80px;
  --radius-full-5: 1000px;
  --radius-full-6: 10000px;

  /* Named Radii */
  --radius-hero: 48px;
  --radius-pill: 10000px;
  --radius-cards: 36px (primario) or 28px (compacto);
  --radius-icons: 40px;
  --radius-badges: 12px;
  --radius-inputs: 14px;
  --radius-buttons: 36px (pastilla) or 14-16px (rectángulo redondeado);

  /* Shadows */
  --shadow-subtle: rgba(255, 255, 255, 0.6) 0px 0.5px 0px 0px inset, rgba(163, 198, 180, 0.2) 0px 9px 14px -5px inset, rgb(42, 54, 48) 0px 0px 0px 1.5px, rgba(17, 34, 26, 0.05) 0px 4px 6px 0px;
  --shadow-subtle-2: rgb(226, 237, 231) 0px 1px 0px 0px inset;
  --shadow-subtle-3: rgb(255, 255, 255) 0px 0.5px 0px 0px inset;
  --shadow-subtle-4: rgb(255, 255, 255) 0px -0.5px 0px 0px;
  --shadow-subtle-5: rgb(226, 237, 231) 0px -1px 0px 0px;
  --shadow-md: rgba(17, 34, 26, 0.03) 0px 4px 12px 0px;

  /* Surfaces */
  --surface-canvas: #f2f7f4;
  --surface-card-white: #ffffff;
  --surface-card-muted: #e2ede7;
  --surface-dark-surface: #11221a;
}
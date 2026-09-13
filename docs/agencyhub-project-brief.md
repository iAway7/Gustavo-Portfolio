# AgencyHub — Brief de producto para diseño de pantallas

> Documento de contexto para arrancar un proyecto de diseño de la webapp.
> Todo lo que hay aquí sale del proyecto real: boards del design sprint, flujos y pantallas ya diseñadas.
> **La UI del producto está en inglés.** El brief está en español; los textos de interfaz, no.

---

## 1. Qué es AgencyHub

Un marketplace B2B de dos lados donde **agencias digitales compran servicios white-label a proveedores verificados y los revenden a sus propios clientes**.

- **Rol:** Product Designer, end to end (research, flujos, arquitectura de información, UI, sistema de componentes)
- **Diseñador:** uno solo, los dos lados del marketplace
- **Superficies:** Marketplace · Cart & Checkout · Orders · Provider Store (My Store) · Client Hub · Dashboard

### El modelo de negocio en una frase

Un proveedor publica un servicio → la plataforma lo aprueba → una agencia lo compra → la agencia le pone margen y se lo vende a su cliente → el cliente paga → el proveedor entrega → el proveedor cobra.

---

## 2. Objetivos

**De negocio**

1. Convertir la verificación de proveedores en una función de la plataforma, no en un problema privado de cada agencia.
2. Permitir que una agencia venda servicios que no ejecuta, sin adelantar dinero.
3. Retener la transacción y la comunicación dentro de la plataforma (si la conversación se va a email, la plataforma no puede arbitrar disputas ni cobrar).
4. Que los proveedores puedan listar rápido sin que la calidad del catálogo se degrade.

**De producto**

1. Que una agencia pueda pasar de "necesito SEO para un cliente" a "pedido en marcha" sin salir de la app.
2. Que el pedido sea el objeto compartido por los tres actores: requisitos, comunicación, entregables y estado viven ahí.
3. Que cuatro superficies distintas se sientan como un solo producto.

---

## 3. Los tres actores (esto define todo)

Sobre el papel es un marketplace estándar de dos lados. La particularidad que reordena el producto entero:

**La agencia no es el cliente final.** Compra un servicio, le pone margen y se lo entrega a su propio cliente. Ese tercero **nunca entra en la plataforma**, pero paga, aporta los requisitos y juzga el resultado.

| Actor | Entra en la app | Qué hace |
|---|---|---|
| **Proveedor** | Sí | Publica servicios, define requisitos y precio, entrega, cobra |
| **Agencia** | Sí | Explora, compra, marca el precio, revende, gestiona la entrega |
| **Cliente final** | **No** | Paga (vía payment link), aporta requisitos, aprueba o pide revisión |

Casi todas las decisiones difíciles vienen de este triángulo, no del marketplace.

---

## 4. Personas

### Sarah Adams — Agency Owner
35 años · Agencia de marketing digital pequeña-mediana · 5-15 empleados

**Objetivos**

- Escalar el MRR de la agencia ofreciendo una gama más amplia de servicios
- Construir relaciones de confianza con proveedores white-label
- Mantener alta satisfacción del cliente con overhead bajo

**Problemas**

- Le cuesta encontrar y verificar proveedores fiables con calidad consistente
- Odia gestionar la comunicación en varias herramientas: ineficiencia y malentendidos
- Le resulta difícil fijar márgenes transparentes y competitivos, y eso genera tensión con sus clientes
- No tiene una forma sencilla de revender servicios a clientes y gestionar los pagos con flexibilidad

**Necesidades**

- Una plataforma para descubrir, verificar y dar de alta proveedores fiables
- Herramientas centralizadas de comunicación con proveedores y clientes
- Criterio claro para fijar márgenes justos
- Un sistema simple y configurable para gestionar pagos entre clientes y proveedores

### Alex Kim — White-Label Vendor / Service Provider
25 años · Freelance · SEO Specialist

**Objetivos**

- Ampliar cartera trabajando con agencias que externalizan SEO y contenido
- Conseguir un flujo estable de proyectos recurrentes
- Entregar con calidad y eficiencia para mantener las relaciones con agencias

**Problemas**

- Se encuentra agencias que revenden con márgenes excesivos, lo que desalinea las expectativas del cliente final
- Requisitos poco claros → tiempo perdido y retrabajo
- Incertidumbre sobre los plazos de cobro, que le afecta al flujo de caja

**Necesidades**

- Sistema de pagos fiable con seguimiento transparente del avance
- Onboarding claro y eficiente para asociarse con agencias
- Canales de comunicación transparentes para entender alcance y plazos

### El cliente final (persona en la sombra)

No tiene cuenta. Recibe un payment link, rellena requisitos y aprueba o rechaza la entrega. **Todo lo que ve tiene que funcionar sin login y sin contexto previo.**

---

## 5. El problema

> Las agencias de marketing digital tienen dificultades para encontrar proveedores fiables y verificados que cumplan estándares concretos de calidad y precio. Dar de alta a cada proveedor por separado es lento e ineficiente, y lleva a desperdiciar recursos en relaciones de prueba y error. Esa falta de un proceso de descubrimiento estructurado hace difícil que las agencias amplíen su oferta con confianza.

El coste se paga dos veces: el dinero desperdiciado y el cliente que se va.

**La solución:** onboarding guiado donde los proveedores listan rápido en un marketplace centralizado, y las agencias exploran proveedores verificados por categoría (SEO, PPC, contenido, diseño, hosting) sin tener que verificar una por una.

---

## 6. Decisiones de producto ya tomadas

Estas tres no se rediseñan. Son el producto.

### 6.1 El checkout puede terminar sin pago

Un checkout normal asume que quien compra paga. Aquí la agencia a menudo necesita que su cliente pague primero. El checkout tiene **dos finales**: pagar ahora, o generar un payment link y enviárselo al cliente. El pedido arranca cuando el cliente paga.

**Consecuencia de diseño:** existe el estado *waiting for client*. Pedidos, notificaciones y fulfillment tienen que entender una compra que aún no está pagada.

### 6.2 Ningún servicio se publica sin aprobación

El proveedor crea la ficha en minutos, pero publicar exige revisión de la plataforma.

**Consecuencia de diseño:** los listings tienen estados (`draft` → `pending approval` → `published` / `rejected`), y el proveedor necesita ver dónde está cada uno y por qué le rechazaron algo.

### 6.3 La comunicación vive dentro del pedido, con sitio para tres

Requisitos, revisiones y actualizaciones pasan por un espacio compartido anclado al pedido (3-way chat room), no por hilos de email que la plataforma no ve.

**Consecuencia de diseño:** el pedido es el objeto central de la app. Todo cuelga de ahí.

---

## 7. Arquitectura de la aplicación

### Navegación lateral (agencia)

| | |
|---|---|
| **Dashboard** | Estado general: pedidos activos, pagos pendientes, actividad reciente |
| **Marketplace** | Catálogo de servicios verificados. Búsqueda y categorías |
| **Client Hub** | Los clientes finales de la agencia, sus pedidos y sus payment links |
| **Orders** | Pedidos: estado, requisitos, chat, entregables |
| **My Store** | El escaparate del proveedor (lado vendedor) |

### Top bar

Balance de cuenta (`$500.00`) · Mensajes · Notificaciones (con badge) · Carrito (con badge) · Ajustes · Avatar

### Estructura de página

- Sidebar fija (~210 px), logo arriba, ítem activo con fondo tenue y texto naranja
- Header de página: título grande + subtítulo descriptivo en una línea
- Área de contenido sobre fondo gris muy claro, tarjetas blancas
- Rail derecho (~290 px) para resúmenes de pedido y acción principal — aparece en Cart, Checkout y Product Page

---

## 8. Flujos

### Proveedor

```
Start → ¿Existing user? 
  → No  → Sign Up ─┐
  → Sí  → Login ───┴→ My Services → Add New Service
                          → Basic Information
                          → Requirements to Fulfillment
                          → Pricing
                          → Send for Approval
                              → ¿Approved? No → Edit → (vuelve a Send for Approval)
                              → ¿Approved? Sí → Published → Exit
```

### Agencia

```
Start → ¿Existing user?
  → No  → Sign Up ─┐
  → Sí  → Login ───┴→ Marketplace → Select Service → Service Information → Add to Cart
      → ¿Buy more? Sí → vuelve a Marketplace
      → ¿Buy more? No → Checkout → Stripe Payment Link → Sent to Client
          → Fill Out Requirements → 3-Way Chat Room → Fulfillment → Service Delivered
              → ¿Approved? No → Request Revision → (vuelve a Fulfillment)
              → ¿Approved? Sí → Provider Gets Paid → Exit
```

---

## 9. Sistema de diseño

### Tipografía

**Inter** — Regular, Medium, Bold. Nada más.

### Color

El acento de marca es naranja-rojo; **la acción primaria es oscura, no naranja.** El naranja se reserva para marca y estado activo de navegación.

**Gray**

| 50 | 100 | 200 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|
| `#F2F2F2` | `#EBEBEB` | `#E6E6E6` | `#C9C9C9` | `#A8A8A8` | `#8F8F8F` | `#7D7D7D` | `#666666` | `#1E212A` |

**Primary (marca)**

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|
| `#FCE7E5` | `#FFC6B7` | `#FFA188` | `#FF7A59` | `#FF5A35` | `#FC3910` | `#F2320C` | `#E42B06` | `#D62302` | `#BC1100` |

**Success** · 500 `#6CDA75` · 600 `#45A557` · 700 `#398E4A` · 800 `#297A3A`
**Warning** · 500 `#F5B047` · 600 `#FFB224` · 700 `#FF990A` · 800 `#A35200`
**Error** · 500 `#F87275` · 600 `#E5484D` · 700 `#DA2F35` · 800 `#CB2A2F`

Las escalas se construyeron con ratios de contraste verificados (AAA en los tramos 800-900). Mantener ese criterio en cualquier color nuevo.

### Componentes

Inputs con label encima, borde gris claro, esquinas suaves, estados **default / hover / focus / filled / error / disabled** definidos para cada control.

Botones: primario oscuro (`gray-900`) con texto blanco, ancho completo dentro del rail derecho. Secundario con borde. Terciario como texto.

Tarjetas: fondo blanco, borde `gray-200` de 1px, radio medio, sin sombras pesadas.

---

## 10. Pantallas ya diseñadas

| Pantalla | Contenido |
|---|---|
| **Marketplace** | Buscador + grid de 3 columnas. Cada tarjeta: imagen, categoría, nombre, descripción corta, divisor y `Starting at: $XXX` |
| **Product page** | Breadcrumb, título, tabs (Overview / Requirements), cuerpo largo a la izquierda, rail derecho con Sale Price, Setup Fee, Plan, Quantity, Total y `Add To Cart` |
| **Cart** | Select all + lista de ítems con plan, setup fee, borrar y stepper de cantidad. Rail derecho con Order Details y `Checkout` |
| **Checkout** | Tres métodos en tarjetas de radio: Debit/Credit Card · **Payment Link** · Account Balance. Al elegir Payment Link, la acción principal cambia a `Create A Payment Link`. Rail con Order Details, checkbox de términos y CTA |
| **Payment link created** | Confirmación con el enlace generado |

**Patrón clave del checkout:** el CTA cambia de texto según el método elegido. Es la decisión 6.1 hecha interfaz.

---

## 11. Pantallas por diseñar

**Lado agencia**

- Dashboard (estado de pedidos, pagos pendientes, actividad)
- Orders — listado con filtros por estado, incluido `waiting for client`
- Order detail — requisitos, entregables, timeline de estado
- 3-way chat room dentro del pedido
- Client Hub — listado de clientes, detalle de cliente, historial de pedidos
- Formulario de requisitos
- Revisión y aprobación de la entrega
- Gestión de margen / precio de reventa

**Lado proveedor**

- My Store — escaparate público del proveedor
- My Services — listado con estados de aprobación
- Add New Service — flujo de 4 pasos (Basic Information → Requirements → Pricing → Send for Approval)
- Estado de aprobación y motivo de rechazo
- Cola de fulfillment
- Earnings / payouts

**Sin login (cliente final)**

- Página de pago desde el payment link
- Formulario de requisitos
- Vista de entrega y aprobación

**Transversales**

- Sign up / Login (los dos roles)
- Onboarding de proveedor
- Notificaciones
- Ajustes y facturación
- Estados vacíos, carga y error de cada superficie

---

## 12. Principios de diseño para este producto

1. **El pedido es el objeto central.** Si una pantalla nueva no se conecta con un pedido, cuestiona si debe existir.
2. **La confianza es el producto.** Todo lo que muestre un servicio tiene que dejar ver que está verificado. La verificación no es un badge decorativo: es la promesa entera.
3. **Un tercero invisible.** En cada pantalla, pregunta qué pasa si quien paga no es quien mira. Si la respuesta rompe la pantalla, la pantalla está mal.
4. **La acción primaria es oscura.** El naranja es marca, no botón.
5. **Un solo sistema, cuatro superficies.** Antes de inventar un patrón, comprueba si ya existe uno que sirva. Los estados raros — `waiting for client`, `pending approval` — se resuelven dentro del sistema, no con componentes nuevos.
6. **Los estados antes que los happy paths.** Cada pantalla necesita vacío, carga, error y el caso límite propio de este producto (el pago que no ha llegado, el listing rechazado, la revisión pedida).

---

## 13. Qué mediría

Ninguna de estas métricas se llegó a instrumentar. Son las dos que más importan si el producto sigue:

- **Porcentaje de checkouts que terminan en payment link** — dice si el flujo del tercero responde a demanda real o fue una suposición.
- **Tiempo de aprobación de proveedor** — la confianza solo es una feature si no ahoga la oferta.

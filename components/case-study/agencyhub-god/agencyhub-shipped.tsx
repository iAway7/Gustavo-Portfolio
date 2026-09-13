import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/i18n";

import { Figure, Section, StepHead } from "./agencyhub-god-case-study";

const SHOTS = "/projects/agencyhub/shots";

// Reading paragraph, same scale as the rest of the case study.
const PARA = "text-[1.125rem] leading-[1.55] text-muted sm:text-[1.5rem] sm:leading-[1.5]";

/* ------------------------------------------------------------------ */
/* Inline formatting: **bold**, *italic*, `code`                       */
/* ------------------------------------------------------------------ */

function fmt(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded-md bg-panel px-1.5 py-0.5 font-mono text-[0.82em] text-text">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

/* ------------------------------------------------------------------ */
/* Content blocks                                                      */
/* ------------------------------------------------------------------ */

type Block =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "quote"; text: string }
  | { kind: "figure"; src: string; alt: string; width: number; height: number };

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.kind === "figure") {
          return (
            <Reveal key={index} delay={0.06} className="mt-12">
              <Figure src={block.src} alt={block.alt} width={block.width} height={block.height} />
            </Reveal>
          );
        }
        if (block.kind === "quote") {
          return (
            <blockquote
              key={index}
              className="mt-10 max-w-2xl border-l-2 border-accent pl-6 text-[clamp(1.35rem,2.2vw,1.8rem)] font-medium leading-[1.35] tracking-[-0.02em] text-text"
            >
              {fmt(block.text)}
            </blockquote>
          );
        }
        if (block.kind === "ul") {
          return (
            <ul key={index} className="mt-6 grid max-w-2xl gap-3">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-[1.0625rem] leading-7 text-muted">
                  <span aria-hidden="true" className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                  <span>{fmt(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className={`mt-6 max-w-2xl ${PARA}`}>
            {fmt(block.text)}
          </p>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* The triangle table, added to the journey section                    */
/* ------------------------------------------------------------------ */

const TRIANGLE = {
  en: {
    before:
      "An agency often cannot pay until its own client pays them first. That client **has no account and never enters the platform**, yet puts up the money, supplies the requirements and judges the result.",
    head: ["Actor", "In the app", "What they do"],
    rows: [
      ["Provider", "Yes", "Lists, delivers, gets paid"],
      ["Agency", "Yes", "Buys, sets the price, resells"],
      ["**End client**", "**No**", "**Pays, supplies requirements, approves**"]
    ],
    after: "Every screen had to answer one question: **what happens when the person paying is not the person looking?**"
  },
  es: {
    before:
      "Muchas veces la agencia no puede pagar hasta que le paga su propio cliente. Y ese cliente **no tiene cuenta ni entra nunca en la plataforma**, pero pone el dinero, define los requisitos y valora el resultado.",
    head: ["Actor", "Entra en la app", "Qué hace"],
    rows: [
      ["Proveedor", "Sí", "Publica, entrega, cobra"],
      ["Agencia", "Sí", "Compra, define el precio, revende"],
      ["**Cliente final**", "**No**", "**Paga, define requisitos, aprueba**"]
    ],
    after: "Cada pantalla tenía que responder una sola pregunta: **¿qué pasa cuando quien paga no es quien mira?**"
  }
} as const;

export function AgencyHubTriangle({ locale }: { locale: Locale }) {
  const t = TRIANGLE[locale];
  return (
    <div className="mt-10 max-w-2xl">
      <p className={PARA}>{fmt(t.before)}</p>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              {t.head.map((cell) => (
                <th key={cell} className="caption border-b border-line pb-3 pr-6 font-medium">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border-b border-line py-3 pr-6 text-base leading-7 text-muted">
                    {fmt(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={`mt-8 ${PARA}`}>{fmt(t.after)}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shipped decisions, 08 - 13                                          */
/* ------------------------------------------------------------------ */

type ShippedSection = {
  step: string;
  label: string;
  title: string;
  blocks: Block[];
};

const figures = {
  checkout: {
    kind: "figure",
    src: `${SHOTS}/checkout.webp`,
    alt: 'AgencyHub checkout with the "Ask your client to pay" panel open',
    width: 2880,
    height: 1800
  },
  checkoutBalance: {
    kind: "figure",
    src: `${SHOTS}/checkout-balance.webp`,
    alt: "AgencyHub checkout with account balance applied as a discount against the total",
    width: 2880,
    height: 1800
  },
  cart: {
    kind: "figure",
    src: `${SHOTS}/cart.webp`,
    alt: "AgencyHub cart scoped to one client, with the client selector",
    width: 2880,
    height: 1800
  },
  orderChat: {
    kind: "figure",
    src: `${SHOTS}/order-chat.webp`,
    alt: "Order chat where the provider appears as part of the agency's team in the client view",
    width: 2880,
    height: 1800
  },
  clientPayment: {
    kind: "figure",
    src: `${SHOTS}/client-payment.webp`,
    alt: "Client payment page with the agency's branding and no platform navigation",
    width: 2880,
    height: 2048
  },
  paymentLinkSent: {
    kind: "figure",
    src: `${SHOTS}/payment-link-sent.webp`,
    alt: "Payment link sent confirmation with the expiry date visible",
    width: 2880,
    height: 1800
  },
  orderWaiting: {
    kind: "figure",
    src: `${SHOTS}/order-waiting.webp`,
    alt: 'Order in the "waiting for client" state, bought but unpaid',
    width: 2880,
    height: 1800
  },
  myStore: {
    kind: "figure",
    src: `${SHOTS}/my-store.webp`,
    alt: "Provider store with listings in draft, pending approval, published and rejected states",
    width: 2880,
    height: 1800
  }
} satisfies Record<string, Block>;

const SHIPPED: Record<Locale, ShippedSection[]> = {
  en: [
    {
      step: "08",
      label: "Decision",
      title: "The checkout has two endings, not three payment methods.",
      blocks: [
        figures.checkout,
        {
          kind: "p",
          text: "A checkout assumes the buyer pays. Here the agency often needs its client to pay first, so three payment options at the same level never held up: the payment link pays nothing and creates a `waiting for client` state, and the balance is a discount, not a method."
        },
        {
          kind: "p",
          text: "The shipped design has two outcomes, *Pay now* and *Ask your client to pay*, with the balance as a checkbox that comes off the total. The button changes with the outcome: `Pay $250.00` or `Create & Send Payment Link`."
        },
        figures.checkoutBalance
      ]
    },
    {
      step: "09",
      label: "Decision",
      title: "Each side sees its own price.",
      blocks: [
        {
          kind: "p",
          text: "The agency needs margins it can defend. The provider needs its price protected from markups that break the client's expectations. Full transparency sounds honest, but it turns the agency into a middleman with a visible markup."
        },
        {
          kind: "quote",
          text: "The provider never sees the client price. The client never sees the provider cost. The platform sees both, which is what lets it settle a dispute."
        },
        {
          kind: "p",
          text: 'The margin lives inside the checkout: a `Client price` field with the markup calculated live, *"Your cost $400.00 · You earn $200.00"*, plus a default markup in settings so pricing is not a decision made from scratch on every order.'
        }
      ]
    },
    {
      step: "10",
      label: "Decision",
      title: "One cart, one client.",
      blocks: [
        figures.cart,
        {
          kind: "p",
          text: "If the cart mixed SEO for client A with PPC for client B, the payment link would have no valid recipient: one link, one payer. So the cart is scoped to one client, chosen up front and visible throughout."
        },
        {
          kind: "p",
          text: "Buying for three clients means three orders: acceptable friction, because sending a payment link to the wrong person cannot be undone."
        }
      ]
    },
    {
      step: "11",
      label: "Decision",
      title: "One room, two identities.",
      blocks: [
        figures.orderChat,
        {
          kind: "p",
          text: "Communication lives in a space attached to the order. With three actors, the question is whether the client gets to see the provider. Yes, but as part of the agency's team: the platform does not hide the provider, it relabels them."
        },
        {
          kind: "p",
          text: "The agency is betting its client relationship on that relabelling, so it can preview the conversation exactly as its client sees it before writing anything sensitive."
        }
      ]
    },
    {
      step: "12",
      label: "The proof",
      title: "The screen that proves all of it.",
      blocks: [
        figures.clientPayment,
        {
          kind: "p",
          text: "What the agency's client sees when they open the link: no account, no session, no idea what AgencyHub is."
        },
        {
          kind: "ul",
          items: [
            "**The agency's brand leads.** No platform navigation or logo; AgencyHub appears only in the payment fine print, as the processor.",
            "**$600.00 and no trace of the $400.** No provider, no cost, no margin.",
            '**"After payment we\'ll ask a few questions"** turns silence into an expectation for a client with no dashboard to check.',
            "**The expiry date is visible**, the same one the agency picked earlier."
          ]
        },
        figures.paymentLinkSent,
        {
          kind: "p",
          text: "An expired link is not a dead end: `Request a new link` notifies the agency inside the platform, instead of pushing the conversation to email, where the platform cannot arbitrate."
        }
      ]
    },
    {
      step: "13",
      label: "States",
      title: "States before happy paths.",
      blocks: [
        figures.orderWaiting,
        {
          kind: "p",
          text: "In a product where payment might never arrive, states are the product:"
        },
        {
          kind: "ul",
          items: [
            "`waiting for client`: bought, unpaid, the provider cannot start",
            "Payment link expired without payment",
            "Cart with no client assigned, checkout blocked with the reason written out",
            "Switching client with a full cart",
            "Provider listings in draft, pending approval, published and rejected, with the rejection reason and a way back in"
          ]
        },
        figures.myStore
      ]
    }
  ],
  es: [
    {
      step: "08",
      label: "Decisión",
      title: "El checkout tiene dos finales, no tres métodos de pago.",
      blocks: [
        figures.checkout,
        {
          kind: "p",
          text: "Un checkout da por hecho que quien compra paga. Aquí la agencia muchas veces necesita que pague antes su cliente, así que tres métodos de pago al mismo nivel nunca encajaron: el payment link no paga nada y crea el estado `waiting for client`, y el saldo no es un método, es un descuento."
        },
        {
          kind: "p",
          text: "El diseño final tiene dos desenlaces, *Pay now* y *Ask your client to pay*, con el saldo como casilla que se resta del total. El botón cambia según el desenlace: `Pay $250.00` o `Create & Send Payment Link`."
        },
        figures.checkoutBalance
      ]
    },
    {
      step: "09",
      label: "Decisión",
      title: "Cada parte ve su propio precio.",
      blocks: [
        {
          kind: "p",
          text: "La agencia necesita márgenes que pueda defender. El proveedor necesita que su precio no se infle hasta romper las expectativas del cliente. La transparencia total suena honesta, pero convierte a la agencia en un intermediario con el recargo a la vista."
        },
        {
          kind: "quote",
          text: "El proveedor nunca ve el precio del cliente. El cliente nunca ve el coste del proveedor. La plataforma ve ambos, y por eso puede arbitrar una disputa."
        },
        {
          kind: "p",
          text: 'El margen vive dentro del checkout: un campo `Client price` que calcula el beneficio en vivo, *"Your cost $400.00 · You earn $200.00"*, más un margen por defecto en ajustes para no decidirlo desde cero en cada pedido.'
        }
      ]
    },
    {
      step: "10",
      label: "Decisión",
      title: "Un carrito, un cliente.",
      blocks: [
        figures.cart,
        {
          kind: "p",
          text: "Si el carrito mezclara SEO para el cliente A con PPC para el B, el payment link se quedaría sin destinatario: un enlace, un pagador. Por eso el carrito se limita a un cliente, elegido al principio y visible en todo momento."
        },
        {
          kind: "p",
          text: "Comprar para tres clientes son tres pedidos: una fricción asumible, porque enviar un enlace de pago a la persona equivocada no se puede deshacer."
        }
      ]
    },
    {
      step: "11",
      label: "Decisión",
      title: "Una sala, dos identidades.",
      blocks: [
        figures.orderChat,
        {
          kind: "p",
          text: "La comunicación vive en un espacio anclado al pedido. Con tres actores, la pregunta es si el cliente llega a ver al proveedor. Sí, pero como parte del equipo de la agencia: la plataforma no lo esconde, lo reetiqueta."
        },
        {
          kind: "p",
          text: "La agencia se juega la relación con su cliente en ese reetiquetado, así que puede previsualizar la conversación tal y como la ve su cliente antes de escribir nada delicado."
        }
      ]
    },
    {
      step: "12",
      label: "La prueba",
      title: "La pantalla que lo demuestra todo.",
      blocks: [
        figures.clientPayment,
        {
          kind: "p",
          text: "Esto es lo que ve el cliente de la agencia al abrir el enlace: sin cuenta, sin sesión y sin saber qué es AgencyHub."
        },
        {
          kind: "ul",
          items: [
            "**Manda la marca de la agencia.** Sin navegación ni logo de la plataforma; AgencyHub aparece solo en la letra pequeña del pago, como procesador.",
            "**600 dólares y ni rastro de los 400.** Sin proveedor, sin coste, sin margen.",
            '**"After payment we\'ll ask a few questions"** convierte el silencio en una expectativa para un cliente que no tiene panel donde mirar.',
            "**La fecha de caducidad está a la vista**, la misma que eligió la agencia."
          ]
        },
        figures.paymentLinkSent,
        {
          kind: "p",
          text: "Un enlace caducado no es un callejón sin salida: `Request a new link` avisa a la agencia dentro de la plataforma, en lugar de empujar la conversación al email, donde la plataforma no puede arbitrar."
        }
      ]
    },
    {
      step: "13",
      label: "Estados",
      title: "Los estados antes que los happy paths.",
      blocks: [
        figures.orderWaiting,
        {
          kind: "p",
          text: "En un producto donde el pago puede no llegar nunca, los estados son el producto:"
        },
        {
          kind: "ul",
          items: [
            "`waiting for client`: comprado, sin pagar, el proveedor no puede empezar",
            "Payment link caducado sin pago",
            "Carrito sin cliente asignado, con el checkout bloqueado y el motivo explicado",
            "Cambio de cliente con el carrito lleno",
            "Servicios del proveedor en borrador, pendientes, publicados y rechazados, con el motivo del rechazo y cómo corregirlo"
          ]
        },
        figures.myStore
      ]
    }
  ]
};

export function AgencyHubShippedDecisions({ locale }: { locale: Locale }) {
  return (
    <>
      {SHIPPED[locale].map((section) => (
        <Section key={section.step}>
          <StepHead step={section.step} label={section.label} title={section.title} />
          <Blocks blocks={section.blocks} />
        </Section>
      ))}
    </>
  );
}

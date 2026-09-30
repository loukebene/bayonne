export const WHATSAPP_NUMBER = "242055245386";

export type WhatsAppOrderItem = {
  name: string;
  quantity: number;
  price: number;
  note?: string | null;
};

export function buildWhatsAppOrderLink(
  items: WhatsAppOrderItem[],
  options?: {
    deliveryType?: string;
    customerName?: string;
    phone?: string;
    address?: string;
    notes?: string;
  }
) {
  const deliveryType = options?.deliveryType ?? "LIVRAISON";
  const customerName = options?.customerName ?? "Client";
  const phone = options?.phone ?? "Non renseigné";
  const address = options?.address ?? "";
  const notes = options?.notes ?? "";

  const itemSummary = items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.name} (${(item.price * item.quantity).toLocaleString("fr-FR")} FCFA)`
    )
    .join("\n");

  const message = `*COMMANDE LE JARDIN DE BAYONNE* 🍽️
*Client:* ${customerName}
*Tél:* ${phone}
*Type:* ${deliveryType}${address ? `\n*Adresse:* ${address}` : ""}

*DETAILS DE LA COMMANDE:*
${itemSummary}

${notes ? `*Note:* ${notes}\n` : ""}
Merci de confirmer la commande.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

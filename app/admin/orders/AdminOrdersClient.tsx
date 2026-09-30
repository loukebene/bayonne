"use client";

import React, { useState } from "react";
import { ShoppingBag, Phone, MapPin, Truck, Store, Utensils, MessageCircle, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface OrderItem {
  id: string;
  dishName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryType: string;
  address?: string | null;
  deliveryFee: number;
  subtotal: number;
  total: number;
  status: string;
  notes?: string | null;
  createdAt: string;
  items: OrderItem[];
}

interface AdminOrdersClientProps {
  initialOrders: Order[];
}

export const AdminOrdersClient: React.FC<AdminOrdersClientProps> = ({ initialOrders }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const getWhatsAppNotifyUrl = (order: Order) => {
    const statusLabels: Record<string, string> = {
      CONFIRMEE: "a été CONFIRMÉE par la cuisine.",
      EN_PREPARATION: "est en cours de PRÉPARATION.",
      PRETE: "est PRÊTE !",
      LIVREE: "est EN COURS DE LIVRAISON.",
      TERMINEE: "est TERMINÉE. Merci pour votre confiance !",
      ANNULEE: "a été annulée.",
    };

    const text = `Bonjour ${order.customerName}, votre commande *#${order.orderNumber}* au Jardin de Bayonne ${statusLabels[order.status] || "a été mise à jour."}`;
    return `https://wa.me/${order.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  const filteredOrders = orders.filter((o) =>
    selectedStatus === "ALL" ? true : o.status === selectedStatus
  );

  const statuses = [
    { code: "ALL", label: "Toutes" },
    { code: "NOUVELLE", label: "Nouvelle" },
    { code: "CONFIRMEE", label: "Confirmée" },
    { code: "EN_PREPARATION", label: "En préparation" },
    { code: "PRETE", label: "Prête" },
    { code: "LIVREE", label: "Livrée" },
    { code: "TERMINEE", label: "Terminée" },
    { code: "ANNULEE", label: "Annulée" },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center overflow-x-auto gap-2 pb-2">
        {statuses.map((s) => {
          const count =
            s.code === "ALL"
              ? orders.length
              : orders.filter((o) => o.status === s.code).length;
          const isActive = selectedStatus === s.code;

          return (
            <button
              key={s.code}
              onClick={() => setSelectedStatus(s.code)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition border ${
                isActive
                  ? "bg-jardin-orange text-white border-jardin-orange shadow-lg"
                  : "bg-jardin-surface text-gray-300 border-jardin-border hover:border-gray-500"
              }`}
            >
              {s.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders Cards List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 bg-jardin-surface rounded-3xl border border-jardin-border text-center space-y-2">
            <ShoppingBag className="w-10 h-10 text-gray-500 mx-auto" />
            <p className="text-white font-bold">Aucune commande dans ce statut</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-jardin-surface border border-jardin-border p-6 rounded-3xl space-y-4 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-jardin-border/40 pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-jardin-dark text-jardin-orange font-mono font-bold text-sm border border-jardin-border">
                    #{order.orderNumber}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {order.customerName}
                    </h3>
                    <p className="text-xs text-gray-400 flex items-center gap-2">
                      <span>{new Date(order.createdAt).toLocaleString("fr-FR")}</span>
                      <span>•</span>
                      <span className="text-jardin-orange font-semibold">{order.customerPhone}</span>
                    </p>
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 font-semibold">Statut :</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-jardin-dark border border-jardin-border text-white text-xs font-bold focus:outline-none focus:border-jardin-orange transition"
                  >
                    <option value="NOUVELLE">Nouvelle</option>
                    <option value="CONFIRMEE">Confirmée</option>
                    <option value="EN_PREPARATION">En préparation</option>
                    <option value="PRETE">Prête</option>
                    <option value="LIVREE">Livrée</option>
                    <option value="TERMINEE">Terminée</option>
                    <option value="ANNULEE">Annulée</option>
                  </select>

                  <a
                    href={getWhatsAppNotifyUrl(order)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                    title="Envoyer notification WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Order Info & Items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                {/* Delivery Info */}
                <div className="space-y-1.5 bg-jardin-dark p-3.5 rounded-2xl border border-jardin-border/50">
                  <p className="font-bold text-white uppercase text-[11px] tracking-wider">
                    Service : {order.deliveryType}
                  </p>
                  {order.address && (
                    <p className="text-gray-300 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-jardin-orange shrink-0 mt-0.5" />
                      <span>{order.address}</span>
                    </p>
                  )}
                  {order.notes && (
                    <p className="text-amber-400 italic">Note : {order.notes}</p>
                  )}
                </div>

                {/* Items Summary */}
                <div className="md:col-span-2 space-y-2">
                  <p className="font-bold text-gray-300">Articles commandés :</p>
                  <div className="space-y-1.5">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center text-gray-200 bg-jardin-dark/60 p-2 rounded-lg border border-jardin-border/30"
                      >
                        <span>
                          <strong className="text-jardin-orange">{item.quantity}x</strong>{" "}
                          {item.dishName}
                        </span>
                        <span className="font-semibold text-white">
                          {item.totalPrice.toLocaleString("fr-FR")} FCFA
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 text-sm font-bold border-t border-jardin-border/40">
                    <span className="text-white">Total Commande</span>
                    <span className="text-jardin-orange">
                      {order.total.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

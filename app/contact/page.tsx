import React from "react";
import { Phone, MapPin, Clock, MessageCircle, Navigation, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-jardin-orange/20 text-jardin-orange text-xs font-bold border border-jardin-orange/40">
          Contact & Accès
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Contactez Le Jardin de Bayonne
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Une question, une commande ou une réservation d&apos;urgence ? Notre équipe à Songolo est à votre écoute 7j/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Info Card */}
        <div className="bg-jardin-surface border border-jardin-border p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
          <h2 className="text-xl font-bold text-white border-b border-jardin-border/50 pb-3">
            Coordonnées Officielle
          </h2>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-jardin-dark text-jardin-orange flex items-center justify-center shrink-0 border border-jardin-border">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Adresse</p>
                <p className="text-gray-300 text-xs mt-0.5 leading-relaxed">
                  Pointe-Noire, Songolo,
                  <br />
                  en face de El Maestro, République du Congo
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-jardin-dark text-jardin-orange flex items-center justify-center shrink-0 border border-jardin-border">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Téléphones direct</p>
                <p className="text-gray-300 text-xs font-semibold mt-0.5">
                  +242 05 524 53 86
                  <br />
                  +242 05 577 43 58
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-jardin-dark text-jardin-orange flex items-center justify-center shrink-0 border border-jardin-border">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Horaires d&apos;ouverture</p>
                <p className="text-gray-300 text-xs mt-0.5">
                  Lundi - Dimanche : 11h00 - 23h00
                  <br />
                  <span className="text-emerald-400 font-semibold">Service continu & Livraison</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-jardin-border/40">
            <a
              href="https://wa.me/242055245386"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contacter sur WhatsApp (+242 05 524 53 86)</span>
            </a>

            <a
              href="tel:+242055245386"
              className="w-full py-3 px-4 rounded-xl bg-jardin-orange hover:bg-jardin-orange-hover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-jardin-orange/20 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Appeler le restaurant (+242 05 524 53 86)</span>
            </a>
          </div>
        </div>

        {/* Google Maps Card */}
        <div className="lg:col-span-2 bg-jardin-surface border border-jardin-border p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-jardin-orange" />
              <h2 className="text-xl font-bold text-white">Localisation Google Maps</h2>
            </div>
            <span className="text-xs text-gray-400">Songolo, Pointe-Noire</span>
          </div>

          <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-jardin-border">
            <iframe
              title="Localisation Le Jardin de Bayonne Pointe-Noire Songolo"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15915.228965934522!2d11.833333!3d-4.783333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a57960350d75001%3A0x8e833446700c2830!2sPointe-Noire%2C%20Republic%20of%20the%20Congo!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-150 contrast-125 brightness-90"
            />
          </div>

          <p className="text-xs text-gray-400 italic">
            Situé dans le quartier Songolo à Pointe-Noire, idéalement placé juste en face du complexe El Maestro. Parking sécurisé disponible pour les clients.
          </p>
        </div>
      </div>
    </div>
  );
}

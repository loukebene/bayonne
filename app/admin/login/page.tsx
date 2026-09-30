"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, UtensilsCrossed } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@lejardindebayonne.cg");
  const [password, setPassword] = useState("Jardin2026!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Identifiants incorrects.");
      }

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-jardin-surface border border-jardin-border p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-jardin-orange to-amber-600 flex items-center justify-center text-white font-bold mx-auto shadow-lg shadow-jardin-orange/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Administration</h1>
          <p className="text-xs text-jardin-orange font-bold uppercase tracking-wider">
            LE JARDIN DE BAYONNE
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Adresse E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Mot de Passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-jardin-dark border border-jardin-border text-white text-sm focus:outline-none focus:border-jardin-orange transition"
              />
            </div>
          </div>

          <div className="p-3 bg-jardin-dark/60 rounded-xl border border-jardin-border/40 text-[11px] text-gray-400 space-y-1">
            <p className="font-semibold text-white">Identifiants de démonstration :</p>
            <p>E-mail : <span className="font-mono text-jardin-orange">admin@lejardindebayonne.cg</span></p>
            <p>Mot de passe : <span className="font-mono text-jardin-orange">Jardin2026!</span></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-jardin-orange to-amber-600 hover:from-jardin-orange-hover hover:to-amber-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-jardin-orange/25 transition disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter au tableau de bord"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

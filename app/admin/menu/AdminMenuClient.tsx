"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Search, CheckCircle2, XCircle, Star, X, DollarSign } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Dish {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  isVariablePrice: boolean;
  priceNote: string | null;
  imageUrl: string;
  isAvailable: boolean;
  isPopular: boolean;
  categoryId: string;
  category?: Category;
}

interface AdminMenuClientProps {
  categories: Category[];
  initialDishes: Dish[];
}

export const AdminMenuClient: React.FC<AdminMenuClientProps> = ({
  categories,
  initialDishes,
}) => {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(5000);
  const [isVariablePrice, setIsVariablePrice] = useState(false);
  const [priceNote, setPriceNote] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isPopular, setIsPopular] = useState(false);
  const [loading, setLoading] = useState(false);

  const openAddModal = () => {
    setEditingDish(null);
    setName("");
    setCategoryId(categories[0]?.id || "");
    setDescription("");
    setPrice(5000);
    setIsVariablePrice(false);
    setPriceNote("");
    setImageUrl("https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80");
    setIsAvailable(true);
    setIsPopular(false);
    setIsModalOpen(true);
  };

  const openEditModal = (dish: Dish) => {
    setEditingDish(dish);
    setName(dish.name);
    setCategoryId(dish.categoryId);
    setDescription(dish.description);
    setPrice(dish.price);
    setIsVariablePrice(dish.isVariablePrice);
    setPriceNote(dish.priceNote || "");
    setImageUrl(dish.imageUrl);
    setIsAvailable(dish.isAvailable);
    setIsPopular(dish.isPopular);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name,
        categoryId,
        description,
        price: Number(price),
        isVariablePrice,
        priceNote,
        imageUrl,
        isAvailable,
        isPopular,
      };

      if (editingDish) {
        // PUT update
        const res = await fetch(`/api/dishes/${editingDish.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setDishes((prev) =>
            prev.map((d) => (d.id === updated.id ? { ...d, ...updated } : d))
          );
        }
      } else {
        // POST create
        const res = await fetch("/api/dishes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setDishes((prev) => [created, ...prev]);
        }
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailable = async (dish: Dish) => {
    const updatedStatus = !dish.isAvailable;
    setDishes((prev) =>
      prev.map((d) => (d.id === dish.id ? { ...d, isAvailable: updatedStatus } : d))
    );

    await fetch(`/api/dishes/${dish.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...dish, isAvailable: updatedStatus }),
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce plat du menu ?")) return;

    setDishes((prev) => prev.filter((d) => d.id !== id));
    await fetch(`/api/dishes/${id}`, { method: "DELETE" });
  };

  const filteredDishes = dishes.filter((d) => {
    const matchesCat = selectedCategory === "all" || d.categoryId === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Top Action & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Chercher un plat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-jardin-surface border border-jardin-border text-white text-xs focus:outline-none focus:border-jardin-orange transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-jardin-surface border border-jardin-border text-white text-xs focus:outline-none focus:border-jardin-orange transition"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-xl bg-jardin-orange hover:bg-jardin-orange-hover text-white text-xs font-bold flex items-center gap-2 shadow-lg transition shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un plat</span>
          </button>
        </div>
      </div>

      {/* Dishes Table */}
      <div className="bg-jardin-surface border border-jardin-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-jardin-dark text-gray-400 text-xs uppercase tracking-wider border-b border-jardin-border">
                <th className="p-4">Plat</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Prix FCFA</th>
                <th className="p-4">Disponibilité</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-jardin-border/40 text-xs">
              {filteredDishes.map((dish) => (
                <tr key={dish.id} className="hover:bg-jardin-card/60 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-jardin-dark">
                        <Image
                          src={dish.imageUrl}
                          alt={dish.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-white block text-sm">
                          {dish.name}
                        </span>
                        {dish.isPopular && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-semibold">
                            <Star className="w-3 h-3 fill-amber-400" /> Populaire
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300 font-medium">
                    {categories.find((c) => c.id === dish.categoryId)?.name || "-"}
                  </td>
                  <td className="p-4">
                    <span className="font-extrabold text-jardin-orange text-sm">
                      {dish.price.toLocaleString("fr-FR")} FCFA
                    </span>
                    {dish.priceNote && (
                      <span className="block text-[10px] text-amber-400 font-medium">
                        {dish.priceNote}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleAvailable(dish)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition ${
                        dish.isAvailable
                          ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      }`}
                    >
                      {dish.isAvailable ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Disponible</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Rupture</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(dish)}
                        className="p-2 rounded-lg bg-jardin-card hover:bg-jardin-border text-gray-300 hover:text-white transition"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(dish.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-jardin-dark border border-jardin-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-8">
            <div className="p-4 bg-jardin-surface border-b border-jardin-border flex items-center justify-between">
              <h3 className="font-bold text-white text-base">
                {editingDish ? "Modifier le Plat" : "Ajouter un nouveau plat"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Nom du plat *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-jardin-surface border border-jardin-border text-white text-xs focus:outline-none focus:border-jardin-orange"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Catégorie *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-jardin-surface border border-jardin-border text-white text-xs focus:outline-none focus:border-jardin-orange"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Prix en FCFA *
                </label>
                <input
                  type="number"
                  step="500"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-jardin-surface border border-jardin-border text-white text-xs focus:outline-none focus:border-jardin-orange"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVariablePrice}
                    onChange={(e) => setIsVariablePrice(e.target.checked)}
                    className="rounded border-jardin-border text-jardin-orange focus:ring-0"
                  />
                  <span>Prix variable selon arrivage / taille</span>
                </label>

                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="rounded border-jardin-border text-jardin-orange focus:ring-0"
                  />
                  <span>Marquer comme populaire</span>
                </label>
              </div>

              {isVariablePrice && (
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Note sur le prix (Ex: Prix selon taille 7 000 - 12 000 FCFA)
                  </label>
                  <input
                    type="text"
                    value={priceNote}
                    onChange={(e) => setPriceNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-jardin-surface border border-jardin-border text-white text-xs"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  URL de la photo culinaire
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-jardin-surface border border-jardin-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Description gourmande
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-jardin-surface border border-jardin-border text-white text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-jardin-orange hover:bg-jardin-orange-hover text-white font-bold text-xs shadow-lg transition"
                >
                  {loading ? "Enregistrement..." : "Enregistrer le plat"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

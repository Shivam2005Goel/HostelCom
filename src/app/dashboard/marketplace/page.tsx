"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ShoppingBag,
  Plus,
  Search,
  BedDouble,
  Sofa,
  BookOpen,
  Cpu,
  Blinds,
  MoreHorizontal,
  Gift,
  Tag,
  MessageCircle,
  MapPin,
  Clock,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  Mattress: BedDouble,
  Furniture: Sofa,
  Books: BookOpen,
  Electronics: Cpu,
  Appliances: Blinds,
  Other: MoreHorizontal,
};

const listings = [
  {
    id: 1,
    title: "Single Foam Mattress",
    category: "Mattress",
    condition: "Good",
    type: "sale",
    seller: "Rahul Dev",
    room: "304",
    block: "A",
    posted: "2 days ago",
    image: "🛏️",
  },
  {
    id: 2,
    title: "Study Table + Chair",
    category: "Furniture",
    condition: "Like New",
    type: "donation",
    seller: "Amit Singh",
    room: "215",
    block: "B",
    posted: "5 hrs ago",
    image: "🪑",
  },
  {
    id: 3,
    title: "Engineering Textbooks (Set of 6)",
    category: "Books",
    condition: "Fair",
    type: "sale",
    seller: "Priya Sharma",
    room: "412",
    block: "A",
    posted: "1 day ago",
    image: "📚",
  },
  {
    id: 4,
    title: "Electric pod",
    category: "Appliances",
    condition: "Good",
    type: "donation",
    seller: "Vikram Rao",
    room: "108",
    block: "C",
    posted: "3 days ago",
    image: ".",
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    category: "Electronics",
    condition: "Like New",
    type: "sale",
    seller: "Neha Gupta",
    room: "503",
    block: "A",
    posted: "Just now",
    image: "🔊",
  },
  {
    id: 6,
    title: "Floor Lamp",
    category: "Furniture",
    condition: "Good",
    type: "sale",

    seller: "Arjun Nair",
    room: "321",
    block: "B",
    posted: "4 days ago",
    image: "💡",
  },
];

const filters = ["All", "For Sale", "Free/Donation"];

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = listings.filter((item) => {
    const matchesFilter =
      activeFilter === "All"
        ? true
        : activeFilter === "For Sale"
          ? item.type === "sale"
          : item.type === "donation";
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Marketplace
          </h2>
          <p className="text-slate-400 mt-1">
            Buy, sell, or donate hostel essentials with your peers.
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center gap-2 font-medium transition-colors shadow-lg shadow-indigo-500/20 w-fit">
          <Plus className="w-5 h-5" />
          List Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{listings.length}</div>
            <div className="text-sm text-slate-400">Active Listings</div>
          </div>
        </div>
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {listings.filter((i) => i.type === "donation").length}
            </div>
            <div className="text-sm text-slate-400">Donations</div>
          </div>
        </div>
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {listings.filter((i) => i.type === "sale").length}
            </div>
            <div className="text-sm text-slate-400">Items for Sale</div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-slate-200 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-xl border border-white/5 w-fit">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeFilter === f
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((item, i) => {
          const Icon = categoryIcons[item.category] || MoreHorizontal;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5 hover:border-white/10 transition-colors flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{item.image}</div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${item.type === "donation"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/20 text-amber-400"
                    }`}
                >
                  {item.type === "donation" ? (
                    <>
                      <Gift className="w-3.5 h-3.5" /> Free
                    </>
                  ) : (
                    <>
                      <Tag className="w-3.5 h-3.5" /> ₹{item.price}
                    </>
                  )}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-200 mb-1">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                  <Icon className="w-4 h-4" />
                  <span>{item.category}</span>
                  <span>•</span>
                  <span
                    className={`${item.condition === "Like New"
                      ? "text-emerald-400"
                      : item.condition === "Good"
                        ? "text-amber-400"
                        : "text-rose-400"
                      }`}
                  >
                    {item.condition}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Location
                  </span>
                  <span className="text-slate-300 font-medium">
                    Block {item.block}, Room {item.room}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Posted
                  </span>
                  <span className="text-slate-300 font-medium">
                    {item.posted}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Seller</span>
                  <span className="text-slate-300 font-medium">
                    {item.seller}
                  </span>
                </div>
              </div>

              <button className="w-full mt-5 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Contact Seller
              </button>
            </motion.div>
          );
        })}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-300">
            No items found
          </h3>
          <p className="text-slate-500 mt-1">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </div>
  );
}

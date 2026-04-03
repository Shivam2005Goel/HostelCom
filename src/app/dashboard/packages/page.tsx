"use client";

import { motion } from "framer-motion";
import { Package, PackageCheck, Truck, Search } from "lucide-react";

export default function PackagesPage() {
  const packages = [
    { id: "PKG-9821", courier: "Amazon", status: "Ready for Pickup", location: "Block A Reception", date: "Today", icon: PackageCheck, color: "text-emerald-400", bg: "bg-emerald-500/20" },
    { id: "PKG-9810", courier: "FedEx", status: "In Transit to Hostel", location: "-", date: "Estimated Tomorrow", icon: Truck, color: "text-indigo-400", bg: "bg-indigo-500/20" },
    { id: "PKG-9755", courier: "Myntra", status: "Collected", location: "Room 304", date: "Oct 20, 2026", icon: Package, color: "text-slate-400", bg: "bg-white/10" },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Parcel Tracker
          </h2>
          <p className="text-slate-400 mt-1">Track your incoming deliveries.</p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search parcels..." 
            className="pl-10 pr-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-slate-200 outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {packages.map((pkg, i) => (
          <motion.div 
            key={pkg.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-6 border-t-4 ${pkg.status === 'Ready for Pickup' ? 'border-t-emerald-500' : 'border-t-transparent'}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl ${pkg.bg}`}>
                <pkg.icon className={`w-6 h-6 ${pkg.color}`} />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-white/5 rounded text-slate-300">{pkg.id}</span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-200 mb-1">{pkg.courier}</h3>
            <p className={`text-sm font-medium ${pkg.color}`}>{pkg.status}</p>
            
            <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Location</span>
                <span className="text-slate-300 font-medium">{pkg.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Status Date</span>
                <span className="text-slate-300 font-medium">{pkg.date}</span>
              </div>
            </div>

            {pkg.status === "Ready for Pickup" && (
              <button className="w-full mt-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 rounded-lg font-medium transition-colors">
                Generate Pickup OTP
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { Clock, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-ocean flex items-center justify-center font-display font-black text-sm text-white">
                AP
              </div>
              <div>
                <p className="font-display font-bold text-white">AP Bike Center</p>
                <p className="text-xs text-ocean">All Pattaya</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Premium motorbike rentals in Pattaya. Honest, safe, and hassle-free — since day one.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Quick Links
            </h4>
            <div className="space-y-2">
              {[
                { href: "/bikes", label: "All Bikes" },
                { href: "/#how-it-works", label: "How It Works" },
                { href: "/#why-us", label: "Why Choose Us" },
                { href: "/traffic-rules", label: "Traffic Rules" },
                { href: "/#location", label: "Location" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-gray-400 hover:text-ocean text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Business Hours
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-ocean" />
                <span>Every day: 10:00 AM – 7:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-ocean" />
                <span>Second Road, Soi 8–9, Pattaya</span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">Booking confirmation via</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  L
                </div>
                <span className="text-sm font-semibold text-gray-300">
                  LINE Official Account
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AP Bike Center (All Pattaya). All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1.5">
            <span>🌴</span>
            Made with love for Pattaya travellers
          </p>
        </div>
      </div>
    </footer>
  );
}

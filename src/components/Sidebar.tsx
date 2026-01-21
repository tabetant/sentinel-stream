"use client";

import Link from "next/link";
import { LayoutDashboard, Upload, Search, Settings, Video } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Upload Video", href: "/upload", icon: Upload },
    { name: "Search", href: "/search", icon: Search },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col fixed inset-y-0 z-50">
            <div className="flex flex-1 flex-col overflow-y-auto glass-dark border-r border-white/10">
                <div className="flex h-16 shrink-0 items-center px-6 border-b border-white/10">
                    <Video className="h-8 w-8 text-blue-500 mr-2" />
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Sentinel
                    </h1>
                </div>
                <nav className="flex-1 px-4 py-8 space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                                    isActive
                                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                        isActive ? "text-blue-400" : "text-gray-500 group-hover:text-white"
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-400 rounded-xl hover:bg-white/5 hover:text-white transition-all">
                        <Settings className="mr-3 h-5 w-5 text-gray-500" />
                        Settings
                    </button>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { searchVideos } from "@/app/actions";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        setHasSearched(true);

        try {
            const response = await searchVideos(query);
            if (response.success) {
                setResults(response.matches || []);
            } else {
                console.error(response.error);
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white mb-4">
                    Semantic Search
                </h1>
                <p className="text-gray-400 text-lg">
                    Search your video library using natural language queries powered by vector embeddings.
                </p>
            </div>

            <form onSubmit={handleSearch} className="relative mb-12">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ex: 'Discussion about artificial intelligence safety'"
                        className="w-full bg-white/5 border border-white/10 text-white text-lg rounded-2xl px-6 py-5 pl-14 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-500 shadow-xl transition-all hover:bg-white/10"
                    />
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all"
                        disabled={isSearching}
                    >
                        {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search"}
                    </button>
                </div>
            </form>

            <div className="space-y-4">
                {hasSearched && results.length === 0 && !isSearching && (
                    <div className="text-center py-12 glass-dark rounded-2xl border border-white/10">
                        <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No matching results found.</p>
                        <p className="text-gray-600">Try adjusting your query terms.</p>
                    </div>
                )}

                {results.map((match) => (
                    <div key={match.id} className="glass-dark p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/5 group">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                                {match.metadata?.source || "Unknown Source"}
                            </h3>
                            <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-1 rounded">
                                Score: {(match.score * 100).toFixed(1)}%
                            </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            {match.metadata?.text || "No text content available."}
                        </p>
                        <div className="flex gap-2">
                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                                {match.metadata?.type || "Video"}
                            </span>
                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                                {match.metadata?.uploadedAt ? new Date(match.metadata.uploadedAt).toLocaleDateString() : "Just now"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

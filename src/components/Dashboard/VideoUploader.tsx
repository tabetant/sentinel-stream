"use client";

import { useState } from "react";
import { Upload, Link as LinkIcon, FileVideo, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { analyzeVideo } from "@/app/actions";

export default function VideoUploader() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState("");
    const [mode, setMode] = useState<"file" | "url">("file");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<{ transcription: string; summary: string } | null>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const removeFile = () => {
        setFile(null);
        setResult(null);
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setResult(null);
        try {
            const formData = new FormData();
            if (mode === 'file' && file) {
                formData.append('file', file);
            } else if (mode === 'url' && url) {
                formData.append('url', url);
            }

            const response = await analyzeVideo(formData);
            if (response.success && response.data) {
                setResult(response.data);
            } else {
                console.error(response.error);
            }
        } catch (error) {
            console.error("Error analyzing:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            {/* Mode Toggle */}
            <div className="flex bg-white/5 p-1 rounded-xl w-fit mx-auto border border-white/10">
                <button
                    onClick={() => setMode("file")}
                    className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        mode === "file" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
                    )}
                >
                    Upload File
                </button>
                <button
                    onClick={() => setMode("url")}
                    className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        mode === "url" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
                    )}
                >
                    From URL
                </button>
            </div>

            {mode === "file" ? (
                <div
                    className={cn(
                        "relative flex flex-col items-center justify-center w-full h-80 rounded-2xl border-2 border-dashed transition-all duration-300 glass-dark",
                        dragActive ? "border-blue-500 bg-blue-500/10" : "border-white/10 hover:border-white/20"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    {file ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 rounded-2xl z-10 transition-all">
                            <FileVideo className="h-16 w-16 text-blue-500 mb-4 animate-bounce" />
                            <p className="text-xl font-medium text-white mb-2">{file.name}</p>
                            <p className="text-sm text-gray-400 mb-6">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                            <button
                                onClick={removeFile}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <input
                                type="file"
                                className="hidden"
                                id="video-upload"
                                accept="video/*"
                                onChange={handleChange}
                            />
                            <label
                                htmlFor="video-upload"
                                className="flex flex-col items-center cursor-pointer w-full h-full justify-center"
                            >
                                <Upload className="h-12 w-12 text-gray-500 mb-4 group-hover:text-blue-500 transition-colors" />
                                <p className="text-lg font-medium text-gray-300 mb-1">Drag and drop your video here</p>
                                <p className="text-sm text-gray-500">or click to browse files</p>
                            </label>
                        </>
                    )}
                </div>
            ) : (
                <div className="glass-dark p-8 rounded-2xl border border-white/10 h-80 flex flex-col items-center justify-center">
                    <LinkIcon className="h-12 w-12 text-blue-500 mb-6" />
                    <input
                        type="text"
                        placeholder="Paste video URL (e.g., YouTube, Vimeo)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 text-white rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-600 mb-4"
                    />
                    <p className="text-xs text-gray-500 text-center max-w-sm">
                        Supported formats: MP4, MOV, YouTube links. Max duration: 10 mins.
                    </p>
                </div>
            )}

            <button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={(!file && mode === 'file') || (!url && mode === 'url') || isAnalyzing}
                onClick={handleAnalyze}
            >
                {isAnalyzing ? "Analyzing..." : "Analyze Video"}
            </button>

            {result && (
                <div className="glass-dark p-6 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4">
                    <h3 className="text-xl font-bold text-white mb-2">Analysis Result</h3>
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                        <p className="text-gray-300 text-sm whitespace-pre-wrap">{result.transcription}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

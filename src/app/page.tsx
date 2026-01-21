import { Video, Search, Activity, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">
            Dashboard
          </h2>
          <p className="text-gray-400 mt-1">
            Welcome back to SentinelStream. Here's what's happening.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20">
            v1.0.0 Beta
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Videos", value: "0", icon: Video, color: "text-blue-500" },
          { title: "Processed Minutes", value: "0m", icon: Activity, color: "text-purple-500" },
          { title: "Vector Embeddings", value: "0", icon: FileText, color: "text-pink-500" },
          { title: "Search Queries", value: "0", icon: Search, color: "text-cyan-500" },
        ].map((stat, index) => (
          <div key={index} className="glass-dark p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-gray-400">{stat.title}</p>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 glass-dark rounded-2xl border border-white/5 p-6">
          <h3 className="text-lg font-medium text-white mb-4">Recent Uploads</h3>
          <div className="flex flex-col items-center justify-center h-64 text-center rounded-xl border border-dashed border-white/10 bg-white/5">
            <Video className="h-10 w-10 text-gray-600 mb-2" />
            <p className="text-gray-500">No videos uploaded yet</p>
            <p className="text-xs text-gray-600 mt-1">Upload a video to get started</p>
          </div>
        </div>
        <div className="col-span-3 glass-dark rounded-2xl border border-white/5 p-6">
          <h3 className="text-lg font-medium text-white mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Hugging Face API</span>
              <span className="flex h-2 w-2 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Pinecone Database</span>
              <span className="flex h-2 w-2 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Worker Nodes</span>
              <span className="flex h-2 w-2 rounded-full bg-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

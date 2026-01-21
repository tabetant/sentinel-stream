# SentinelStream

**SentinelStream** is a modern, multimodal video analytics dashboard built with Next.js 14, TypeScript, and Tailwind CSS. It leverages AI to transform video content into searchable knowledge using Hugging Face for captioning/transcription and Pinecone for vector semantic search.

![Dashboard Preview](https://i.imgur.com/placeholder-dashboard.png) *(Note: Replace with actual screenshot)*

## 🚀 Features

-   **Multimodal Analysis**: Upload video files or paste URLs to automatically extract text and insights.
-   **Semantic Search**: Query your video library using natural language (e.g., "Show me clips about AI safety").
-   **Vector Search**: Powered by [Pinecone](https://www.pinecone.io/) for high-performance similarity search.
-   **AI Processing**: Integrates [Hugging Face Inference API](https://huggingface.co/inference-api) for video-to-text and embedding generation.
-   **Premium UI**: A sleek, dark-mode dashboard with glassmorphism effects and fluid animations.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **AI/ML**: 
    -   `@huggingface/inference` (ASR/Captioning + Embeddings)
    -   `@pinecone-database/pinecone` (Vector Database)
-   **Deployment**: Vercel (Recommended)

## ⚡ Getting Started

### Prerequisites

-   Node.js 18+
-   A [Hugging Face Account](https://huggingface.co/) (Access Token)
-   A [Pinecone Account](https://www.pinecone.io/) (API Key)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/tabetant/sentinel-stream.git
    cd sentinel-stream
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory:
    ```bash
    HF_TOKEN=hf_...
    PINECONE_API_KEY=pc_...
    ```

4.  **Pinecone Index Setup**
    -   Create an index named `sentinel-stream` in your Pinecone console.
    -   Dimensions: `384` (for `sentence-transformers/all-MiniLM-L6-v2`)
    -   Metric: `cosine`

5.  **Run Development Server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Main layout with Sidebar
│   ├── page.tsx        # Dashboard Home
│   ├── upload/         # Video Upload Page
│   ├── search/         # Semantic Search Page
│   ├── actions.ts      # Server Actions (AI Logic)
│   └── globals.css     # Global Styles
├── components/
│   ├── Sidebar.tsx     # Navigation
│   └── Dashboard/      # Dashboard Widgets
└── lib/
    ├── huggingface.ts  # HF Inference Client
    └── pinecone.ts     # Pinecone Client
```

## 📝 Usage

1.  **Upload**: Navigate to the upload page. Drag & drop a video or paste a link.
2.  **Analyze**: Click "Analyze". The app will transcribe the video (mocked for large files in demo) and index the content.
3.  **Search**: Go to the search page. Type a query like "discussion about technology". The app will return relevant video clips.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a Pull Request.

## 📄 License

MIT

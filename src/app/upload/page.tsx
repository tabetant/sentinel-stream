import VideoUploader from "@/components/Dashboard/VideoUploader";

export default function UploadPage() {
    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white mb-4">
                    Upload Video
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Upload a video file or paste a URL to start extracting insights using our multimodal AI pipeline.
                </p>
            </div>

            <VideoUploader />
        </div>
    );
}

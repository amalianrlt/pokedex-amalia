export default function LoadingSpinner({ size = "md", text = "Loading..." }: { size?: "sm" | "md" | "lg", text?: string }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`animate-spin rounded-full border-2 border-blue-500 border-t-transparent ${sizeClasses[size]} mb-4`}></div>
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  );
}

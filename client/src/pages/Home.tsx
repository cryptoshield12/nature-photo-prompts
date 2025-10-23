import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Copy, Check, Camera } from "lucide-react";

interface Prompt {
  id: number;
  prompt: string;
}

export default function Home() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/prompts.json")
      .then((res) => res.json())
      .then((data) => {
        setPrompts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading prompts:", err);
        setLoading(false);
      });
  }, []);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Nature Photography Prompts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional AI prompts for stunning nature photography. Click any prompt to copy it instantly.
          </p>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-600">Loading prompts...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((item) => (
              <Card
                key={item.id}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white border border-gray-200 hover:border-emerald-300"
                onClick={() => copyToClipboard(item.prompt, item.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                      #{item.id}
                    </span>
                  </div>
                  <div className="ml-2">
                    {copiedId === item.id ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                    )}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-6 group-hover:text-gray-900">
                  {item.prompt}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 group-hover:text-emerald-600 transition-colors">
                    {copiedId === item.id ? "Copied!" : "Click to copy"}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-600 text-sm">
          {prompts.length} professional nature photography prompts • All prompts include professional camera settings
        </p>
      </div>
    </div>
  );
}

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

interface UrlData {
  originalUrl: string;
  _id: string;
  shortUrl: string;
  clicks: number;
}

const API_BASEURL = "http://localhost:3000/api"; // Your backend API
const REDIRECT_BASEURL = "http://localhost:3000"; // Where short URLs should redirect from

const UrlShorten = () => {
  const [url, setUrl] = useState<string>("");
  const [urlData, setUrlData] = useState<UrlData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch all shortened URLs
  const fetchUrls = async () => {
    try {
      const res = await axios.get(`${API_BASEURL}/urls`);
      setUrlData(res.data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
      toast.error("Failed to fetch URLs");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleShortenUrl = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASEURL}/shorten`, {
        originalUrl: url,
      });
      setUrlData([res.data, ...urlData]); // Add new URL to state
      setUrl("");
      toast.success("URL shortened successfully!");
    } catch (error) {
      console.error("Error shortening URL:", error);
      toast.error("Failed to shorten URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUrl = async (id: string) => {
    try {
      await axios.delete(`${API_BASEURL}/urls/${id}`);
      setUrlData(urlData.filter((url) => url._id !== id));
      toast.success("URL deleted successfully!");
    } catch (error) {
      console.error("Error deleting URL:", error);
      toast.error("Failed to delete URL");
    }
  };

  const handleCopy = (shortUrl: string) => {
    const fullUrl = `${REDIRECT_BASEURL}/api/r/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center p-6 font-sans">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          },
        }}
      />

      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-3 text-white drop-shadow-md">
            <span className="inline-block mr-2">🔗</span>
            URL Shortener
          </h1>
          <p className="text-white text-opacity-80 max-w-lg mx-auto">
            Create shortened URLs that are easy to share and track with our
            simple tool.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-lg font-medium mb-4 text-gray-700">
            Shorten a URL
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/your-long-url"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
            <button
              onClick={handleShortenUrl}
              disabled={isLoading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading ? "Shortening..." : "Shorten URL"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Your Shortened URLs
          </h2>

          {urlData.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left border-b-2 border-gray-200">
                  <th className="pb-3 pl-2 pr-2 font-medium text-gray-600">
                    Original URL
                  </th>
                  <th className="pb-3 pl-2 pr-2 font-medium text-gray-600">
                    Short URL
                  </th>
                  <th className="pb-3 pl-2 pr-2 font-medium text-gray-600 text-center">
                    Clicks
                  </th>
                  <th className="pb-3 pl-2 pr-2 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {urlData.map(({ _id, originalUrl, shortUrl, clicks }) => (
                  <tr
                    key={_id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 pl-2 pr-2">
                      <div className="w-64 truncate" title={originalUrl}>
                        {originalUrl}
                      </div>
                    </td>
                    <td className="py-4 pl-2 pr-2">
                      <a
                        href={`${REDIRECT_BASEURL}/api/r/${shortUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 font-medium truncate inline-block max-w-xs"
                        title={`${REDIRECT_BASEURL}/api/r/${shortUrl}`}
                      >
                        {`${REDIRECT_BASEURL}/api/r/${shortUrl}`}
                      </a>
                    </td>
                    <td className="py-4 pl-2 pr-2 text-center font-medium">
                      {clicks}
                    </td>
                    <td className="py-4 pl-2 pr-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCopy(shortUrl)}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition text-sm font-medium flex items-center"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => handleDeleteUrl(_id)}
                          className="px-3 py-1 bg-rose-100 text-rose-700 rounded hover:bg-rose-200 transition text-sm font-medium flex items-center"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-2 text-lg">No URLs found</p>
              <p className="text-sm">Shorten a URL to get started</p>
            </div>
          )}
        </div>

        <div className="text-center mt-8 text-white text-opacity-70 text-sm">
          © {new Date().getFullYear()} URL Shortener. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default UrlShorten;

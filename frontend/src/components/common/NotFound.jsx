import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl py-16 px-8 text-center">
        
        <h2 className="text-xl font-medium text-gray-800 mt-2">
          Page Not Found
        </h2>

        <Button
          onClick={() => navigate("/")}
          className="mt-4 bg-[#2874f0] hover:bg-[#1f63d4] rounded-none"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

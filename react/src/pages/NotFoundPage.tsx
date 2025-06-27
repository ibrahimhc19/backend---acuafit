import { Button } from "@/components/ui/button";
import {Link} from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#352c6f] to-primary text-white text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Página no encontrada.</p>

      <Button className="bg-white text-[#6e59f7] cursor-pointer hover:bg-accent transition">
        <Link to="/dashboard">Volver al inicio</Link>

      </Button>
    </div>
  );
}

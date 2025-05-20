
import { Calendar } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-dofus-blue text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-bold">
              Dofus Almanax
            </h1>
          </div>
          <div className="text-sm md:text-base text-dofus-gold italic">
            Daily offerings and bonuses
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

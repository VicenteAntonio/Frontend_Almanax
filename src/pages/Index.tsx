
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import DateSelector from '../components/DateSelector';
import AlmanaxCard from '../components/AlmanaxCard';
import { AlmanaxResponse } from '../types/almanax';
import { fetchAlmanaxForDate } from '../services/almanaxApi';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [almanaxData, setAlmanaxData] = useState<AlmanaxResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchData = async (date: Date) => {
    setIsLoading(true);
    
    const response = await fetchAlmanaxForDate({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    });
    
    setAlmanaxData(response);
    setIsLoading(false);
  };

  const handleDateChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  useEffect(() => {
    fetchData(currentDate);
  }, [currentDate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-dofus-brown mb-6">
            Check Daily Almanax Offerings & Bonuses
          </h2>
          
          <DateSelector 
            currentDate={currentDate}
            onDateChange={handleDateChange}
          />
          
          <div className="mt-8">
            <AlmanaxCard 
              data={almanaxData} 
              isLoading={isLoading}
              date={currentDate}
            />
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md border border-dofus-gold">
            <h3 className="text-xl font-bold text-dofus-blue mb-4">About Dofus Almanax</h3>
            <p className="text-dofus-brown">
              The Almanax is a daily quest system in the game Dofus. Each day, players can complete 
              an offering to receive a special bonus for that day. Use this tool to plan ahead and 
              see what items you'll need to gather for upcoming offerings!
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-dofus-dark-blue text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Created for Dofus fans • Almanax data provided by dofusdu.de API
          </p>
          <p className="text-xs text-dofus-gold mt-2">
            This is an unofficial fan tool and is not affiliated with Ankama Games.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

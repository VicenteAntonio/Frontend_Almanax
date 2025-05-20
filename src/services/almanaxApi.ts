import { AlmanaxResponse, DateParams } from '../types/almanax';
import { toast } from "@/components/ui/use-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8080';

export const fetchAlmanaxForDate = async (dateParams: DateParams): Promise<AlmanaxResponse | null> => {
  const { day, month, year } = dateParams;
  const dateString = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  const language = 'es';
  
  try {
    const response = await fetch(`${BASE_URL}/dofus3/v1/${language}/almanax/${dateString}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Almanax data: ${response.status}`);
    }
    
    const data: AlmanaxResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Almanax data:', error);
    toast({
      title: "Error",
      description: "Failed to fetch Almanax data. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
};

export const fetchAlmanaxForToday = async (): Promise<AlmanaxResponse | null> => {
  const today = new Date();
  return fetchAlmanaxForDate({
    day: today.getDate(),
    month: today.getMonth() + 1, // JavaScript months are 0-indexed
    year: today.getFullYear()
  });
};

export const formatDateString = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};


import { AlmanaxResponse } from '../types/almanax';
import { formatDateString } from '../services/almanaxApi';
import { Skeleton } from "@/components/ui/skeleton";

interface AlmanaxCardProps {
  data: AlmanaxResponse | null;
  isLoading: boolean;
  date: Date;
}

const AlmanaxCard = ({ data, isLoading, date }: AlmanaxCardProps) => {
  if (isLoading) {
    return (
      <div className="almanax-card max-w-md w-full mx-auto">
        <div className="p-6">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-24 w-full mb-4" />
          <Skeleton className="h-16 w-full" />
          <div className="mt-4">
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!data) {
    return (
      <div className="almanax-card max-w-md w-full mx-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-dofus-dark-blue mb-2">
            {formatDateString(date)}
          </h2>
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            <p className="font-semibold">No Almanax data available for this date.</p>
            <p className="text-sm mt-1">Please try another date or check back later.</p>
          </div>
        </div>
      </div>
    );
  }
  
  const { bonus, offering } = data;
  
  return (
    <div className="almanax-card max-w-md w-full mx-auto">
      <div className="bg-dofus-blue text-white p-4">
        <h2 className="text-xl font-bold">{formatDateString(date)}</h2>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-dofus-dark-blue mb-2 flex items-center">
            <span className="w-3 h-3 bg-dofus-gold rounded-full mr-2"></span>
            Daily Bonus
          </h3>
          <div className="bg-dofus-light-brown p-4 rounded-md">
            <p className="text-sm text-dofus-brown font-medium">{bonus.type}</p>
            <p className="text-dofus-dark-blue mt-1">{bonus.description}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-dofus-dark-blue mb-2 flex items-center">
            <span className="w-3 h-3 bg-dofus-gold rounded-full mr-2"></span>
            Required Offering
          </h3>
          <div className="offering-item">
            <div className="h-12 w-12 bg-white rounded-md overflow-hidden flex-shrink-0 border border-dofus-brown">
              <img 
                src={offering.item.image_url} 
                alt={offering.item.name} 
                className="h-full w-full object-contain" 
              />
            </div>
            <div>
              <h4 className="font-medium text-dofus-dark-blue">{offering.item.name}</h4>
              <p className="text-sm text-dofus-brown">
                Quantity: <span className="font-semibold">{offering.quantity}</span> • 
                Level: <span className="font-semibold">{offering.item.level}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlmanaxCard;

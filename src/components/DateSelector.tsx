
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, CalendarDays, ArrowLeft, ArrowRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { DateParams } from '../types/almanax';

interface DateSelectorProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const DateSelector = ({ currentDate, onDateChange }: DateSelectorProps) => {
  const [open, setOpen] = useState(false);

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 mt-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="border-dofus-blue text-dofus-blue hover:bg-dofus-blue hover:text-white"
          onClick={handlePreviousDay}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline"
              className="min-w-[200px] border-dofus-gold bg-white hover:bg-dofus-light-brown"
            >
              <CalendarDays className="mr-2 h-4 w-4 text-dofus-blue" />
              <span className="text-dofus-brown">
                {currentDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric' 
                })}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <CalendarUI
              mode="single"
              selected={currentDate}
              onSelect={handleCalendarSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Button 
          variant="outline" 
          className="border-dofus-blue text-dofus-blue hover:bg-dofus-blue hover:text-white"
          onClick={handleNextDay}
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
      
      <Button 
        onClick={handleToday}
        className="bg-dofus-brown hover:bg-dofus-dark-blue text-white"
      >
        <Calendar className="mr-2 h-4 w-4" />
        Today
      </Button>
    </div>
  );
};

export default DateSelector;

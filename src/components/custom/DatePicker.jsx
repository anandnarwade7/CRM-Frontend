import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { cn } from "../../lib/utils";
import { forwardRef } from "react";
const DatePicker = forwardRef(({ value, onChange }, ref) => {
  // Safely format the date only if it's a valid date
  const formattedDate =
    value && !isNaN(new Date(value).getTime())
      ? format(new Date(value), "PPP")
      : null;
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={"outline"}
            className={cn(
              "w-full max-w-lg p-5 justify-between text-left font-normal",
              !formattedDate && "text-muted-foreground"
            )}
          >
            {formattedDate ? formattedDate : <span>Pick a date</span>}
            <CalendarIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            // selected={value ? new Date(value) : undefined}
            // onSelect={(date) => {
            //   onChange(date);
            // }}
            selected={
              value && !isNaN(new Date(value).getTime())
                ? new Date(value)
                : undefined
            }
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
});

DatePicker.displayName = "DatePicker";

export default DatePicker;

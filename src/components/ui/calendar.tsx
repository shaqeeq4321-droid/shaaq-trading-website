import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-3",
        month_caption: "flex justify-center pt-1 pb-2 relative items-center text-sm font-semibold",
        nav: "flex items-center justify-between absolute inset-x-1 top-1.5",
        button_previous: cn(buttonVariants({ variant: "outline", size: "icon" }), "size-7 p-0"),
        button_next: cn(buttonVariants({ variant: "outline", size: "icon" }), "size-7 p-0"),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-muted-foreground w-9 text-[0.75rem] font-medium",
        week: "flex w-full mt-1",
        day: "size-9 text-center text-sm p-0 relative",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 p-0 font-normal aria-selected:opacity-100",
        ),
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground rounded-sm",
        today: "bg-accent text-accent-foreground rounded-sm",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-40",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

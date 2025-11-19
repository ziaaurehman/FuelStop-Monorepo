"use client";

import { Card, CardContent } from "@repo/components/ui/card";
import { Button } from "@repo/components";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ShiftType = "morning" | "evening" | "night";

interface CalendarDay {
  date: number;
  shifts: ShiftType[];
}

export function ShiftCalendar() {
  const currentMonth = "August 2025";

  // Mock calendar data
  const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thus", "Fri"];

  const calendarDays: CalendarDay[] = [
    { date: 27, shifts: ["morning"] },
    { date: 28, shifts: ["morning"] },
    { date: 29, shifts: ["night"] },
    { date: 30, shifts: ["morning"] },
    { date: 31, shifts: ["night"] },
    { date: 1, shifts: ["night"] },
    { date: 2, shifts: ["morning"] },
    { date: 3, shifts: [] },
    { date: 4, shifts: [] },
    { date: 5, shifts: ["evening"] },
    { date: 6, shifts: [] },
    { date: 7, shifts: ["evening"] },
    { date: 8, shifts: [] },
    { date: 9, shifts: [] },
    { date: 10, shifts: ["morning"] },
    { date: 11, shifts: ["morning"] },
    { date: 12, shifts: ["night"] },
    { date: 13, shifts: ["morning"] },
    { date: 14, shifts: ["night"] },
    { date: 15, shifts: ["night"] },
    { date: 16, shifts: ["morning"] },
    { date: 17, shifts: ["morning"] },
    { date: 18, shifts: ["morning"] },
    { date: 19, shifts: ["night"] },
    { date: 20, shifts: ["morning"] },
    { date: 21, shifts: ["night"] },
    { date: 22, shifts: ["night"] },
    { date: 23, shifts: ["morning"] },
    { date: 24, shifts: [] },
    { date: 25, shifts: [] },
    { date: 26, shifts: [] },
    { date: 27, shifts: [] },
    { date: 28, shifts: [] },
    { date: 29, shifts: [] },
    { date: 30, shifts: [] },
  ];

  const getShiftColor = (shift: ShiftType) => {
    switch (shift) {
      case "morning":
        return "bg-teal-500";
      case "evening":
        return "bg-orange-500";
      case "night":
        return "bg-purple-500";
    }
  };

  const shiftSummary = {
    totalHours: 168,
    morningShifts: 12,
    eveningShifts: 8,
    nightShifts: 5,
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          {/* Calendar Header */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-base md:text-lg text-nowrap font-semibold">
                {currentMonth}
              </h3>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Add Shift
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary-foreground "
              >
                Save Changes
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="border rounded-lg overflow-hidden">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 border-b bg-muted">
              {daysOfWeek.map((day) => (
                <div key={day} className="p-3 text-center text-sm font-medium">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className="border-r border-b last:border-r-0 h-24 p-2 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="text-sm font-medium mb-2">{day.date}</div>
                  <div className="space-y-1">
                    {day.shifts.map((shift, shiftIndex) => (
                      <div
                        key={shiftIndex}
                        className={`h-1 rounded-full ${getShiftColor(shift)}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-teal-500 rounded-full" />
              <span>Morning (6AM-2PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-orange-500 rounded-full" />
              <span>Evening (2pm-10PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-purple-500 rounded-full" />
              <span>Night (10PM-6AM)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shift Summary */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Shift Summary for August
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Hours:</p>
              <p className="text-2xl font-bold">
                {shiftSummary.totalHours} hours
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Morning Shift
              </p>
              <p className="text-2xl font-bold">
                {shiftSummary.morningShifts} Shifts
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Evening Shift:
              </p>
              <p className="text-2xl font-bold">
                {shiftSummary.eveningShifts} shift
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Evening Shift:
              </p>
              <p className="text-2xl font-bold">
                {shiftSummary.nightShifts} Shift
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

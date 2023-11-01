import React, { useState } from 'react';
import './Calendar.scss';

const Calendar = ({
  className,
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const renderCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendar = [];

    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    const isReserved = date => {
      const reservationsArray = [
        new Date(2023, 8, 10),
        new Date(2023, 8, 11),
        new Date(2023, 8, 12),
        new Date(2023, 8, 13),
        new Date(2023, 8, 15),
        new Date(2023, 9, 10),
        new Date(2023, 9, 11),
        new Date(2023, 9, 12),
        new Date(2023, 9, 13),
        new Date(2023, 9, 14),
        new Date(2023, 9, 15),
      ];

      const isReservedDate = reservationsArray.some(
        reservedDate => reservedDate.getTime() === date.getTime(),
      );

      return isReservedDate;
    };

    let dayCounter = 1;
    for (let week = 0; week < 6; week++) {
      const days = [];
      for (let day = 0; day < 7; day++) {
        if (week === 0) {
          days.push(
            <div className="calendarWeekday" key={`weekday-${day}`}>
              {weekDays[day]}
            </div>,
          );
        } else {
          const dayNumber = dayCounter;
          const date = new Date(year, month, dayNumber);
          const isSelectable =
            date >= selectedStartDate && date <= selectedEndDate;
          const isSelected =
            date.getTime() === selectedStartDate?.getTime() ||
            date.getTime() === selectedEndDate?.getTime();
          const isPastDate = date < new Date();

          if (
            (week === 1 && day < firstDay) ||
            dayCounter > daysInMonth ||
            isPastDate
          ) {
            days.push(<div className="emptyCell" key={day} />);
          } else {
            const isReservedDate = isReserved(date);
            days.push(
              <div
                className={`calendarCell ${isSelectable ? 'selectable' : ''} ${
                  isSelected ? 'selected' : ''
                } ${isReservedDate ? 'reserved' : ''} ${
                  date.getDate() === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear()
                    ? 'today'
                    : ''
                }`}
                key={day}
                onClick={() => !isReservedDate && handleDateClick(date)}
              >
                {dayNumber}
              </div>,
            );
            dayCounter++;
          }
        }
      }
      calendar.push(
        <div className="calendarWeek" key={week}>
          {days}
        </div>,
      );
    }

    return calendar;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      if (currentYear > today.getFullYear()) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      }
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = date => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (date >= selectedStartDate) {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  return (
    <div className={`calendarContainer ${className}`}>
      <div className="calendarHeader">
        <button
          className="arrowBtn"
          onClick={handlePrevMonth}
          disabled={
            currentYear <= today.getFullYear() &&
            currentMonth <= today.getMonth()
          }
        >
          &lt;
        </button>
        <button className="arrowBtn" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <div className="calendars">
        <div className="calendar">
          <h3>{`${currentYear}년 ${currentMonth + 1}월`}</h3>
          {renderCalendar(currentYear, currentMonth)}
        </div>
        <div className="calendar">
          <h3>
            {currentMonth === 11
              ? `${currentYear + 1}년 1월`
              : `${currentYear}년 ${currentMonth + 2}월`}
          </h3>
          {renderCalendar(currentYear, currentMonth + 1)}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateRangePicker({ value, onChange }) {
  const { checkIn, checkOut } = value;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-2'>
        <DatePicker
          label='Check-in'
          value={checkIn}
          onChange={(newValue) =>
            onChange({
              checkIn: newValue,
              checkOut:
                newValue && (!checkOut || newValue.isAfter(checkOut))
                  ? newValue.add(1, 'day')
                  : checkOut,
            })
          }
          className='w-full sm:w-auto'
        />

        <DatePicker
          label='Check-out'
          value={checkOut}
          minDate={checkIn ? checkIn.add(1, 'day') : undefined}
          onChange={(newValue) => onChange({ checkIn, checkOut: newValue })}
          className='w-full sm:w-auto'
        />
      </div>
    </LocalizationProvider>
  );
}

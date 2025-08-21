import DatePIcker from 'react-datepicker';

const DatePickerInput = ({ label, selectedDate, onChange, minDate }) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        minDate={minDate}
        dateFormat="yyyy-MM-dd"
        placeholderText={label}
      />
    </div>
  );
};

export default DatePickerInput;

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';


export function SearchBarForm() {
  const [textInput, setTextInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endtDate, setEndDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  const [count, setCount] = useState(0);

  const options = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
  ];

  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleCountChange = (increment) => {
    setCount(count + increment);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data (e.g., submit it to an API)
    console.log('Text Input:', textInput);
    console.log('Selected Start Date:', startDate);
    console.log('Selected End Date:', endtDate);
    console.log('Selected Option:', selectedOption);
    console.log('Count:', count);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Text Input:</label>
        <input
          type="text"
          value={textInput}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date Picker:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          selected={endtDate}
          onChange={(date) => setEndDate(date)}
        />
      </div>
      <div>
        <label>Select Option:</label>
        <Select
          options={options}
          value={selectedOption}
          onChange={handleOptionChange}
        />
      </div>
      <div>
        <label>Count:</label>
        <button onClick={() => handleCountChange(1)}>+</button>
        <span>{count}</span>
        <button onClick={() => handleCountChange(-1)}>-</button>
      </div>
      <div>
        <button type="submit">Search</button>
      </div>
    </form>
  );
}






// <div className='search-bar-buttons' >
//     <button className='search-anywhere'>Anywhere</button>
//     <span className='splitter'></span>
//     <button className='search-any-week'>Any week</button>
//     <span className='splitter'></span>
//     <button className='search-add-guests'>Add guests</button>
// </div>
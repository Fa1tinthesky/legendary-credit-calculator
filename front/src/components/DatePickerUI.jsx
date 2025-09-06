import dayjs from 'dayjs';
import { Stack, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';


function formatDate(date) {
    return date.toLocaleDateString('en-CA');
};

export default function DatePickerUI() {
    const today = dayjs();
    const [selectedDate, setSelectedDate] = useState();
    
    if (selectedDate) {
        console.log(formatDate(selectedDate["$d"]));
    }
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
                label="date picker"
                defaultValue={today}
                textField={(params) => <TextField {...params} />}
                value={selectedDate}
                views={['year', 'month', 'day']}
                onChange={(newValue) => {
                    setSelectedDate(newValue)
                }}></DatePicker>
        </LocalizationProvider>
    )
}

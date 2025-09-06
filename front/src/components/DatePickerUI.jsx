import dayjs from "dayjs";
import { Stack, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";

function formatDate(date) {
    return date.toLocaleDateString("en-CA");
}

export default function DatePickerUI({ changeBody, color }) {
    const today = dayjs();
    const [selectedDate, setSelectedDate] = useState(today);

    useEffect(() => {
        changeBody("start_date", formatDate(selectedDate["$d"]));
    }, [formatDate(selectedDate["$d"])]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                color={color}
                label="date picker"
                defaultValue={today}
                textField={(params) => <TextField {...params} />}
                value={selectedDate}
                views={["year", "month", "day"]}
                onChange={(newValue) => {
                    setSelectedDate(newValue);
                }}
            ></DatePicker>
        </LocalizationProvider>
    );
}

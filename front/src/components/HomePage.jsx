import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import Stack from '@mui/material/Stack';
import DatePickerUI from './DatePickerUI';
import Button from '@mui/material/Button';
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Slider, MenuItem, Container, Box, Grid} from '@mui/material';
import { createTheme, alpha, getContrastRatio, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import MenuAppBar from './MenuAppBar';


const blueBase = "#7F00FF";
const blueMain = alpha(blueBase, 0.7);
const theme = createTheme({
    palette: {
        blue: {
            main: blueMain,
            light: alpha(blueBase, 0.5),
            dark: alpha(blueBase, 0.9),
            contrastText: getContrastRatio(blueMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
})

function FormOption({ defaultValue, inputLabel, textFieldLable, adornment, options, inputChangeHandler, selectChangeHandler, sx, fullWidth}) {
    if (!defaultValue) {
        defaultValue = "default";
    } else if (!adornment) {
        adornment = ""
    } else if (!fullWidth) {
        fullWidth = false;
    }

    return (
        <Box display="flex" direction="row" sx={sx}>
                <FormControl color="blue" sx={{width: 0.78}}>
                  <InputLabel htmlFor="outlined-adornment-amount">{inputLabel}</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">{adornment}</InputAdornment>}
                    label={inputLabel}
                    onChange={inputChangeHandler}
                    sx={{flex: 1}}
                  />
                </FormControl>
                <TextField
                    id="outlined-select-currency"
                    select
                    label={textFieldLable}
                    defaultValue={defaultValue}
                    onChange={selectChangeHandler}
                    sx={{width: 0.2}}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
        </Box>
    )
}

export default function HomePage() {
    let [chosen_currencie, set_chosen_currencie] = useState("");
    const time_terms = [
        {
            value: "месяц",
            label: "мес."
        },
        {
            value: "год",
            label: "год"
        },
    ]
    const money_terms = [
        {
            value: "% в день",
            label: "% в день",
        },
        {
            value: "% в месяц",
            label: "% в месяц",
        },
        {
            value: "% в год",
            label: "% в год",
        },
    ]

    const currencies = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'TJS',
            label: 'SM',
        },
    ];
    
    const debt_types = [
        {
            "value": "аннуитет",
            "label": "аннуитет"
        },
        {
            "value": "дифферинцированный",
            "label": "дифферинцированный"
        },
    ]


    const handleCurrencieChange = (event) => {
        const chosen = currencies.filter(item => item.value === event.target.value);
        console.log(chosen);
        console.log(chosen.value);
        set_chosen_currencie(chosen ? chosen[0].label : "TJS");
    }

    return (
        <ThemeProvider theme={theme}>
        <MenuAppBar></MenuAppBar>
        <Box sx={{ flexGrow: 0, marginTop: 3}}>
            <Grid container spacing={1}>
                <Grid size={6}>
                    <FormControl color="blue" sx={{width: 0.78}}>
                      <InputLabel htmlFor="outlined-adornment-amount">Сумма кредита</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">{chosen_currencie}</InputAdornment>}
                        label="Сумма кредита"
                      />
                    </FormControl>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Currency"
                        defaultValue="TJS"
                        // helperText="Please select your currency"
                        color="blue"
                        size="normal"
                        onChange={handleCurrencieChange}
                        sx={{width: 0.2}}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                </Grid>


                <Grid size={6}>
                    <FormOption
                    defaultValue="месяц"
                    inputLabel="Срок кредита"
                    textFieldLable="" 
                    selectChangeHandler={(e) => {e.preventDefault; console.log(e.target.value)}}
                    inputChangeHandler={(e) => {e.preventDefault; console.log(e.target.value)}}
                    options={time_terms}
                    sx={{justifyContent: "space-between"}}
                    ></FormOption>
                </Grid>
                <Grid size={6}>
                    <FormOption
                        defaultValue="% в день"
                        inputLabel="Ставка"
                        textFieldLable="" 
                        selectChangeHandler={(e) => {e.preventDefault; console.log(e.target.value)}}
                        inputChangeHandler={(e) => {e.preventDefault; console.log(e.target.value)}}
                        options={money_terms}
                    ></FormOption>
                </Grid>
                <Grid size={3}>
                    <TextField
                        fullWidth
                        id="outlined-select-currency"
                        select
                        label={"Тип кредита"}
                        defaultValue={"аннуитет"}
                        color="blue"
                    >
                      {debt_types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                </Grid>
                <Grid size={3}>
                    <DatePickerUI color="blue"></DatePickerUI>
                </Grid>  
                <Grid size={12}>
                    ‌<Button 
                        fullWidth 
                        size="large" 
                        variant="contained" 
                        color="blue" 
                        sx={{marginTop: 1, borderRadius: 0}}
                        onClick={() =>{}}>Рассчитать</Button>
                </Grid>
            </Grid>
        </Box>
        </ThemeProvider>
    );
}

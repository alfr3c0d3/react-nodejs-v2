import { DateRange } from "react-date-range";
import { useState } from 'react';
import { Button, Paper } from "@mui/material";
import dayjs from "dayjs";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateRangeSelector = ({ onSubmit, ...rest }) => {
    const currentDate = dayjs().toDate();
    const previousMonth = dayjs().subtract(1, 'month');

    const initialRange = {
        startDate: previousMonth.startOf('month').toDate(),
        endDate: currentDate,
        key: 'selection',
    };

    const [range, setRange] = useState(initialRange);

    const handleSubmit = () => {
        const { startDate: from, endDate: to } = range;
        onSubmit({ from, to });
    };

    return (
        <Paper>
            <DateRange
                preventSnapRefocus={true}
                onChange={item => setRange(item.selection)}
                months={2}
                ranges={[range]}
                direction="horizontal"
                maxDate={currentDate}
                {...rest}
            />
            <div style={{ textAlign: 'right' }}>
                <Button
                    hidden={!range.endDate}
                    style={{ bottom: '.5em' }}
                    onClick={handleSubmit}
                >
                    Done
                </Button>
            </div>
        </Paper>
    );
};

export default DateRangeSelector;

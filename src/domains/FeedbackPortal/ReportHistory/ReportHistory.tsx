import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Sort as SortIcon, Search as SearchIcon } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';

import useEndpoint from 'hooks/useEndpoint';
import { getFeedbackReports, getBugReports, Report } from '../api';
//  TODO: replace values with API function to call
const ReportOptions = [
    {
        name: 'Feedback',
    },
    {
        name: 'Bug',
    },
];

const sortingOptions = [
    { name: 'Ascending', value: 'true' },
    { name: 'Descending', value: 'false' },
];

const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            minWidth: 150,
            maxWidth: 350,
        },
    })
);

export default function ReportHistory({}) {
    const classes = useStyles();
    const [getReportEndpoints, setGetReportEndpoints] = React.useState([]);
    const [sortingOrder, setSortingOrder] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [reports, setReports] = React.useState<Report[]>([]);

    const ApiRequests = {
        Feedback: React.useCallback(
            () => getFeedbackReports(page, sortingOrder),
            [page, sortingOrder]
        ),
        Bug: React.useCallback(() => getBugReports(page, sortingOrder), [
            page,
            sortingOrder,
        ]),
    };

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    const handleReportChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setGetReportEndpoints(e.target.value as []);
    };

    const handleSortingChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setSortingOrder(e.target.value as string);
    };

    // TODO: use UseEffect instead?? CAN'T CALL A HOOK INSIDE OF A CALLBACK
    const getReports = () => {
        // TODO: Call all API functions in the array getReportEndpoints
        getReportEndpoints.forEach((endpoint) => {
            // Gets respective api request for the get-report endpoint selected
            const apiRequest = ApiRequests[endpoint];
            // Uses hook to get a sendRequest function
            const [sendRequest, isLoading] = useEndpoint(apiRequest, {
                onSuccess: (results) => {
                    setReports(results.data.reports);
                },
            });
            // Call the sendRequest function to perform the call the api
            sendRequest();
        });
    };

    return (
        <Grid container spacing={5}>
            <Grid container item spacing={5} direction='row'>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Report Type</InputLabel>
                        <Select
                            multiple
                            value={getReportEndpoints}
                            onChange={handleReportChange}
                            input={<Input />}
                        >
                            {ReportOptions.map((ReportOption) => (
                                <MenuItem
                                    key={ReportOption.name}
                                    value={ReportOption.name}
                                >
                                    {ReportOption.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Sorting Order</InputLabel>
                        <Select
                            value={sortingOrder}
                            onChange={handleSortingChange}
                            input={<Input />}
                            IconComponent={() => <SortIcon />}
                        >
                            {sortingOptions.map((sortingOption) => (
                                <MenuItem
                                    key={sortingOption.name}
                                    value={sortingOption.value}
                                >
                                    {sortingOption.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <IconButton
                        color='primary'
                        component='span'
                        onClick={getReports}
                    >
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item>
                <div>
                    <h1>Report Value Selected:</h1>
                    {getReportEndpoints.map((getReportEndpoint) => (
                        <h3>{getReportEndpoint}</h3>
                    ))}
                </div>
                <div>
                    <h1>Sorting Value Selected:</h1>
                    <h2>{sortingOrder}</h2>
                </div>
                <div>
                    <h1>Page Selected:</h1>
                    <h1>{page}</h1>
                </div>
            </Grid>
            <Grid item>
                <Pagination
                    color='primary'
                    count={10}
                    page={page}
                    onChange={handlePageChange}
                />
            </Grid>
        </Grid>
    );
}
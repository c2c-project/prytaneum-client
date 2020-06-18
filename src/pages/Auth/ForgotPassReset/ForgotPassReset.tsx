import React from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

import PasswordResetForm from 'domains/Auth/PasswordResetForm';

import routes from '../routes';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

interface Params {
    token?: string;
}

export default function ForgotPasswordReset() {
    const classes = useStyles();
    const history = useHistory();
    const { token } = useParams<Params>();

    if (!token) {
        return <Redirect to='/login' />;
    }

    return (
        <Container maxWidth='md' className={classes.root}>
            <Grow timeout={300} in>
                <Grid
                    container
                    direction='column'
                    className={classes.root}
                    alignContent='center'
                    justify='center'
                >
                    <Paper className={classes.paper}>
                        <PasswordResetForm
                            token={token}
                            onSuccess={() => {
                                history.push(routes.login);
                            }}
                        />
                    </Paper>
                </Grid>
            </Grow>
        </Container>
    );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../Logo.jpg'

const useStyles = makeStyles(() => ({
    footer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px',
        // backgroundColor: 'green',
    },
    logo: {
        maxWidth: '100%',
        maxHeight: '80%',
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <img
                src="https://www.positivessl.com/images/seals/positivessl_trust_seal_lg_222x54.png"
                alt="PositiveSSL Trust Seal"
                className={classes.logo}
            />
            <img
                src={logo}
                alt="SECTIGO Trust Seal"
                className={classes.logo}
            />
        </footer>
    );
};

export default Footer;

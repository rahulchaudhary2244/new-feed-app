import React from 'react';
import { Box, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <Box className="footer">
            <Typography
                variant="h6"
                component="a"
                href="https://www.venuemonk.com/"
                rel="noopener"
                target="_blank"
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 400,
                    letterSpacing: '0.1rem',
                    color: '#ffcc70',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontSize: '1rem',
                }}
            >
                {`Challenge by Venuemonk`}
            </Typography>
            <Box component="div">
                <Box
                    component="a"
                    href="https://www.linkedin.com/in/rahulchaudhary2244/"
                    rel="noopener"
                    target="_blank"
                    sx={{
                        color: 'white',
                        padding: {
                            xs: '0 0.5rem',
                            sm: '0 1rem',
                            md: '0 1.5rem',
                            lg: '0 2rem',
                        },
                    }}
                >
                    <LinkedInIcon />
                </Box>
                <Box
                    component="a"
                    href="https://github.com/rahulchaudhary2244"
                    rel="noopener"
                    target="_blank"
                    sx={{
                        color: 'white',
                        padding: {
                            xs: '0 0.5rem',
                            sm: '0 1rem',
                            md: '0 1.5rem',
                            lg: '0 2rem',
                        },
                    }}
                >
                    <GitHubIcon />
                </Box>
            </Box>
            <Typography
                variant="h6"
                component="a"
                href="https://github.com/rahulchaudhary2244"
                rel="noopener"
                target="_blank"
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 400,
                    letterSpacing: '0.1rem',
                    color: '#ffcc70',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontSize: '1rem',
                }}
            >
                {`Coded by Rahul Chaudhary ❤`}
            </Typography>
        </Box>
    );
};

export default Footer;

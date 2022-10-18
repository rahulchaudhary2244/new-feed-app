import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar sx={{ backgroundColor: 'black' }}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, color: 'white' }}
                >
                    <Link className="news-logo" to="/news">
                        News
                    </Link>
                </Typography>
            </Toolbar>
        </Box>
    );
};

export default Header;

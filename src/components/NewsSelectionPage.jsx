import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { fetchAllNews } from '../utils/utility';
import NewsFeedCard from './NewsFeedCard';
import CircularProgress from '@mui/material/CircularProgress';

const NewsSelectionPage = () => {
    const [newsFeeds, setNewsFeeds] = useState([]);
    const [isLoading, setLoading] = useState(false);

    /**
     * fetches news data and sets it newsFeeds variable
     */
    const fetchNews = async () => {
        try {
            setLoading(true);
            const data = await fetchAllNews();
            const doneReading = JSON.parse(localStorage.getItem('doneReading'));
            if (doneReading) {
                const unRead = data.filter(
                    (ele) => !doneReading.includes(ele.id)
                );
                const read = data.filter((ele) => doneReading.includes(ele.id));
                setNewsFeeds(unRead.concat(read));
            } else {
                setNewsFeeds(data);
            }
            setLoading(false);
        } catch (error) {
            setNewsFeeds([]);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <Box>
            <Header />
            <Box className="app-container">
                {isLoading ? (
                    <CircularProgress color="secondary" />
                ) : (
                    <Box
                        sx={{
                            width: { xs: '98%', md: '70%' },
                            margin: '2rem auto',
                        }}
                    >
                        <Box
                            sx={{
                                width: '98%',
                                margin: '2rem auto',
                            }}
                        >
                            <Grid
                                container
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                                rowSpacing={{ xs: 1, sm: 5, md: 4 }}
                            >
                                {newsFeeds.map((ele) => (
                                    <Grid item xs={12} md={6} key={ele.id}>
                                        <NewsFeedCard newsFeed={ele} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                )}
            </Box>
            <Footer />
        </Box>
    );
};

export default NewsSelectionPage;

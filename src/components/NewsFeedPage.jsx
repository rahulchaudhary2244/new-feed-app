import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NewsContent from './NewsContent';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import {
    getPreviousNewsById,
    getLatestUnseenNews,
    isPreviousNewsExist,
    isNextNewsExist,
    setIdToLocalStorage_doneReading,
} from '../utils/utility';
import CircularProgress from '@mui/material/CircularProgress';

const NewsFeedPage = () => {
    const location = useLocation();
    const [activeNewsFeed, setActiveNewsFeed] = useState(
        location.state.newsFeed
    );
    const [previousNewsBtn, setPreviousNewsBtn] = useState(false);
    const [nextNewsBtn, setNextNewsBtn] = useState(false);
    const [isLoading, setLoading] = useState(false);

    /**
     * fetches values for next and previous state button and sets it
     */
    const fetchPreviousAndNextBtnState = async () => {
        setLoading(true);
        setPreviousNewsBtn(await isPreviousNewsExist(activeNewsFeed.id));
        setNextNewsBtn(await isNextNewsExist(activeNewsFeed.id));
        setLoading(false);
    };

    /**
     *
     * @param {Click} e
     */
    const handleLeftArrowClick = async (e) => {
        setLoading(true);
        const previousNews = await getPreviousNewsById(activeNewsFeed.id);
        setActiveNewsFeed(previousNews);
        setLoading(false);
    };

    /**
     *
     * @param {Click} e
     */
    const handleRightArrowClick = async (e) => {
        setLoading(true);
        const unseenNewsData = await getLatestUnseenNews(activeNewsFeed.id);
        setActiveNewsFeed(unseenNewsData);
        setLoading(false);
    };

    useEffect(() => {
        setIdToLocalStorage_doneReading(activeNewsFeed.id);
        fetchPreviousAndNextBtnState();
    }, [activeNewsFeed]);

    return (
        <>
            <Header />
            <Box className="app-container">
                {isLoading ? (
                    <CircularProgress color="secondary" />
                ) : (
                    <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={0.5}
                        sx={{
                            width: { xs: '95%', md: '60%' },
                            margin: '1rem auto',
                        }}
                    >
                        {previousNewsBtn && (
                            <Box
                                className="vertical-bars"
                                component="div"
                                onClick={handleLeftArrowClick}
                            >
                                <ChevronLeftIcon fontSize="small" />
                            </Box>
                        )}
                        <Box>
                            <NewsContent activeNewsFeed={activeNewsFeed} />
                        </Box>
                        {nextNewsBtn && (
                            <Box
                                className="vertical-bars"
                                component="div"
                                onClick={handleRightArrowClick}
                            >
                                <ChevronRightIcon fontSize="small" />
                            </Box>
                        )}
                    </Stack>
                )}
            </Box>
            <Footer />
        </>
    );
};

export default NewsFeedPage;

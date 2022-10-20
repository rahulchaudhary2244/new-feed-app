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
import { useSwipeable } from 'react-swipeable';

const NewsFeedPage = () => {
    const location = useLocation();
    const [activeNewsFeed, setActiveNewsFeed] = useState(
        location.state.newsFeed
    );
    const [previousNewsBtn, setPreviousNewsBtn] = useState(false);
    const [nextNewsBtn, setNextNewsBtn] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const handlers = useSwipeable({
        onSwipedRight: (e) => {
            leftArrowLogic();
        },
        onSwipedLeft: (e) => {
            rightArrowLogic();
        },
    });

    /**
     * Performs logic for left arrow click
     */
    const leftArrowLogic = async () => {
        if (!previousNewsBtn) return;
        setLoading(true);
        const previousNews = await getPreviousNewsById(activeNewsFeed.id);
        setActiveNewsFeed(previousNews);
        setLoading(false);
    };

    /**
     * Performs logic for right arrow click
     */
    const rightArrowLogic = async () => {
        if (!nextNewsBtn) return;
        setLoading(true);
        const unseenNewsData = await getLatestUnseenNews(activeNewsFeed.id);
        setActiveNewsFeed(unseenNewsData);
        setLoading(false);
    };

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
    const handleLeftArrowClick = (e) => {
        leftArrowLogic();
    };

    /**
     *
     * @param {Click} e
     */
    const handleRightArrowClick = (e) => {
        rightArrowLogic();
    };

    useEffect(() => {
        setIdToLocalStorage_doneReading(activeNewsFeed.id);
        fetchPreviousAndNextBtnState();
        // eslint-disable-next-line
    }, [activeNewsFeed]);

    return (
        <>
            <Header />
            <Box {...handlers} className="app-container">
                {isLoading ? (
                    <Box className="loading-container">
                        <CircularProgress color="secondary" />
                    </Box>
                ) : (
                    <Box className="content-container">
                        <Stack
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                            spacing={0.5}
                            sx={{
                                width: { xs: '100%', md: '60%' },
                                margin: '1rem auto',
                            }}
                        >
                            <Box
                                className="vertical-bars"
                                component="div"
                                onClick={handleLeftArrowClick}
                            >
                                {previousNewsBtn && (
                                    <ChevronLeftIcon fontSize="small" />
                                )}
                            </Box>
                            <Box>
                                <NewsContent activeNewsFeed={activeNewsFeed} />
                            </Box>
                            <Box
                                className="vertical-bars"
                                component="div"
                                onClick={handleRightArrowClick}
                            >
                                {nextNewsBtn && (
                                    <ChevronRightIcon fontSize="small" />
                                )}
                            </Box>
                        </Stack>
                    </Box>
                )}
            </Box>
            <Footer />
        </>
    );
};

export default NewsFeedPage;

import { Box, Typography, Stack } from '@mui/material';
import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment/moment';
import { isNewsViewed } from '../utils/utility';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

/**
 * splits content paragraph and removes [+ 3042 chars] from content and sends proper text
 * @param {String} str
 * @returns
 */
const getContentWithoutDots = (content = '') => content.split('[+')[0];

const NewsContent = ({ activeNewsFeed }) => {
    const { title, urlToImage, publishedAt, url, id, description, content } =
        activeNewsFeed;

    return (
        <Box component="div">
            <Typography variant="h6" component="h6">
                {title}
            </Typography>
            {/* <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                >
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="overline" display="block">
                        {moment(publishedAt).fromNow()}
                    </Typography>
                </Stack>
                {isNewsViewed(id) ? (
                    <VisibilityIcon />
                ) : (
                    <VisibilityOutlinedIcon />
                )}
                </Stack>*/}
            <br />
            <Box component="a" href={url} rel="noopener" target="_blank">
                <Box
                    component="img"
                    src={urlToImage}
                    className="news-image"
                    loading="lazy"
                />
            </Box>
            <br />
            <Typography variant="subtitle1">{description}</Typography>
            <br />
            <Typography variant="subtitle1">
                {getContentWithoutDots(content)}
                <Box component="a" href={url} rel="noopener" target="_blank">
                    {`Read more`}
                </Box>
            </Typography>
        </Box>
    );
};

export default NewsContent;

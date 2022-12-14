import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { isNewsViewed } from '../utils/utility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment/moment';

const NewsFeedCard = ({ newsFeed }) => {
    const { title, urlToImage, publishedAt, url, id } = newsFeed;
    const navigate = useNavigate();

    /**
     *
     * @param {Click} e
     */
    const handleClick = (e) => {
        navigate(`/news/${id}`, {
            state: {
                newsFeed,
            },
        });
    };

    return (
        <Card>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    height="200"
                    image={urlToImage}
                    alt={id}
                    loading="lazy"
                    className={!!urlToImage ? '' : 'vissibility-hidden'}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Stack
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
                                {moment(publishedAt).calendar()}
                            </Typography>
                        </Stack>
                        {isNewsViewed(id) && <VisibilityIcon />}
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default NewsFeedCard;

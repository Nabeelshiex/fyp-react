import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        minWidth: 340,
        maxWidth: 340,
        minHeight: 260,
        maxHeight: 260
    },
    nav: {
        color: '#f50057',
        textDecoration: 'none'
    }
});

function PostOnProfile({ id, title, description, image }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <NavLink className={classes.nav} to={`/post/${id}`}>
                    <CardMedia
                        component="img"
                        alt="No image"
                        height="140"
                        image={`http://127.0.0.1:8000${image}`}
                        title="Contemplative Reptile"
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </NavLink>
            </CardActionArea>
        </Card >
    );
}

export default PostOnProfile;
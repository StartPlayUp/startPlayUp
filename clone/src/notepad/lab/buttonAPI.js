import React from 'react';
import {styled} from '@material-ui/core/styles';
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
});

const useStyles = makeStyles(theme => ({
    root: props => ({
        backgroundColor: props.backgroundColor,
        color: theme.color,
    }),
}));

export default function StyledComponents() {
    return (
        <React.Fragment>
            <MyButton color="red">red</MyButton>
            <MyButton color="blue">blue</MyButton>
        </React.Fragment>
    )
}
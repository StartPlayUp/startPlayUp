import React, {Component} from "react";
import clsx from "clsx";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// Internal components
import Sidebar from "./Sidebar";
import {useHistory} from "react-router-dom";
import * as S from '../../Style/WebFrameStyle'
import transitions from "@material-ui/core/styles/transitions";
import Animated from "animated/lib/targets/react-dom";
import Easing from "animated/lib/Easing";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        textDecoration: 'none',
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: "none",

    },
    drawer: {
        width: drawerWidth,
        flexShrink: 1
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        // display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginRight: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: 0
    }
}));
class SlideBar extends Component {
    animatedValue = new Animated.Value(0)
    animate = () => {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.elastic(1)
            }
        ).start();
    }
    render() {
        const marginLeft = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-120, 0],
        })
        return (
            <div className="App">
                <div
                    // style={styles.button}
                    onClick={this.animate}>Animate</div>
                <Animated.div
                    style={
                        Object.assign(
                            {},
                            // styles.box,
                            { opacity: this.animatedValue, marginLeft })}>
                </Animated.div>
            </div>
        );
    }
}
export default function PersistentDrawerLeft({isOpen, isSetOpen, routes, children}) {
    const classes = useStyles();
    const history = useHistory()
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        // isSetOpen(tu)
        setOpen(true);
    };

    const handleDrawerClose = () => {
        isSetOpen(false)
        setOpen(false);
        history.push({
            pathname: '/'
        })
    };

    return (
        <div className={classes.root}>
            {/*<AppBar*/}
            {/*    position="inherit"*/}
            {/*    className={clsx(classes.appBar, {*/}
            {/*        [classes.appBarShift]: open*/}
            {/*    })}*/}
            {/*>*/}
            {/*    <Toolbar>*/}
            {/*        <Typography variant="h6" noWrap>*/}
            {/*            Lazy loading demo*/}
            {/*        </Typography>*/}
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {/*<IconButton onClick={()=>isSetOpen(false)}>*/}
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon/>
                        ) : (
                            <ChevronRightIcon/>
                        )}
                    </IconButton>
                </div>
                <Divider/>
                <Sidebar routes={routes}/>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                <div className={classes.drawerHeader}/>
                <React.Suspense fallback="loading ..">{children}</React.Suspense>
            </main>
        </div>
    );
}
{/*<CssBaseline />*/}
{/*<AppBar*/}
{/*    position="inherit"*/}
{/*    className={clsx(classes.appBar, {*/}
{/*        [classes.appBarShift]: open*/}
{/*    })}*/}
{/*>*/}
{/*    <Toolbar>*/}
{/*        <Typography variant="h6" noWrap>*/}
{/*            Lazy loading demo*/}
{/*        </Typography>*/}
{/*    </Toolbar>*/}
{/*</AppBar>*/}
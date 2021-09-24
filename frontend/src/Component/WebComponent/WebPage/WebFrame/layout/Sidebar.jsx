import React from "react";
import {Link} from "react-router-dom";

import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
// Material UI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// Material UI Icons
import InboxIcon from "@material-ui/icons/MoveToInbox";

const useStyles = makeStyles(theme => ({
    list: {
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // fontSize : "14px"
    },
    listItem: {
        // textTransform: "capitalize",
        // textSizeAdjust: "14px"
    }
}));

function Sidebar({routes}) {
    const classes = useStyles();

    const appRoutes = Object.entries(routes)
        .filter(([key]) => {
            return !key.includes("__hidden");
        })
        .map(([key, {name = "", route, bottom}]) => {
            return {
                key,
                name,
                route,
                bottom
            };
        });

    const topMenu = appRoutes.filter(route => !route.bottom);
    const btmMenu = appRoutes.filter(route => route.bottom);

    return (
        <List>

            <div className={classes.list}>
                <div>
                    {topMenu.map(({key, name, route}) => (
                        <ListItem button key={key} component={Link} to={route}>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={name}
                                classes={{root: clsx(classes.listItem)}}
                            />
                        </ListItem>
                    ))}
                </div>
                <div>
                    {btmMenu.map(({key, name, route}) => (
                        <ListItem button key={key} component={Link} to={route}>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={name}
                                classes={{root: clsx(classes.listItem)}}
                            />
                        </ListItem>
                    ))}
                </div>
            </div>
        </List>
    );
}

Sidebar.displayName = "Sidebar";

export default Sidebar;

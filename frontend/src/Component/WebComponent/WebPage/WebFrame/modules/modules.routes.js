export default {
    home: {
        name: "home",
        route: "/"
    },
    assets: {
        name: "assets",
        route: "/assets"
    },
    users: {
        name: "user",
        route: "/user"
    },
    // will not show in sidebar menu
    "user-profile__hidden": {
        name: "",
        route: "/user/:id"
    },
    setting: {
        name: "Setting",
        route: "/setting",
        bottom: true
    },
    signout: {
        name: "Signout",
        route: "/logout",
        bottom: true
    },
    // will not show in sidebar menu
    "not-found__hidden": {
        name: "",
        route: "*"
    }
};

export default {
    main: {
        name: "main",
        route: "/main",
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
        route: "/main",
        bottom: true
    },
    signout: {
        name: "Signout",
        route: "/signout",
        bottom: true
    },
    // will not show in sidebar menu
    "not-found__hidden": {
        name: "",
        route: "*"
    }
};

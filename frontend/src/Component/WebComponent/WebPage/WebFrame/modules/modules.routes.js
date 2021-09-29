export default {
    main: {
        name: "main",
        route: "/",
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

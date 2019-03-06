const dashboardStyles = {
    wrapper: {
        position: "relative",
        top: 0,
        height: "100vh"
    },
    sidebarWrapper: {
        position: "relative",
        height: "calc(100vh - 75px)",
        overflow: "auto",
        width: "260px",
        zIndex: "4",
    },
    background: {
        position: "absolute",
        zIndex: "1",
        height: "100%",
        width: "100%",
        display: "block",
        top: "0",
        left: "0",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        "&:after": {
            position: "absolute",
            zIndex: "3",
            width: "100%",
            height: "100%",
            content: '""',
            display: "block",
            background: "#000",
            opacity: ".8"
        }
    }
}

module.exports = {
    dashboardStyles
}


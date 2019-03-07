const dashboardStyles = {
    wrapper: {
      position: "relative",
      top: "0",
      height: "100vh"
    },
    mainPanel: {
        width: `calc(100% - 260px)`,
        overflow: "auto",
        position: "relative",
        float: "right",
        maxHeight: "100%",
        width: "100%",
        overflowScrolling: "touch"
    },
    content: {
      marginTop: "70px",
      padding: "30px 15px",
      minHeight: "calc(100vh - 123px)"
    },
    container: {
      paddingRight: "15px",
      paddingLeft: "15px",
      marginRight: "auto",
      marginLeft: "auto"
    },
    map: {
      marginTop: "70px"
    }
}

export default dashboardStyles

const styles = {
    placeHolderTop: {
        flexGrow: .618,
    },
    placeHolderBottom: {
        flexGrow: 1,
    },
    signinBox: {
        width: "400px",
        background: "white",
        padding: "40px 0 33px 0",
        borderRadius: "3px",
        border: "1px solid #eeeeee",
        margin: "10vh auto"
    },
    signinContainer: {
        maxWidth: "340px",
        margin: "0 auto",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch"
    },
    msuLogo: {
        height: "77px",
        marginBottom: "35px",
        verticalAlign: "middle"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
    },
    wrapper: {
        display: "inline-block",
        position: "relative",
        padding: "8.85px 13px",
        fontSize: "14px",
    },
    textField: {
        width: "100%",
        boxSizing: "border-box",
        fontWeight: "300",
        textOverflow: "ellipsis",
        transition: ".4s all",
    },
    button: {
        position: "relative",
        width: "100%",
        borderRadius: "3px",
        boxSizing: "border-box",
        marginTop: "10px"
    },
    actions: {
        display: "flex",
        alignItems: "center",
        marginTop: "20px",
        justifyContent: "space-between"
    }
}

module.exports = {
    styles
}
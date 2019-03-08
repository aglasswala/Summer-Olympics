import React from 'react' 
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

const styles = theme => ({
    tableResponsive: {
        width: "100%",
        marginTop: theme.space.unit * 3,
        overflowX: "auto"
    },
    table: {
        marginBottom: "0",
        width: "100%",
        maxWidth: "100%",
        backgroundColor: "transparent",
        borderSpacing: "0",
        borderCollapse: "collapse"
    }
})

const EventTable = ({ ...props }) => {
    const { classes, tableHead, tableData } = props
    return (
        <div className={classes.tableResponsive}>
            <Table className={classes.table}>
                
            </Table>
        </div>
    )
}

export default EventTable
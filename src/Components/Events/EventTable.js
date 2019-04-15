import React, { Component } from 'react' 
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import BuyTicketForm from '../Tickets/BuyTicketForm'

const tableStyles = theme => ({
    tableResponsive: {
        width: "100%",
        overflowX: "auto"
    },
    table: {
        marginBottom: "0",
        width: "100%",
        maxWidth: "100%",
        backgroundColor: "transparent",
        borderSpacing: "0",
        borderCollapse: "collapse"
    },
    tableHeaderColor: {
        color: "#9c27b0"
    },
    tableCell: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "300",
        lineHeight: "1.42em",
        padding: "12px 8px",
        veritcalAlign: "middle"
    },
    tableHeadCell: {
        color: "inherit",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "300",
        lineHeight: "1.5em",
        fontSize: "1em"
    }
})

class EventTable extends Component {

    state = {
      open: false
    };

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    render() {
        const { classes, tableHead, tableData } = this.props
        return (
            <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHeaderColor}>
                        <TableRow>
                            {tableHead.map((prop, key) => {
                                return (
                                    <TableCell
                                        className={classes.tableCell + " " + classes.tableHeadCell}
                                        key={key}
                                    >
                                        {prop}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((prop, key) => {
                        return (
                          <TableRow key={key} onClick={this.handleClickOpen}>
                            {prop.map((prop, key) => {
                              return (
                                <TableCell className={classes.tableCell} key={key}>
                                  {prop}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                </Table>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <DialogTitle> {"Buy this ticket"}</DialogTitle>
                  <DialogContent>
                    <BuyTicketForm />
                  </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(tableStyles)(EventTable)
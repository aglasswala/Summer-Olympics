import React, { Component } from 'react'
import { withStyles, Grid } from '@material-ui/core'
import EventTable from './EventTable'

const styles = {
    gridContainer: {
        margin: "0 -15px !important",
        width: "unset"
    },
    gridItem: {
        padding: "0 15px !important"
    },
    card: {
        border: "0",
        marginBottom: "30px",
        marginTop: "30px",
        borderRadius: "6px",
        color: "rgba(0, 0, 0, 0.87)",
        background: "#fff",
        width: "100%",
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        wordWrap: "break-word",
        fontSize: ".875rem"
    },  
    cardHeader: {
        padding: "0.75rem 1.25rem",
        marginBottom: "0",
        borderBottom: "none",
        zIndex: "3 !important",
        "&:first-child": {
          borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
        },
        color: "#FFFFFF",
        background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
        boxShadow:
          "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)"
    },
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    },
    cardBody: {
        padding: "0.9375rem 20px",
        flex: "1 1 auto",
        position: "relative"
    }
}

class Event extends Component { 

    state = {
        tableData: [[]]
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/events")
        .then(response => response.json())
        .then(data => {
            this.setState({
                tableData: data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { classes } = this.props
        console.log(this.state)
        return (
            <Grid container className={classes.gridContainer}>
                <Grid item className={classes.gridItem} xs={12} sm={12} md={12}>
                    <div className={classes.card}>
                        <div className={classes.cardHeader}>
                            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
                            <p className={classes.cardCategoryWhite}>
                              Here is a subtitle for this table
                            </p>
                        </div>
                        <div className={classes.cardBody}>
                            <EventTable 
                                tableHead={["Event", "City", "Stadium", "Time", "Attendees"]}
                                tableData={this.state.tableData}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Event)
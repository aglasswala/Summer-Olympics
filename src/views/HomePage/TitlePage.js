import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const TitlePage = () => {
    return (
        <div>
            This is the home page
            <List>
                <NavLink
                    to='/register'
                >
                    <ListItem button>
                        <ListItemText 
                            primary={"Register"}
                        />
                    </ListItem>
                </NavLink>
                <NavLink
                    to='/login'
                >
                    <ListItem button>
                        <ListItemText 
                            primary={"Login"}
                        />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    )
}

export default TitlePage
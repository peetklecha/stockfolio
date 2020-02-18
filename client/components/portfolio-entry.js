/* eslint-disable react/display-name */
import React from 'react'
import {ListItem, ListItemText, Divider} from '@material-ui/core'

export default ({ticker, shares, value}) => {
  return (
    <div className="list-item">
      <ListItem>
        <ListItemText primary={ticker} secondary={`${shares} shares`} />
        <ListItemText primary={'$' + value} />
      </ListItem>
      <Divider />
    </div>
  )
}

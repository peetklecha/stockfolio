/* eslint-disable react/display-name */
import React from 'react'
import {ListItem, ListItemText, Divider} from '@material-ui/core'

export default ({symbol, shares, value, status}) => {
  return (
    <div className={'list-item ' + status}>
      <ListItem>
        <ListItemText primary={symbol} secondary={`${shares} shares`} />
        <ListItemText primary={'$' + value} />
      </ListItem>
      <Divider />
    </div>
  )
}

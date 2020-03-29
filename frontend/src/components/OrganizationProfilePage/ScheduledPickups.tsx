import React, { useState } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { DonationType } from '../../types/DonationType';

type Props = {
  pickups: DonationType[];
}

const ScheduledPickups: React.FC<Props> = (props: Props) => {
  return (
    <>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Donator</TableCell>
          <TableCell>Item</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Contact Info</TableCell>
          <TableCell>Scheduled Pickup Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.pickups.map((pickup: DonationType) => {
          <TableRow>
            <TableCell>{pickup.name}</TableCell>
            <TableCell>{pickup.item_type}</TableCell>
            <TableCell>{pickup.amount}</TableCell>
            <TableCell>{pickup.name}</TableCell>
            <TableCell>{pickup.name}</TableCell>
            <TableCell>{pickup.name}</TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>

    </>
  )
}

export default ScheduledPickups;
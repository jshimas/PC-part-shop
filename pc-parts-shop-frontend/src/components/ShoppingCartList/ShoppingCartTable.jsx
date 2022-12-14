import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import CartApi from "../../apis/CartApi";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from "../../app/slices/cartSlice";

export default function ShoppingCartTable({ items }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDecrease = async (itemId) => {
    try {
      const cartApi = new CartApi();
      await cartApi.decreaseItemQuantity(itemId);
      dispatch(decreaseQuantity(itemId));
    } catch (err) {
      throw err;
    }
  };

  const handleIncrease = async (itemId) => {
    try {
      const cartApi = new CartApi();
      await cartApi.increaseItemQuantity(itemId);
      dispatch(increaseQuantity(itemId));
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const cartApi = new CartApi();
      await cartApi.deleteCartItem(itemId);
      dispatch(deleteItem(itemId));
    } catch (err) {
      throw err;
    }
  };

  const renderTable = (
    <TableContainer>
      <Table aria-label="parts table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                width: "30%",
                fontWeight: "bold",
                fontSize: "medium",
                textTransform: "uppercase",
              }}
            >
              Name
            </TableCell>
            <TableCell
              align="right"
              sx={{
                width: "15%",
                fontWeight: "bold",
                fontSize: "medium",
                textTransform: "uppercase",
              }}
            >
              Manufacturer
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: "bold",
                fontSize: "medium",
                textTransform: "uppercase",
              }}
            >
              Release Date
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: "bold",
                fontSize: "medium",
                textTransform: "uppercase",
              }}
            >
              Price
            </TableCell>
            <TableCell
              align="center"
              sx={{
                width: "15%",
                fontWeight: "bold",
                fontSize: "medium",
                textTransform: "uppercase",
              }}
            >
              Amount
            </TableCell>
            <TableCell>{""}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row" sx={{ pl: 1 }}>
                <Button
                  sx={{ textTransform: "none", textAlign: "left" }}
                  variant="text"
                  onClick={() =>
                    navigate(`/parts/${item.Part.type}/${item.Part.id}`)
                  }
                >
                  {item.Part.name}
                </Button>
              </TableCell>
              <TableCell align="right">{item.Part.manufacturer}</TableCell>
              <TableCell align="right">{item.Part.releaseDate}</TableCell>
              <TableCell align="right">{item.Part.price}</TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={() => item.quantity > 1 && handleDecrease(item.id)}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                {item.quantity}
                <IconButton onClick={() => handleIncrease(item.id)}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell align="left" size="small" sx={{ p: 0 }}>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow></TableRow>
        </TableBody>
      </Table>
      <Typography sx={{ textAlign: "right", p: 2, fontWeight: "bold" }}>
        Total:{" "}
        {items
          .reduce((acc, item) => acc + item.quantity * item.Part.price, 0)
          .toFixed(2)}{" "}
        &euro;
      </Typography>
    </TableContainer>
  );

  return items.length !== 0 ? (
    renderTable
  ) : (
    <Typography sx={{ textAlign: "center" }}>
      Shopping cart is empty.
    </Typography>
  );
}

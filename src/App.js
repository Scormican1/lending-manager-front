import { createContext, useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import Navbar from "./Navbar";
import TodoForm from "./Todoform";
import "./App.css"

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [itemsBorrowed, setItemsBorrowed] = useState("");
  useEffect(() => {
    fetch("https://lending-manager-5f371.uk.r.appspot.com/borrow")
      .then((res) => res.json())
      .then((data) => setItemsBorrowed(data));
  }, []);
  // console.log(itemsBorrowed);

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  return (
    <div className="App">
      <Navbar />
      <div className="content"></div>
      <TodoForm />
      <section
        style={{
          display: "flex",
          flexFlow: "row wrap",
          gap: "20px",
          padding: "40px",
        }}
      >
        {itemsBorrowed ? (
          itemsBorrowed.map((item) => {
            return (
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {item.borrowerName}
                  </Typography>
                  <Typography>
                    Item: {item.item}
                  </Typography>
                  <Typography>
                  Date borrowed: {item.dateBorrowed}
                  </Typography>
                  <Typography>
                  Return date: {item.returnDate}
                  </Typography>
                  <StyledRating
  name="customized-color"
  defaultValue={2}
  getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
  precision={0.5}
  icon={<FavoriteIcon fontSize="inherit" />}
  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
/>
                </CardContent>
              </Card>
            

              //  <div key={item.id} style={{backgroundColor: "white", padding: "20px", borderRadius: 8}}>
              //    <p>{item.borrowerName}</p>
              //    <p>{item.item}</p>
              //    <p>{item.dateBorrowed}</p>
              //    <p>{item.returnDate}</p>
              //  </div>
            );
          })
        ) : (
          <></>
        )}
      </section>
    </div>
  );
}

export default App;

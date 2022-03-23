import React, { useState, useEffect } from 'react';
import { DataGrid  } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HeartRating from "./HeartRating"

const VendorsList = props => {
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    setSelectionModel([props.dishId])
  }, [props.dishId])

  // filter search results only if user is actively searching
  let filteredList = [...props.dishesRatings]
  if (props.searchValue) {
    filteredList = props.dishesRatings.filter(item => {
      const title = item.title.toLowerCase();
      const searchValue = props.searchValue.toLowerCase();
      return title.includes(searchValue)
    })
  }
  
  const rows = filteredList.map(item => {
    const {average_rating, id, price_cents, country_style} = item;
    const formattedNumber = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'CAD' }).format(price_cents / 100);
    const rowObj = {id: id, col1: id, col2: country_style, col3: formattedNumber, col4: average_rating};
    return rowObj;
  })

  // gets title into render cell for each item in the datagrid
  const renderTitle = (id, arr) => {
    for (const obj of arr) {
      if (obj.id === id) {
        return obj.title
      }
    }
  }
  
  const columns = [
    { field: 'col1', 
      headerName: 'Dish', 
      minWidth: 200,
      renderCell: ({id}) => (
        <Typography
          onClick={() => props.dishDetails(id)}
          onMouseOver={()=> props.setDishId(id)}
          onMouseOut={()=> props.setDishId(null)}
          >
            {renderTitle(id, filteredList)}
        </Typography>
      )
      },
    { field: 'col2', flex: 1, headerName: 'Style', width: 100 },
    { field: 'col3', flex: 1, headerName: 'Price', width: 100 },
    { field: 'col4', 
      flex: 1,
      headerName: 'Rating', 
      width: 150,
      renderCell: ({value}) => (
        <HeartRating 
          rating={value} />
      ),}
  ];

  return (
    <Box sx={{display: 'flex'}}>
      <DataGrid
        selectionModel={selectionModel}
        rows={rows} columns={columns} style={{ minHeight: '50vh', width: 548 }}
        />
    </Box>
  );
};

export default VendorsList;

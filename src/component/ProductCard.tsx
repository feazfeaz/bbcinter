import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const ProductCard = ({ name, priceUsd, imageUrl } : any) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Price: ${priceUsd}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

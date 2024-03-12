import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import { Box, Grid, CircularProgress, Backdrop } from "@mui/material";
import ActionItem from "./actionItem";
import ProductDetail from "./productDetail";
import { getPincodes } from "../../Redux/Actions/PinCodeAction";
import { getProductDetails } from "../../Redux/Actions/ProductAction";
import { getMobileDetails } from "../../Redux/Actions/MobileAction";
import { Dispatch } from "redux";

interface RootState {
  getProductDetails: {
    loading: boolean;
    product: any; // Replace 'any' with type of product data
  };
  getMobileDetails: {
    loading1: boolean;
    mobile1: any; // Replace 'any' with type of mobile data
  };
  getPincodes: {
    pincodes: any; // Assuming pincodes are strings
  };
}

const Component = styled(Box)`
  background: #f2f2f2;
  margin-top: 55px;
`;

const Container = styled(Grid)(({ theme }) => ({
  background: "#ffffff",
  display: "flex",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const RightContainer = styled(Grid)`
  margin-top: 50px;
`;

const DetailView: React.FC = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const { id, mobile } = useParams<{ id?: any; mobile?: string }>();
  const { loading, product } = useSelector((state: RootState) => state.getProductDetails);
  const { loading1, mobile1 } = useSelector((state: RootState) => state.getMobileDetails);
  const { pincodes } = useSelector((state: RootState) => state.getPincodes);

  useEffect(() => {
    dispatch(getPincodes());
  }, [dispatch]);

  useEffect(() => {
    if (!mobile) {
      if (product && id !== product.id) dispatch(getProductDetails(id));
    }
  }, [dispatch, id, loading, product, mobile]);

  useEffect(() => {
    if (mobile) {
      if (mobile1 && id !== mobile1.id) dispatch(getMobileDetails(id));
    }
  }, [dispatch, id, loading1, mobile1, mobile]);

  return (
    <Component>
      {mobile ? (
        loading1 ? (
          <Backdrop sx={{ color: "#fff " }} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Container container>
            <Grid item lg={4} md={4} sm={8} xs={12}>
              <ActionItem mobile={mobile1} product={null} />
            </Grid>
            <RightContainer item lg={8} md={8} sm={8} xs={12} marginTop={3} paddingLeft={6}>
              <ProductDetail mobile={mobile1} pincodes={pincodes}  />
            </RightContainer>
          </Container>
        )
      ) : loading ? (
        <Box style={{ display: "flex", justifyContent: "center", height: "90vh", alignItems: "center" }}>
          <CircularProgress />
        </Box>
      ) : product && Object.keys(product).length ? (
        <Container container>
          <Grid item lg={5} md={4} sm={8} xs={12}>
            <ActionItem product={product} mobile={null} />
          </Grid>
          <RightContainer item lg={7} md={8} sm={8} xs={12}>
            <ProductDetail product={product} pincodes={pincodes} mobile={null} />
          </RightContainer>
        </Container>
      ) : null}
    </Component>
  );
};

export default DetailView;

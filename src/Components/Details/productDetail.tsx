import { Typography, Box, Table, TableRow, TableCell, Button, InputBase, Breadcrumbs } from "@mui/material";
import { LocalOffer as Badge } from '@mui/icons-material';
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Reviews from "./reviews";
import { getReviews } from "../../Services/api";
import { styled } from "@mui/system";


const fassured = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

const coinUrl = 'https://rukminim1.flixcart.com/lockin/350/185/images/CCO__PP_2019-07-14.png?q=50';

const SmallText = styled(Box)`
  & > p {
    font-size: 14px;
    margin-top: 10px;
  }
`;
const StyledBadge = styled(Badge)`
  margin-right: 10px;
  font-size: 15px;
`;

const ColumnText = styled(TableRow)`
  font-size: 14px;
  vertical-align: baseline;
  & > td {
    font-size: 14px;
    margin-top: 10px;
    border: none;
  }
`;

interface ProductDetailProps {
  product?: any;
  pincodes: any;
  mobile: any
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, mobile, pincodes }) => {
  const [pinErr, setPinErr] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [reviewsData, setReviews] = useState<any>({});
  const navigate = useNavigate();
  const date = new Date().getTime() + 5 * 24 * 60 * 60 * 1000;
  const date1 = new Date(date);

  useEffect(() => {
    fetchData();
    document.body.scrollTop = 0;
  }, []);

  async function fetchData(searchstr = "") {
    let data = await getReviews(mobile?.id, searchstr);
    setReviews(data);
  }

  const addToQueryString = (str: string, paramName: string, paramValue: string) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;

  const handleChange = (options: any) => {
    callURL(`/mobile/${mobile?.id}`, options);
  };

  const callURL = (url: string, options: { reviewPage: string }) => {
    let searchStr = makeSearchString(options);
    fetchData(searchStr);
    navigate({ pathname: url, search: searchStr });
  };

  const makeSearchString = (options: { reviewPage: string }) => {
    let { reviewPage } = options;
    let searchString = "";
    searchString = addToQueryString(searchString, "reviewPage", reviewPage);
    return searchString;
  };

  const checkPincode = () => {
    if (pincode.length !== 6 || isNaN(Number(pincode))) {
      setPinErr("Enter a valid 6 digit pin");
      return;
    }
    let index = pincodes
      .find((ele: any) => ele.pincode === pincode)
      ?.mobileList?.findIndex((m: any) => m.id === mobile?.id);
    if (index !== undefined && index >= 0) setPinErr("Delivery available");
    else {
      setPinErr("Delivery not available");
    }
  };

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" style={{ fontSize: '14px', marginBottom: '5px' }}>
        <Link style={{ textDecorationLine: 'blink' }} to={"/"}>
          Home
        </Link>
        {mobile ? (
          <Link style={{ textDecorationLine: 'blink' }} to={"/allmobiles"}>
            All Mobiles
          </Link>
        ) : null}
        <Typography>{mobile ? mobile.name : product?.title.longTitle}</Typography>
      </Breadcrumbs>

      <Typography fontWeight={600}>{mobile ? mobile.name : product?.title.longTitle}</Typography>

      <Typography style={{ marginTop: 5, color: "#878787", fontSize: 14 }}>
        8 ratings and 1 reviews
        <Box component="span">
          <img
            src={fassured}
            alt="fassured"
            style={{ width: 77, marginLeft: 20 }}
          />
        </Box>
      </Typography>

      <Typography>
        <Box component='span' style={{ fontSize: 28 }}>₹{mobile ? mobile.price : product?.price.cost}</Box> &emsp;
        {/* <Box component='span' style={{ color: "#878787" }}><strike>₹{mobile ? mobile.prevPrice : product?.price.mrp}</strike></Box> */}
        <Box component='span' style={{ color: "#388E3C" }}>{mobile ? mobile.discount + '%' : product?.price.discount} off</Box>
      </Typography>

      <Typography>Available Offers</Typography>
      <SmallText>
        <Typography><StyledBadge color="success" /> Get extra 20% off upto ₹50 on 1 items </Typography>
        <Typography><StyledBadge color="success" /> Sign up for Flipkart Pay Later and get Flipkart Gift Card worth up to ₹1000 </Typography>
        <Typography><StyledBadge color="success" /> 10% off on ICICI Bank Credit Card EMI Transactions, up to ₹1250, on orders of ₹5,000 and above </Typography>
        <Typography><StyledBadge color="success" /> 10% off on IDBI Bank Debit and Credit Card Transactions, up to ₹500. On orders of ₹1,500 and above </Typography>
        <Typography><StyledBadge color="success" /> Flat ₹100 Instant Cashback on Paytm Wallet. Min Order Value ₹1000. Valid once per Paytm account</Typography>
      </SmallText>

      {/* <Table>
        <ColumnText>
          <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
          <TableCell style={{ fontWeight: 600 }}>Delivery by {date1.toDateString()} | ₹40</TableCell>
        </ColumnText>
        <ColumnText>
          <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
          <TableCell>No Warranty</TableCell>
        </ColumnText>
        <ColumnText>
          <TableCell style={{ color: '#878787' }}>Seller</TableCell>
          <TableCell >
            <Box style={{ color: '#2874f0' }} component='span'>SuperconNet</Box>
            <Typography>GST invoice available</Typography>
            <Typography>view more sellers starting from ₹{mobile ? mobile.price : product?.price.cost}</Typography>
          </TableCell>
        </ColumnText>
        <ColumnText>
          <TableCell colSpan={2}>
            <img src={coinUrl} alt="" />
          </TableCell>
        </ColumnText>
        <ColumnText>
          <TableCell style={{ color: '#878787' }}>Check Pincode Availability</TableCell>
          <TableCell>
            <InputBase value={pincode} onChange={(e) => { setPincode(e.currentTarget.value) }} placeholder='Enter pincode' style={{ border: '1px solid black', borderRadius: '3px' }} />
            <Button variant='contained' style={{ background: '#2874F0', marginLeft: 5 }} onClick={() => checkPincode()}>Check</Button>
            <Typography color={pinErr === 'Delivery available' ? 'green' : 'error'}>{pinErr}</Typography>
          </TableCell>
        </ColumnText>
        <ColumnText>
          <TableCell style={{ color: '#878787' }}>Description</TableCell>
          <TableCell>{mobile ? mobile.details?.join(",") : product?.description}</TableCell>
        </ColumnText>
      </Table> */}

      {mobile ? <Reviews reviewsData={reviewsData} id={mobile.id} onChange={handleChange} /> : ""}
    </div>
  );
}

export default ProductDetail;

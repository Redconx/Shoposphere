import { Box, Button } from "@mui/material";
import { FlashOn as Flash, ShoppingCart as Cart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { addToCart } from "../../Redux/Actions/CartAction";
import { Dispatch } from "redux";
import { styled } from "@mui/system";


const LeftContainer = ({ children }: any) => (
  <Box
    sx={{
      padding: "40px 0px 0 80px",
      display: 'flex',
      width: '30%',
      position: 'fixed',
      '@media (max-width: 1280px)': {
        position: 'static',
        padding: '20px 40px',
        width: '70%',
        flexDirection: 'column-reverse'
      }
    }}
  >
    {children}
  </Box>
);

const StyledButton = ({ children }: any) => (
  <Button
    sx={{
      width: '47%',
      height: '50px',
      borderRadius: '2px',
      fontSize: '12px',
      '@media (max-width: 1280px)': {
        width: '40%'
      }
    }}
  >
    {children}
  </Button>
);

const SuppImg = ({ children }: any) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      padding: 3,
      height: 60,
      border: (theme) => `1px solid ${theme.palette.divider}`,
      cursor: 'pointer',
      '&:hover': {
        border: (theme) => `1px solid ${theme.palette.primary.main}`
      }
    }}
  >
    {children}
  </Box>
);

const SuppWrapper = ({ children }: any) => (
  <Box
    sx={{
      '@media (max-width: 1280px)': {
        display: 'flex',
        marginTop: '10px',
        justifyContent: 'space-around'
      }
    }}
  >
    {children}
  </Box>
);
interface ViewContentProps {
  mobile: any;
  product: any;
}

const ActionItem: React.FC<ViewContentProps> = ({ product, mobile }) => {
  const [showImg, setShowImg] = useState("");

  useEffect(() => {
    if (mobile && mobile.id) {
      let imgg = mobile.img;
      setShowImg(imgg);
    }
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();
  const [quantity, setQuantity] = useState(1);

  const addItemToCart = () => {
    const { id } = product ? product : mobile;
    const type = mobile ? "mobile" : "product";
    dispatch(addToCart(id, quantity, type));
    navigate('/cart');
  };

  // const buyNow = async () => {
  //   let response = await payUsingPaytm({ amount: '500', email: 'ajaynaugain907@gmail.com' });
  //   console.log(response, 'imbuynow');
  //   response.head['requestId'] = '123';
  //   let information = {
  //     action: `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${response.body.mid}&orderId=${response.body.orderId}`,
  //     params: response,
  //   };
  //   post(information);
  // };

  const loadImg = (index: any) => {
    let imgg = mobile.suppImg[index].flimg;
    setShowImg(imgg);
  };

  return (
    <LeftContainer>
      <Box>
        {mobile ? mobile.id ?
          <SuppWrapper>
            <SuppImg onClick={() => setShowImg(mobile.img)}>
              <img src={mobile.img} alt="Mobile" />
            </SuppImg>
            {mobile.suppImg.map((si: any, index: number) => (
              <SuppImg key={index} onClick={() => loadImg(index)}>
                <img src={si.smimg} alt="Mobile" />
              </SuppImg>
            ))}
          </SuppWrapper>
          : "" : ""}
      </Box>

      <Box style={{ width: '100%' }}>
        <Box style={{ display: 'flex', border: '1px solid #f0f0f0', height: 400, justifyContent: 'center' }}>
          <img src={product ? product.detailUrl : showImg} alt="Product" style={mobile ? { maxWidth: '100%' } : { width: '100%' }} />
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
          <StyledButton variant="contained" onClick={addItemToCart} style={{ backgroundColor: 'orange' }}>
            <Cart /> Add to Cart
          </StyledButton>
          <StyledButton variant="contained" style={{ backgroundColor: 'red' }}>
            <Flash /> Buy Now
          </StyledButton>
        </Box>
      </Box>
    </LeftContainer>
  );
};

export default ActionItem;

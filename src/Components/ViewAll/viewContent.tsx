import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Snackbar, Breadcrumbs } from "@mui/material";
import { styled } from "@mui/system";

import { Link, useNavigate } from "react-router-dom";
import { Favorite } from '@mui/icons-material';
// import { Mobile } from '../../types'; // Assuming you have a type for Mobile
import Alert from '@mui/material/Alert';

interface ViewContentProps {
    mobiles: any;
}

const ViewContent: React.FC<ViewContentProps> = ({ mobiles }) => {
    const [open, setOpen] = useState(false);
    const [compare, setCompare] = useState<any>([]);
    const [wishList, setWishList] = useState<any>([]);
    const navigate = useNavigate();

    const Container = styled(Grid)`
    padding:20px 0px;
  `;
    const Component = styled(Box)`
    padding:10px;
  `;
    const RatingIcon = styled(Typography)`
    background-color:#388E3C;
    font-size:14px;
    color:white;
    justify-content:center;
    align-items:center;
    border-radius:2px;
    font-weight:550;
    padding:1px;
  `;
    const DetailWrapper = styled(Typography)`
    font-size:15px;
    margin-top:5px;
  `;
    const LogoAssured = styled('img')({
        width: '100%',
        marginLeft: 6,
        alignItems: 'center'
    });

    const startImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==";
    const fassured = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

    const handleChange = (id: string, checked: boolean) => {
        if (checked) {
            let arr = [...compare];
            if (arr.length >= 3) {
                return alert('Only 3 items can be compared');
            }
            let mob = mobiles.find((ele: any) => ele.id === id);
            if (mob) {
                arr.push(mob);
                setCompare(arr);
            }
        } else {
            let arr = [...compare];
            let index = arr.findIndex((ele: any) => ele.id === id);
            if (index >= 0) {
                arr.splice(index, 1);
                setCompare(arr);
            }
        }
    };

    const handleCompare = () => {
        navigate('/compareMobiles');
    };

    const addRemoveToWishList = (id: string, checked: boolean) => {
        if (!checked) {
            let arr = [...wishList];
            let mob = mobiles.find((ele: any) => ele.id === id);
            if (mob) {
                arr.push(mob);
                setWishList(arr);
                setOpen(true);
            }
        } else {
            let arr = [...wishList];
            let index = arr.findIndex((ele: any) => ele.id === id);
            if (index >= 0) {
                arr.splice(index, 1);
                setWishList(arr);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Component>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                        Item successfully added to wishlist
                    </Alert>
                </Snackbar>

                <Typography style={{ marginBottom: 10, fontSize: 20 }}>Showing {mobiles.length} results</Typography>
                <hr style={{ color: '#F2F2F2' }} />

                <Breadcrumbs aria-label="breadcrumb">
                    <Link style={{ textDecorationLine: 'blink' }} to={"/"}>
                        Home
                    </Link>
                    <Typography>All Mobiles</Typography>
                </Breadcrumbs>

                {mobiles.map((mob: any, index: any) => (
                    <Container container key={mob.id}>
                        <Grid item lg={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={mob.img} style={{ width: '60%' }} alt="mobile" />
                            <Typography style={{ margin: 6 }}>
                                <input type={'checkbox'} name='compare' checked={compare.findIndex((cm: any) => cm.id === mob.id) >= 0} onChange={(e) => handleChange(mob.id, e.currentTarget.checked)} />
                                Add to compare
                            </Typography>
                        </Grid>
                        {/* <Favorite style={{ marginRight: 10, cursor: 'pointer' }} checked={wishList.findIndex(w => w.id === mob.id) >= 0} color={wishList.findIndex(w => w.id === mob.id) >= 0 ? 'error' : 'action'} onClick={(e) => addRemoveToWishList(mob.id, e.currentTarget.checked)} /> */}
                        <Grid item lg={7}>
                            <Link to={`/mobile/${mob.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography style={{ fontWeight: 600, fontSize: 18 }}>{mob.name}</Typography>
                                {/* <RatingIcon component={'span'}>{mob.rating}<img src={startImg} alt="rating" /></RatingIcon> */}
                                <Box>
                                    {mob.details.map((ele: any, idx: any) => (
                                        <DetailWrapper key={idx}> • {ele}</DetailWrapper>
                                    ))}
                                </Box>
                            </Link>
                        </Grid>
                        <Grid item lg={2}>
                            <Box style={{ display: 'flex' }}>
                                <Typography variant="h5" style={{ fontWeight: 500 }}>₹{mob.price}</Typography>
                                <Typography>{mob.assured ? <LogoAssured src={fassured} alt="assured" /> : ""} </Typography>
                            </Box>
                            {/* <Typography component='span' style={{ color: 'grey' }}><strike>₹{mob.prevPrice}</strike> &nbsp;</Typography> */}
                            <Typography component='span' style={{ color: 'red' }}> {mob.discount}%</Typography>
                            <Typography style={{ color: 'green', fontSize: 12, fontWeight: 600 }}>{mob.exchange}</Typography>
                        </Grid>
                    </Container>
                ))}
                {compare.length > 0 ?
                    <Button variant="contained" style={{ position: 'fixed', bottom: 10, right: 10 }} onClick={() => handleCompare()}> Compare Items ({compare.length})</Button> : ""
                }

            </Component>
        </>
    )
}
export default ViewContent

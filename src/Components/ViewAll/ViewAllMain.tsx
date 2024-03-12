import React, { useEffect } from 'react';
import { Box, Grid, Typography, CircularProgress, Backdrop } from "@mui/material";
import ViewContent from "./viewContent";
import LeftPanel from "./leftPanel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMobiles } from '../../Redux/Actions/MobileAction';
import { Dispatch } from 'redux';
import { RootState } from '../../Redux/Store';
import { MobilesState } from '../../Redux/Reducers/MobileReducer';

interface Options {
    brand?: string;
    ram?: string;
    rating?: string;
    price?: string;
}

const ViewAll: React.FC = () => {
    const dispatch = useDispatch<Dispatch<any>>();
    const navigate = useNavigate();
    const { mobiles, loading1 } = useSelector<RootState, MobilesState>((state: any) => state.getMobiles);
    const [searchParams] = useSearchParams();
    const params: Options = Object.fromEntries([...searchParams]);

    useEffect(() => {
        dispatch(getMobiles(''));
        window.scrollTo(0, 0);
    }, [dispatch]);

    const callURL = (url: string, options: Options) => {
        let searchStr = makeSearchString(options);
        dispatch(getMobiles(searchStr));
        navigate({ pathname: url, search: searchStr });
    };

    const makeSearchString = (options: Options) => {
        let { brand, ram, rating, price } = options;
        let searchString = "";
        searchString = addToQueryString(searchString, "brand", brand);
        searchString = addToQueryString(searchString, "ram", ram);
        searchString = addToQueryString(searchString, "rating", rating);
        searchString = addToQueryString(searchString, "price", price);
        return searchString;
    };

    const addToQueryString = (str: string, paramName: string, paramValue: string | undefined) =>
        paramValue
            ? str
                ? `${str}&${paramName}=${paramValue}`
                : `${paramName}=${paramValue}`
            : str;

    const handleOptionChange = (options: Options) => {
        callURL("/allmobiles", options);
    };

    return (
        <Box>
            <Grid container style={{ justifyContent: "center" }}>
                <Grid item lg={3} style={{ backgroundColor: "white", margin: "5px" }}>
                    <LeftPanel onOptionChange={handleOptionChange} options={params} />
                </Grid>
                <Grid item lg={8} style={{ backgroundColor: "white", margin: "5px" }}>
                    {loading1 ? (
                        <Backdrop
                            sx={{
                                color: "white",
                                // zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open={true}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    ) : mobiles?.length === 0 ? (
                        <Typography>OOPS..!! No Result Found</Typography>
                    ) : (
                        <ViewContent mobiles={mobiles} />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ViewAll;

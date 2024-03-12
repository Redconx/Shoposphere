import React, { useEffect } from 'react';
import MainSlider from './MainSlider';
import store, { AppDispatch, RootState } from '../../Redux/Store'; // Assuming you have a 'Store' file exporting the RootState type
import { useDispatch, useSelector } from "react-redux";
import { getProducts,ProductAction } from '../../Redux/Actions/ProductAction';
import { getMobiles } from '../../Redux/Actions/MobileAction';
import { Dispatch } from 'redux';
import MobileSlide from './MobileSlides';

interface ProductsState {
    products: any[]; // Replace 'any' with the actual type of a product
    loading: boolean;
}

interface MobilesState {
    mobiles: any[]; // Replace 'any' with the actual type of a mobile
    loading1: boolean;
}


const HomeMain: React.FC = () => {
    const { products, loading } = useSelector<RootState, ProductsState>((state: any) => state.getProducts);
    const { mobiles, loading1 } = useSelector<RootState, MobilesState>((state: any) => state.getMobiles);

    const dispatch = useDispatch<Dispatch<any>>();
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(getMobiles(''));
    }, [dispatch]);

    return (
        <div>
            <MainSlider />
            <MobileSlide loading={loading1} mobiles={mobiles} title='dsfds' />
        </div>
    );
};

export default HomeMain;
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


interface MobileData {
    id: number;
    img: string;
    name: string;
    exchange: string;
    EMI: string;
}

interface MobileSlideProps {
    mobiles: MobileData[];
    title: string;
    loading: boolean;
}

const MobileSlide: React.FC<MobileSlideProps> = ({ mobiles, title, loading }) => {
    const mobiles1 = mobiles.filter((ele) => ele.exchange);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const navigate = useNavigate();
    const showAllMobiles = () => {
        navigate('/allmobiles');
    };



    const CustomLeftArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
        <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => onClick()}
            className="custom-left-arrow"
            fontSize="large"
            style={{ position: "absolute", color: "gray", left: 20 }}
        />
    );
    const CustomRightArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
        <FontAwesomeIcon
            icon={faChevronRight}
            className="custom-right-arrow"
            onClick={() => onClick()}
            fontSize="large"
            style={{ position: "absolute", right: 20, color: "gray" }}
        />
    );

    return (
        <>
            <div style={{ marginTop: "10px", background: "#ffffff" }}>
                <div style={{ padding: '15px 20px', display: 'flex' }}>
                    <div style={{ fontSize: '19px', fontWeight: '700px', marginRight: '25px', lineHeight: '32px' }}>{title}</div>
                    <button onClick={showAllMobiles}>View All</button>
                </div>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 280 }}>Loading ....</div>
                ) : (
                    // <div>Ajay</div>
                    <Carousel
                        responsive={responsive}
                        swipeable={false}
                        draggable={false}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={4000}
                        keyBoardControl={true}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        containerClass="carousel-container"
                        customLeftArrow={<CustomLeftArrow onClick={() => { }} />}
                        customRightArrow={<CustomRightArrow onClick={() => { }} />}

                    >
                        {mobiles1.map((mob) => (
                            <Link to={`/mobile/${mob?.id}`} style={{ textDecoration: 'none' }} key={mob.id}>
                                <div style={{ padding: "25px 15px", textAlign: 'center' }}>
                                    <img src={mob.img} alt="mobile" style={{ width: 'auto', height: 150 }} />
                                    <div style={{ fontWeight: 600, color: "#212121" }}>
                                        {mob.name}
                                    </div>
                                    <div style={{ color: "green" }}>{mob.exchange}</div>
                                    <div style={{ opacity: 0.6, color: "#212121" }}>
                                        {mob.EMI}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                )}
            </div>
        </>
    );
};

export default MobileSlide;
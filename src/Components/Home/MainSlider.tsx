import React from 'react'

const MainSlider = () => {
    const images = [
        { src: "https://rukminim2.flixcart.com/fk-p-flap/1688/280/image/40e1cc62e8ec15a7.jpg?q=50", alt: "Iphone 15 Pro max" },
        { src: "https://rukminim2.flixcart.com/fk-p-flap/1688/280/image/3660af8b9e059912.jpg?q=50", alt: "One Plus 12" },
        { src: "https://rukminim2.flixcart.com/fk-p-flap/1688/280/image/c919eea018b1ca69.jpg?q=50", alt: "Realme GT" }
    ]
    
    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
            <div className="carousel-inner"  data-bs-ride="carousel">
                {images.map((ele, index) => (
                    <div className="carousel-item active" key={ele.src}>
                        <img src={ele.src} className="d-block w-100" alt={ele.alt} />
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default MainSlider

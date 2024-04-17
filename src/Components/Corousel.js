import React from 'react'
import './css/couresel.css';
import image1 from './Images/image1.jpg';
import image2 from './Images/image2.jpg';
import image3 from './Images/image3.jpg';
import Carousel from 'react-bootstrap/Carousel';

const Corousel = () => {
    return (
        <div className="body my-auto">
            <div className="container-md mt-3" >
                <div className="row" style={{ height: '70vh', display: 'flex', justifyContent: 'space-around' }}>
                    <div className='col-sm-8 col-md-6 col-lg-5 col-xl-5 my-auto'>

                        <div className="anibody container" style={{ width: "90%" }}>
                            <h1><span>Rent</span> a car at your convenience </h1>
                            <p>
                                <span>Unleash Your Journey:</span> Elevate Your Adventures with Our Exquisite Fleet of Vehicles! Discover the World in Style and Comfort with the Ultimate Travel Experience.
                            </p>
                            <button className="btn btn-imp" id="btn1" style={{ marginRight: "20px" }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-car-front" viewBox="0 0 16 16">
                                <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17 1.247 0 2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276Z" />
                                <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.807.807 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155 1.806 0 4.037-.084 5.592-.155A1.479 1.479 0 0 0 15 9.611v-.413c0-.099-.01-.197-.03-.294l-.335-1.68a.807.807 0 0 0-.43-.563 1.807 1.807 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3H4.82Z" />
                            </svg>      Book Now</button>
                            {/* <button className="btn btn-primary" id="btn1" style="margin-right: 20px;"> Create My  */}

                            <button className="btn btn-imp" id="btn2"><svg xmlns="http://www.w3.org/2000/svg"
                                height="20" width="20" fill="currentColor" className="bi bi-file-play-fill" viewBox="0 0 16 16">
                                <path
                                    d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z" />
                            </svg> Watch Vedio</button>

                        </div>



                    </div>
                    <div className='col-md-6 col-lg-5 col-xl-7 my-auto'>
                     <div className='container w-70'>
                     <Carousel controls={false} indicators ={false}>
                            <Carousel.Item >
                                <img
                                    className="d-block w-100 slideimg"
                                    src={image1}
                                    alt="First slide"
                                    interval="2000"
                                    
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="slideimg d-block w-100"
                                    src={image2}
                                    alt="First slide"
                                    interval="2000"
                                />
                               
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="slideimg d-block w-100"
                                    src={image3}
                                    alt="First slide"
                                    interval="2000"
                                />
                               
                            </Carousel.Item>
                        </Carousel>
                    </div>   
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Corousel

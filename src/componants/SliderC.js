import React from 'react';
import Slider from 'react-slick';
import '../styles/slider.css';

const customers = [
  {
    name: 'John Doe',
    feedback: 'Excellent service and support Each number in the grid is believed to represent specific qualities or aspects of a person character. For instance, some interpret the number 1 as associated with leadership, the number 2 with intuition, and so on. The specific meanings of each number vary depending on the numerological system being used',
    image: 'https://cdn-icons-png.freepik.com/256/12119/12119467.png?semt=ais_hybrid',
  },
  {
    name: 'Jane Smith',
    feedback: 'Excellent service and support Each number in the grid is believed to represent specific qualities or aspects of a person character. For instance, some interpret the number 1 as associated with leadership, the number 2 with intuition, and so on. The specific meanings of each number vary depending on the numerological system being used',
    image: 'https://cdn-icons-png.freepik.com/256/12119/12119467.png?semt=ais_hybrid',
  },
  {
    name: 'Alice Lee',
    feedback: 'Excellent service and support Each number in the grid is believed to represent specific qualities or aspects of a person character. For instance, some interpret the number 1 as associated with leadership, the number 2 with intuition, and so on. The specific meanings of each number vary depending on the numerological system being used',
    image: 'https://cdn-icons-png.freepik.com/256/12119/12119467.png?semt=ais_hybrid',
  },
  {
    name: 'Mark Stone',
    feedback: 'Excellent service and support Each number in the grid is believed to represent specific qualities or aspects of a person character. For instance, some interpret the number 1 as associated with leadership, the number 2 with intuition, and so on. The specific meanings of each number vary depending on the numerological system being used',
    image: 'https://cdn-icons-png.freepik.com/256/12119/12119467.png?semt=ais_hybrid',
  },
];

const SliderC = () => {
  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '0px',
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {customers.map((customer, index) => (
          <div className="card" key={index}>
            {/* <img src={customer.image} alt={customer.name} /> */}
            <p>"{customer.feedback}"</p>
            <h3> - {customer.name}</h3>

          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderC;

// ==> Import npm
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { } from 'src/store/actions';
import styled from 'styled-components';
import Chart from 'react-apexcharts';

// ==> Components

// ==> Styles

// ==> Ant Design sub components

// ==> CSS in JS
const Container = styled.div`
  p {
    border: 1px solid #1aae9f;
    background: #8dd7cf;
    padding: 10px;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5715;
  }
  #graph {
    max-width: 1000px;
    margin-top: 32px;

  }
`;

// ==> Composant
const Graph = () => {

  const series = [{
    name: 'Hospitalière',
    data: [30, 25, 33, 27, 22, 23, 22, 25, 30, 30, 18, 22],
  }, {
    name: 'Médecine légale',
    data: [13, 19, 20, 15, 13, 17, 6, 15, 15, 10, 8, 19],
  },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      type: 'bar',
      height: 400,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      type: 'category',
      categories: ['01 / 2019', '02 / 2019', '03 / 2019', '04 / 2019',
        '05 / 2019', '06 / 2019', '07 / 2019', '08 / 2019', '09 / 2019', '10 / 2019',
        '11 / 2019', '12 / 2019',
      ],
    },
    legend: {
      position: 'top',
      offsetY: 20,
    },
    fill: {
      opacity: 1,
    },
    colors: ['#1aae9f', '#8dd7cf'],
  };

  return (
    <Container>
      <p>Graphiques</p>
      <div id="graph">
        <Chart options={options} series={series} type="bar" height={450} />
      </div>
    </Container>
  );
};

// == Export
export default Graph;

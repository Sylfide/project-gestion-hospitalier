import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Table } from 'antd';
import 'antd/dist/antd.css';

const FlexBox = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid palevioletred;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    margin: 20px;
  }
`;

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
];

export default function App() {
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState('');

  const FilterByNameInput = (
    <Input
      placeholder="Search Name"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = data.filter((entry) => entry.name.includes(currValue));
        setDataSource(filteredData);
      }}
    />
  );

  const columns = [
    {
      title: FilterByNameInput,
      dataIndex: 'name',
      key: '1',
    },
  ];

  return (
    <FlexBox>
      <Table columns={columns} dataSource={dataSource} />
    </FlexBox>
  );
}

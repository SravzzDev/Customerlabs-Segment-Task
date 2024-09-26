import React from 'react';
import { Select } from 'antd';
import '../App.css';
const { Option } = Select;

const SchemaBox = ({ selectedSchemas, availableSchemas, handleSchemaChange }) => (
  <div className="blue-box">
    {selectedSchemas.map((schema, index) => (
      <Select
        key={index}
        value={schema.value}
        onChange={(value) => handleSchemaChange(value, index)}
        style={{ width: '100%', marginBottom: 8 }}
      >
        <Option key={schema.value} value={schema.value}>
          {schema.label}
        </Option>
        {availableSchemas.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    ))}
  </div>
);

export default SchemaBox;

import React from 'react';
import { Select, Button } from 'antd';
import '../App.css';


const SchemaDropdown = ({ currentSchema, setCurrentSchema, handleAddSchema, renderAvailableSchemas }) => (
  <div className="schema-dropdown">
    <label style={{marginTop:"40px"}}>Add schema to segment:</label>
    <Select
      value={currentSchema}
      onChange={(value) => setCurrentSchema(value)}
      placeholder="Select schema"
      className="select-field"
    >
      {renderAvailableSchemas()}
    </Select>
    <Button type="link" onClick={handleAddSchema} className="add-button">
      + Add new schema
    </Button>
  </div>
);

export default SchemaDropdown;

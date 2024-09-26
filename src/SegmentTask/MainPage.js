import React, { useState } from 'react';
import { Button, Modal, message ,Select} from 'antd';
import '../App.css';
import SegmentInput from './SegmentInput';
import SchemaDropdown from './SchemaDropdown';
import SchemaBox from './SchemaBox';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];
const { Option } = Select;

const MainPage =()=> {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
  const [currentSchema, setCurrentSchema] = useState('');

  const handleAddSchema = () => {
    if (currentSchema) {
      const selectedOption = availableSchemas.find((schema) => schema.value === currentSchema);
      setSelectedSchemas([...selectedSchemas, { value: selectedOption.value, label: selectedOption.label }]);
      setAvailableSchemas(availableSchemas.filter((schema) => schema.value !== currentSchema));
      setCurrentSchema('');
    }
  };

  const resetModal = () => {
    setSegmentName('');
    setSelectedSchemas([]);
    setAvailableSchemas(schemaOptions);
    setCurrentSchema('');
  };

  const handleSaveSegment = () => {
    if (!segmentName) {
      message.error('Please enter a segment name.');
      return;
    }

    if (selectedSchemas.length === 0) {
      message.error('Please add at least one schema.');
      return;
    }

    const segmentData = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({ [schema.value]: schema.label })),
    };

    fetch('https://webhook.site/81475715-ff7f-46fd-b7d5-5ad7be41f337', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(segmentData),
      mode: 'no-cors',
    })
      .then(() => {
        message.success('Segment saved successfully!');
        resetModal();
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.error('Error saving segment:', error);
        message.error('Failed to save segment.');
      });
  };

  const handleSchemaChange = (newSchemaValue, index) => {
    const newSelectedSchema = availableSchemas.find((schema) => schema.value === newSchemaValue);
    const updatedSelectedSchemas = [...selectedSchemas];
    const removedSchema = updatedSelectedSchemas[index];

    updatedSelectedSchemas[index] = newSelectedSchema;
    setSelectedSchemas(updatedSelectedSchemas);

    const updatedAvailableSchemas = [
      ...availableSchemas.filter((schema) => schema.value !== newSchemaValue),
      removedSchema,
    ].filter((schema) => schema.value);

    setAvailableSchemas(updatedAvailableSchemas);
  };

  const handleCancel = () => {
    resetModal();
    setIsModalVisible(false);
  };

  const renderAvailableSchemas = () => {
    return availableSchemas.map((schema) => (
      <Option key={schema.value} value={schema.value}>
        {schema.label}
      </Option>
    ));
  };

  return (
    <div className="page-container">
      <Button type="primary" onClick={() => setIsModalVisible(true)} className="primary-button">
        Save Segment
      </Button>

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSaveSegment}
        okText="Save Segment"
        className="modal-style"
        styles={{ padding: '20px' }}
      >
        <SegmentInput segmentName={segmentName} setSegmentName={setSegmentName} />

        <SchemaDropdown
          currentSchema={currentSchema}
          setCurrentSchema={setCurrentSchema}
          handleAddSchema={handleAddSchema}
          renderAvailableSchemas={renderAvailableSchemas}
        />

        <SchemaBox
          selectedSchemas={selectedSchemas}
          availableSchemas={availableSchemas}
          handleSchemaChange={handleSchemaChange}
        />
      </Modal>
    </div>
  );
}

export default MainPage;

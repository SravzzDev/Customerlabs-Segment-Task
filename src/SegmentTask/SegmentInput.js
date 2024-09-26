import React from 'react';
import { Input } from 'antd';
import '../App.css';
const SegmentInput = ({ segmentName, setSegmentName }) => (
  <div className="segment-input">
    <label className="label">Segment Name:</label>
    <Input
      value={segmentName}
      onChange={(e) => setSegmentName(e.target.value)}
      placeholder="Enter segment name"
      className="input-field"
    />
  </div>
);

export default SegmentInput;

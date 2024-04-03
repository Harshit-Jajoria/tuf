import axios from 'axios';
import { useState } from 'react';

const Test = () => {
  const [data, setData] = useState(null);
  const handleSubmit = async () => {
    const { data } = await axios.post(
      `http://nova-backend-lb-1671439743.ap-south-1.elb.amazonaws.com/api/verification`,
      {
        email: 'testtuf@gmail.com',
        phone: '123456789',
      }
    );
    console.log(data);
    setData(data);
  };
  return (
    <div>
      <button onClick={handleSubmit}>CLick me</button>
      {data && <div> {data.message}</div>}
    </div>
  );
};

export default Test;

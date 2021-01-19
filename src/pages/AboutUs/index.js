import React, { useState } from 'react';
import q from 'query-string';
import {
  withRouter,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';

function AboutUs(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const history = useHistory();

  const pStart = (page - 1) * 10;
  const pEnd = page * 10 - 1;

  // page = 1  (0, 9);
  // page = 2  (10, 19);
  // page = 3  (20, 29);

  return (
    <div>
      About us page
      {data.slice(pStart, pEnd).map((d) => (
        <span>{d}</span>
      ))}
      next ,,
      <button
        onClick={() => {
          history.goBack();
          // history.push('/login');
          // history.push('/login', { name: 'ahmed' });
          // history.push({ pathname: '/login', state: { name: 'ahmed' } });
        }}
      >
        login
      </button>
    </div>
  );
}

// export default withRouter(AboutUs);
export default AboutUs;

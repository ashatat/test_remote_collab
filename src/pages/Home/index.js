import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [error, setError] = useState('');

  const pStart = (page - 1) * 10;
  const pEnd = page * 10 - 1;

  useEffect(() => {
    let mount = true;

    const a = axios.get(
      `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_KEY}`
    );

    console.log(a);
    a.then((res) => {
      console.log(res);
      if (mount) {
        setData(res.data.data);
      }
    }).catch((err) => {
      console.dir(err);
      console.log(err.response);
      let msg = 'Something went wrong please try again later';
      if (err.response.state === 404) {
        msg = 'no data found, empty browser cache and reloading';
      }
      setError(msg);
    });

    return () => {
      // clean up function
      console.log('clean up');
      mount = false;
    };
  }, []);

  return (
    <div>
      Home page
      {/* <Link to="/login">
        Login</Link> */}
      {!error &&
        data
          .slice(pStart, pEnd)
          .map((d) => <img src={d.images.preview_webp.url} />)}
      {error && <span>{error}</span>}
    </div>
  );
}

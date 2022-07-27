import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// get data from https://api.publicapis.org/categories 
function getDATA() {
  return fetch('https://api.publicapis.org/categories')
    .then(response => response.json())
}    

function Table(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{item}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function App() {
  const [data, setData] = useState([]);
  const [count, setCount ] = useState(0);

  // search for data
  const [search, setSearch] = useState('');

  useEffect(() => {
    getDATA().then(data => {
      setData(data.categories);
      setCount(data.count);
    });
    console.log(data);
  }, []);

  // search for data
  const dataBySearch = data.filter(category => {
    return category.toLowerCase().includes(search.toLowerCase());
  });

  const total = dataBySearch.length;

  return (
    <div className="App">
      <main>
        <h1>Question 2</h1>
        <div style={{ padding: "3px" }} >
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <p>Total: {total}</p>

        {dataBySearch.length > 0 && <Table data={dataBySearch} />}
      </main>
    </div>
  );
}

export default App;

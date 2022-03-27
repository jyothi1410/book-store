import React, { useState, useEffect } from 'react';
import './App.css';
import { http } from './httpServices';
const NUMBER_ONE = 1;
const NUMBER_FIVE = 5;

function App() {
  const [state, setState] = useState({
    tableData: [],
    totalCount: 0,
    totalNumOfPages: 0,
    pagination: {
      nextBtn: true,
      previousBtn: true,
      noOfRecord: NUMBER_FIVE,
      pageNumber: NUMBER_ONE,
      pageSize: NUMBER_FIVE
    }
  });
  const { tableData, totalCount } = state;
  const { nextBtn, previousBtn, pageNumber, pageSize } = state.pagination;
  useEffect(() => { getStoreData(pageNumber, pageSize); }, [])

  const getStoreData = async (pageNumber, pageSize) => {
    let url = `/api/books?page=${pageNumber}&size=${pageSize}`;
    const { data: { data, status, totalNumOfPages, totalCount } } = await http.get(url);
    if (status === 200) {
      setState(state => ({ ...state, tableData: data, totalCount, totalNumOfPages }));
      if (totalNumOfPages > pageNumber) { setState(state => ({ ...state, pagination: { ...state.pagination, nextBtn: false, previousBtn: false } })); }
      if (totalNumOfPages === pageNumber) { setState(state => ({ ...state, pagination: { ...state.pagination, nextBtn: true } })); }

      if (pageNumber < totalNumOfPages && pageNumber === NUMBER_ONE) { setState(state => ({ ...state, pagination: { ...state.pagination, previousBtn: true } })); }
      if (totalNumOfPages === pageNumber && pageNumber != NUMBER_ONE) { setState(state => ({ ...state, pagination: { ...state.pagination, previousBtn: false } })); }
    }
  }

  const next = () => {
    setState(state => ({ ...state, pagination: { ...state.pagination, pageNumber: pageNumber + 1 } }));
    getStoreData(pageNumber + 1, pageSize);
  }
  const previous = () => {
    setState(state => ({ ...state, pagination: { ...state.pagination, pageNumber: pageNumber - 1 } }));
    getStoreData(pageNumber - 1, pageSize);
  }

  return (
    <div className="App">
      <h1>Books</h1>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Author</th>
          <th>ISBN</th>
        </tr>
        {tableData.map((item, i) =>
          <tr key={item.bookId}>
            <td>{item.bookId}</td>
            <td>{item.bookName}</td>
            <td>{item.author}</td>
            <td>{item.isbn}</td>
          </tr>)}
      </table>
      <div className='paginaton'>
        <span>
          <button onClick={previous} disabled={previousBtn ? true : false} className="btn">&lt;	</button>
          <button onClick={next} disabled={nextBtn ? true : false} className="btn">&gt;	</button>
        </span>
        <span>Total of {totalCount} Records</span>
      </div>
    </div>
  );
}

export default App;

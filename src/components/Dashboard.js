import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import userData from '../json/userData.json';
import style from './Dashboard.module.css';

const Dashboard = () => {
    const { id } = useParams();
  
    const [mean, setMean] = useState(null);
    const [median, setMedian] = useState(null);
    const [mode, setMode] = useState(null);
  
    const calculateStatistics = (columnName) => {
      const columnData = userData.users.map((user) => user[columnName]);
  
      const meanValue = calculateMean(columnData);
      setMean(meanValue);
  
      const medianValue = calculateMedian(columnData);
      setMedian(medianValue);
  
      const modeValue = calculateMode(columnData);
      setMode(modeValue.join(', '));
    };
  
    const calculateMean = (data) => {
      const sum = data.reduce((acc, value) => acc + value, 0);
      return sum / data.length;
    };
  
    const calculateMedian = (data) => {
      const sortedData = data.sort((a, b) => a - b);
      const mid = Math.floor(sortedData.length / 2);
  
      if (sortedData.length % 2 === 0) {
        return (sortedData[mid - 1] + sortedData[mid]) / 2;
      } else {
        return sortedData[mid];
      }
    };
  
    const calculateMode = (data) => {
      const frequencyMap = data.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, {});
  
      let maxFrequency = 0;
      let modeValues = [];
  
      for (const key in frequencyMap) {
        if (frequencyMap[key] > maxFrequency) {
          maxFrequency = frequencyMap[key];
          modeValues = [key];
        } else if (frequencyMap[key] === maxFrequency) {
          modeValues.push(key);
        }
      }
  
      return modeValues;
    };
  
    const headers = Object.keys(userData.users[0]);
  
    return (
      <div className={style['dashboard-container']}>
        <h1>Welcome to the Dashboard, {id}!</h1>
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData.users.map((user, index) => (
              <tr key={index} style={user.name === id ? { background: 'green', color: 'white' } : {}}>
                {headers.map((header) => (
                  <td key={header}>{user[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={() => calculateStatistics('age')}>Calculate Statistics for Age</button>
          <button onClick={() => calculateStatistics('score')}>Calculate Statistics for Score</button>
        </div>
        <div>
          <p>Mean: {mean}</p>
          <p>Median: {median}</p>
          <p>Mode: {mode}</p>
        </div>
      </div>
    );
  };
  

export default Dashboard;

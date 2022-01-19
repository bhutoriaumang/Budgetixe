import { useState,useEffect } from 'react';
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';



// Sample chart data

const Stock = () => {
    const [pdata , setPdata] = useState([]);
    const [isDataPresent,setIsDataPresent] = useState(false);
    const baseURL = 'http://localhost:3000/stock';
    useEffect(()=>{
        const fetchStock = (symbol) => {
            const API_KEY = '5ESBFJPMQ7O56KWH';
            let StockSymbol = symbol;
            let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=compact&&apikey=${API_KEY}`;
        
            fetch(API_Call)
                .then(
                function(response) {
                    return response.json();
                }
                )
                .then(
                function(data) {
                    console.log(data);
                    var list = [];
                    for (var key in data['Time Series (Daily)']) {
                        var date = key.substr(8)+'/'+key.substr(5,2)+'/'+key.substr(2,2);
                        list.push({name: date , value: parseFloat(data['Time Series (Daily)'][key]['1. open'])})
                    }
                    list.length = 5;
                    list = list.reverse();
                    setPdata(list);
                    setIsDataPresent(true);
                }
            )
        }
    
        fetchStock('IBM');
    
    },[baseURL])
    return (
        <div className="graph">
            { !isDataPresent && <p>Loading...</p> }
            { isDataPresent && <ResponsiveContainer width="100%" aspect={2}>
                <LineChart data={pdata} margin={{ right: 300, left: 200, top: 200 }}>
                    <CartesianGrid />
                    <XAxis dataKey="name" 
                        interval={'preserveStartEnd'} />
                    <YAxis ></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="value"
                        stroke="black" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>}
        </div>
    );
}

export default Stock;
import React from 'react'
import './home.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widgets from '../../components/widgets/Widgets'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import TableData from '../../components/table/TableData'
const Home = () => {
  return (
    <>
      <div className="home">
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <div className="widgets">
            <Widgets type="user"/>
            <Widgets type="order"/>
            <Widgets type="earning"/>
            <Widgets type="balance"/>
          </div>
          <div className="charts">
            <Featured/>
            <Chart aspect={2/1} title="Last 6 Months Revenue"/>
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <TableData/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

import { useEffect } from "react"
import cookies from 'react-cookies';

export default function Summary(){

    useEffect(()=>{
        const reviewData = async()=>{
            console.log('fired')
            let res = await fetch("http://localhost:8080/review/get_self_review_summary")
            if(res.ok){
                let result = await res.json()
                console.log(result)
                cookies.save('review',result)
            }
        }
        reviewData()
    },[])

    return(
        <>
        <h1>Employee Information<br/>職員資料</h1>
        <table border="1px">
            <thead>
                <tr>
                    <th>Staff Code<br/>職員編號</th>
                    <th>Name<br/>姓名</th>
                    <th>Department<br/>部門</th>
                    <th>Position<br/>職位</th>
                    <th>Join Date<br/>入職日期</th>
                    <th>Grade<br/>職級</th>
                </tr>
                <tr>
                    <td>{cookies.load('user').staff_id}</td>
                    <td>{cookies.load('user').name}</td>
                    <td>{cookies.load('user').dept}</td>
                    <td>{cookies.load('user').position}</td>
                    <td>{cookies.load('user').date_joined.slice(0,(cookies.load('user').date_joined.indexOf('T')))}</td>
                    <td>{cookies.load('user').grade}</td>
                 
                </tr>
            </thead>
        </table>
        <h2>My Summary <br/>表現評估</h2>
        <h3>Self Review<br/>自評</h3>
        <table border="1px">
            <thead>
                <tr>
                    <th>Submission Deadline</th>
                    <th>Last Update</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>{cookies.load('review').t_id ? cookies.load('review').t_id: "start self review(link)"}</td>
                    <td>{cookies.load('review').close_date}</td>
                    <td>{cookies.load('review').completion_dt}</td>
                    <td>{cookies.load('review').status}</td>
                </tr>
            </thead>
        </table>
        <h3>Top-down Review<br/>上評下</h3>
        <table border="1px">
            <thead>
                <tr>
                    
                    <th>Name<br/>姓名</th>
                    <th>Department<br/>部門</th>
                    <th>Position<br/>職位</th>
                    <th>Join Date<br/>入職日期</th>
                    <th>Grade<br/>職級</th>
                </tr>
                <tr>
                    
                    <td>{cookies.load('user').name}</td>
                    <td>{cookies.load('user').dept}</td>
                    <td>{cookies.load('user').position}</td>
                    <td>{cookies.load('user').date_joined.slice(0,(cookies.load('user').date_joined.indexOf('T')))}</td>
                    <td>{cookies.load('user').grade}</td>
                 
                </tr>
            </thead>
        </table>
        </>
    )
}
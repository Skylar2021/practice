import { useEffect, useState } from "react"
import { useSelector,useDispatch } from 'react-redux';
import cookies from 'react-cookies';

import { selfReview,tdReview } from '../app/slice.js'

export default function Summary() {
    const dispatch = useDispatch()

    const {self_review,top_down_review} = useSelector(state=>state.staff)

    const selfReviewData = async () => {
        // console.log('selfReviewData fired')
        let res = await fetch("http://localhost:8080/review/get_self_review_summary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "id": `${cookies.load('userData')?.staff_id}` }),
            credentials: 'include'
        })
        if (res.ok) {
            let result = await res.json()
            console.log(result)
            dispatch(selfReview(result))
            cookies.save('self_review', result)
        }
    }
    
    const topDownReviewData = async () => {
        // console.log('selfReviewData fired')
        let res = await fetch("http://localhost:8080/review/get_td_review_summary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "id": `${cookies.load('userData')?.staff_id}` }),
            credentials: 'include'
        })
        if (res.ok) {
            let result = await res.json()
            // console.log(result)
            dispatch(tdReview(result))
            cookies.save('top_down_review', result)
            // setTopDownReview(result)
        }
    }
    useEffect(() => {
        selfReviewData()
        // console.log("cookies self_review: ")
        // console.log(cookies.load("self_review"))
        topDownReviewData()
        // console.log("cookies top_down_review: ")
        // console.log(cookies.load("top_down_review"))
    }, [])
    
    return (
        <>
            <h1>Employee Information<br />職員資料</h1>

            <table border="1px">
                <thead>
                    <tr>
                        <th>Staff Code<br />職員編號</th>
                        <th>Name<br />姓名</th>
                        <th>Department<br />部門</th>
                        <th>Position<br />職位</th>
                        <th>Join Date<br />入職日期</th>
                        <th>Grade<br />職級</th>
                    </tr>
                    <tr>
                        <td>{cookies.load('userData')?.staff_id}</td>
                        <td>{cookies.load('userData')?.name}</td>
                        <td>{cookies.load('userData')?.dept}</td>
                        <td>{cookies.load('userData')?.position}</td>
                        <td>{cookies.load('userData')?.date_joined?.slice(0, (cookies.load('userData').date_joined.indexOf('T')))}</td>
                        <td>{cookies.load('userData')?.grade}</td>
                    </tr>
                </thead>
            </table>
            <h2>My Summary <br />表現評估</h2>
            <h3>Self Review<br />自評</h3>
            <table border="1px">
                <thead>
                    <tr>
                        <th>Submission Deadline</th>
                        <th>Last Update</th>
                        <th>Status</th>
                        <th>Review</th>
                    </tr>
                    {/* <tr>
                        <td>{cookies.load('self_review')?.close_date?.slice(0, (cookies.load('self_review').date_joined.indexOf('T')))}</td>
                        <td>{cookies.load('self_review')?.completion_dt?.slice(0, (cookies.load('self_review').date_joined.indexOf('T')))}</td>
                        <td>{cookies.load('self_review')?.status}</td>
                        <td>{cookies.load('self_review')?.t_id ? cookies.load('self_review').t_id : "no self review create"}</td>
                    </tr> */}
                    <tr>
                        <td>{self_review?.close_date?.slice(0, (self_review.date_joined.indexOf('T')))}</td>
                        <td>{self_review?.completion_dt?.slice(0, (self_review.date_joined.indexOf('T')))}</td>
                        <td>{self_review?.status}</td>
                        <td>{self_review?.t_id ? self_review.t_id : "no self review create"}</td>
                    </tr>
                </thead>
            </table>
            <h3>Top-down Review<br />上評下</h3>
            <table border="1px">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Last Update</th>
                        <th>Status</th>
                        <th>Review</th>
                    </tr>
                    {/* <tr>
                        <td>{cookies.load('top_down_review')?.name}</td>
                        <td>{cookies.load('top_down_review')?.dept_name}</td>
                        <td>{cookies.load('top_down_review')?.position_desc}</td>
                        <td>{cookies.load('top_down_review')?.completion_dt?.slice(0, (cookies.load('top_down_review').date_joined?.indexOf('T')))}</td>
                        <td>{cookies.load('top_down_review')?.status}</td>
                        <td>{cookies.load('top_down_review')?.t_id ? cookies.load('top_down_review').t_id : "no top-down review create"}</td>
                    </tr> */}
                    <tr>
                        {/* <td>{topDownReview?.name}</td> */}
                        <td>{top_down_review?.name}</td>
                        <td>{top_down_review?.dept_name}</td>
                        <td>{top_down_review?.position_desc}</td>
                        <td>{top_down_review?.completion_dt?.slice(0, (top_down_review.completion_dt?.indexOf('T')))}</td>
                        <td>{top_down_review?.status}</td>
                        <td>{top_down_review?.t_id ? top_down_review.t_id : "no top-down review create"}</td>
                    </tr>
                </thead>
            </table>
        </>
    )
}
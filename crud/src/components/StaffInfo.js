import cookies from 'react-cookies';

function staffInfo({assign_type}) {
    let Appraisal_Period = () => {
        return cookies.load("self_review")?.appr_from_date?.slice(0, (cookies.load("self_review").appr_from_date.indexOf('T'))) + " to " + cookies.load("self_review")?.appr_to_date?.slice(0, (cookies.load("self_review").appr_to_date.indexOf('T')))
    }
    function formatDate() {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    return (
        <>
            <h2>Employee Information<br />職員資料</h2>

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
                <tbody>

                    <tr >
                        <td colSpan="3">Appraisal Period<br />評估期</td>
                        <td colSpan="3">Date of Appraisal<br />進行評估日期</td>
                    </tr>
                    <tr>
                        <td colSpan="3">{Appraisal_Period()}</td>
                        {/* <td colSpan="3">{`${self_review?.appr_from_date?.slice(0, (self_review.appr_from_date.indexOf('T')))} - ${self_review?.appr_to_date?.slice(0, (self_review.appr_to_date.indexOf('T')))}`}</td> */}
                        <td colSpan="3">{formatDate()}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default staffInfo
// import { json } from 'body-parser';
import XLSX from 'xlsx';
// import pkg from 'file-saver';
// const { saveAs } = pkg;

let data = {
    t_id: 'M221-9002T01',
    staff_id: '1-9002',
    form_id: 29,
    assign_type: 'T',
    reviewer_id: '1-9001',
    status: 3,
    appr_id: '1-9001',
    score_ttl: '20',
    score_avg: '4.09',
    is_optional: 'N',
}
let headerArr = Object.keys(data)
let dataArr = Object.values(data)
console.log(headerArr)
console.log(dataArr)

let jsonData = JSON.stringify(data)
console.log(jsonData)

let ws = XLSX.utils.aoa_to_sheet([headerArr,dataArr ])
// let ws = XLSX.utils.json_to_sheet([jsonData])
/*
let ws = XLSX.utils.aoa_to_sheet([
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"]
  ])
  */

let wb = XLSX.utils.book_new()
wb.Props = {
    Title: "Testing",
    Subject: "08032022",
    Author: "Skylar",
    CreatedDated: new Date()
}


XLSX.utils.book_append_sheet(wb,ws, "Sheet1")

// wb.Sheets["Sheet 1"] = ws

// let wbout = XLSX.write(wb)

let wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});

/* generate a download */
// function s2ab(s) {
// 	let buf = new ArrayBuffer(s.length);
// 	let view = new Uint8Array(buf);
// 	for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
// 	return buf;
// }
// saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "sheetjs.xlsx");

export function downloadExcel() {

    XLSX.writeFile(wb,"~/C:/Users/skylar.wong/Dowmloads/sheetjs2.xlsx")
}

export class Excel extends XLSX {
    data = {
        t_id: 'M221-9002T01',
        staff_id: '1-9002',
        form_id: 29,
        assign_type: 'T',
        reviewer_id: '1-9001',
        status: 3,
        appr_id: '1-9001',
        score_ttl: '20',
        score_avg: '4.09',
        is_optional: 'N',
    }
    static downloadExcel() {
        let headerArr = Object.keys(this.data)
        let dataArr = Object.values(this.data)
        let ws = XLSX.utils.aoa_to_sheet([headerArr, dataArr])
        let wb = XLSX.utils.book_new()
        wb.Props = {
            Title: "Testing",
            Subject: "08032022",
            Author: "Skylar",
            CreatedDated: new Date()
        }
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1")


        XLSX.writeFile(wb, "~/C:/Users/skylar.wong/Dowmloads/sheetjs2.xlsx")
    }

}

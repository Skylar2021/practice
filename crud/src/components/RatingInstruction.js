

function RatingInstruction() {
    return (
        <>
            <table>
                <tbody>

                    <tr>
                        <td colSpan={2}>
                            <h3>Performance Statements 評估項目</h3>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <p>Rate how well the following statements describe the staff by a 10-point scale. 請以十分為上評估員工之表現。</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <svg width="100" height="25">
                                <rect width="300" height="100" style={{ fill: 'rgb(221, 61, 61)' }} />
                            </svg>
                            <svg width="100" height="50">
                                <rect width="300" height="100" style={{ fill: 'rgb(228, 130, 51)' }} />
                            </svg>
                            <svg width="100" height="75">
                                <rect width="300" height="100" style={{ fill: 'rgb(213, 221, 98)' }} />
                            </svg>
                            <svg width="100" height="100">
                                <rect width="300" height="100" style={{ fill: 'rgb(96, 202, 96)' }} />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: 'rgb(221, 61, 61)' }}>1 - 3</td>
                        <td>Week / Need Improvement 不足 / 需要改進</td>
                    </tr>
                    <tr>
                        <td style={{ color: 'rgb(228, 130, 51)' }}>4 - 6</td>
                        <td>Standard / Meet Requirement / Satisfactory 標準 / 符合要求 / 滿意</td>
                    </tr>
                    <tr>
                        <td style={{ color: 'rgb(213, 221, 98)' }}>7 - 8</td>
                        <td>Strong / Add-value suggestion and contribution 良好 / 增值建議和貢獻</td>
                    </tr>
                    <tr>
                        <td style={{ color: 'rgb(96, 202, 96)' }}>9 - 10</td>
                        <td>Very Strong to Perfect / Bring a change to the Company in this years 優異至圓滿 / 在今年為公司帶來變革</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default RatingInstruction
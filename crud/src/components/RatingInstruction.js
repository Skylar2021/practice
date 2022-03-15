

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
                            <svg width="100" height="30">
                                <rect width="300" height="120" style={{ fill: 'rgb(221, 61, 61)' }} />
                                <text x="35" y="14" fill="white">1 - 3</text>
                                <text x="35" y="26" fill="white">weak</text>
                            </svg>
                            <svg width="100" height="60">
                                <rect width="300" height="120" style={{ fill: 'rgb(228, 130, 51)' }} />
                                <text x="35" y="44" fill="white">4 - 6</text>
                                <text x="24" y="56" fill="white">standard</text>
                            </svg>
                            <svg width="100" height="90">
                                <rect width="300" height="120" style={{ fill: 'rgb(213, 221, 98)' }} />
                                <text x="35" y="74" fill="white">7 - 8</text>
                                <text x="30" y="86" fill="white">strong</text>
                            </svg>
                            <svg width="100" height="120">
                                <rect width="300" height="120" style={{ fill: 'rgb(96, 202, 96)' }} />
                                <text x="35" y="104" fill="white">9 - 10</text>
                                <text x="30" y="116" fill="white">perfect</text>
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
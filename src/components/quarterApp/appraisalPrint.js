import React from 'react'

const AppraisalPrint = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div className="sheet">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                    }}
                >
                    <div></div>
                    <div className="heading">
                        <h1 style={{ fontSize: "14px", textAlign: "center" }}>
                            Quarter Appraisal
                        </h1>

                    </div>

                </div>
           
                {/* //-----------------Form */}


            </div>
        </div>

    )
}

export default AppraisalPrint
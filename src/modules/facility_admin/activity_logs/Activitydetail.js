import React from 'react'
import { useNavigate } from 'react-router-dom'

const Activitydetail = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div className=" container bg-white p-3 ">
                <div className='row '>
                    <div className="items-requiring-your col py-1">Activity Detail</div>
                    <div className='d-flex justify-content-end col'>
                        <button
                            className="border rounded  pointer p-2 text-white text-center"
                            style={{ background: "#818182" }}
                            onClick={() => navigate("/outpatientpro/facility/activitylogs/all")}>Back To Activity Log</button>
                    </div>

                </div>
                <hr />
                <div className='p-4 row '>
                    <div className='col-2 fw-bold p-1'>Action</div> <div className='col-10 p-1'> : Lorem ipsum dolor sit amet.</div>
                    <div className='col-2 fw-bold p-1'>Date</div><div className='col-10 p-1'> : 01-23-2024 4:15 pm</div>
                    <div className='col-2 fw-bold p-1'>Initiated by</div><div className='col-10 p-1'> : Provider</div>
                    <div className='col-2 fw-bold p-1'>Provider</div><div className='col-10 p-1'> : James Wilson</div>
                    <div className='col-2 fw-bold p-1'>Facility User</div><div className='col-10 p-1'> : Lori Martini'</div>

                </div>
            </div>
        </div>
    )
}

export default Activitydetail

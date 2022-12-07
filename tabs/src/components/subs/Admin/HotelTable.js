import React from 'react'

const HotelTable = (props) => {
    return (
        <>

            <div className="mb-5 ml-5">
                <h3 className="text-2xl">Current Booked Hotels</h3>
            </div>

            <div className='p-5'>
                <table className="table-fixed w-full bg-white border border-slate-400">
                    <thead>
                        <tr>
                            <th className="border border-slate-400">Check-In Date</th>
                            <th className="border border-slate-400">Employee Name</th>
                            <th className="border border-slate-400">Hotel</th>
                            <th className="border border-slate-400">Town</th>
                            <th className="border border-slate-400">Num of Nights</th>
                            <th className="border border-slate-400">Rate per Night</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                      props.data.map((sub, index) => {
                          return (
                              <tr key={index}>
                                  <td className="border border-slate-400 text-center">{new Date(sub.date).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                  <td className="border border-slate-400 text-center">{sub.subType}</td>
                                  <td className="border border-slate-400 text-center">{sub.hotel}</td>
                                  <td className="border border-slate-400 text-center">{sub.town}</td>
                              </tr>
                          )
                      })
                  } */}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default HotelTable
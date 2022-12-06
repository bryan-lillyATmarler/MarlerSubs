import React from 'react'

const SubTable = (props) => {
    return (
        <>
            <div className="mb-5">
                <h3 className="text-2xl">Your Current Logged Subs</h3>
            </div>


            <table className="table-fixed w-full bg-white border border-slate-400">
                <thead>
                    <tr>
                        <th className="border border-slate-400">Date</th>
                        <th className="border border-slate-400">Sub Type</th>
                        <th className="border border-slate-400">Hotel</th>
                        <th className="border border-slate-400">Town</th>
                    </tr>
                </thead>
                <tbody>
                    {
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
                    }
                </tbody>
            </table>

        </>
    )
}

export default SubTable
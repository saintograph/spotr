import React from 'react'

function RenderResult ({ result, destinationStation }) {
    const { CompositeMiles, RailFare, RailTime } = result.StationToStationInfos[0]
    return (
        <div className="row center-xs">
            <div className="col-xs-6">
                {CompositeMiles}<br/>
                {RailTime}<br/>
                {destinationStation}<br/>
                {RailFare.OffPeakTime}<br/>
                {RailFare.PeakTime}<br/>
                {RailFare.SeniorDisabled}<br/>
            </div>
        </div>
    )
}

export default RenderResult

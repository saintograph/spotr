import React from 'react'
import {List, ListItem} from 'material-ui/List'

function RenderResult ({ result, destinationStation }) {
    const { CompositeMiles, RailFare, RailTime } = result.StationToStationInfos[0]
    return (
        <div className="row center-xs">
            <div className="col-xs-7">
                <List style={{textAlign: 'left'}}>
                    <ListItem primaryText="Destination" secondaryText={destinationStation} />
                    <ListItem primaryText="Distance to Destination" secondaryText={CompositeMiles} />
                    <ListItem primaryText="Time to Destination" secondaryText={RailTime} />
                    <ListItem primaryText="Ticket price ( Off Peak )" secondaryText={RailFare.OffPeakTime} />
                    <ListItem primaryText="Ticket price ( Peak )" secondaryText={RailFare.PeakTime} />
                    <ListItem primaryText="Ticket price ( Seniors/Disabled )" secondaryText={RailFare.SeniorDisabled} />
                </List>
            </div>
        </div>
    )
}

export default RenderResult

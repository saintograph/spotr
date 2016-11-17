import React from 'react'
import {List, ListItem} from 'material-ui/List'

function RenderResult ({ result, times, destinationStation }) {
    const { CompositeMiles, RailFare, RailTime } = result.StationToStationInfos[0]
    const { Trains } = times
    const toStation = destinationStation + ' station'
    const CompositeMileText = CompositeMiles + ' miles'
    const RailTimeText = RailTime + ' minutes'
    const OffPeakFare = '$' + RailFare.OffPeakTime
    const PeakFare = '$' + RailFare.PeakTime
    const SpecialFare = '$' + RailFare.SeniorDisabled
    const firstTrain = Trains[0].Min + ' minute(s)'
    const secondTrain = Trains[1].Min + ' minute(s)'
    const thirdTrain = Trains[2].Min + ' minutes(s)'
    
    return (
        <div className="row center-xs">
            <div className="col-xs-7">
                <List>
                    <ListItem primaryText="Destination" secondaryText={toStation} />
                    {Trains === undefined ? <ListItem primaryText="No departure times from your station available, please check in a few minutes" /> :
                        <span>
                            {Trains[0] === undefined || Trains[0].Min === "" ?
                                <ListItem primaryText="Sorry, please check later" /> :
                                <ListItem primaryText="Train arriving in" secondaryText={(Trains[0].Min === "BRD") ? "Train is now boarding" : firstTrain }/>
                            }
                            {Trains[1] === undefined || Trains[1].Min === ""  ?
                                "" :
                                <ListItem primaryText="Next train arriving in" secondaryText={secondTrain}/>
                            }
                            {Trains[2] === undefined || Trains[2].Min === ""  ?
                                "" :
                                <ListItem primaryText="Third train in" secondaryText={thirdTrain}/>
                            }
                        </span>
                    }
                    <ListItem primaryText="Distance to Destination" secondaryText={CompositeMileText} />
                    <ListItem primaryText="Time to Destination" secondaryText={RailTimeText} />
                    <ListItem primaryText="Ticket price ( Off Peak )" secondaryText={OffPeakFare} />
                    <ListItem primaryText="Ticket price ( Peak )" secondaryText={PeakFare} />
                    <ListItem primaryText="Ticket price ( Seniors/Disabled )" secondaryText={SpecialFare} />
                </List>
            </div>
        </div>
    )
}

export default RenderResult

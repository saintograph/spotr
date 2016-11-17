import React, {Component} from 'react'
import axios from 'axios'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import AppNavBar from './common/AppNavBar'
import RenderResult from './app_components/RenderResult'
import localforage from 'localforage'

class App extends Component {

	constructor (props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleFromStation = this.handleFromStation.bind(this)
		this.handleDestinationStation = this.handleDestinationStation.bind(this)
		this.setState = this.setState.bind(this)
		this.state = {
			fromStation: '',
			destinationStation: '',
			result: null,
			times: null,
			info: 'Please choose your location and a destination'
		}
	}

	handleFromStation (text) {
		this.setState({ fromStation: text })
	}

	handleDestinationStation (text) {
		this.setState({ destinationStation: text })
	}

	handleSubmit () {
		event.preventDefault()
		const allStations = this.props.stations
		const fromCode = allStations.get(this.state.fromStation)
		const toCode = allStations.get(this.state.destinationStation)
		const storageKey = fromCode + toCode
		const self = this
		const config = {
			headers: { 'api_key': '3f0c4978522943898c1daa2602a23c4a' }
		}
		function getStationArrivalTimes () {
			return axios.get(
				'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/' + `${fromCode}`
			, config)
		}

		function getStationToStation () {
			return axios.get(
				'https://api.wmata.com/Rail.svc/json/jSrcStationToDstStationInfo?' + `FromStationCode=${fromCode}` + `&ToStationCode=${toCode}`
			, config)
		}

		axios.all([getStationArrivalTimes(), getStationToStation()])
		.then( axios.spread(function (responseTime, response) {
			const responseData = [responseTime, response]
			console.log(responseData[1].data)
			console.log(responseData[0].data)
			localforage.setItem(storageKey, responseData)
				.then(() => { self.setState({ times: responseData[0].data, result: responseData[1].data }) })
			}
		))

		// .then((response) => {
		// 		localforage.setItem(storageKey, response.data)
		// 			.then(() => {
		// 				this.setState({ result: response.data })
		// 				console.log(this.state.result)
		// 			})
		// 	}
		// )
		.catch((error) => {
			if ( isNaN(storageKey)) {
				this.setState({info: "You're offline. Only previously searched stations are available"})
			} else {
				localforage.getItem(storageKey)
				.then((response) => {
					self.setState({ result: response })
				})
			}
		})
	}

	render () {
		const stations = this.props.stations
		const stationNames = Array.from(stations.keys())
		return (
			<div>
				<AppNavBar />
				<div className="row center-xs">
					<div className="col-xs-6" style={{marginTop: 20, }}>
						<h2>WASHINGTON METRO AREA TRANSIT</h2>
					</div>
				</div>
				<div className="row center-xs" style={{marginTop: 20}}>
					<div className="col-xs-6">
						<AutoComplete
							hintText="Choose your station"
							filter={AutoComplete.fuzzyFilter}
							dataSource={stationNames}
							maxSearchResults={5}
							floatingLabelText="FROM"
							onNewRequest={this.handleFromStation}
						/>
					</div>
				</div>
				<div className="row center-xs" style={{marginTop: 20}}>
					<div className="col-xs-6">
						<AutoComplete
							hintText="Choose your destination"
							filter={AutoComplete.fuzzyFilter}
							dataSource={stationNames}
							maxSearchResults={5}
							floatingLabelText="DESTINATION"
							onNewRequest={this.handleDestinationStation}
						/>
					</div>
				</div>
				<div className="row center-xs">
					<div className="col-xs-6">
						<RaisedButton
							label="Submit"
							primary={true}
							style={{marginTop: 20}}
							onClick={this.handleSubmit.bind(this)}
						/>
					</div>
				</div>
				<div style={{marginTop: 20}}>
					{(this.state.result) ?
						<RenderResult destinationStation={this.state.destinationStation} result={this.state.result} times={this.state.times}/> :
						<div className="row center-xs"><div className="col-xs-6"><h2>{this.state.info}</h2></div></div>
					}
				</div>
			</div>
		)
	}
}

export default App

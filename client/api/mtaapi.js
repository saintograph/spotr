import axios from 'axios'

export function departures ({initialStation}) {
    return (
        axios.get(
            'http://mtaapi.herokuapp.com/api??id=120S'
            )
            .then((response) => response.data())
    )
}

// 'http://mtaapi.herokuapp.com/api?id=${initialStation}'

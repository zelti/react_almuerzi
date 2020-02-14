import {useState, useEffect} from 'react'
export default (url) => {
    const [laoding, setLoading] = useState(true)
    const [data, setData] = useState([])

    const fetchData = async () => {
        const response = await fetch(url)
        const data = await response.json()
        setLoading(false)
        setData(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {laoding, data}
}

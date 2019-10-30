import axios from 'axios'

export const fetchDataAxios = (query) => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + query;
    async function fetchData_redux() {
        const result = await axios(url)
        return result.data
    }
    return fetchData_redux()

}
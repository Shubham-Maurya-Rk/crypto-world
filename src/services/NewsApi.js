import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const newsApiHeaders = {
		'x-rapidapi-key': 'c3a029dd39mshc35212351ac437bp1b0351jsnff20f0600e40',
		'x-rapidapi-host': 'bing-web-search1.p.rapidapi.com',
        'x-bingapis-sdk':'true'
}
const baseUrl="https://newsapi.org";
const createRequest=(url)=>({url})

export const newsApi =createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder)=>({
        getCryptoNews:  builder.query({
            query: ({newsCategory,count})=>createRequest(`/v2/everything?q=${newsCategory}&sortBy=publishedAt&pageSize=${count}&apiKey=0852472cb4c64f058e3e5dc17a803808`)
        })
    })
})

export const { useGetCryptoNewsQuery } = newsApi;


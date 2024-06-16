import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const crytoApiHeader={
    'x-rapidapi-key': 'c3a029dd39mshc35212351ac437bp1b0351jsnff20f0600e40',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
}

const baseUrl="https://coinranking1.p.rapidapi.com";

const createRequest=(url)=>({url,headers: crytoApiHeader})
export const cryptoApi=createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getCryptos: builder.query({
            query :(count)=>createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query :(coinId)=>createRequest(`/coin/${coinId}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`)
        }),
        getCryptoHistory: builder.query({
            query :({coinId,timePeriod})=>createRequest(`/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`)
        }),
        getExchanges: builder.query({
            query :()=>createRequest(`/exchanges?referenceCurrencyUuid=yhjMzLPhuIDl&limit=50&offset=0&orderBy=24h`)
        })
    })
});


export const {useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery}=cryptoApi;
// const http = require('https');

// const options = {
// 	method: 'GET',
// 	hostname: 'coinranking1.p.rapidapi.com',
// 	headers: {

// 	}
// };
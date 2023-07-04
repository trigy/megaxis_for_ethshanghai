import { useQuery, gql } from "@apollo/client"

const GET_ACTIVE_ITEMS = gql`
    {
        activeItems(first: 5, where: { and: [{ buyer: "0x0000000000000000000000000000000000000000" }, { nftAddress: "0x6e082e54a362d931526db09b37a38e1747befdf0" }] }) {
            
            
            id
            buyer
            seller
            nftAddress
            tokenId
            price
        }
    }
`

export default function GraphExample() {
    const { loading, error, data } = useQuery(GET_ACTIVE_ITEMS)
    console.log(data)
    return <div>hi</div>
}

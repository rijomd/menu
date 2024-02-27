import React from 'react'

type Props = {}

const ItemList = (props: Props) => {
    console.log("itme");
    
    return (
        <div>ItemList</div>
    )
}

export default React.memo(ItemList);
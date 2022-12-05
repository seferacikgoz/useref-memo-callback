import React from 'react'
import { memo } from 'react';

const TaxComp = ({taxData}) => {
    console.log("Render => TaxComp components");
    return (
        <div>TaxComp : {JSON.stringify(taxData.current)}</div>
    )
}

export default memo(TaxComp)
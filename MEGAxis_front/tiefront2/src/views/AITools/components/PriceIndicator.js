const PriceIndicator = ({ children })=>{
    return <div className='price-indicator' style={{
        'minWidth': 50,
        padding: 8,
        position: 'absolute',
        'minHeight': 20,
        'zIndex': 1,
        top: 10,
        right: 0,
        'backgroundColor': '#f0f9ff',
        opacity: 0.9,
        'borderTopLeftRadius': 5,
        'borderBottomLeftRadius': 5,
        color: "black"
    }}>{children}</div>
}

export default PriceIndicator;
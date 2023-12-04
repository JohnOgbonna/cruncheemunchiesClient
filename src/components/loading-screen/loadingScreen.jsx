import './loadingScreen.scss'

export default function LoadingScreen(props) {
    return (
        props.loading ?
            <div className='loadingScreenWrapper'>
                <div className='loadingScreen'>
                    <p className='loadingScreen__message'>Sending Order Request</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="loadingScreen__animator" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: 'inline', shapeRendering: 'auto', width: "100px", height: "45px", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }}>
                        <rect x="17.5" y="30" width="15" height="40" fill="#ffa500">
                            <animate attributeName="y" repeatCount="indefinite" dur="1.2s" calcMode="spline" keyTimes="0;0.5;1" values="18;30;50" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>
                            <animate attributeName="height" repeatCount="indefinite" dur="1.2s" calcMode="spline" keyTimes="0;0.5;1" values="64;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>
                        </rect>
                        <rect x="42.5" y="50" width="15" height="40" fill="#ffa500">
                            <animate attributeName="y" repeatCount="indefinite" dur="1.2s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;50" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>
                            <animate attributeName="height" repeatCount="indefinite" dur="1.2s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>
                        </rect>
                        <rect x="67.5" y="50" width="15" height="40" fill="#ffa500">
                            <animate attributeName="y" repeatCount="indefinite" dur="1.2s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;50" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
                            <animate attributeName="height" repeatCount="indefinite" dur="1.2s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
                        </rect>
                    </svg>
                </div>
            </div>

            : null
    )
}
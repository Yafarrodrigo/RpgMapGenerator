const GameUI = `
<div id="gameContainer">
        <div id="blackscreen"> <h1> loading... </h1> </div>
        <div id="displayContainer">
            <canvas height="1" width="1"></canvas>
            <div id="logContainer">
                <div id="log">

                </div>
            </div>
        </div>
        <div id="sidebarContainer">
            <div id="sidebar">

                <div>spacebar - generate new map</div>
                <br>
                <div>R - reset parameters</div>
                <br>
                <hr>
                <br>

                <div>1 - Low settlement count</div>
                <div>2 - Standard settlement count</div>
                <div>3 - High settlement count</div>
                <br>

                <div style="display: flex;">
                    <div style="text-decoration: underline; font-style: oblique;" >Settlements:</div><span id="qtyOfSettlements" style="padding: 0 5px; font-weight: 800;"> standard </span>
                </div>
                <br>
                <hr>
                <br>
                <br>
                <div>4 - Low Water Quantity</div>
                <div>5 - Standard Water Quantity</div>
                <div>6 - High Water Quantity</div>
                <br>
                <div style="display: flex;">
                    <div style="text-decoration: underline; font-style: oblique;" >Water:</div><span id="qtyOfWater" style="padding: 0 5px; font-weight: 800;"> standard </span>
                </div>
                <br>
                <hr>
                <br>
                <div>7 - Low Mountains Quantity</div>
                <div>8 - Standard Mountains Quantity</div>
                <div>9 - High Mountains Quantity</div>
                <br>
                <div style="display: flex;">
                    <div style="text-decoration: underline; font-style: oblique;" >Mountains:</div><span id="qtyOfMountains" style="padding: 0 5px; font-weight: 800;"> standard </span>
                </div>
                <br>
                <hr>
                <br>
            </div>
        </div>
    </div>
`
export default GameUI
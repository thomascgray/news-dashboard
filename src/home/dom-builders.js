'use strict';

function buildCurrentPanelList(panelKeys) {
    return this.state.panelKeys.map(panelKey => {
        return (<li>{ panelKey } - <button onClick={() => this.removePanelViaKey(panelKey)}>X</button></li>);
    });
}

module.exports = {
    buildCurrentPanelList
};
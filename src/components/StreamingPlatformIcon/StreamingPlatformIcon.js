import React from "react";

const StreamingPlatformIcon = ({src, link}) => {
    let icon;
    switch (src) {
        case 'netflix':
        icon = require("../../assets/netflix.png");
        break;
        case 'vudu':
        icon = require("../../assets/vudu.png");
        break;
        case 'amazon_prime':
        icon = require("../../assets/prime.png");
        break;
        case 'disney_plus':
        icon = require("../../assets/disney.png");
        break;
        case 'apple_tv':
        icon = require("../../assets/disney.png");
        break;
        default:
            icon = null;
    }

    return icon ? <a href={link}><img className="s-logo" src={icon} alt="Hello" /></a> : null;
}

export default StreamingPlatformIcon;
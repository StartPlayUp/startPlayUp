import React from 'react'
import PropTypes from 'prop-types'
const MAX_PLAYER_NUMBER = 8;
const PLAYER_DEAD = 0;
const PLAYER_ALIVE = 1;
const DOCTOR_CURE = 2;

const PlayerRoles = ['Mafia','Mafia','Doctor','Police','reporter','citizen','citizen','citizen'];
const InitUser = {
    nickname : '',
    role : '',
    life : 1,
}

Player.propTypes={
    nickname : PropTypes.string.isRequired,
    life : PropTypes.number.isRequired,
    role : PropTypes.string,
    skill : PropTypes.string
}

function RoleDistribution() {
    for (let i = 0; i < 8; i++) {
        console.log(PlayerRoles.pop());
    }
    return(
        <div>
            <h3>dd</h3>
        </div>
    )
}


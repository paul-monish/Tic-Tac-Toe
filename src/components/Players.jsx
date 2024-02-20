import { useState } from 'react';
export default function Players({ name, symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);
    function handleIsEditing() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol,playerName)
        }
    }
    function handleOnChange(event) {
        setPlayerName(event.target.value);
    }
    let player = <span className="player-name">{playerName}</span>  
    if (isEditing) {
        player = <input type='text' key={name}  value={playerName} onChange={handleOnChange} required />
    }
    return (
        <li className={isActive?'active':undefined}>
            <span className="player">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleIsEditing}>{isEditing?'Save':'Edit'}</button>
        </li>
        
    )
}
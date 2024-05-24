import React, { useState, useEffect } from 'react';
import './KeyPage.css';

function KeyPage() {
    const [isKeyGenerated, setIsKeyGenerated] = useState(false);
    const [showKey, setShowKey] = useState(false);
    const [key, setKey] = useState({
        "id": null,
        "exponent_pri": null,
        "exponent_pub": null,
        "modulus": null 
    });

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('https://academic-trascript.azurewebsites.net/key');
            if (!response.ok) {
            throw new Error('Failed to fetch key');
            }
            const data = await response.json();
            setKey(data);
        } catch (error) {
            console.error('Error fetching key:', error);
        }
        };

        fetchData();
    }, [isKeyGenerated]); 

    const handleKeyGen = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://academic-trascript.azurewebsites.net/key/generate');
            if (!response.ok) {
                throw new Error('Failed to generate key');
            }
            setIsKeyGenerated(!isKeyGenerated);
        } catch (error) {
            console.error('Error generate key:', error);
        }
    };

    const handleShowKey = (e) => {
        setShowKey(!showKey)
    }
    

    return (
        <div>
            <button onClick={handleKeyGen}>Generate Key</button>
            <br/>
            <button onClick={handleShowKey}>{showKey ? 'Hide Key' : 'Show Key'}</button>
            {showKey && (
                <div>
                    <h3>e: {key.exponent_pub}</h3>
                    <h3>d: {key.exponent_pri}</h3>
                    <h3>n: {key.modulus}</h3>
                </div>
            )}
        </div>
    );
}

export default KeyPage;
import React, { useState, useEffect } from 'react';
import '../style/MatchScore.scss';

const MatchScore = ({ matchScore, scoreColor }) => {
    const targetScore = matchScore|| 0;
    const [animatedScore, setAnimatedScore] = useState(0);

    // SVG Circle Properties
    const radius = 40;
    const circumference = 2 * Math.PI * radius; // Approx 251.32
    const strokeDashoffset = circumference - (targetScore / 100) * circumference;

    useEffect(() => {
        // 1. Number Counter Animation
        if (targetScore === 0) return;
        
        let start = 0;
        const duration = 1200; // Animation time in ms (matches CSS)
        const counterInterval = Math.floor(duration / targetScore);

        const timer = setInterval(() => {
            start += 1;
            setAnimatedScore(start);
            if (start >= targetScore) {
                clearInterval(timer);
            }
        }, counterInterval);

        return () => clearInterval(timer);
    }, [targetScore]);

    return (
        <div className='match-score' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p className='match-score__label' style={{alignSelf: 'center'}}>Match Score</p>
            
            <div className={`match-score__ring ${scoreColor}`}>
                {/* SVG for the Animated Circular Ring */}

                {/* Inner Text Content */}
                <div className="match-score__content">
                    <span className='match-score__value'>{animatedScore}</span>
                    <span className='match-score__pct'>%</span>
                </div>
            </div>

            <p className='match-score__sub'>Strong match for this role</p>
        </div>
    );
};

export default MatchScore;
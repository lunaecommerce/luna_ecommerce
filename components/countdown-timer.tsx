import React from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';

interface CountdownTimerProps {
    date: Date | string | number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ date }) => {
    const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
        if (completed) {
            return <span>Oferta Expirada!</span>;
        } else {
            return (
                <div>
                    <span>{days}d</span> <span>{hours}h</span> <span>{minutes}m</span> <span>{seconds}s</span>
                </div>
            );
        }
    };

    return <Countdown date={date} renderer={renderer} />;
};

export default CountdownTimer;

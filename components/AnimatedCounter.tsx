'use client'
import CountUp from 'react-countup'

const AnimatedCounter = ({ amount = 100 }: { amount: number }) => {
    return (
        <div className='w-full'>
            <CountUp 
            decimals={2}
            decimal='.'
            prefix='$'
            end={amount} />
        </div>
    )
}

export default AnimatedCounter

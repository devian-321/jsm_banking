import React from 'react'
import HeaderBox from '@/components/headerBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSideBar from '@/components/RightSideBar'

const Home = () => {
  const loggedUser = { firstName: 'Anshu', lastName: "beta", email: "tiwri35@gmail.com" }
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedUser?.firstName || 'Guests'}
            subtext='Access and manage your account and transactions efficiently.'
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.25}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSideBar
        user={loggedUser}
        transactions={[]}
        banks={[{currentBalance:123.5}, {currentBalance:500}]}

      />
    </section>
  )
}

export default Home
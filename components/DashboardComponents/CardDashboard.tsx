import React from 'react'
import { Card, CardContent } from '../ui/card'

const CardDashboard = ({Icon, num, title}) => {
  
  return (
    <Card className='bg-gradient-to-br from-yellow-300 to-yellow-600'>
        <CardContent className='h-full p-5 flex justify-between'>
            <div className='h-full p-0 bg-white px-3 rounded-full flex items-center'>
                <Icon className='text-yellow-700' />
            </div>
            <div className='text-gray-100 font-bold font-poppins text-right'>
                <p>{num}</p>
                <p>{title}</p>
            </div>
        </CardContent>
    </Card>
  )
}

export default CardDashboard
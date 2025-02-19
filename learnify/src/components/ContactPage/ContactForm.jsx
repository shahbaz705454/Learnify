import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactForm = () => {
  return (
    <div className='border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col'>
        <h1 className='text-4xl leading-10 font-semibold text-richblack-5'>Got a Idea? We've got the skills. Let's team up</h1>
        <p className='text-richblack-200 mb-6'>Tell us more about yourself and what you're got in mind.</p>
        <ContactUsForm></ContactUsForm>



    </div>
  )
}

export default ContactForm
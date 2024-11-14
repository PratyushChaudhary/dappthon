import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from 'emailjs-com'; 
import { toast } from 'react-hot-toast'; 

interface FormInputs {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const serviceId = VITE_EMAILJS_SERVICE_ID;
      const templateId =VITE_EMAILJS_TEMPLATE_ID;
      const userId =VITE_EMAILJS_USER_ID;

      const result = await emailjs.send(serviceId, templateId, data, userId);

      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send the message.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-[#1a1d23] rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Contact Us</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name:</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="mt-2 p-3 w-full bg-[#2c3e50] text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4d4d]"
            />
            {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email:</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="mt-2 p-3 w-full bg-[#2c3e50] text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4d4d]"
            />
            {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium">Message:</label>
            <textarea
              id="message"
              {...register('message', { required: 'Message is required' })}
              className="mt-2 p-3 w-full bg-[#2c3e50] text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4d4d]"
            ></textarea>
            {errors.message && <span className="text-xs text-red-400">{errors.message.message}</span>}
          </div>

          <button 
            type="submit" 
            className="w-full p-3 bg-[#ff4d4d] text-white rounded-md hover:bg-[#ff6666] focus:outline-none"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
